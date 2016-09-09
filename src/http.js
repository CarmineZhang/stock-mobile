import base64 from './base64'
import $ from 'jquery'
import util from './commonUtil'
export default {
    /*
     * 发送行情请求(登陆后)
     */
    _sendQuotationRequest: function(name, data, handler) {
        var req = {};
        req.MMTS = {};
        req.MMTS.REQH = {
            PID: name
        }
        req.MMTS.REQB = {};
        $.extend(req.MMTS.REQB, {
            MID: util.getMarketId(),
            SMID: util.getMarketId()
        }, data);
        req.MMTS.REQH.SID = util.getQuotationSession();
        return util.sendRequest(req).done(handler);
    },
    /*
     * 获取交易的时间
     */
    getTradeTime: function(handler) {
        return this._sendQuotationRequest("getTradeTime", null, handler);
    },
    /*
     * 分时查询
     */
    getTimeData: function(data, handler) {
        return this._sendQuotationRequest("getShortTimeLine", data, handler);
    },
    /*
     * K线查询
     */
    getKLine: function(data, handler) {
        return this._sendQuotationRequest("getShortKLine", data, handler);
    },
    /*
     *盘口按商品查询
     */
    getPanKou: function(data, handler) {
        return this._sendQuotationRequest("getPriceForCommodity", data, handler);
    },
}
