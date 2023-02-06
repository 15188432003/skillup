const countObj = {
    // 存储settimeout
    timer: null,
    // 剩余倒计时时间
    examTime: -1,
    // 倒计时是否暂停的标识
    stopTimeStatus: false,
    setTimer(data) {
        this.timer = data;
    },
    setExamTime(data) {
        this.examTime = data;
    },
    setStopTimeStatus(data) {
        this.stopTimeStatus = data;
    },
    getExamTime(){
        return this.examTime
    },
    getStopTimeStatus(){
        return this.stopTimeStatus
    }
};


function countDown() {
    if (countObj.timer) {
        return;
    }
    if (countObj.examTime <= 0) {
        postMessage(['timeEnd', 0]);
        return;
    }
    // const start = new Date().getTime();
    countObj.timer = setTimeout(() => {
        countObj.timer = null;
        if (!countObj.getStopTimeStatus()) {
            countObj.setExamTime(countObj.getExamTime() - 1000);
        }
        console.log(countObj.examTime);
        // const end = new Date().getTime();
        // console.log('误差', end - start);
        postMessage(['countDown', countObj.getExamTime()]);
        countDown();
    }, 1000);
}


onmessage = function (e) {
    const {
        data: { type, data },
    } = e;
    switch (type) {
        case 'start':
            console.log(data);
            countObj.setExamTime(data);
            countDown();
            break;
        case 'align':
            countObj.setExamTime(data);
            postMessage(['alignTime', data]);
            break;
        case 'pause':
            countObj.setStopTimeStatus(data);
            break;
        case 'init':
            countObj.setTimer(null);
            countObj.setExamTime(-1);
            countObj.setStopTimeStatus(false);
            break;
        case 'clear':
            clearTimeout(countObj.timer);
            countObj.setTimer(null);
            break;
        default:
            break;
    }
};
