import Worker from './count.worker.js';

// const worker = new Worker();

// 初始化倒计时
export function initCount() {
    worker.postMessage({
      type: 'init',
      data: {},
    });
  }
  
  // 暂停时间
  export function pauseTime(data) {
    worker.postMessage({
      type: 'pause',
      data,
    });
  }
  
  // 清除计时器
  export function clearTimer() {
    worker.postMessage({
      type: 'clear',
      data: {},
    });
  }
  
  
  // 移除worker
  export function removeWorker() {
    worker.terminate();
  }
  
  // 根据接口返回的时间校准考试剩余时间
  export function alignTime(data) {
    worker.postMessage({
      type: 'align',
      data,
    });
  }
  
  // 开启倒计时
  export function startCount (data) {
    worker.postMessage({
      type: 'start',
      data,
    });
  }
  
  // 获取worker
  export function getWorker () {
    return new Worker()
  }
