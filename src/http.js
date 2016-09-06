import base64 from './base64'
import $ from 'jquery'
import util from './commonUtil'
export default {
    /*
     * 发送行情请求(登陆后)
     */
    _sendQuotationRequest: function(name, data, handler) {
        var defer = $.Deferred();
        var req = {};
        var url = util.getQuotationUrl();
        req.MMTS = {};
        req.MMTS.REQH = {
            PID: name
        }
        req.MMTS.REQB = {};
        angular.extend(req.MMTS.REQB, {
            MID: util.getMarketId(),
            SMID: util.getMarketId()
        }, data);
        if (util.getQuotationSession() === null) {
            this._quotationLogon().then(function() {
                req.MMTS.REQH.SID = util.getQuotationSession();
                $.post(url, req).done(handler).then(function(data) {
                    defer.resolve(data.data)
                });
            })
        } else {
            req.MMTS.REQH.SID = util.getQuotationSession();
            $.post(url, req).done(handler).then(function(data) {
                defer.resolve(data.data)
            });
        }
        return defer.promise();
    },
    getCommodity: function(handler) {
        return this._sendQuotationRequest("getCommodities", null, handler);
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
    getShortTimeLine: function(data, handler) {
        return this._sendQuotationRequest("getShortTimeLine", data, handler);
    },
    /*
     *获取某个商品某个序号以后的分笔。
     */
    getEveryPriceAfterId: function(data, handler) {
        return this._sendQuotationRequest("getEveryPriceAfterId", data, handler);
    },
    /*
     * K线查询
     */
    getKLine: function(data, handler) {
        return this._sendQuotationRequest("getShortKLine", data, handler);
    },
    /*
     *盘口多商品查询
     */
    getPanKouByMutiCommodity: function(data, handler) {
        return this._sendQuotationRequest("getPriceForMCommodities", data, handler);
    },
    /*
     *盘口按商品查询
     */
    getPriceForCommodity: function(data, handler) {
        return this._sendQuotationRequest("getPriceForCommodity", data, handler);
    },
    /*
     *获取某个商品某个序号以后的分笔
     */
    getEveryPriceAfterId: function(data, handler) {
        return this._sendQuotationRequest("getEveryPriceAfterId", data, handler);
    },
    /*
     *商品板块查询
     */
    getPlates: function(handler) {
        return this._sendQuotationRequest("getPlates", null, handler);
    },
    /*
     *交易节查询
     */
    getTradeTimes: function(handler) {
        return this._sendQuotationRequest("getTradeTimes", null, handler);
    },
    _quotationLogon: function() {
        var req = {};
        req.MMTS = {};
        req.MMTS.REQH = {
            PID: "login"
        };
        var reqb = req.MMTS.REQB = {
            EID: 2
        };
        var math = window.Math,
            fromCharCode = String.fromCharCode;
        var key = [];
        var rand = [];
        var renc = [];
        for (var i = 0; i < 10; i++) {
            key.push(math.ceil(math.random() * 126));
            rand.push(math.ceil(math.random() * 126));
            switch (i % 5) {
                case 0:
                    renc.push(math.floor((key[i] + rand[i]) % 128));
                    break;
                case 1:
                    renc.push(math.floor((key[i] - rand[i]) % 128));
                    break;
                case 2:
                    renc.push(math.floor((key[i] * rand[i]) % 128));
                    break;
                case 3:
                    renc.push(math.floor((key[i] / rand[i]) % 128));
                    break;
                case 4:
                    renc.push(math.floor((key[i] % rand[i]) % 128));
                    break;
            }
        }
        reqb.EKEY = base64.encode(fromCharCode.apply(null, key));
        reqb.RAND = base64.encode(fromCharCode.apply(null, rand));
        reqb.RENC = base64.encode(fromCharCode.apply(null, renc));
        return $.post(util.getQuotationUrl(), req).done(function(data) {
            var header = data.MMTS.REPH;
            if (header.RET == 0) {
                util.setQuotationSession(data.MMTS.REPB.SID);
            } else {
                console.log(data);
            }
        })
    }
}
