<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <FlvVideo v-for="item in 3" :key="item" :time="item * 1" />
    <MpegVideo />
  </div>
</template>

<script>
import FlvVideo from './components/FlvVideo.vue'
import MpegVideo from './components/MpegVideo.vue'

export default {
  name: 'App',
  components: {
    FlvVideo,MpegVideo
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
