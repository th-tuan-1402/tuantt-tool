<template>
    <div v-if="uploadFile" class="preview-container">
        <VueFilesPreview :file="uploadFile" />
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

const beforeFileUpload = (rawFile) => {
  uploadFile.value = rawFile;
  return false;
};
</script>

<style lang="css" scoped>
.vue-files-preview{
    height: 1000px !important;
}
</style>