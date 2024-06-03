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
          <v-text-field
            label="File name"
            v-model="fileName"
            @change="onChangeTextInput"
          ></v-text-field>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-card-text v-if="downloadUrl" class="d-flex justify-center">
      <audio controls>
        <source :src="downloadUrl" type="audio/mpeg" />
      </audio>
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
          color="green"
          class="ml"
          :href="downloadUrl"
          :download="downloadFileName"
          target="_blank"
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
      downloadUrl: null,
      fileName: "output",
    };
  },
  computed: {
    disableDownloadButton() {
      return !!this.downloadUrl;
    },
    downloadFileName() {
      const timestamp = new Date().getTime();
      return `${this.fileName}_${timestamp}.mp3`;
    },
  },
  methods: {
    onChangeTextInput() {
      this.downloadUrl = null;
    },
    async onConvert() {
      this.downloadUrl = null;

      this.isProcessing = true;
      {
        let dataObj = await this.convert();
        if (dataObj) {
          // Convert chunks to a single Blob
          let blob = new Blob(dataObj, { type: "audio/mpeg" });
          this.downloadUrl = URL.createObjectURL(blob); // for steam data
        }
      }
      this.isProcessing = false;
    },

    // private function
    async convert() {
      let blobData = null;

      try {
        let response = await $fetch("/api/tts", {
          method: "post",
          body: {
            input: this.txtInp,
          },
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

        blobData = chunks;
      } catch (e) {
        console.error(e);
      }

      return blobData;
    },
  },
};
</script>
