<template>
  <div>
    <ul>
      <li v-for="(item, index) in timeList" :key="index">
        {{ timeType(item.time) }}
      </li>
    </ul>
  </div>
</template>

<script>
import * as countTime from "@/utils/countTime";

export default {
  name: "Worker",
  data() {
    return {
      timeList: [
        {
          time: 7855,
        },
        {
          time: 90855,
        },
        {
          time: 40855,
        },
        {
          time: 96855,
        },
        {
          time: 190855,
        },
        {
          time: 30855,
        },
      ],
    };
  },
  methods: {
    initTime(data, index) {
      const worker = countTime.getWorker();
      worker.postMessage({
        type: "start",
        data,
      });
      worker.onmessage = (event) => {
        // 做你想要的操作
        const { data } = event;
        const [type, time] = data;
        if (type === "countDown") {
          this.timeList[index].time = time;
        } else if (type === "timeEnd") {
          console.log("timeEnd");
          worker.terminate();
        }
      };
    },
    timeType(time) {
      if (time < 0) {
        return "00:00:00";
      }
      time = Math.floor(time / 1000);
      const h =
        Math.floor((time / 3600) % 24) < 10
          ? "0" + Math.floor((time / 3600) % 24)
          : Math.floor((time / 3600) % 24);
      const m =
        Math.floor((time / 60) % 60) < 10
          ? "0" + Math.floor((time / 60) % 60)
          : Math.floor((time / 60) % 60);

      const s = time % 60 < 10 ? "0" + (time % 60) : time % 60;
      const mm = h + ":" + m + ":" + s;
      return mm;
    },
  },
  created() {
    this.timeList.forEach((item, index) => {
      this.initTime(item.time, index);
    });
  },
};
</script>

<style>
</style>
