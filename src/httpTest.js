import util from './commonUtil'

export default {
    getTimeData: function(handler) {
        return util.sendRequest("http://172.31.100.64/stock/time/602/4?marketType=0").done(handler);
    },
    getPanKou: function(nextId, handler) {
        return util.sendRequest("http://172.31.100.64/stock/pankou/602/4/" + nextId + "?marketType=0").done(handler);
    },
    getTradeTime: function() {
        return util.sendRequest("http://172.31.100.64/stock/tradetime/602?marketType=0");
    },
    getKLine: function(period,handler) {
        return util.sendRequest("http://172.31.100.64/stock/kline/602/4/"+period+"/60/-1?marketType=0")
            .done(handler);
    }
}
