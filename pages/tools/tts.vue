<template>
  <v-card class="pa-2 w-full md:w-1/2 mx-auto" :disabled="isProcessing">
    <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
      v-show="isProcessing"
    ></v-progress-circular>
    <v-expansion-panels>
      <v-expansion-panel title="⚙️">
        <v-expansion-panel-text>
          <v-text-field label="File name" v-model="fileName"></v-text-field>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-card-text v-if="audioSrc" class="d-flex justify-center">
      <audio controls autoplay @ended="onEndPlayAudio" :src="audioSrc"></audio>
    </v-card-text>
    <v-card-text>
      <v-textarea
        label="Text to convert"
        v-model="txtInp"
        @change="onChangeTextInput"
      ></v-textarea>
      <div class="d-flex gap-x-1">
        <v-btn color="primary" @click="onConvert"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </v-btn>
        <v-btn
          :disabled="disableDownloadButton"
          @click="onDownLoadAudio"
          color="green"
          class="ml"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
            variant="text"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m-6 3.75 3 3m0 0 3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
            />
          </svg>
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      filePath: null,
      txtInp: null,
      isProcessing: false,
      fileName: "output",
      audioSources: [],
      currentAudioIndex: -1,
      constants: {
        MAX_WORD_COUNT_PER_REQUEST: 2000,
      },
    };
  },
  computed: {
    disableDownloadButton() {
      return !!this.audioSources;
    },
    downloadFileName() {
      const timestamp = new Date().getTime();
      return `${this.fileName}_${timestamp}.mp3`;
    },
    audioSrc() {
      let src = null;
      if (this.audioSources) {
        src = this.audioSources[this.currentAudioIndex];
      }

      return src;
    },
  },
  methods: {
    onDownLoadAudio() {
      const timestamp = new Date().getTime();
      for (let index = 0; index < this.audioSources.length; index++) {
        let aTag = document.createElement("a");
        aTag.href = this.audioSources[index];
        aTag.download = `${this.fileName}_${timestamp}_${index}.mp3`;
        aTag.target = "_blank";
        aTag.click();
      }
    },
    onEndPlayAudio() {
      this.currentAudioIndex +=
        this.currentAudioIndex + 1 < this.audioSources.length ? 1 : 0;
    },
    onChangeTextInput() {
      this.audioSources = [];
    },
    async onConvert() {
      this.isProcessing = true;
      {
        let dataObj = await this.convert();
        if (dataObj) {
          this.audioSources = dataObj.map((blobData) => {
            return URL.createObjectURL(new Blob(blobData, { type: "audio/mpeg" }));
          });
          this.currentAudioIndex = this.audioSources ? 0 : -1;
        }
      }
      this.isProcessing = false;
    },

    // private function
    async convert() {
      let blobData = [];
      let paragraphs = this.splitIntoChunkWordCount(
        this.txtInp,
        this.constants.MAX_WORD_COUNT_PER_REQUEST
      );
      let input = null;

      try {
        for (let i = 0; i < paragraphs.length; i++) {
          input = this.escapeXml(paragraphs[i]);
          let response = await $fetch("/api/tts", {
            method: "post",
            body: { input },
            responseType: "stream",
          });

          // Read chunks data from stream
          const reader = response.getReader();
          const chunks = [];
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            chunks.push(value);
          }
          blobData.push(chunks);
        }
      } catch (e) {
        console.error(e);
      }

      return blobData ?? null;
    },

    /**
     * Escape unsafe xml characters
     * @param string unsafe
     * @returns string safe string
     */
    escapeXml(unsafe) {
      return unsafe
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    },

    /**
     * Split text into smaller size chunk
     * @param string text
     * @param int maxWords
     * @returns string[] chunks
     */
    splitIntoChunkWordCount(text, maxWords = 2000) {
      // Split the text into sentences
      const sentences = text.match(/[^\.!\?]+[\.!\?]+/g);
      if (!sentences) return [];

      let paragraphs = [];
      let currentParagraph = "";
      let currentWordCount = 0;

      sentences.forEach((sentence) => {
        const wordCount = sentence.split(/\s+/).length;

        // If adding the current sentence would exceed the word limit
        if (currentWordCount + wordCount > maxWords) {
          // End the current paragraph and start a new one
          paragraphs.push(currentParagraph.trim());
          currentParagraph = "";
          currentWordCount = 0;
        }

        // Add the sentence to the current paragraph
        currentParagraph += sentence + " ";
        currentWordCount += wordCount;
      });

      // Add the last paragraph if there is any content left
      if (currentParagraph.trim()) {
        paragraphs.push(currentParagraph.trim());
      }

      return paragraphs;
    },
  },
};
</script>
