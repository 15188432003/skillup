<template>
  <div>
    <video
      width="500px"
      height="250px"
      controls
      muted
      autoplay
      id="mpegVideo"
    ></video>
  </div>
</template>

<script>
import mpegts from "mpegts.js";
export default {
  name: "MpegVideo",
  data: () => {
    return {
      mpegtsPlayer: null,
    };
  },
  methods: {
    createMpeg() {
      const mpegVideo = document.getElementById("mpegVideo");
      this.mpegtsPlayer = mpegts.createPlayer(
        {
          type: "mp4",
          isLive: false,
          hasAudio: true,
          hasVideo: true,
          url: "https://klxxcdn.oss-cn-hangzhou.aliyuncs.com/histudy/hrm/media/bg1.mp4",
        }
      );

      this.mpegtsPlayer.attachMediaElement(mpegVideo);
      this.mpegtsPlayer.load();
      this.mpegtsPlayer.play();
    },
  },
  mounted() {
    this.createMpeg();
  },
};
</script>

<style>
</style>