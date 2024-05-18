import videojs, { type ReadyCallback } from "video.js";

export default function useVideo(id: string, options: MaybeRef<any>, callBack: ReadyCallback) {
  let defaultOptions = {
    "techOrder": [
      "Html5"
    ],
    "html5": {},
    "enableSourceset": true,
    "inactivityTimeout": 2000,
    "playbackRates": [],
    "liveui": false,
    "children": [
      "mediaLoader",
      "posterImage",
      "titleBar",
      "textTrackDisplay",
      "loadingSpinner",
      "bigPlayButton",
      "liveTracker",
      "controlBar",
      "errorDisplay",
      "textTrackSettings",
      "resizeManager"
    ],
    "language": "vi-VN",
    "languages": {},
    "notSupportedMessage": "No compatible source was found for this media.",
    "normalizeAutoplay": false,
    "fullscreen": {
      "options": {
        "navigationUI": "hide"
      }
    },
    "breakpoints": {},
    "responsive": false,
    "audioOnlyMode": false,
    "audioPosterMode": false,
    "enableSmoothSeeking": false,
    "vhs": {},
    "sources": [
      {
        "_custom": {
          "type": "reactive",
          "objectType": "Reactive",
          "value": {
            "src": "https://vjs.zencdn.net/v/oceans.mp4",
            "type": "video/mp4"
          }
        }
      }
    ],
    "tracks": [],
    "id": "vjs_video_3",
    "data-v-inspector": "components/MediaPlayer.vue:2:3",
    "class": "video-js",
    "autoplay": true,
    "controls": true,
    "initChildren": false,
    "createEl": false,
    "evented": false,
    "reportTouchActivity": false,
    "playerOptions": {
      "techOrder": [
        "Html5"
      ],
      "html5": {},
      "enableSourceset": true,
      "inactivityTimeout": 2000,
      "playbackRates": [],
      "liveui": false,
      "children": [
        "mediaLoader",
        "posterImage",
        "titleBar",
        "textTrackDisplay",
        "loadingSpinner",
        "bigPlayButton",
        "liveTracker",
        "controlBar",
        "errorDisplay",
        "textTrackSettings",
        "resizeManager"
      ],
      "language": "vi-VN",
      "languages": {},
      "notSupportedMessage": "No compatible source was found for this media.",
      "normalizeAutoplay": false,
      "fullscreen": {
        "options": {
          "navigationUI": "hide"
        }
      },
      "breakpoints": {},
      "responsive": false,
      "audioOnlyMode": false,
      "audioPosterMode": false,
      "enableSmoothSeeking": false,
      "vhs": {},
      "sources": [
        {
          "_custom": {
            "type": "reactive",
            "objectType": "Reactive",
            "value": {
              "src": "https://vjs.zencdn.net/v/oceans.mp4",
              "type": "video/mp4"
            }
          }
        }
      ],
      "tracks": [],
      "id": "vjs_video_3",
      "data-v-inspector": "components/MediaPlayer.vue:2:3",
      "class": "video-js",
      "autoplay": true,
      "controls": true,
      "initChildren": false,
      "createEl": false,
      "evented": false,
      "reportTouchActivity": false
    }
  }
  defaultOptions = { ...defaultOptions, ...unref(options) };

  const video = videojs(id, defaultOptions, callBack);
  return video;
}