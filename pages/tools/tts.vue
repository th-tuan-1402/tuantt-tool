<template>
  <div class="pa-2 w-full md:w-1/2 mx-auto">
    <v-card>
      <v-card-text v-if="audioSrc" class="d-flex justify-center items-center flex-col">
        <div>
          <v-btn
            class="audio_track__control_button"
            variant="text"
            @click="previousAudioTrack"
            @keyup.left="previousAudioTrack"
            >⏮️</v-btn
          >
          <div class="py-3 px-2 inline-block">
            {{ currentAudioIndex + 1 + "/" + audioSources.length }}
          </div>
          <v-btn
            class="audio_track__control_button"
            variant="text"
            @keyup.right="nextAudioTrack"
            @click="nextAudioTrack"
            >⏭️</v-btn
          >
        </div>
        <audio controls autoplay @ended="onEndPlayAudio" :src="audioSrc"></audio>
      </v-card-text>
      <v-card-text>
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
          v-show="isProcessing"
        ></v-progress-circular>
        <div class="d-flex flex-row-reverse">
          <span>{{ wordCount }} words, {{ characterCount }} chars</span>
        </div>
        <v-textarea
          label="Text to convert"
          v-model="txtInp"
          @change="onChangeTextInput"
          :disabled="isProcessing"
        ></v-textarea>

        <div class="d-flex gap-x-1">
          <v-btn color="primary" @click="onConvert" :disabled="isProcessing"
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
    <v-expansion-panels class="mt-4">
      <v-expansion-panel title="⚙️">
        <v-card>
          <v-card-text>
            <v-text-field label="📎File name:" v-model="fileName" density="compact">
          </v-text-field></v-card-text>
          <v-card-text class="mt-2">
            <div><span>🎙️ Voice</span></div>
            <v-autocomplete label="Locale" v-model="locale" :items="localeSelectionList" item-title="text" item-value="value" clearable density="compact"></v-autocomplete>
            <v-select label="Gender" v-model="gender" :items="genderSelectionList" clearable density="compact"></v-select>
            <v-select label="Voice" v-model="voice" :items="voices" clearable item-title="FriendlyName" return-object density="compact"></v-select>
          </v-card-text>
          <v-card-text>
            <v-slider v-model="option.rate"
                      :min="optionRange.rate.min"
                      :max="optionRange.rate.max"
                      :step="optionRange.rate.step"
                      prepend-icon="mdi-speedometer"
                      density="compact"
                      thumb-label 
                      show-ticks>
            </v-slider>
            <v-slider v-model="option.volume"
                      :min="optionRange.volume.min"
                      :max="optionRange.volume.max"
                      :step="optionRange.volume.step"
                      prepend-icon="mdi-volume-high"
                      density="compact"
                      thumb-label
                      show-ticks>
            </v-slider>
          </v-card-text>
        </v-card>
        <v-expansion-panel-text>aaaa</v-expansion-panel-text>
        <v-expansion-panel-text>
          
          
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<script>
import { splitIntoChunkWordCount, escapeXml, getWordCount } from "~/scripts/utils/TextUtils";

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
        MAX_WORD_COUNT_PER_REQUEST: 1900,
      },
      genderSelectionList: ["Male", "Female"],
      locale: null,
      gender: null,
      voice: null,
      option: {
        rate: 1.0,
        pitch: 1.0,
        volume: 100.0,
      },
      optionRange: {
        rate: {
          min: 0.5,
          max: 2.0,
          step: 0.1,
        },
        volume: {
          min: 0.0,
          max: 100.0,
          step: 10,
        },
      }
    };
  },
  async setup() {
    const { data, status, error, refresh, clear } = await useFetch('/api/tts')

    if (error.value) {
      createError('Failed to fetch voice list')
    }

    const {voiceList, genderSelectionList, localeList, localeSelectionList} = data.value

    return {
      voiceList,
      genderSelectionList,
      localeList,
      localeSelectionList
    }
  },
  computed: {
    voices() {
      // Filter voice list with locale and gender
      return this.voiceList.filter((voice) => {
        if (this.locale && this.locale != voice.Locale) {
          return false;
        }

        if (this.gender && this.gender != voice.Gender) {
          return false;
        }

        return true;
      });
    },
    characterCount() {
      return this.txtInp ? this.txtInp.length : 0;
    },
    wordCount() {
      if (!this.txtInp) {
        return 0;
      }

      return getWordCount(this.txtInp);
    },
    disableDownloadButton() {
      if (this.isProcessing) {
        return true;
      }
      return this.audioSources.length == 0;
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
      let aTag = document.createElement("a");
      for (let index = 0; index < this.audioSources.length; index++) {
        aTag.href = this.audioSources[index];
        aTag.download = `${this.fileName}_${index}_${timestamp}.mp3`;
        aTag.target = "_blank";
        aTag.click();
      }
    },
    onEndPlayAudio() {
      this.nextAudioTrack();
    },
    onChangeTextInput() {
      this.audioSources = [];
    },
    async onConvert() {
      this.isProcessing = true;
      {
        // Clear audio sources
        this.audioSources = [];

        // Call api to convert text to audio
        let paragraphs = splitIntoChunkWordCount(
          this.txtInp,
          this.constants.MAX_WORD_COUNT_PER_REQUEST
        );
        for (let i = 0; i < paragraphs.length; i++) {
          let dataObj = await this.convert(escapeXml(paragraphs[i]));
          if (dataObj) {
            let blobUrl = URL.createObjectURL(new Blob(dataObj, { type: "audio/mpeg" }));
            this.audioSources.push(blobUrl);

            // Update current index to first
            if (i == 0) this.currentAudioIndex = 0;
          }
        }
      }
      this.isProcessing = false;
    },

    // private function
    async convert(input) {
      let dataObj = null;
      let voiceName = this.voice?.ShortName;
      let outputFormat = this.voice?.SuggestedCodec
      let { rate, volume } = this.option;

      try {
        let response = await $fetch("/api/tts", {
          method: "post",
          body: { input, voiceName, outputFormat, rate, volume },
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

        dataObj = chunks;
      } catch (e) {
        console.error(e);
      }

      return dataObj;
    },
    previousAudioTrack() {
      this.currentAudioIndex += this.currentAudioIndex - 1 >= 0 ? -1 : 0;
    },
    nextAudioTrack() {
      this.currentAudioIndex +=
        this.currentAudioIndex + 1 < this.audioSources.length ? 1 : 0;
    },
  },
};
</script>
<style>
.audio_track__control_button {
  min-width: 0 !important;
  padding: 0 8px !important;
}
</style>
