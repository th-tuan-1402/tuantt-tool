<template>
  <div class="w-1/2 mx-auto">
    <v-card>
      <v-card-text class="d-flex justify-center">
        <media-player ref="player" :options="videoOptions"></media-player>
      </v-card-text>
      <v-card-text v-if="mediaSources.length > 0" class="d-flex border-t">
        <div class="basis-1/2 grow">
          <v-list density="compact">
            Danh sách phát
            <v-list-item
              v-for="(item, i) in mediaSources"
              :key="i"
              color="primary"
              nav
              :value="item"
              @click="onChangeMediaIndex(i, item)"
            >
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item>
          </v-list>
        </div>
        <div
          v-if="mediaSources[currentMediaIndex]?.labels.length > 0"
          class="ml-2 basis-1/2"
        >
          <v-list density="compact">
            Nhãn
            <v-list-item
              v-for="(label, index) in currentVideoLabelList"
              :key="index"
              color="primary"
              nav
              :value="label"
              @click="onPlayMediaFromTimestamp(item, label.timestamp)"
            >
              <v-list-item-title>
                <span class="text-primary">{{
                  timeLabels(label.timestamp)
                }}</span>
                {{ label.label }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </div>
      </v-card-text>
    </v-card>
    <v-card class="mt-4">
      <v-card-text>
        <!-- video source panel -->
        <div class="d-flex">
          <v-text-field
            label="Video URL"
            v-model="videoUrl"
            class="basis-1/2"
            density="compact"
          ></v-text-field>
          <v-text-field
            label="Title"
            v-model="videoTitle"
            class="basis-1/2 ml-2"
            density="compact"
          ></v-text-field>
          <v-btn
            @click="onAddMediaSource"
            :disabled="!videoUrl || !videoTitle"
            variant="text"
            color="green"
            >➕</v-btn
          >
        </div>
        <div class="d-flex">
          <v-text-field
            label="Nhãn"
            v-model="timeLabel"
            density="compact"
          ></v-text-field>
          <v-btn
            :disabled="!timeLabel"
            @click="onCrateTimeLabel"
            color="green"
            variant="text"
            >➕</v-btn
          >
        </div>
      </v-card-text>
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
      videoTitle: null,
      mediaSources: [],
      videoOptions: {
        autoplay: true,
        controls: true,
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
    onAddMediaSource() {
      this.mediaSources.push({
        title: this.videoTitle,
        src: this.videoUrl,
        type: this.guessVideoType(this.videoUrl),
        labels: [],
      });
      this.videoUrl = null;
      this.videoTitle = null;
    },
    onChangeMediaIndex(index, newSource) {
      this.currentMediaIndex = index;
      this.$refs.player.pause();
      this.$refs.player.setMediaSources(newSource);
      this.$refs.player.play();
    },
    onCrateTimeLabel() {
      let label = this.timeLabel;
      let timestamp: number = this.$refs.player.getCurrentTime();
      this.mediaSources[this.currentMediaIndex].labels.push({
        label,
        timestamp,
      });
      this.timeLabel = null;
    },
    onPlayMediaFromTimestamp(source, timestamp) {
      this.$refs.player.pause();
      this.$refs.player.setMediaSources(source);
      this.$refs.player.setCurrentTime(timestamp);
      this.$refs.player.play();
    },
    guessVideoType(url: string) {
      let videoType = null;
      if (url.includes("mp4")) {
        videoType = "video/mp4";
      } else if (url.includes("webm")) {
        videoType = "video/webm";
      } else if (url.includes("ogg")) {
        videoType = "video/ogg";
      }

      return videoType;
    },
  },
};
</script>
