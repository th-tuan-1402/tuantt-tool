<template>
  <video ref="videoPlayer" class="video-js"></video>
</template>

<script lang="ts">
import useVideo from '~/composables/video';

type MediaSource = {
  src: string;
  type: string;
};

export default {
  name: "VideoPlayer",
  props: {
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  setup(props) {
    useHead({
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/video.js@8.12.0/dist/video.min.js",
          tagPosition: "head"
        },
      ],
    });
  },
  data() {
    return {
      player: null,
      sources: null,
    };
  },
  mounted() {
    this.sources = this.options.sources || [];
    this.player = useVideo(this.$refs.videoPlayer, this.options, () => {
      this.player.log("onPlayerReady", this);
    });
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
  methods: {
    play() {
      this.player.play();
    },
    pause() {
      this.player.pause();
    },
    playFromRawUrl(url) {
      this.player.src(url);
    },
    setMediaSources(sources: MediaSource[] | MediaSource) {
      this.player.src(sources);
    },
    getCurrentTime() {
      return this.player.currentTime();
    },
    setCurrentTime(time) {
      this.player.currentTime(time);
    },
  },
};
</script>
<style lang="css">
@import url("https://cdn.jsdelivr.net/npm/video.js@8.12.0/dist/video-js.min.css");
</style>
