<template>
  <div class="w-1/2 mx-auto">
    <v-card>
      <v-form>
        <v-text-field label="Video URL" v-model="videoUrl"></v-text-field>
        <v-btn @click="$refs.player.playFromRawUrl(videoUrl)">Play</v-btn>
      </v-form>
    </v-card>
    <v-card>
      <v-form>
        <v-text-field label="Nhãn" v-model="timeLabel"></v-text-field>
        <v-btn
          :disabled="!timeLabel"
          @click="onCrateTimeLabel"
          color="green"
          variant="text"
          >Mark</v-btn
        >
      </v-form>
    </v-card>
    <v-card class="d-flex justify-center">
      <media-player ref="player" :options="videoOptions"></media-player>
    </v-card>
    <v-card class="d-flex">
      <div class="basis-1/2">
        <v-list density="compact">
          <v-list-item v-for="(item, i) in mediaSources" :key="i" color="primary">
            <!-- <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template> -->

            <v-list-item-title
              v-text="item.src"
              @click="onChangeMediaIndex(i, item)"
            ></v-list-item-title>
          </v-list-item>
        </v-list>
      </div>
      <div v-if="mediaSources[currentMediaIndex].labels.length > 0">
        <v-list density="compact">
          <v-list-item v-for="(label, index) in currentVideoLabelList" :key="index">
            <v-list-item-title @click="onPlayMediaFromTimestamp(item, label.timestamp)">
              <span class="text-primary">{{ timeLabels(label.timestamp) }} </span>
              {{ label.label }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </div>
    </v-card>
  </div>
</template>
<script lang="ts">
import MediaPlayer from "~/components/MediaPlayer.vue";
import DateTimeUtils from "~/scripts/utils/DateTimeUtils";

export default {
  components: { MediaPlayer },
  setup() {},
  data() {
    return {
      currentMediaIndex: 0,
      videoUrl: null,
      mediaSources: [
        {
          src: "https://vjs.zencdn.net/v/oceans.mp4",
          type: "video/mp4",
          labels: [],
        },
        {
          src: "https://d2zihajmogu5jn.cloudfront.net/elephantsdream/ed_hd.mp4",
          type: "video/mp4",
          labels: [],
        },
      ],
      videoOptions: {
        autoplay: true,
        controls: true,
        sources: [],
      },
      timeLabel: null,
    };
  },
  computed: {
    currentVideoLabelList() {
      return this.mediaSources[this.currentMediaIndex].labels ?? [];
    },
    timeLabels() {
      return function (timestamp: number) {
        return DateTimeUtils.formatAsTime(timestamp);
      };
    },
  },
  methods: {
    onChangeMediaIndex(index, newSource) {
      this.currentMediaIndex = index;
      this.$refs.player.pause();
      this.$refs.player.setMediaSources(newSource);
      this.$refs.player.play();
    },
    onCrateTimeLabel() {
      let label = this.timeLabel;
      let timestamp: number = this.$refs.player.getCurrentTime();
      this.mediaSources[this.currentMediaIndex].labels.push({ label, timestamp });
      this.timeLabel = null;
    },
    onPlayMediaFromTimestamp(source, timestamp) {
      this.$refs.player.pause();
      this.$refs.player.setMediaSources(source);
      this.$refs.player.setCurrentTime(timestamp);
      this.$refs.player.play();
    },
  },
};
</script>
