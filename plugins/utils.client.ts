import AudioUtils from "~/scripts/utils/AudioUtils";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      clientOnlyFunction: () => {
        console.log('This function runs only on the client side!');
      },
      audioUtils: new AudioUtils(),
    },
  };
});
