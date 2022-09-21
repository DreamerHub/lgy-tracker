'use strict';

//版本
var TrackerConfig;
(function (TrackerConfig) {
    TrackerConfig["version"] = "1.0.0";
})(TrackerConfig || (TrackerConfig = {}));

// pv: pageView 网页浏览量
const createHistoryEvent = (type) => {
    const origin = history[type];
    return function () {
        const res = origin.apply(this, arguments);
        const e = new Event(type);
        window.dispatchEvent(e);
        return res;
    };
};

class Tracker {
    constructor(options) {
        this.data = Object.assign(this.initDef(), options);
    }
    initDef() {
        window.history['pushState'] = createHistoryEvent('pushState');
        window.history['replaceState'] = createHistoryEvent('replaceState');
        return {
            sdkVersion: TrackerConfig.version,
            historyTracker: false,
            hashTracker: false,
            domTracker: false,
            jsError: false,
        };
    }
    captureEvent(mouseEventList, targetKey, data) {
        mouseEventList.forEach(event => {
            window.addEventListener(event, () => {
                console.log('开始监听');
            });
        });
    }
    installTracker() {
        if (this.data.hashTracker) {
            this.captureEvent(['pushState', 'replaceState', 'popstate'], 'history-pv');
        }
    }
}

module.exports = Tracker;
