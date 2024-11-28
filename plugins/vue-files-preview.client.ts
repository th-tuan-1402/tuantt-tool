import { defineNuxtPlugin } from '#app';
import VueFilesPreview from 'vue-files-preview';
import 'vue-files-preview/lib/style.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueFilesPreview);
});
