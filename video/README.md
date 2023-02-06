# 视频流
### 1.直播与点播
- 点播:从后端请求到MP4视频,前端把地址放在video的src中实现播放
- 直播:1.获取的是流数据2.要求实时性

### 2.视频流形式
1. RTSP转RTMP
   底层基于 TCP，在浏览器端依赖 Flash,但是从2020底年开始,谷歌已经带头不支持flash插件了
2. RTSP转HLS
   后端将视频转成HLS流，以m3u8后缀结尾。通过浏览器用video.js可以正常播放，但是致命缺点是延迟高（10~30 秒），不符合项目的实时性需求，所以有实时视频的需求不建议用HLS流播放。
3. RTSP转FLV
   flv 分为 HTTP-FLV 和 WebSocket-FLV ,两种方式都可,具体看需求
### flv.js
经过以上的分析,现阶段最适合最直播业务的为flv流,而它的缺点是前端 video 标签不能直接播放，需要经过处理才行。不过没关系,我们有flv.js!
flv.js是一个较成熟的前端处理flv格式的插件库，是B站视频的开源插件。下面为示例代码:
```js
import flvjs from 'flv.js'
if (flvjs.isSupported()) {
  var videoPlayer = document.getElementById('video')
  var flvPlayer = flvjs.createPlayer({
    type: 'flv',
    url: 'http://test.stream.com/fetch-media.flv'
  })
  flvPlayer.attachMediaElement(videoPlayer)
  flvPlayer.load()
  flvPlayer.play()
}
```
但是flv依旧存在很多问题,比如浏览器兼容性问题,flv只支持包含 Chrome, FireFox, Safari 10, IE11, Edge版本的浏览器,对于Safari更高版本的浏览器是不提供支持的,且不能再ios上播放,而且对于实时性要求更高的需求,flv延迟还是显得高了些,所以flv的作者xqq在后续推出了mpegts.js,是在flv的基础上进行了优化,最佳情况下能达到 1 秒的极低延迟,且支持 Chrome、FireFox、Safari、Edge（旧版或 Chromium）或任何基于 Chromium 的浏览器,api也可以沿用flv.js的
```js
<script src="mpegts.js"></script>
<video id="videoElement"></video>
<script>
    if (mpegts.getFeatureList().mseLivePlayback) {
        var videoElement = document.getElementById('videoElement');
        var player = mpegts.createPlayer({
            type: 'mse',  // could also be mpegts, m2ts, flv
            isLive: true,
            url: 'http://example.com/live/livestream.ts'
        });
        player.attachMediaElement(videoElement);
        player.load();
        player.play();
    }
</script>
```
### 异常处理

```js
// 监听错误事件
flvPlayer.on(flvjs.Events.ERROR, (err, errdet) => {
  // 参数 err 是一级异常，errdet 是二级异常
  if (err == flvjs.ErrorTypes.MEDIA_ERROR) {
    console.log('媒体错误')
    if(errdet == flvjs.ErrorDetails.MEDIA_FORMAT_UNSUPPORTED) {
      console.log('媒体格式不支持')
    }
  }
  if (err == flvjs.ErrorTypes.NETWORK_ERROR) {
    console.log('网络错误')
    if(errdet == flvjs.ErrorDetails.NETWORK_STATUS_CODE_INVALID) {
      console.log('http状态码异常')
    }
  }
  if(err == flvjs.ErrorTypes.OTHER_ERROR) {
    console.log('其他异常：', errdet)
  }
})
```





   
