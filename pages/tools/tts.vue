<template>
  <v-card class="pa-2 w-50 mx-auto" :disabled="isProcessing">
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
    <v-card-text v-if="filePath">
      <v-text-field
        label="File name"
        v-model="filePath"
        readonly
        @change="onChangeTextInput"
      ></v-text-field>
      <v-btn
        color="green"
        class="ml"
        :href="filePath"
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
    };
  },
  computed: {
    disableDownloadButton() {
      return !!this.filePath;
    },
    downloadFileName() {
      return this.filePath.split("/").pop();
    },
  },
  methods: {
    onChangeTextInput() {
      this.filePath = "";
    },
    async onConvert() {
      this.filePath = null;

      this.isProcessing = true;
      {
        try {
          let { data: fileName } = await $fetch("/api/tts", {
            method: "post",
            body: {
              input: this.txtInp,
            },
          });

          this.filePath = fileName;
        } catch (e) {
          console.error(e);
        }
      }
      this.isProcessing = false;
    },
  },
};
</script>
