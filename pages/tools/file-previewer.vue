<template>
  <div v-if="shouldShowPreviewer" class="preview-container">
    <VueFilesPreview v-bind="previewerBindings" />
  </div>
  <div v-else class="upload-btn">
    <el-upload
      ref="uploadRef"
      drag
      action="null"
      :limit="1"
      :before-upload="beforeFileUpload"
    >
      <el-icon class="el-icon--upload"><i-ep-upload-filled /></el-icon>
      <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
    </el-upload>
  </div>
</template>

<script lang="ts" setup>
const uploadRef = ref();
const uploadFile = ref();

let previewerBindings = ref({
  file: null,
  url: null,
});

const { url } = useRoute().query;
if (url) {
  previewerBindings.value.url = url;
}

const beforeFileUpload = (rawFile) => {
  previewerBindings.value.file = rawFile;
  return false;
};

const shouldShowPreviewer = computed(() => {
  if (previewerBindings.value?.url) {
    return true;
  }

  if (previewerBindings.value?.file) {
    return true;
  }

  return false;
});
</script>

<style lang="css" scoped>
.vue-files-preview {
  height: 1000px !important;
}
</style>
