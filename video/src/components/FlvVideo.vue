<template>
  <div>
    <p>video</p>
    <video
      class="vodeoFlv"
      muted
      autoplay
      controls="true"
      width="500px"
      height="250px"
    ></video>
  </div>
</template>

<script>
import flvjs from "flv.js";
export default {
  name: "FlvVideo",
  data: () => {
    return {
      flvPlayer: null,
    };
  },
  props: {
    time: {
      type: Number,
    },
  },
  methods: {
    createVideo() {
      let vodeoFlv = document.querySelectorAll(".vodeoFlv")[this.time-1];
      console.log(vodeoFlv);
    //   setTimeout(() => {
        this.flvPlayer = flvjs.createPlayer(
          {
            type: "mp4",
            isLive: false,
            hasAudio: true,
            hasVideo: true,
            url: "https://www.aojo.com/vancheerfile/files/2020/12/20201231055857316.mp4",
          },
          {
            cors: true, // 是否跨域
            //   enableWorker: true, // 是否多线程工作
            enableStashBuffer: false, // 是否启用缓存
            stashInitialSize: 128, // 缓存大小(kb)  默认384kb
            autoCleanupSourceBuffer: true, // 是否自动清理缓存
          }
        );
        this.flvPlayer.attachMediaElement(vodeoFlv);
        this.flvPlayer.load();
        console.log("play");
        this.flvPlayer.play();

        // 监听错误事件
        this.flvPlayer.on(flvjs.Events.ERROR, (err, errdet) => {
          // 参数 err 是一级异常，errdet 是二级异常
          if (err == flvjs.ErrorTypes.MEDIA_ERROR) {
            console.log("媒体错误");
            if (errdet == flvjs.ErrorDetails.MEDIA_FORMAT_UNSUPPORTED) {
              console.log("媒体格式不支持");
            }
          }
          if (err == flvjs.ErrorTypes.NETWORK_ERROR) {
            console.log("网络错误");
            if (errdet == flvjs.ErrorDetails.NETWORK_STATUS_CODE_INVALID) {
              console.log("http状态码异常");
            }
          }
          if (err == flvjs.ErrorTypes.OTHER_ERROR) {
            console.log("其他异常：", errdet);
          }
        });
    //   }, this.time);
    },
  },
  mounted() {
    this.createVideo();
  },
};
</script>

<style scoped>
/* 所有控件 */
video::-webkit-media-controls-enclosure {
  /* display: none; */
}
/* 进度条 */
video::-webkit-media-controls-timeline {
  /* display: none; */
}
video::-webkit-media-controls-current-time-display {
  /* display: none; */
}
/* 音量按钮 */
video::-webkit-media-controls-mute-button {
  /* background: red; */
  /* display: none; */
}
video::-webkit-media-controls-toggle-closed-captions-button {
  /* display: none; */
}
/* 音量的控制条 */
video::-webkit-media-controls-volume-slider {
  /* background: red; */
  /* display: none; */
}
/*  播放按钮 */
video::-webkit-media-controls-play-button {
  /* display: none; */
}
</style>