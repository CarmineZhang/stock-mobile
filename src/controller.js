import timeline from './timeline'
import kline from './kline'
import http from './httpTest'
import $ from 'jquery'
var startTime = null,
    elem = null,
    width = 0,
    height = 0,
    period = 0,
    nextId = 0,
    timeFlag = false,
    klineFlag = false;
export default {
    init: function(el, w, h) {
        elem = el;
        width = w;
        height = h;
        this.timeInit();
        return this;
    },
    timeInit: function() {
        if (!timeFlag) {
            timeFlag = true;
            timeline.init(elem, width, height, true);
        }

    },
    klineInit: function() {
        if (!klineFlag) {
            klineFlag = true;
            kline.init(elem, width, height, true);
        }
    },
    setPeriod: function(value) {
        if (value !== period) {
            if (value != 0) {
                if (klineFlag) {
                    kline.dispose();
                }
                kline.setPeriod(period);
            } else {
                if (timeFlag) {
                    timeline.dispose();
                }
            }
            period = value;
        }
    },
    touchStart: function(x) {
        if (period === 0) {
            timeline.showCrossHair(x);
        } else {
            kline.showCrossHair(x);
        }
    },
    touchMove: function(x) {
        if (period === 0) {
            timeline.showCrossHair(x);
        } else {
            kline.showCrossHair(x);
        }
    },
    touchEnd: function() {
        if (period === 0) {
            timeline.hiddenCrossHair();
        } else {
            kline.hiddenCrossHair();
        }
    },
    draw: function() {
        if (period === 0) {
            this.timeInit();
            this.getTimeData();
        } else {
            this.klineInit();
            this.getKlineData();
        }
    },
    getTime: function() {
        var dfd = $.Deferred();
        if (!startTime) {
            http.getTradeTime().done(function(data) {
                if (data != null && data.RepCode == 0) {
                    startTime = data.StartTime;
                    timeline.setStartAndEndTime(data.StartTime, data.EndTime);
                }
            }).done(function() {
                dfd.resolve();
            })
        } else {
            dfd.resolve();
        }
        return dfd.promise();
    },
    setPanKouData: function(list, highPrice, lowPrice) {
        if (period === 0) {
            timeline.drawDynamicData(list, highPrice, lowPrice);
        } else {
            kline.setDataFromPanKou(list);
        }
    },
    getPanKou: function() {
        return http.getPanKou(nextId, this.handlerPanKou.bind(this));
    },
    handlerPanKou: function(data) {
        if (data != null && data.RepCode === 0) {
            nextId = data.PanNum;
            this.setPanKouData(data.TimeDataList, data.HighPrice, data.LowPrice);
        }
    },
    getTimeData: function() {
        return http.getTimeData(this.handlerTimeData);
    },
    handlerTimeData: function(data) {
        if (data != null && data.RepCode == 0) {
            var panKouOb = {
                h: data.HighPrice,
                l: data.LowPrice,
                c: data.ClosePrice
            };
            timeline.setTimeData(panKouOb, data.TradeDataList);
        }
    },
    getKlineData: function() {
        return http.getKLine(period, this.handlerKline);
    },
    handlerKline: function(data) {
        if (data != null && data.RepCode === 0) {
            kline.setKlineData(data.DataList);
        }
    }

}
