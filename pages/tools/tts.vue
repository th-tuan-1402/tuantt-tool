<template>
  <v-card class="pa-2 w-full md:w-1/2 mx-auto" :disabled="isProcessing">
    <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
      v-show="isProcessing"
    ></v-progress-circular>
    <v-card-text>
      <v-textarea label="Text to convert" v-model="txtInp"></v-textarea>
      <v-btn color="primary" @click="onConvert">Convert</v-btn>
    </v-card-text>
    <v-card-text v-if="downloadUrl">
      <v-text-field
        label="File name"
        v-model="fileName"
        @change="onChangeTextInput"
      ></v-text-field>
      <v-btn
        color="green"
        class="ml"
        :href="downloadUrl"
        :download="downloadFileName"
        target="_blank"
        >Download</v-btn
      >
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
