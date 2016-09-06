webpackJsonp([1,0],[
/* 0 */
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _jquery = __webpack_require__(/*! jquery */ 4);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _controller = __webpack_require__(/*! ./controller */ 5);
	
	var _controller2 = _interopRequireDefault(_controller);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var intervalId = null;
	(0, _jquery2.default)(function () {
	    var h = document.documentElement.clientHeight / 2;
	    var w = document.documentElement.clientWidth;
	    var svgElement = document.getElementById("chart");
	    _controller2.default.init(svgElement, w, h, true);
	    addEvents();
	    drawHq(true);
	});
	
	function addEvents() {
	    (0, _jquery2.default)("input[type='button'][key]").click(function () {
	        _controller2.default.setPeriod(+(0, _jquery2.default)(this).attr("key"));
	        drawHq(false);
	    });
	    var chart = document.getElementById("chart");
	    chart.addEventListener("touchstart", function (e) {
	        _controller2.default.touchStart(e.touches[0].clientX);
	    });
	    chart.addEventListener("touchmove", function (e) {
	        e.preventDefault();
	        _controller2.default.touchMove(e.changedTouches[0].clientX);
	    });
	    chart.addEventListener("touchend", function (e) {
	        _controller2.default.touchEnd();
	    });
	}
	
	function drawHq(flag) {
	    if (flag) {
	        intervalId = setInterval(function () {
	            _controller2.default.getPanKou();
	        }, 1000);
	        _controller2.default.getPanKou();
	    }
	    _controller2.default.getTime().done(drawHandler);
	}
	
	function drawHandler() {
	    _controller2.default.draw();
	}

/***/ },
/* 1 */
/*!***************************!*\
  !*** ./src/commonUtil.js ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _constantsUtil = __webpack_require__(/*! ./constantsUtil */ 2);
	
	var _constantsUtil2 = _interopRequireDefault(_constantsUtil);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	String.prototype.format = function () {
	    var regex = /\{(\d+)\}/g;
	    var args = arguments;
	    return this.replace(regex, function (match, position) {
	        return args[position | 0];
	    });
	};
	/*
	 *将日期字符串转为毫秒值
	 */
	String.prototype.formatTime = function () {
	    var yyyy = +this.substr(0, 4);
	    var MM = +this.substr(4, 2) - 1;
	    var dd = +this.substr(6, 2);
	    var hh = +this.substr(8, 2);
	    var mm = +this.substr(10, 2);
	    return new Date(yyyy, MM, dd, hh, mm, 0).getTime();
	};
	Date.prototype.format = function (fmt) {
	    var o = {
	        "M+": this.getMonth() + 1, // 月份
	        "d+": this.getDate(), // 日
	        "H+": this.getHours(), // 小时
	        "m+": this.getMinutes(), // 分
	        "s+": this.getSeconds(), // 秒
	        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
	        "S": this.getMilliseconds() // 毫秒
	    };
	    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o) {
	        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
	    }return fmt;
	};
	
	exports.default = {
	    dayArr: ["日", "一", "二", "三", "四", "五", "六"],
	    sendRequest: function sendRequest(url) {
	        return $.ajax({
	            url: url,
	            type: "GET",
	            timeout: 1000 * 90,
	            dataType: "json"
	        }).fail(function (jqXHR, textStatus, errorThrown) {
	            console.log(textStatus);
	        });
	    },
	    setQuotationSession: function setQuotationSession(value) {
	        window.sessionStorage.setItem("quotationSession", value);
	    },
	    getQuotationSession: function getQuotationSession() {
	        return window.sessionStorage.getItem("quotationSession");
	    },
	    getQuotationUrl: function getQuotationUrl() {
	        return "";
	    },
	    getMarketId: function getMarketId() {
	        return "";
	    },
	    getTimeString: function getTimeString(t) {
	        var d = new Date(t);
	        return d.toTimeString().substr(0, 5);
	    },
	    getDateTime: function getDateTime(d, t) {
	        var time = "" + t;
	        var date = "" + d;
	        var datetime = date + (time.length == 3 ? "0" + time : time);
	        var yyyy = +datetime.substr(0, 4);
	        var MM = +datetime.substr(4, 2) - 1;
	        var dd = +datetime.substr(6, 2);
	        var hh = +datetime.substr(8, 2);
	        var mm = +datetime.substr(10, 2);
	        return new Date(yyyy, MM, dd, hh, mm, 0).getTime();
	    },
	    getDateString: function getDateString(d, p) {
	        var datestr = d.format("yyyy/MM/dd"),
	            day;
	        if (p >= 6) {
	            day = this.dayArr[d.getDay()];
	            return datestr + "(" + day + ")";
	        } else {
	            var timestr = d.toTimeString();
	            day = this.dayArr[d.getDay()];
	            return datestr.substr(5) + " " + timestr.substr(0, 5);
	        }
	    },
	    getTimeDiff: function getTimeDiff(t1, t2) {
	        return (t2 - t1) / 1000;
	    },
	    getPriceColor: function getPriceColor(p) {
	        if (p > 0) {
	            return _constantsUtil2.default.PRICE_UP_COLOR;
	        } else if (p < 0) {
	            return _constantsUtil2.default.PRICE_DOWN_COLOR;
	        } else {
	            return _constantsUtil2.default.CLOSEPRICE_COLOR;
	        }
	    },
	    getCandleColor: function getCandleColor(p) {
	        var color = null;
	        if (p < 0) {
	            color = "rgb(84,255,255)";
	        } else if (p > 0) {
	            color = "rgb(255,50,50)";
	        } else {
	            color = "rgb(84,255,255)";
	        }
	        return color;
	    },
	    timeEqual: function timeEqual(t1, t2) {
	        var dt1 = new Date(t1);
	        var dt2 = new Date(t2);
	        return dt1.getFullYear() === dt2.getFullYear() && dt1.getMonth() == dt2.getMonth() && dt1.getDate() == dt2.getDate() && dt1.getHours() == dt2.getHours() && dt1.getMinutes() == dt2.getMinutes();
	    },
	    dayEqual: function dayEqual(t1, t2) {
	        return t1.getFullYear() === t2.getFullYear() && t1.getMonth() == t2.getMonth() && t1.getDate() == t2.getDate();
	    },
	    createLinearGradient: function createLinearGradient(el) {
	        var defs = document.createElementNS(_constantsUtil2.default.SVG_NS, "defs");
	        var lg = document.createElementNS(_constantsUtil2.default.SVG_NS, "linearGradient");
	        lg.setAttribute("id", "lg");
	        lg.setAttribute("x1", "0");
	        lg.setAttribute("x2", "0");
	        lg.setAttribute("y1", "0");
	        lg.setAttribute("y2", "1");
	        var stop = document.createElementNS(_constantsUtil2.default.SVG_NS, "stop");
	        stop.setAttribute("stop-color", "#152746");
	        stop.setAttribute("offset", "0");
	        lg.appendChild(stop);
	        stop = document.createElementNS(_constantsUtil2.default.SVG_NS, "stop");
	        stop.setAttribute("stop-color", "#121213");
	        stop.setAttribute("offset", "1");
	        lg.appendChild(stop);
	        defs.appendChild(lg);
	        el.appendChild(defs);
	        return defs;
	    },
	    createPath: function createPath(attr, el) {
	        var path = document.createElementNS(_constantsUtil2.default.SVG_NS, "path");
	        if (attr.d) {
	            path.setAttribute("d", attr.d);
	        }
	        if (attr["stroke-width"]) {
	            path.setAttribute("stroke-width", attr["stroke-width"]);
	        } else {
	            path.setAttribute("stroke-width", 1);
	        }
	        if (attr.strokeColor) {
	            path.setAttribute("stroke", attr.strokeColor);
	        } else {
	            path.setAttribute("stroke", "none");
	        }
	        if (attr.fillColor) {
	            path.setAttribute("fill", attr.fillColor);
	        } else {
	            path.setAttribute("fill", "none");
	        }
	        if (attr.dash) {
	            path.setAttribute("stroke-dasharray", 1.5);
	        }
	        if (attr.opacity) {
	            path.setAttribute("opacity", attr.opacity);
	        }
	        if (el) {
	            el.appendChild(path);
	        }
	        return path;
	    },
	    createTextG: function createTextG(parent) {
	        var g = document.createElementNS(_constantsUtil2.default.SVG_NS, "g");
	        parent.appendChild(g);
	        return g;
	    },
	    createRect: function createRect(attr, el) {
	        var rect = document.createElementNS(_constantsUtil2.default.SVG_NS, "rect");
	        rect.setAttribute("x", attr.x);
	        rect.setAttribute("y", attr.y);
	        rect.setAttribute("width", attr.width);
	        rect.setAttribute("height", attr.height);
	        rect.setAttribute("fill", attr.fillColor);
	        rect.setAttribute("stroke", attr.strokeColor);
	        rect.setAttribute("stroke-width", 1);
	        if (el) {
	            el.appendChild(rect);
	        }
	        return rect;
	    },
	    createText: function createText(attr, el) {
	        var text = document.createElementNS(_constantsUtil2.default.SVG_NS, "text");
	        text.setAttribute("x", attr.x);
	        text.setAttribute("y", attr.y);
	        text.setAttribute("text-anchor", attr.hAlign);
	        text.setAttribute("fill", attr.textColor);
	        if (attr["font-size"]) {
	            text.setAttribute("font-size", attr["font-size"]);
	            text.setAttribute("font-family", _constantsUtil2.default.FONT_FAMILY);
	        } else {
	            text.setAttribute("style", "font-size:" + _constantsUtil2.default.FONT_SIZE + ";font-family:" + _constantsUtil2.default.FONT_FAMILY);
	        }
	        var tSpan = document.createElementNS(_constantsUtil2.default.SVG_NS, "tspan");
	        tSpan.textContent = attr.v;
	        text.appendChild(tSpan);
	        if (el) {
	            el.appendChild(text);
	            var box = text.getBBox();
	            if (attr.vAlign == "middle") {
	                tSpan.setAttribute("dy", attr.y - (box.y + box.height / 2));
	            } else if (attr.vAlign == "top") {
	                tSpan.setAttribute("dy", attr.y - box.y);
	            } else if (attr.vAlign == "bottom") {
	                tSpan.setAttribute("dy", attr.y - (box.y + box.height));
	            }
	        }
	        return text;
	    },
	    createTextNoSpan: function createTextNoSpan(attr, el) {
	        var text = document.createElementNS(_constantsUtil2.default.SVG_NS, "text");
	        text.setAttribute("x", attr.x);
	        text.setAttribute("y", attr.y);
	        text.setAttribute("dy", 5);
	        text.setAttribute("text-anchor", attr["text-anchor"]);
	        text.setAttribute("fill", attr.fill);
	        if (attr["font-size"]) {
	            text.setAttribute("font-size", attr["font-size"]);
	            text.setAttribute("font-family", _constantsUtil2.default.FONT_FAMILY);
	        } else {
	            text.setAttribute("style", "font-size:" + _constantsUtil2.default.FONT_SIZE + ";font-family:" + _constantsUtil2.default.FONT_FAMILY);
	        }
	        if (el) {
	            el.appendChild(text);
	        }
	        return text;
	    },
	    createTSpan: function createTSpan(attr, el) {
	        var tSpan = document.createElementNS(_constantsUtil2.default.SVG_NS, "tspan");
	        tSpan.textContent = attr.v;
	        attr.fill && tSpan.setAttribute("fill", attr.fill);
	        attr.dx && tSpan.setAttribute("dx", attr.dx);
	        if (el) {
	            el.appendChild(tSpan);
	        }
	        return tSpan;
	    },
	    setTSpanValue: function setTSpanValue(el, value) {
	        el.textContent = value;
	    },
	    setTextAttr: function setTextAttr(el, attr) {
	        for (var a in attr) {
	            if (el.hasAttribute(a)) {
	                el.setAttribute(a, attr[a]);
	            }
	        }
	        var tspan = el.getElementsByTagNameNS(_constantsUtil2.default.SVG_NS, "tspan");
	        if (tspan.length) {
	            tspan[0].textContent = attr.v;
	        }
	    },
	    setCommonAttr: function setCommonAttr(el, attrs) {
	        for (var a in attrs) {
	            el.setAttribute(a, attrs[a]);
	        }
	    },
	    createCommonG: function createCommonG(attrs, parent) {
	        var g = document.createElementNS(_constantsUtil2.default.SVG_NS, "g");
	        if (attrs) {
	            this.setCommonAttr(g, attrs);
	        }
	        if (parent) {
	            parent.appendChild(g);
	        }
	        return g;
	    },
	    createCommonPath: function createCommonPath(attrs, parent) {
	        var path = document.createElementNS(_constantsUtil2.default.SVG_NS, "path");
	        if (attrs) {
	            this.setCommonAttr(path, attrs);
	        }
	        if (parent) {
	            parent.appendChild(path);
	        }
	        return path;
	    },
	    createCommonText: function createCommonText(attrs, parent) {
	        var text = document.createElementNS(_constantsUtil2.default.SVG_NS, "text");
	        if (attrs) {
	            this.setCommonAttr(text, attrs);
	        }
	        if (parent) {
	            parent.appendChild(text);
	        }
	        return text;
	    },
	    createCommonSpan: function createCommonSpan(attrs, parent) {
	        var tSpan = document.createElementNS(_constantsUtil2.default.SVG_NS, "tspan");
	        if (attrs) {
	            this.setCommonAttr(tSpan, attrs);
	        }
	        if (parent) {
	            parent.appendChild(tSpan);
	        }
	        return tSpan;
	    }
	};

/***/ },
/* 2 */
/*!******************************!*\
  !*** ./src/constantsUtil.js ***!
  \******************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    SVG_NS: "http://www.w3.org/2000/svg",
	    LINE_COLOR: "#2E2E2E",
	    MIDDLE_COLOR: "#272b2b",
	    TIME_COM_COLOR: "#ffff80", //分时中的商品颜色
	    TIME_AVGANDVOLUME_COLOR: "#f1c81d", //分时中的成交量和均线的文本颜色
	    TIME_LINE_COLOR: "#929bab", //分时线
	    TIME_AVG_COLOR: "#e1b91b", //分时均线
	    TIME_VOLUME_UP: "#d70a1e", //成交量的颜色
	    TIME_VOLUME_DOWN: "#3ac312",
	    CROSS_LINE_COLOR: "#fff", //十字线的颜色
	    CROSS_TXT_COLOR: "#fff", //十字线的文本颜色
	    CROSS_TXT_FILLCOLOR: "#172b55", //十字线的文本的填充色
	    COMMODITY_COLOR: "rgb(0,255,255)", //商品名称的颜色
	    KLINE_CANDLE_DOWN: "#54ffff", //k线下跌的蜡烛图颜色
	    KLINE_CANDLE_UP: "#ff5454", //k线上涨的蜡烛图颜色
	    KLINE_CANDLE_AVG5: "#e6e6e6",
	    KLINE_CANDLE_AVG10: "#f0f865",
	    KLINE_CANDLE_AVG20: "#85486f",
	    KLINE_CANDLE_AVG60: "#70cc9d",
	    KLINE_INDEX_COLOR: "#fff",
	    KLINE_INDEX_YELLOW: "#f0f888",
	    KLINE_INDEX_BLUE: "#70cc9d",
	    KLINE_INDEX_PURPLE: "#99486f",
	    TXT_COLOR: "#999999", //文本颜色
	    TXT_BLUE: "#00ffff",
	    TXT_YELLOW: "#febd5b",
	    PRICE_UP_COLOR: "#e83633", //价格上涨颜色
	    PRICE_DOWN_COLOR: "#6fb24f", //下跌和最低价格的颜色
	    CLOSEPRICE_COLOR: "#dedede", //昨收价格颜色
	    FONT_FAMILY: "SimSun",
	    FONT_SIZE: "11px"
	};

/***/ },
/* 3 */
/*!********************!*\
  !*** external "_" ***!
  \********************/
/***/ function(module, exports) {

	module.exports = _;

/***/ },
/* 4 */
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 5 */
/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _timeline = __webpack_require__(/*! ./timeline */ 9);
	
	var _timeline2 = _interopRequireDefault(_timeline);
	
	var _kline = __webpack_require__(/*! ./kline */ 7);
	
	var _kline2 = _interopRequireDefault(_kline);
	
	var _httpTest = __webpack_require__(/*! ./httpTest */ 6);
	
	var _httpTest2 = _interopRequireDefault(_httpTest);
	
	var _jquery = __webpack_require__(/*! jquery */ 4);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var startTime = null,
	    elem = null,
	    width = 0,
	    height = 0,
	    period = 0,
	    nextId = 0,
	    timeFlag = false,
	    klineFlag = false;
	exports.default = {
	    init: function init(el, w, h) {
	        elem = el;
	        width = w;
	        height = h;
	        this.timeInit();
	        return this;
	    },
	    timeInit: function timeInit() {
	        if (!timeFlag) {
	            timeFlag = true;
	            _timeline2.default.init(elem, width, height, true);
	        }
	    },
	    klineInit: function klineInit() {
	        if (!klineFlag) {
	            klineFlag = true;
	            _kline2.default.init(elem, width, height, true);
	        }
	    },
	    setPeriod: function setPeriod(value) {
	        if (value !== period) {
	            if (value != 0) {
	                if (klineFlag) {
	                    _kline2.default.dispose();
	                }
	                _kline2.default.setPeriod(period);
	            } else {
	                if (timeFlag) {
	                    _timeline2.default.dispose();
	                }
	            }
	            period = value;
	        }
	    },
	    touchStart: function touchStart(x) {
	        if (period === 0) {
	            _timeline2.default.showCrossHair(x);
	        } else {
	            _kline2.default.showCrossHair(x);
	        }
	    },
	    touchMove: function touchMove(x) {
	        if (period === 0) {
	            _timeline2.default.showCrossHair(x);
	        } else {
	            _kline2.default.showCrossHair(x);
	        }
	    },
	    touchEnd: function touchEnd() {
	        if (period === 0) {
	            _timeline2.default.hiddenCrossHair();
	        } else {
	            _kline2.default.hiddenCrossHair();
	        }
	    },
	    draw: function draw() {
	        if (period === 0) {
	            this.timeInit();
	            this.getTimeData();
	        } else {
	            this.klineInit();
	            this.getKlineData();
	        }
	    },
	    getTime: function getTime() {
	        var dfd = _jquery2.default.Deferred();
	        if (!startTime) {
	            _httpTest2.default.getTradeTime().done(function (data) {
	                if (data != null && data.RepCode == 0) {
	                    startTime = data.StartTime;
	                    _timeline2.default.setStartAndEndTime(data.StartTime, data.EndTime);
	                }
	            }).done(function () {
	                dfd.resolve();
	            });
	        } else {
	            dfd.resolve();
	        }
	        return dfd.promise();
	    },
	    setPanKouData: function setPanKouData(list, highPrice, lowPrice) {
	        if (period === 0) {
	            _timeline2.default.drawDynamicData(list, highPrice, lowPrice);
	        } else {
	            _kline2.default.setDataFromPanKou(list);
	        }
	    },
	    getPanKou: function getPanKou() {
	        return _httpTest2.default.getPanKou(nextId, this.handlerPanKou.bind(this));
	    },
	    handlerPanKou: function handlerPanKou(data) {
	        if (data != null && data.RepCode === 0) {
	            nextId = data.PanNum;
	            this.setPanKouData(data.TimeDataList, data.HighPrice, data.LowPrice);
	        }
	    },
	    getTimeData: function getTimeData() {
	        return _httpTest2.default.getTimeData(this.handlerTimeData);
	    },
	    handlerTimeData: function handlerTimeData(data) {
	        if (data != null && data.RepCode == 0) {
	            var panKouOb = {
	                h: data.HighPrice,
	                l: data.LowPrice,
	                c: data.ClosePrice
	            };
	            _timeline2.default.setTimeData(panKouOb, data.TradeDataList);
	        }
	    },
	    getKlineData: function getKlineData() {
	        return _httpTest2.default.getKLine(period, this.handlerKline);
	    },
	    handlerKline: function handlerKline(data) {
	        if (data != null && data.RepCode === 0) {
	            _kline2.default.setKlineData(data.DataList);
	        }
	    }
	
	};

/***/ },
/* 6 */
/*!*************************!*\
  !*** ./src/httpTest.js ***!
  \*************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _commonUtil = __webpack_require__(/*! ./commonUtil */ 1);
	
	var _commonUtil2 = _interopRequireDefault(_commonUtil);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    getTimeData: function getTimeData(handler) {
	        return _commonUtil2.default.sendRequest("http://172.31.100.64/stock/time/602/4?marketType=0").done(handler);
	    },
	    getPanKou: function getPanKou(nextId, handler) {
	        return _commonUtil2.default.sendRequest("http://172.31.100.64/stock/pankou/602/4/" + nextId + "?marketType=0").done(handler);
	    },
	    getTradeTime: function getTradeTime() {
	        return _commonUtil2.default.sendRequest("http://172.31.100.64/stock/tradetime/602?marketType=0");
	    },
	    getKLine: function getKLine(period, handler) {
	        return _commonUtil2.default.sendRequest("http://172.31.100.64/stock/kline/602/4/" + period + "/60/-1?marketType=0").done(handler);
	    }
	};

/***/ },
/* 7 */
/*!**********************!*\
  !*** ./src/kline.js ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _commonUtil = __webpack_require__(/*! ./commonUtil */ 1);
	
	var _commonUtil2 = _interopRequireDefault(_commonUtil);
	
	var _constantsUtil = __webpack_require__(/*! ./constantsUtil */ 2);
	
	var _constantsUtil2 = _interopRequireDefault(_constantsUtil);
	
	var _underscore = __webpack_require__(/*! underscore */ 3);
	
	var _underscore2 = _interopRequireDefault(_underscore);
	
	var _klineCrossHair = __webpack_require__(/*! ./klineCrossHair */ 10);
	
	var _klineCrossHair2 = _interopRequireDefault(_klineCrossHair);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function DrawKLine(element, overlayElement, detail) {
	    this.period = 6;
	    this.svgMargin = {
	        left: 1,
	        right: 50,
	        top: 1,
	        bottom: 20
	    };
	    this.minutes = [0, 60000, 5 * 60000, 15 * 60000, 30 * 60000, 60 * 60000];
	    this.kLineData = [];
	    this.newData = [];
	    this.minCandleCount = 11;
	    this.maxCandleCount = 300;
	}
	DrawKLine.prototype = {
	    /**
	     * 获取当前柱子的前一个柱子
	     * @param index
	     * @private
	     */
	    _getPreCandle: function _getPreCandle(index) {
	        index--;
	        if (index < 0) {
	            return null;
	        }
	        return this.newData[index];
	    },
	    /**
	     * 根据鼠标位置获取K线数据
	     * @param x
	     * @returns {*}
	     * @private
	     */
	    _getDataByMousePosition: function _getDataByMousePosition(x) {
	        var list = this.newData,
	            w = this.candleWidth;
	        if (list.length) {
	            var ob = list.filter(function (item, index, array) {
	                return x >= item.sx && x <= item.ex;
	            });
	            if (ob.length > 0) {
	                return ob[0];
	            }
	        }
	        return null;
	    },
	    showCrossHair: function showCrossHair(x) {
	        var data = this._getDataByMousePosition(x);
	        if (data) {
	            var time = _commonUtil2.default.getDateString(data.time);
	            if (this.period >= 6) {
	                time = time.slice(0, -5);
	            }
	            var pre = this._getPreCandle(data.i);
	            _klineCrossHair2.default.show(data.x, data.y, time, data.openPrice, data.closePrice, data.highPrice, data.lowPrice, pre ? pre.closePrice : null);
	        }
	    },
	    hiddenCrossHair: function hiddenCrossHair() {
	        _klineCrossHair2.default.hidden();
	    },
	    /**
	     * 重置大小
	     * @param w
	     * @param h
	     */
	    resize: function resize(w, h) {
	        this.init(w, h, true);
	    },
	    /**
	     * 释放资源
	     */
	    dispose: function dispose() {
	        _klineCrossHair2.default.hidden();
	        this.newData.length = 0;
	        this.kLineData.length = 0;
	        this._initSetting();
	    },
	
	    /**
	     * 初始化基础设置
	     */
	    _initSetting: function _initSetting() {
	        this.firstCandle = null;
	        this.endIndex = 0;
	        this.candleCountInScreen = 60; //当前显示的柱子数量
	        this.svgElement.innerHTML = '';
	        if (!this.charts) {
	            this.charts = _commonUtil2.default.createCommonG({
	                "class": "charts-main"
	            }, this.svgElement); //主划线区域
	        } else {
	            this.svgElement.appendChild(this.charts);
	        }
	        _klineCrossHair2.default.createCrossHair(this.svgElement, this.svgMargin.top, this.svgMargin.left, this.svgMargin.right, this.svgMargin.bottom, this.svgWidth, this.svgHeight);
	    },
	
	    /**
	     * 设置k线周期
	     * @param value
	     */
	    setPeriod: function setPeriod(value) {
	        this.period = value;
	    },
	    getPeriod: function getPeriod() {
	        return this.period;
	    },
	    /**
	     *设置数据
	     * @param value
	     */
	    setKlineData: function setKlineData(list) {
	        if (_underscore2.default.isArray(list) && list.length > 0) {
	            if (this.kLineData.length === 0) {
	                this.kLineData = list.reverse();
	            } else {
	                var last = this.kLineData[this.kLineData.length - 1],
	                    item = null;
	                for (var i = list.length - 1; i >= 0; i--) {
	                    item = list[i];
	                    if (item.TIME < last.TIME) {
	                        this.kLineData.push(item);
	                    }
	                }
	            }
	            this.draw();
	        }
	    },
	    /**
	     * 判断时间是否在最后一个柱子的事件内
	     * @param lastTime
	     * @param newTime
	     * @returns {boolean}
	     */
	    _judgeTime: function _judgeTime(lastTime, newTime) {
	        var t = new Date(lastTime);
	        var startTime = new Date(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes(), 0).getTime();
	        var result = false;
	        switch (this.period) {
	            case 1:
	                result = newTime - startTime < 59 * 1000;
	                break;
	            case 2:
	                result = newTime - startTime < (4 * 60 + 59) * 1000;
	                break;
	            case 3:
	                result = newTime - startTime < (13 * 60 + 59) * 1000;
	                break;
	            case 4:
	                result = newTime - startTime < (29 * 60 + 59) * 1000;
	                break;
	            case 5:
	                result = newTime - startTime < (59 * 60 + 59) * 1000;
	                break;
	            case 6:
	                result = newTime < this.endTime;
	                break;
	            case 7:
	                result = true;
	                break;
	            case 8:
	                result = true;
	                break;
	            case 9:
	                result = true;
	                break;
	        }
	        return result;
	    },
	    /**
	     * 设置来自盘口的数据
	     * @param data 基础数据
	     * @param arr 分笔数据
	     */
	    setDataFromPanKou: function setDataFromPanKou(data) {
	        if (this.kLineData.length === 0 || !_underscore2.default.isArray(data) || data.length === 0) {
	            return;
	        }
	        var last = this.kLineData[0],
	            ll = 0,
	            item = null,
	            i = 0,
	            vol = 0,
	            flag = false;
	        var list = data.filter(function (item, array, index) {
	            return item.PRID > last.PRID;
	        });
	        ll = list.length;
	        if (ll > 0) {
	            for (i = 0; i < ll; i++) {
	                item = list[i];
	                if (this._judgeTime(last.time, item.time)) {
	                    last.volume += item.volume;
	                    if (item.price > last.HIGP) {
	                        last.HIGP = item.price;
	                    } else if (item.price < last.LOWP) {
	                        last.LOWP = item.price;
	                    }
	                    last.CLOP = item.price;
	                    last.PRID = item.priceId;
	                } else {
	                    var ob = {
	                        HIGP: item.price,
	                        LOWP: item.price,
	                        OPEP: item.price,
	                        CLOP: item.price,
	                        TIME: item.time,
	                        volume: item.volume,
	                        PRID: item.priceId
	                    };
	                    this.kLineData.unshift(ob);
	                    last = this.kLineData[0];
	                }
	            }
	            this.draw();
	        }
	    },
	    /**
	     * 初始化
	     * @param w
	     * @param h
	     */
	    init: function init(elem, w, h, needInitialize) {
	        this.svgElement = elem;
	        if (needInitialize && w > 0 && h > 0) {
	            this.svgElement.setAttribute("width", w);
	            this.svgElement.setAttribute("height", h);
	            this.svgElement.setAttribute("viewBox", "-0.5 -0.5 " + w + " " + h);
	            this.svgWidth = this.svgElement.width.baseVal.value;
	            this.svgHeight = this.svgElement.height.baseVal.value;
	            this.drawWidth = this.svgWidth - this.svgMargin.right;
	            this.drawHeight = this.svgHeight - this.svgMargin.top - this.svgMargin.bottom;
	            this.timeAxisY = this.svgHeight - this.svgMargin.bottom / 2; //时间
	            this._initSetting();
	        }
	    },
	    /**
	     * 绘制
	     */
	    draw: function draw() {
	        this.charts.innerHTML = '';
	        if (this.kLineData.length != 0) {
	            this.drawKline();
	        }
	    },
	    /**
	     * 绘制k线
	     */
	    drawKline: function drawKline() {
	        this._getHighAndLowPrice();
	        this._drawHorizonAndVertical();
	        this._drawKlineHorizonAndText();
	        this._drawCandle();
	        this._drawTimeAxis();
	    },
	    /**
	     *得到当前k线的最高价和最低价
	     */
	    _getHighAndLowPrice: function _getHighAndLowPrice() {
	        var end = this.endIndex,
	            start = this.endIndex + this.candleCountInScreen - 1,
	            item = null,
	            high = 0,
	            index = 0,
	            low = 0;
	        for (start; start >= end; start--) {
	            item = this.kLineData[start];
	            if (item) {
	                if (index == 0) {
	                    high = item.HIGP;
	                    low = item.LOWP;
	                } else {
	                    if (item.HIGP > high) {
	                        high = item.HIGP;
	                    }
	                    if (item.LOWP < low) {
	                        low = item.LOWP;
	                    }
	                }
	                index++;
	            }
	        }
	        this.highPrice = high;
	        this.lowPrice = low;
	        if (this.highPrice === this.lowPrice) {
	            this.lowPrice -= this.highPrice * 0.01;
	        }
	    },
	    /**
	     * 垂直线和水平线
	     */
	    _drawHorizonAndVertical: function _drawHorizonAndVertical() {
	        var d = [];
	        d.push("M{0},{1}L{0},{2}".format(this.svgMargin.left, this.svgMargin.top, this.svgHeight - this.svgMargin.bottom));
	        d.push("M{0},{1}L{2},{1}".format(this.svgMargin.left, this.svgMargin.top, this.svgWidth - this.svgMargin.right));
	        d.push("M{0},{1}L{0},{2}".format(this.svgWidth - this.svgMargin.right, this.svgMargin.top, this.svgHeight - this.svgMargin.bottom));
	        d.push("M{0},{1}L{2},{1}".format(this.svgMargin.left, this.svgHeight - this.svgMargin.bottom, this.svgWidth - this.svgMargin.right));
	        d.push("M{0},{1}L{2},{1}".format(this.svgMargin.left, this.svgMargin.top + this.drawHeight / 2, this.svgWidth - this.svgMargin.right));
	        _commonUtil2.default.createPath({
	            d: d.join(''),
	            strokeColor: _constantsUtil2.default.LINE_COLOR
	        }, this.charts);
	    },
	    /**
	     * K线区域的水平线和价格
	     */
	    _drawKlineHorizonAndText: function _drawKlineHorizonAndText() {
	        var w = this.svgWidth - this.svgMargin.right;
	        _commonUtil2.default.createText({
	            v: this.highPrice.toFixed(2),
	            x: w + 5,
	            y: this.svgMargin.top,
	            textColor: _constantsUtil2.default.TXT_COLOR,
	            hAlign: "start",
	            vAlign: "top"
	        }, this.charts);
	        var diff = this.drawHeight / 2;
	        var priceDiff = this.highPrice - this.lowPrice;
	        var heightPrice = priceDiff / this.drawHeight; //每一像素的价格
	        var price = (this.highPrice - diff * heightPrice).toFixed(2);
	        _commonUtil2.default.createText({
	            v: price,
	            x: w + 5,
	            y: Math.round(this.svgMargin.top + diff),
	            textColor: _constantsUtil2.default.TXT_COLOR,
	            hAlign: "start",
	            vAlign: "middle"
	        }, this.charts);
	        _commonUtil2.default.createText({
	            v: this.lowPrice.toFixed(2),
	            x: w + 5,
	            y: this.svgMargin.top + this.drawHeight,
	            textColor: _constantsUtil2.default.TXT_COLOR,
	            hAlign: "start",
	            vAlign: "middle"
	        }, this.charts);
	    },
	    /*
	     *计算柱子的颜色
	     */
	    _calcCandleColor: function _calcCandleColor(curClop, curOpen, preClop) {
	        if (curClop === curOpen) {
	            if (preClop === 0) {
	                return _constantsUtil2.default.KLINE_CANDLE_UP;
	            } else {
	                if (curClop >= preClop) {
	                    return _constantsUtil2.default.KLINE_CANDLE_UP;
	                } else {
	                    return _constantsUtil2.default.KLINE_CANDLE_DOWN;
	                }
	            }
	        }
	        return curClop - curOpen > 0 ? _constantsUtil2.default.KLINE_CANDLE_UP : _constantsUtil2.default.KLINE_CANDLE_DOWN;
	    },
	    /**
	     * 绘制蜡烛图
	     */
	    _drawCandle: function _drawCandle() {
	        this.newData.length = 0;
	        //每个柱子宽度
	        this.candleWidth = this.drawWidth / this.candleCountInScreen;
	        var start = this.endIndex + this.candleCountInScreen - 1,
	            diffPrice = this.highPrice - this.lowPrice;
	        this.priceHeight = diffPrice == 0 ? 0 : this.drawHeight / diffPrice;
	        var i = 0,
	            x = 0,
	            ox = 0,
	            w = 0,
	            h = 0,
	            oy = 0,
	            y0 = 0,
	            y1 = 0,
	            y2 = 0,
	            y3 = 0,
	            color = "",
	            fillColor = "none",
	            w = Math.round(this.candleWidth * 3 / 5),
	            pre = null;
	        for (; start >= this.endIndex; start--) {
	            var item = this.kLineData[start];
	            if (item) {
	                x = Math.round(this.svgMargin.left + this.candleWidth * i + this.candleWidth / 2);
	                ox = x - Math.floor(w / 2);
	                oy = item.CLOP > item.OPEP ? Math.round(this.svgMargin.top + (this.highPrice - item.CLOP) * this.priceHeight) : Math.round(this.svgMargin.top + (this.highPrice - item.OPEP) * this.priceHeight);
	                y0 = Math.round(this.svgMargin.top + (this.highPrice - item.HIGP) * this.priceHeight);
	                y1 = Math.round(item.CLOP > item.OPEP ? this.svgMargin.top + (this.highPrice - item.CLOP) * this.priceHeight : this.svgMargin.top + (this.highPrice - item.OPEP) * this.priceHeight);
	                y2 = Math.round(item.CLOP > item.OPEP ? this.svgMargin.top + (this.highPrice - item.OPEP) * this.priceHeight : this.svgMargin.top + (this.highPrice - item.CLOP) * this.priceHeight);
	                y3 = Math.round(this.svgMargin.top + (this.highPrice - item.LOWP) * this.priceHeight);
	                w = w % 2 == 0 ? w : w - 1;
	                w = w < 1 ? 1 : w;
	                h = y2 - y1 < 1 ? 1 : y2 - y1;
	                var temp = {
	                    x: x,
	                    ox: ox,
	                    w: w,
	                    sx: this.svgMargin.left + this.candleWidth * i,
	                    ex: this.svgMargin.left + this.candleWidth * (i + 1),
	                    y: item.CLOP > item.OPEP ? y1 : y2,
	                    i: i,
	                    index: start,
	                    highPrice: item.HIGP,
	                    lowPrice: item.LOWP,
	                    openPrice: item.OPEP,
	                    closePrice: item.CLOP,
	                    time: new Date(item.TIME),
	                    priceId: item.PRID
	                };
	                this.newData.push(temp);
	                pre = this.kLineData[start + 1];
	                color = this._calcCandleColor(item.CLOP, item.OPEP, typeof pre === "undefined" ? 0 : pre.CLOP);
	                fillColor = color === _constantsUtil2.default.KLINE_CANDLE_UP ? "none" : color;
	                _commonUtil2.default.createPath({
	                    d: "M{0},{1}L{0},{2}M{0},{3}L{0},{4}".format(x, y0, y1, y2, y3),
	                    strokeColor: color
	                }, this.charts);
	                _commonUtil2.default.createRect({
	                    x: ox,
	                    y: oy,
	                    width: w,
	                    height: h,
	                    fillColor: fillColor,
	                    strokeColor: color
	                }, this.charts);
	                i++;
	            }
	        }
	        this.firstCandle = this.newData[0];
	        this.lastCandle = this.newData[this.newData.length - 1];
	    },
	    /**
	     * 画时间轴
	     */
	    _drawTimeAxis: function _drawTimeAxis() {
	        var list = this.newData,
	            len = list.length,
	            i = 1,
	            y = this.timeAxisY,
	            first = list[0],
	            time = first.time,
	            startX = first.x,
	            firstDate = _commonUtil2.default.getDateString(first.time, 6),
	            item = null,
	            d = [];
	        var firstText = _commonUtil2.default.createText({
	            v: firstDate,
	            x: startX,
	            y: y,
	            textColor: _constantsUtil2.default.TXT_COLOR,
	            hAlign: "start",
	            vAlign: "middle"
	        }, this.charts),
	            tw = firstText.getBBox().width;
	        for (; i < len; i++) {
	            item = list[i];
	            if (!_commonUtil2.default.dayEqual(time, item.time)) {
	                if (item.x - startX > tw) {
	                    d.push("M{0},{1}L{0},{2}".format(item.x, this.svgHeight - this.svgMargin.bottom, this.svgHeight - this.svgMargin.bottom + 5));
	                    _commonUtil2.default.createText({
	                        v: item.time.getDate(),
	                        x: item.x,
	                        y: y,
	                        textColor: _constantsUtil2.default.TXT_COLOR,
	                        hAlign: "start",
	                        vAlign: "middle"
	                    }, this.svgElement);
	                    startX = item.x;
	                    time = item.time;
	                }
	            }
	        }
	        if (d.length > 0) {
	            _commonUtil2.default.createPath({
	                d: d.join(''),
	                strokeColor: _constantsUtil2.default.LINE_COLOR
	            }, this.charts);
	        }
	    }
	};
	
	exports.default = new DrawKLine();

/***/ },
/* 8 */
/*!******************************!*\
  !*** ./src/timeCrossHair.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _commonUtil = __webpack_require__(/*! ./commonUtil */ 1);
	
	var _commonUtil2 = _interopRequireDefault(_commonUtil);
	
	var _constantsUtil = __webpack_require__(/*! ./constantsUtil */ 2);
	
	var _constantsUtil2 = _interopRequireDefault(_constantsUtil);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*
	 * 分时线的十字线以及显示的数据
	 */
	var crossHair = _commonUtil2.default.createCommonG({
	    "transform": "translate(0, -9999)",
	    "class": "charts-tooltip"
	});
	var crossHair_v = _commonUtil2.default.createCommonPath({
	    "stroke": _constantsUtil2.default.CROSS_LINE_COLOR,
	    visibility: "hidden",
	    "stroke-width": 1
	});
	var crossHair_h = _commonUtil2.default.createCommonPath({
	    "stroke": _constantsUtil2.default.CROSS_LINE_COLOR,
	    visibility: "hidden",
	    "stroke-width": 1
	});
	var crossHair_data_path = _commonUtil2.default.createCommonPath({
	    stroke: "#7cb5ec",
	    "stroke-width": 1
	}, crossHair);
	var crossHair_data = _commonUtil2.default.createCommonText({
	    style: "font-size:12px;",
	    x: 8,
	    y: 5
	}, crossHair);
	var crossHair_data_time = _commonUtil2.default.createCommonSpan({
	    fill: _constantsUtil2.default.CLOSEPRICE_COLOR,
	    x: 8,
	    dy: 13
	}, crossHair_data);
	var crossHair_data_price = _commonUtil2.default.createCommonSpan({
	    x: 8,
	    dy: 13
	}, crossHair_data);
	var crossHair_data_change = _commonUtil2.default.createCommonSpan({
	    x: 8,
	    dy: 13
	}, crossHair_data);
	var margin = {},
	    height,
	    width,
	    closePrice = 0;
	exports.default = {
	    createCrossHair: function createCrossHair(parent, t, l, r, b, w, h) {
	        parent.appendChild(crossHair_h);
	        parent.appendChild(crossHair_v);
	        parent.appendChild(crossHair);
	        margin.top = t;
	        margin.left = l;
	        margin.right = r;
	        margin.bottom = b;
	        width = w;
	        height = h;
	    },
	    setClosePrice: function setClosePrice(value) {
	        closePrice = value;
	    },
	    hidden: function hidden() {
	        crossHair_v.setAttribute("visibility", "hidden");
	        crossHair_h.setAttribute("visibility", "hidden");
	        crossHair.setAttribute("transform", "translate(0, -9999)");
	    },
	    show: function show(x, y, time, price, chg) {
	        _commonUtil2.default.setCommonAttr(crossHair_v, {
	            d: "M{0},{1}L{0},{2}".format(Math.round(x), margin.top, height - margin.bottom),
	            "visibility": "visible"
	        });
	        _commonUtil2.default.setCommonAttr(crossHair_h, {
	            d: "M{0},{1}L{2},{1}".format(margin.left, Math.round(y), width - margin.right),
	            "visibility": "visible"
	        });
	        //默认显示100*60
	        var tx = x - 50,
	            ty = y - 60;
	        if (tx < margin.left) {
	            tx = x + 5;
	        }
	        if (x + 50 > width - margin.right) {
	            tx = width - margin.right - 100;
	        }
	        if (ty < margin.top) {
	            ty = margin.top;
	        }
	        if (ty + 60 > y) {
	            ty = y + 5;
	        }
	        crossHair.setAttribute("transform", "translate({0}, {1})".format(Math.round(tx), Math.round(ty)));
	
	        _commonUtil2.default.setCommonAttr(crossHair_data_path, {
	            d: "M{0},{1}L{2},{3},L{4},{5}L{6},{7}Z".format(3, 0, 98, 0, 98, 55, 3, 55)
	        });
	        crossHair_data_time.textContent = "时间：" + time;
	
	        crossHair_data_price.textContent = "价格：" + price;
	        _commonUtil2.default.setCommonAttr(crossHair_data_price, {
	            fill: _commonUtil2.default.getPriceColor(price - closePrice)
	        });
	        crossHair_data_change.textContent = "涨跌：" + chg;
	        _commonUtil2.default.setCommonAttr(crossHair_data_change, {
	            fill: _commonUtil2.default.getPriceColor(price - closePrice)
	        });
	    }
	};

/***/ },
/* 9 */
/*!*************************!*\
  !*** ./src/timeline.js ***!
  \*************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _commonUtil = __webpack_require__(/*! ./commonUtil */ 1);
	
	var _commonUtil2 = _interopRequireDefault(_commonUtil);
	
	var _constantsUtil = __webpack_require__(/*! ./constantsUtil */ 2);
	
	var _constantsUtil2 = _interopRequireDefault(_constantsUtil);
	
	var _underscore = __webpack_require__(/*! underscore */ 3);
	
	var _underscore2 = _interopRequireDefault(_underscore);
	
	var _timeCrossHair = __webpack_require__(/*! ./timeCrossHair */ 8);
	
	var _timeCrossHair2 = _interopRequireDefault(_timeCrossHair);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function DrawTimeLine() {
	    this.svgElement = null;
	    this.hcount = 2; //分时图的水平线数量
	    this.startTime = 0; //开市时间
	    this.endTime = 0; //闭市时间
	    this.timeSpan = 6; //以小时为间隔
	    this.timeWidth = 0;
	    this.pk = {};
	    this.originalData = []; //初始数据
	    this.newData = []; //计算后数据(有x,y坐标)
	    this.svgMargin = {
	        top: 1,
	        left: 45,
	        right: 35,
	        bottom: 15
	    };
	}
	
	DrawTimeLine.prototype = {
	    /**
	     * 找到最近的分时数据，
	     */
	    _getTimeDataByMousePosition: function _getTimeDataByMousePosition(x) {
	        var list = this.newData,
	            min = this.timeWidth;
	        if (list.length) {
	            var ob = list.filter(function (item, index, array) {
	                return Math.abs(Math.floor(item.x - x)) <= min;
	            });
	            if (ob.length > 0) {
	                return ob[0];
	            } else {
	                if (x < this.svgMargin.left) {
	                    return list[0];
	                } else {
	                    return list[list.length - 1];
	                }
	            }
	        }
	        return null;
	    },
	    showCrossHair: function showCrossHair(x) {
	        var data = this._getTimeDataByMousePosition(x);
	        if (data) {
	            _timeCrossHair2.default.show(data.x, data.y, data.time, data.price, data.price - this.pk.c);
	        }
	    },
	    hiddenCrossHair: function hiddenCrossHair() {
	        _timeCrossHair2.default.hidden();
	    },
	    /**
	     * 释放资源
	     */
	    dispose: function dispose() {
	        _timeCrossHair2.default.hidden();
	        this._initMain();
	        this.originalData.length = 0;
	        this.newData.length = 0;
	        this.allowPkDraw = false;
	    },
	    /**
	     * 初始化
	     * @param w
	     * @param h
	     */
	    init: function init(elem, w, h, needInitialize) {
	        if (needInitialize && w > 0 && h > 0) {
	            this._initSize(elem, w, h);
	        }
	    },
	    _initSize: function _initSize(elem, w, h) {
	        this.svgElement = elem;
	        this.svgElement.setAttribute("width", w);
	        this.svgElement.setAttribute("height", h);
	        this.svgElement.setAttribute("viewBox", "-0.5 -0.5 " + w + " " + h);
	        this.svgWidth = this.svgElement.width.baseVal.value;
	        this.svgHeight = this.svgElement.height.baseVal.value;
	        this.chartWidth = this.svgWidth - this.svgMargin.left - this.svgMargin.right; //分时线区域的宽
	        this.chartHeight = this.svgHeight - this.svgMargin.top - this.svgMargin.bottom;
	        this._initMain();
	    },
	    _initMain: function _initMain() {
	        this.svgElement.innerHTML = '';
	        if (!this.charts) {
	            this.charts = _commonUtil2.default.createCommonG({
	                "class": "charts-main"
	            }, this.svgElement); //主划线区域
	        } else {
	            this.svgElement.appendChild(this.charts);
	        }
	        _timeCrossHair2.default.createCrossHair(this.svgElement, this.svgMargin.top, this.svgMargin.left, this.svgMargin.right, this.svgMargin.bottom, this.svgWidth, this.svgHeight, this.pk.c);
	        this.linePath = null;
	    },
	    /**
	     *重置大小
	     * @param w
	     * @param h
	     */
	    resize: function resize(w, h) {
	        this._clearCanvas();
	        this.init(w, h, true);
	        this.allowPkDraw = false;
	    },
	    /**
	     * 设置开始和结束时间
	     * @param s
	     * @param e
	     */
	    setStartAndEndTime: function setStartAndEndTime(s, e) {
	        this.startTime = s;
	        this.endTime = e;
	    },
	    /*
	     *初始化数据
	     */
	    _initData: function _initData(data) {
	        this.originalData.length = 0;
	        this.originalData = data;
	    },
	    /**
	     * 设置分时和盘口数据
	     * @param pk
	     * @param d
	     */
	    setTimeData: function setTimeData(pk, data) {
	        this.pk = pk;
	        _timeCrossHair2.default.setClosePrice(this.pk.c);
	        this._initPriceDiff();
	        this._initData(data);
	        this._draw();
	    },
	    //设置来自盘口的数据
	    _setPKData: function _setPKData(arr) {
	        var len = this.originalData.length;
	        if (len > 0) {
	            var last = this.originalData[len - 1];
	            var ll = arr.length;
	            var item = null;
	            for (var i = 0; i < ll; i++) {
	                item = arr[i];
	                if (item) {
	                    if (item.priceId > last.priceId) {
	                        if (new Date(last.time).getMinutes() != new Date(item.time).getMinutes()) {
	                            this.originalData.push(item);
	                            last = item;
	                        } else {
	                            this.originalData[this.originalData.length - 1].price = item.price;
	                        }
	                    }
	                }
	            }
	        }
	    },
	    drawDynamicData: function drawDynamicData(list, h, l) {
	        if (!list || list.length === 0) {
	            return;
	        }
	        this._setPKData(list);
	        if (this.pk.h === 0 || h > this.pk.h) {
	            this.pk.h = h;
	        }
	        if (this.pk.l === 0 || l < this.pk.l) {
	            this.pk.l = l;
	        }
	        this._initPriceDiff();
	        if (this.allowPkDraw) {
	            this._draw();
	        }
	    },
	    /**
	     * 计算最大的价格差
	     */
	    _initPriceDiff: function _initPriceDiff() {
	        if (this.pk.h === 0 && this.pk.l === 0) {
	            this.diffPrice = this.pk.c * 0.02;
	        } else {
	            var diff1 = this.pk.h - this.pk.c;
	            var diff2 = this.pk.c - this.pk.l;
	            this.diffPrice = diff1 > diff2 ? diff1 : diff2;
	            if (this.diffPrice === 0) {
	                this.diffPrice = this.pk.c * 0.02;
	            }
	        }
	    },
	
	    _calc: function _calc() {
	        this.timeWidth = this.chartWidth / ((this.endTime - this.startTime) / 1000 - 60);
	        if (this.diffPrice == 0) {
	            this.priceHight = 0;
	        } else {
	            this.priceHight = this.chartHeight / 2 / this.diffPrice;
	        }
	    },
	    _draw: function _draw() {
	        if (!this.startTime) {
	            throw new Error("没有设置开始时间");
	        }
	        if (this.svgWidth > 0 && this.svgHeight > 0) {
	            this.charts.innerHTML = '';
	            this._calc();
	            this._drawCommon();
	            if (this.originalData.length > 0) {
	                this._drawLine();
	            }
	            this.allowPkDraw = true;
	        }
	    },
	    _drawCommon: function _drawCommon() {
	        var d = [];
	        d.push("M{0},{1}L{0},{2}".format(this.svgMargin.left, this.svgMargin.top, this.svgHeight - this.svgMargin.bottom));
	        d.push("M{0},{1}L{2},{1}".format(this.svgMargin.left, this.svgMargin.top, this.svgWidth - this.svgMargin.right));
	        d.push("M{0},{1}L{0},{2}".format(this.svgWidth - this.svgMargin.right, this.svgMargin.top, this.svgHeight - this.svgMargin.bottom));
	        d.push("M{0},{1}L{2},{1}".format(this.svgMargin.left, this.svgHeight - this.svgMargin.bottom, this.svgWidth - this.svgMargin.right));
	        _commonUtil2.default.createPath({
	            d: d.join(''),
	            strokeColor: _constantsUtil2.default.LINE_COLOR
	        }, this.charts);
	        this._drawHorizontal();
	        this._drawVertical();
	        this._drawTime();
	        this._drawPrice();
	    },
	    /**
	     * 画水平线
	     */
	    _drawHorizontal: function _drawHorizontal() {
	        var d = [];
	        //画中线
	        var mid = Math.round(this.svgMargin.top + this.chartHeight / 2);
	        _commonUtil2.default.createPath({
	            d: "M{0},{1}L{2},{1}".format(this.svgMargin.left, mid, this.svgWidth - this.svgMargin.right),
	            "stroke-width": 1,
	            strokeColor: _constantsUtil2.default.MIDDLE_COLOR
	        }, this.charts);
	        var distance = this.chartHeight / 2,
	            diff = distance / this.hcount,
	            w = this.svgWidth - this.svgMargin.right,
	            i = 0,
	            y = 0;
	        //中线到最高点
	        for (; i < this.hcount - 1; i++) {
	            y = Math.round(this.svgMargin.top + distance - (i + 1) * diff);
	            d.push("M{0},{1}L{2},{1}".format(this.svgMargin.left, y, w));
	        }
	        //从中线到最低点
	        i = 0;
	        for (; i < this.hcount - 1; i++) {
	            y = Math.round(this.svgMargin.top + distance + (i + 1) * diff);
	            d.push("M{0},{1}L{2},{1}".format(this.svgMargin.left, y, w));
	        }
	        _commonUtil2.default.createPath({
	            d: d.join(''),
	            strokeColor: _constantsUtil2.default.LINE_COLOR
	        }, this.charts);
	    },
	    /**
	     * 画水平线的价格和幅度
	     */
	    _drawPrice: function _drawPrice() {
	        if (this.pk.c === 0) {
	            return;
	        }
	        //中线
	        var mid = Math.round(this.svgMargin.top + this.chartHeight / 2);
	        _commonUtil2.default.createText({
	            v: this.pk.c.toFixed(2),
	            x: this.svgMargin.left - 3,
	            y: mid,
	            textColor: _constantsUtil2.default.CLOSEPRICE_COLOR,
	            hAlign: "end",
	            vAlign: "middle"
	        }, this.charts);
	        _commonUtil2.default.createText({
	            v: "0.00%",
	            x: this.svgMargin.left + this.chartWidth + 3,
	            y: mid,
	            textColor: _constantsUtil2.default.CLOSEPRICE_COLOR,
	            hAlign: "start",
	            vAlign: "middle"
	        }, this.charts);
	        mid = this.chartHeight / 2;
	        var distance = mid / this.hcount,
	            balance = this.diffPrice / this.hcount,
	            i = 0,
	            y = 0,
	            price = 0,
	            percent = null,
	            vAlign = "middle";;
	        //中线到最高点
	
	        for (; i < this.hcount; i++) {
	            y = Math.round(mid + this.svgMargin.top - (i + 1) * distance);
	            price = (this.pk.c + balance * (i + 1)).toFixed(2);
	            percent = (balance * (i + 1) / this.pk.c * 100).toFixed(2) + "%";
	            if (i == this.hcount - 1) {
	                vAlign = "top";
	            }
	            _commonUtil2.default.createText({
	                v: price,
	                x: this.svgMargin.left - 3,
	                y: y,
	                textColor: _constantsUtil2.default.PRICE_UP_COLOR,
	                hAlign: "end",
	                vAlign: vAlign
	            }, this.charts);
	            _commonUtil2.default.createText({
	                v: percent,
	                x: this.svgMargin.left + this.chartWidth + 3,
	                y: y,
	                textColor: _constantsUtil2.default.PRICE_UP_COLOR,
	                hAlign: "start",
	                vAlign: vAlign
	            }, this.charts);
	        }
	        //从中线到最低点
	        i = 0;
	        vAlign = "middle";
	        for (; i < this.hcount; i++) {
	            y = Math.round(mid + this.svgMargin.top + (i + 1) * distance);
	            price = (this.pk.c - balance * (i + 1)).toFixed(2);
	            percent = (balance * (i + 1) / this.pk.c * 100).toFixed(2) + "%";
	            if (i == this.hcount - 1) {
	                vAlign = "bottom";
	            }
	            _commonUtil2.default.createText({
	                v: price,
	                x: this.svgMargin.left - 3,
	                y: y,
	                textColor: _constantsUtil2.default.PRICE_DOWN_COLOR,
	                hAlign: "end",
	                vAlign: vAlign
	            }, this.charts);
	            _commonUtil2.default.createText({
	                v: percent,
	                x: this.svgMargin.left + this.chartWidth + 3,
	                y: y,
	                textColor: _constantsUtil2.default.PRICE_DOWN_COLOR,
	                hAlign: "start",
	                vAlign: vAlign
	            }, this.charts);
	        }
	    },
	    _drawVertical: function _drawVertical() {
	        var y = this.svgHeight - this.svgMargin.bottom,
	            start = this.startTime + 60 * 60 * 1000 * this.timeSpan,
	            x = 0,
	            d = [];
	        while (start < this.endTime) {
	            x = Math.round(this.svgMargin.left + (start - this.startTime) / 1000 * this.timeWidth);
	            d.push("M{0},{1}L{2},{3}".format(x, this.svgMargin.top, x, y));
	            start += 60 * 60 * 1000 * this.timeSpan;
	        }
	        _commonUtil2.default.createPath({ d: d.join(''), strokeColor: _constantsUtil2.default.LINE_COLOR, dash: true }, this.charts);
	    },
	    /**
	     * 绘制时间
	     */
	    _drawTime: function _drawTime() {
	        var y = this.svgHeight - this.svgMargin.bottom,
	            start = this.startTime + 60 * 60 * 1000 * this.timeSpan,
	            x = 0;
	        _commonUtil2.default.createText({
	            v: _commonUtil2.default.getTimeString(this.startTime),
	            x: this.svgMargin.left,
	            y: y,
	            textColor: _constantsUtil2.default.TXT_COLOR,
	            hAlign: "start",
	            vAlign: "top"
	        }, this.charts);
	        while (start < this.endTime) {
	            x = Math.round(this.svgMargin.left + (start - this.startTime) / 1000 * this.timeWidth);
	            _commonUtil2.default.createText({
	                v: _commonUtil2.default.getTimeString(start),
	                x: x,
	                y: y,
	                textColor: _constantsUtil2.default.TXT_COLOR,
	                hAlign: "middle",
	                vAlign: "top"
	            }, this.charts);
	            start += 60 * 60 * 1000 * this.timeSpan;
	        }
	        if (new Date(this.endTime).getMinutes() === 0) {
	            _commonUtil2.default.createText({
	                v: _commonUtil2.default.getTimeString(this.endTime - 60 * 1000),
	                x: this.svgMargin.left + this.chartWidth,
	                y: y,
	                textColor: _constantsUtil2.default.TXT_COLOR,
	                hAlign: "middle",
	                vAlign: "top"
	            }, this.charts);
	        }
	    },
	    /**
	     * 画分时线
	     */
	    _drawLine: function _drawLine() {
	        this.newData.length = 0;
	        var len = this.originalData.length;
	        var first = this.originalData[0];
	        var start = this.svgMargin.top + this.chartHeight / 2;
	        var startPrice = this.pk.c;
	        var startX = this.svgMargin.left;
	        var startY = this.svgMargin.top + this.chartHeight / 2 + (this.pk.c - first.price) * this.priceHight;
	        var item, lineX, lineY;
	        if (this.linePath == null) {
	            this.linePath = _commonUtil2.default.createPath({
	                strokeColor: _constantsUtil2.default.TIME_LINE_COLOR
	            });
	        }
	        var d = [],
	            index = 1;
	        d.push("M{0},{1}".format(startX, Math.round(startY)));
	        this.newData.push({
	            index: 0,
	            x: startX,
	            y: startY,
	            price: first.price,
	            volume: first.volume,
	            time: _commonUtil2.default.getTimeString(first.time),
	            millSeconds: first.time
	        });
	        for (var i = 1; i < len; i++) {
	            item = this.originalData[i];
	            lineX = this.svgMargin.left + _commonUtil2.default.getTimeDiff(first.time, item.time) * this.timeWidth;
	            lineY = this.svgMargin.top + this.chartHeight / 2 + (this.pk.c - item.price) * this.priceHight;
	            var ob = {
	                index: index,
	                x: lineX,
	                y: lineY,
	                price: item.price,
	                volume: item.volume,
	                time: _commonUtil2.default.getTimeString(item.time),
	                millSeconds: item.time
	            };
	            this.newData.push(ob);
	            d.push("L{0},{1}".format(Math.round(lineX), Math.round(lineY)));
	            index++;
	        }
	        if (index > 1) {
	            this.linePath.setAttribute("d", d.join(''));
	        }
	        this.charts.appendChild(this.linePath);
	    }
	};
	exports.default = new DrawTimeLine();

/***/ },
/* 10 */
/*!*******************************!*\
  !*** ./src/klineCrossHair.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _commonUtil = __webpack_require__(/*! ./commonUtil */ 1);
	
	var _commonUtil2 = _interopRequireDefault(_commonUtil);
	
	var _constantsUtil = __webpack_require__(/*! ./constantsUtil */ 2);
	
	var _constantsUtil2 = _interopRequireDefault(_constantsUtil);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*
	 * 分时线的十字线以及显示的数据
	 */
	var crossHair = _commonUtil2.default.createCommonG({
	    "transform": "translate(0, -9999)",
	    "class": "charts-tooltip"
	});
	var crossHair_v = _commonUtil2.default.createCommonPath({
	    "stroke": _constantsUtil2.default.CROSS_LINE_COLOR,
	    visibility: "hidden",
	    "stroke-width": 1
	});
	var crossHair_h = _commonUtil2.default.createCommonPath({
	    "stroke": _constantsUtil2.default.CROSS_LINE_COLOR,
	    visibility: "hidden",
	    "stroke-width": 1
	});
	var crossHair_data_path = _commonUtil2.default.createCommonPath({
	    stroke: "#7cb5ec",
	    "stroke-width": 1
	}, crossHair);
	var crossHair_data = _commonUtil2.default.createCommonText({
	    style: "font-size:12px;color:#fff;fill:#fff;",
	    x: 8,
	    y: 5
	}, crossHair);
	var crossHair_data_time = _commonUtil2.default.createCommonSpan({
	    x: 8,
	    dy: 13
	}, crossHair_data);
	var crossHair_data_openPrice = _commonUtil2.default.createCommonSpan({
	    x: 8,
	    dy: 13
	}, crossHair_data);
	var crossHair_data_closePrice = _commonUtil2.default.createCommonSpan({
	    x: 8,
	    dy: 13
	}, crossHair_data);
	var crossHair_data_highPrice = _commonUtil2.default.createCommonSpan({
	    x: 8,
	    dy: 13
	}, crossHair_data);
	var crossHair_data_lowPrice = _commonUtil2.default.createCommonSpan({
	    x: 8,
	    dy: 13
	}, crossHair_data);
	var margin = {},
	    height,
	    width;
	exports.default = {
	    createCrossHair: function createCrossHair(parent, t, l, r, b, w, h) {
	        parent.appendChild(crossHair_h);
	        parent.appendChild(crossHair_v);
	        parent.appendChild(crossHair);
	        margin.top = t;
	        margin.left = l;
	        margin.right = r;
	        margin.bottom = b;
	        width = w;
	        height = h;
	    },
	    hidden: function hidden() {
	        crossHair_v.setAttribute("visibility", "hidden");
	        crossHair_h.setAttribute("visibility", "hidden");
	        crossHair.setAttribute("transform", "translate(0, -9999)");
	    },
	    show: function show(x, y, time, op, cp, hp, lp, preCp) {
	        _commonUtil2.default.setCommonAttr(crossHair_v, {
	            d: "M{0},{1}L{0},{2}".format(Math.round(x), margin.top, height - margin.bottom),
	            "visibility": "visible"
	        });
	        _commonUtil2.default.setCommonAttr(crossHair_h, {
	            d: "M{0},{1}L{2},{1}".format(margin.left, Math.round(y), width - margin.right),
	            "visibility": "visible"
	        });
	        //默认显示150*90
	        var tx = x - 75,
	            ty = y - 90;
	        if (tx < margin.left) {
	            tx = x + 5;
	        }
	        if (x + 75 > width - margin.right) {
	            tx = width - margin.right - 150;
	        }
	        if (ty < margin.top) {
	            ty = margin.top;
	        }
	        if (ty + 90 > y) {
	            ty = y + 5;
	        }
	        crossHair.setAttribute("transform", "translate({0}, {1})".format(Math.round(tx), Math.round(ty)));
	
	        _commonUtil2.default.setCommonAttr(crossHair_data_path, {
	            d: "M{0},{1}L{2},{3},L{4},{5}L{6},{7}Z".format(3, 0, 148, 0, 148, 85, 3, 85)
	        });
	        crossHair_data_time.textContent = "时间：" + time;
	        crossHair_data_openPrice.textContent = "开盘价：" + op;
	        _commonUtil2.default.setCommonAttr(crossHair_data_openPrice, {
	            fill: preCp && _commonUtil2.default.getPriceColor(op - preCp)
	        });
	        crossHair_data_closePrice.textContent = "收盘价：" + cp;
	        _commonUtil2.default.setCommonAttr(crossHair_data_closePrice, {
	            fill: preCp && _commonUtil2.default.getPriceColor(cp - preCp)
	        });
	        crossHair_data_highPrice.textContent = "最高价：" + hp;
	        _commonUtil2.default.setCommonAttr(crossHair_data_highPrice, {
	            fill: preCp && _commonUtil2.default.getPriceColor(hp - preCp)
	        });
	        crossHair_data_lowPrice.textContent = "最低价：" + lp;
	        _commonUtil2.default.setCommonAttr(crossHair_data_lowPrice, {
	            fill: preCp && _commonUtil2.default.getPriceColor(lp - preCp)
	        });
	    }
	};

/***/ }
]);
//# sourceMappingURL=index.js.map