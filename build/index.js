webpackJsonp([1,0],[
/* 0 */
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _jquery = __webpack_require__(/*! jquery */ 4);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _underscore = __webpack_require__(/*! underscore */ 3);
	
	var _underscore2 = _interopRequireDefault(_underscore);
	
	var _controller = __webpack_require__(/*! ./controller */ 5);
	
	var _controller2 = _interopRequireDefault(_controller);
	
	var _hammerjs = __webpack_require__(/*! hammerjs */ 11);
	
	var _hammerjs2 = _interopRequireDefault(_hammerjs);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var intervalId = null,
	    crossHairFlag = false;
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
	    chart.addEventListener("touchstart", handlerTouch, false);
	    chart.addEventListener("touchmove", handlerTouch, false);
	    var hammertime = new _hammerjs2.default(chart);
	    hammertime.get('pan').set({ pointers: 2 });
	    var func = _underscore2.default.debounce(function (ev) {
	        if (ev.scale < 1) {
	            //zoom out
	            _controller2.default.zoomOut();
	        } else {
	            //zoom in
	            _controller2.default.zoomIn();
	        }
	    }, 100);
	    hammertime.on('pan', func);
	}
	
	function handlerTouch(e) {
	    if (e.touches.length === 1) {
	        switch (e.type) {
	            case "touchstart":
	                crossHairFlag = !crossHairFlag;
	                if (crossHairFlag) {
	                    _controller2.default.touchStart(e.touches[0].clientX);
	                } else {
	                    _controller2.default.touchEnd();
	                }
	                break;
	            case "touchmove":
	                e.preventDefault();
	                if (crossHairFlag) {
	                    _controller2.default.touchMove(e.changedTouches[0].clientX);
	                }
	                break;
	        }
	    }
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
	            return datestr;
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
	
	var _timeline = __webpack_require__(/*! ./timeline */ 10);
	
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
	    klineFlag = false,
	    allowQueryKline = true;
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
	    zoomIn: function zoomIn() {
	        _kline2.default.hiddenCrossHair();
	        _kline2.default.setCandleCount(-10);
	        _kline2.default.draw();
	    },
	    zoomOut: function zoomOut() {
	        _kline2.default.hiddenCrossHair();
	        if (_kline2.default.isAllowQuery(10)) {
	            if (allowQueryKline) {
	                allowQueryKline = false;
	                this.getKlineData().done(function () {
	                    allowQueryKline = true;
	                    _kline2.default.setCandleCount(10);
	                    _kline2.default.draw();
	                });
	            }
	        } else {
	            _kline2.default.setCandleCount(10);
	            _kline2.default.draw();
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
	        return _httpTest2.default.getKLine(period, _kline2.default.getStartTime(), this.handlerKline);
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
	        return _commonUtil2.default.sendRequest("http://172.31.100.64/stock/time/605/1?marketType=0").done(handler);
	    },
	    getPanKou: function getPanKou(nextId, handler) {
	        return _commonUtil2.default.sendRequest("http://172.31.100.64/stock/pankou/605/1/" + nextId + "?marketType=0").done(handler);
	    },
	    getTradeTime: function getTradeTime() {
	        return _commonUtil2.default.sendRequest("http://172.31.100.64/stock/tradetime/605?marketType=0");
	    },
	    getKLine: function getKLine(period, time, handler) {
	        return _commonUtil2.default.sendRequest("http://172.31.100.64/stock/kline/605/1/" + period + "/60/" + time + "?marketType=0").done(handler);
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
	
	var _klineCrossHair = __webpack_require__(/*! ./klineCrossHair */ 8);
	
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
	    this.kLineData = [];
	    this.newData = [];
	    this.minCandleCount = 11;
	    this.maxCandleCount = 300;
	}
	DrawKLine.prototype = {
	    getStartTime: function getStartTime() {
	        var startItem = this.kLineData.length && this.kLineData[this.kLineData.length - 1];
	        if (startItem) {
	            var t = new Date(startItem.TIME - this.period * 60000);
	            if (this.period < 6) {
	                return t.format("yyyyMMddHHmm");
	            } else {
	                return t.format("yyyyMMdd");
	            }
	        }
	        return -1;
	    },
	    isAllowQuery: function isAllowQuery(value) {
	        var temp = this.candleCountInScreen + value * 2;
	        if (temp > this.kLineData.length && temp <= this.maxCandleCount) {
	            return true;
	        }
	        return false;
	    },
	    /**
	     * 设置当前柱子数量
	     * @param value
	     */
	    setCandleCount: function setCandleCount(value) {
	        var len = this.kLineData.length;
	        if (len < this.minCandleCount) {
	            this.candleCountInScreen = this.minCandleCount;
	            return;
	        }
	        if (value > 0) {
	            if (this.endIndex !== 0) {
	                var end = this.endIndex - value;
	                if (end <= 0) {
	                    this.endIndex = 0;
	                } else {
	                    this.endIndex -= value;
	                }
	            }
	            var temp = this.candleCountInScreen + value * 2;
	            if (temp > this.maxCandleCount) {
	                this.candleCountInScreen = this.maxCandleCount;
	            } else {
	                this.candleCountInScreen = temp;
	            }
	        } else {
	            var diff = this.candleCountInScreen + value * 2;
	            if (diff < this.minCandleCount) {
	                this.endIndex = 0;
	                this.candleCountInScreen = this.minCandleCount;
	            } else {
	                if (this.endIndex >= Math.abs(value)) {
	                    this.endIndex -= value;
	                } else {
	                    this.endIndex = 0;
	                }
	                this.candleCountInScreen = diff;
	            }
	        }
	    },
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
	            var pre = this._getPreCandle(data.i);
	            _klineCrossHair2.default.show(data, pre ? pre.closePrice : null);
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
	        _klineCrossHair2.default.createCrossHair(this.svgElement, this.svgMargin, this.svgWidth, this.svgHeight);
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
	                    }, this.charts);
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
	var margin, height, width;
	exports.default = {
	    createCrossHair: function createCrossHair(parent, m, w, h) {
	        parent.appendChild(crossHair_h);
	        parent.appendChild(crossHair_v);
	        parent.appendChild(crossHair);
	        margin = m;
	        width = w;
	        height = h;
	    },
	    hidden: function hidden() {
	        crossHair_v.setAttribute("visibility", "hidden");
	        crossHair_h.setAttribute("visibility", "hidden");
	        crossHair.setAttribute("transform", "translate(0, -9999)");
	    },
	    show: function show(data, preCp) {
	        _commonUtil2.default.setCommonAttr(crossHair_v, {
	            d: "M{0},{1}L{0},{2}".format(Math.round(data.x), margin.top, height - margin.bottom),
	            "visibility": "visible"
	        });
	        _commonUtil2.default.setCommonAttr(crossHair_h, {
	            d: "M{0},{1}L{2},{1}".format(margin.left, Math.round(data.y), width - margin.right),
	            "visibility": "visible"
	        });
	        //默认显示150*90
	        var x = data.x,
	            y = data.y,
	            tx = x - 75,
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
	        var time = _commonUtil2.default.getDateString(data.time);
	        if (this.period >= 6) {
	            time = time.slice(0, -5);
	        }
	        crossHair_data_time.textContent = "时间：" + time;
	        crossHair_data_openPrice.textContent = "开盘价：" + data.openPrice;
	        _commonUtil2.default.setCommonAttr(crossHair_data_openPrice, {
	            fill: preCp && _commonUtil2.default.getPriceColor(data.openPrice - preCp)
	        });
	        crossHair_data_closePrice.textContent = "收盘价：" + data.closePrice;
	        _commonUtil2.default.setCommonAttr(crossHair_data_closePrice, {
	            fill: preCp && _commonUtil2.default.getPriceColor(data.closePrice - preCp)
	        });
	        crossHair_data_highPrice.textContent = "最高价：" + data.highPrice;
	        _commonUtil2.default.setCommonAttr(crossHair_data_highPrice, {
	            fill: preCp && _commonUtil2.default.getPriceColor(data.highPrice - preCp)
	        });
	        crossHair_data_lowPrice.textContent = "最低价：" + data.lowPrice;
	        _commonUtil2.default.setCommonAttr(crossHair_data_lowPrice, {
	            fill: preCp && _commonUtil2.default.getPriceColor(data.lowPrice - preCp)
	        });
	    }
	};

/***/ },
/* 9 */
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
	var margin = null,
	    height,
	    width,
	    closePrice = 0;
	exports.default = {
	    createCrossHair: function createCrossHair(parent, m, w, h) {
	        parent.appendChild(crossHair_h);
	        parent.appendChild(crossHair_v);
	        parent.appendChild(crossHair);
	        margin = m;
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
/* 10 */
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
	
	var _timeCrossHair = __webpack_require__(/*! ./timeCrossHair */ 9);
	
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
	    * 设置当前柱子数量
	    * @param value
	    */
	    setCandleCount: function setCandleCount(value) {
	        var len = this.kLineData.length;
	        if (len < this.minCandleCount) {
	            this.candleCountInScreen = this.minCandleCount;
	            return;
	        }
	        if (value > 0) {
	            if (this.endIndex !== 0) {
	                var end = this.endIndex - value;
	                if (end <= 0) {
	                    this.endIndex = 0;
	                } else {
	                    this.endIndex -= value;
	                }
	            }
	            var temp = this.candleCountInScreen + value * 2;
	            if (temp > this.maxCandleCount) {
	                this.candleCountInScreen = this.maxCandleCount;
	            } else {
	                this.candleCountInScreen = temp;
	            }
	        } else {
	            var diff = this.candleCountInScreen + value * 2;
	            if (diff < this.minCandleCount) {
	                this.endIndex = 0;
	                this.candleCountInScreen = this.minCandleCount;
	            } else {
	                if (this.endIndex >= Math.abs(value)) {
	                    this.endIndex -= value;
	                } else {
	                    this.endIndex = 0;
	                }
	                this.candleCountInScreen = diff;
	            }
	        }
	    },
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
	        _timeCrossHair2.default.createCrossHair(this.svgElement, this.svgMargin, this.svgWidth, this.svgHeight, this.pk.c);
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
/* 11 */
/*!******************************!*\
  !*** ./~/hammerjs/hammer.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*! Hammer.JS - v2.0.7 - 2016-04-22
	 * http://hammerjs.github.io/
	 *
	 * Copyright (c) 2016 Jorik Tangelder;
	 * Licensed under the MIT license */
	(function(window, document, exportName, undefined) {
	  'use strict';
	
	var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
	var TEST_ELEMENT = document.createElement('div');
	
	var TYPE_FUNCTION = 'function';
	
	var round = Math.round;
	var abs = Math.abs;
	var now = Date.now;
	
	/**
	 * set a timeout with a given scope
	 * @param {Function} fn
	 * @param {Number} timeout
	 * @param {Object} context
	 * @returns {number}
	 */
	function setTimeoutContext(fn, timeout, context) {
	    return setTimeout(bindFn(fn, context), timeout);
	}
	
	/**
	 * if the argument is an array, we want to execute the fn on each entry
	 * if it aint an array we don't want to do a thing.
	 * this is used by all the methods that accept a single and array argument.
	 * @param {*|Array} arg
	 * @param {String} fn
	 * @param {Object} [context]
	 * @returns {Boolean}
	 */
	function invokeArrayArg(arg, fn, context) {
	    if (Array.isArray(arg)) {
	        each(arg, context[fn], context);
	        return true;
	    }
	    return false;
	}
	
	/**
	 * walk objects and arrays
	 * @param {Object} obj
	 * @param {Function} iterator
	 * @param {Object} context
	 */
	function each(obj, iterator, context) {
	    var i;
	
	    if (!obj) {
	        return;
	    }
	
	    if (obj.forEach) {
	        obj.forEach(iterator, context);
	    } else if (obj.length !== undefined) {
	        i = 0;
	        while (i < obj.length) {
	            iterator.call(context, obj[i], i, obj);
	            i++;
	        }
	    } else {
	        for (i in obj) {
	            obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
	        }
	    }
	}
	
	/**
	 * wrap a method with a deprecation warning and stack trace
	 * @param {Function} method
	 * @param {String} name
	 * @param {String} message
	 * @returns {Function} A new function wrapping the supplied method.
	 */
	function deprecate(method, name, message) {
	    var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
	    return function() {
	        var e = new Error('get-stack-trace');
	        var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '')
	            .replace(/^\s+at\s+/gm, '')
	            .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';
	
	        var log = window.console && (window.console.warn || window.console.log);
	        if (log) {
	            log.call(window.console, deprecationMessage, stack);
	        }
	        return method.apply(this, arguments);
	    };
	}
	
	/**
	 * extend object.
	 * means that properties in dest will be overwritten by the ones in src.
	 * @param {Object} target
	 * @param {...Object} objects_to_assign
	 * @returns {Object} target
	 */
	var assign;
	if (typeof Object.assign !== 'function') {
	    assign = function assign(target) {
	        if (target === undefined || target === null) {
	            throw new TypeError('Cannot convert undefined or null to object');
	        }
	
	        var output = Object(target);
	        for (var index = 1; index < arguments.length; index++) {
	            var source = arguments[index];
	            if (source !== undefined && source !== null) {
	                for (var nextKey in source) {
	                    if (source.hasOwnProperty(nextKey)) {
	                        output[nextKey] = source[nextKey];
	                    }
	                }
	            }
	        }
	        return output;
	    };
	} else {
	    assign = Object.assign;
	}
	
	/**
	 * extend object.
	 * means that properties in dest will be overwritten by the ones in src.
	 * @param {Object} dest
	 * @param {Object} src
	 * @param {Boolean} [merge=false]
	 * @returns {Object} dest
	 */
	var extend = deprecate(function extend(dest, src, merge) {
	    var keys = Object.keys(src);
	    var i = 0;
	    while (i < keys.length) {
	        if (!merge || (merge && dest[keys[i]] === undefined)) {
	            dest[keys[i]] = src[keys[i]];
	        }
	        i++;
	    }
	    return dest;
	}, 'extend', 'Use `assign`.');
	
	/**
	 * merge the values from src in the dest.
	 * means that properties that exist in dest will not be overwritten by src
	 * @param {Object} dest
	 * @param {Object} src
	 * @returns {Object} dest
	 */
	var merge = deprecate(function merge(dest, src) {
	    return extend(dest, src, true);
	}, 'merge', 'Use `assign`.');
	
	/**
	 * simple class inheritance
	 * @param {Function} child
	 * @param {Function} base
	 * @param {Object} [properties]
	 */
	function inherit(child, base, properties) {
	    var baseP = base.prototype,
	        childP;
	
	    childP = child.prototype = Object.create(baseP);
	    childP.constructor = child;
	    childP._super = baseP;
	
	    if (properties) {
	        assign(childP, properties);
	    }
	}
	
	/**
	 * simple function bind
	 * @param {Function} fn
	 * @param {Object} context
	 * @returns {Function}
	 */
	function bindFn(fn, context) {
	    return function boundFn() {
	        return fn.apply(context, arguments);
	    };
	}
	
	/**
	 * let a boolean value also be a function that must return a boolean
	 * this first item in args will be used as the context
	 * @param {Boolean|Function} val
	 * @param {Array} [args]
	 * @returns {Boolean}
	 */
	function boolOrFn(val, args) {
	    if (typeof val == TYPE_FUNCTION) {
	        return val.apply(args ? args[0] || undefined : undefined, args);
	    }
	    return val;
	}
	
	/**
	 * use the val2 when val1 is undefined
	 * @param {*} val1
	 * @param {*} val2
	 * @returns {*}
	 */
	function ifUndefined(val1, val2) {
	    return (val1 === undefined) ? val2 : val1;
	}
	
	/**
	 * addEventListener with multiple events at once
	 * @param {EventTarget} target
	 * @param {String} types
	 * @param {Function} handler
	 */
	function addEventListeners(target, types, handler) {
	    each(splitStr(types), function(type) {
	        target.addEventListener(type, handler, false);
	    });
	}
	
	/**
	 * removeEventListener with multiple events at once
	 * @param {EventTarget} target
	 * @param {String} types
	 * @param {Function} handler
	 */
	function removeEventListeners(target, types, handler) {
	    each(splitStr(types), function(type) {
	        target.removeEventListener(type, handler, false);
	    });
	}
	
	/**
	 * find if a node is in the given parent
	 * @method hasParent
	 * @param {HTMLElement} node
	 * @param {HTMLElement} parent
	 * @return {Boolean} found
	 */
	function hasParent(node, parent) {
	    while (node) {
	        if (node == parent) {
	            return true;
	        }
	        node = node.parentNode;
	    }
	    return false;
	}
	
	/**
	 * small indexOf wrapper
	 * @param {String} str
	 * @param {String} find
	 * @returns {Boolean} found
	 */
	function inStr(str, find) {
	    return str.indexOf(find) > -1;
	}
	
	/**
	 * split string on whitespace
	 * @param {String} str
	 * @returns {Array} words
	 */
	function splitStr(str) {
	    return str.trim().split(/\s+/g);
	}
	
	/**
	 * find if a array contains the object using indexOf or a simple polyFill
	 * @param {Array} src
	 * @param {String} find
	 * @param {String} [findByKey]
	 * @return {Boolean|Number} false when not found, or the index
	 */
	function inArray(src, find, findByKey) {
	    if (src.indexOf && !findByKey) {
	        return src.indexOf(find);
	    } else {
	        var i = 0;
	        while (i < src.length) {
	            if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
	                return i;
	            }
	            i++;
	        }
	        return -1;
	    }
	}
	
	/**
	 * convert array-like objects to real arrays
	 * @param {Object} obj
	 * @returns {Array}
	 */
	function toArray(obj) {
	    return Array.prototype.slice.call(obj, 0);
	}
	
	/**
	 * unique array with objects based on a key (like 'id') or just by the array's value
	 * @param {Array} src [{id:1},{id:2},{id:1}]
	 * @param {String} [key]
	 * @param {Boolean} [sort=False]
	 * @returns {Array} [{id:1},{id:2}]
	 */
	function uniqueArray(src, key, sort) {
	    var results = [];
	    var values = [];
	    var i = 0;
	
	    while (i < src.length) {
	        var val = key ? src[i][key] : src[i];
	        if (inArray(values, val) < 0) {
	            results.push(src[i]);
	        }
	        values[i] = val;
	        i++;
	    }
	
	    if (sort) {
	        if (!key) {
	            results = results.sort();
	        } else {
	            results = results.sort(function sortUniqueArray(a, b) {
	                return a[key] > b[key];
	            });
	        }
	    }
	
	    return results;
	}
	
	/**
	 * get the prefixed property
	 * @param {Object} obj
	 * @param {String} property
	 * @returns {String|Undefined} prefixed
	 */
	function prefixed(obj, property) {
	    var prefix, prop;
	    var camelProp = property[0].toUpperCase() + property.slice(1);
	
	    var i = 0;
	    while (i < VENDOR_PREFIXES.length) {
	        prefix = VENDOR_PREFIXES[i];
	        prop = (prefix) ? prefix + camelProp : property;
	
	        if (prop in obj) {
	            return prop;
	        }
	        i++;
	    }
	    return undefined;
	}
	
	/**
	 * get a unique id
	 * @returns {number} uniqueId
	 */
	var _uniqueId = 1;
	function uniqueId() {
	    return _uniqueId++;
	}
	
	/**
	 * get the window object of an element
	 * @param {HTMLElement} element
	 * @returns {DocumentView|Window}
	 */
	function getWindowForElement(element) {
	    var doc = element.ownerDocument || element;
	    return (doc.defaultView || doc.parentWindow || window);
	}
	
	var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;
	
	var SUPPORT_TOUCH = ('ontouchstart' in window);
	var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
	var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);
	
	var INPUT_TYPE_TOUCH = 'touch';
	var INPUT_TYPE_PEN = 'pen';
	var INPUT_TYPE_MOUSE = 'mouse';
	var INPUT_TYPE_KINECT = 'kinect';
	
	var COMPUTE_INTERVAL = 25;
	
	var INPUT_START = 1;
	var INPUT_MOVE = 2;
	var INPUT_END = 4;
	var INPUT_CANCEL = 8;
	
	var DIRECTION_NONE = 1;
	var DIRECTION_LEFT = 2;
	var DIRECTION_RIGHT = 4;
	var DIRECTION_UP = 8;
	var DIRECTION_DOWN = 16;
	
	var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
	var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
	var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;
	
	var PROPS_XY = ['x', 'y'];
	var PROPS_CLIENT_XY = ['clientX', 'clientY'];
	
	/**
	 * create new input type manager
	 * @param {Manager} manager
	 * @param {Function} callback
	 * @returns {Input}
	 * @constructor
	 */
	function Input(manager, callback) {
	    var self = this;
	    this.manager = manager;
	    this.callback = callback;
	    this.element = manager.element;
	    this.target = manager.options.inputTarget;
	
	    // smaller wrapper around the handler, for the scope and the enabled state of the manager,
	    // so when disabled the input events are completely bypassed.
	    this.domHandler = function(ev) {
	        if (boolOrFn(manager.options.enable, [manager])) {
	            self.handler(ev);
	        }
	    };
	
	    this.init();
	
	}
	
	Input.prototype = {
	    /**
	     * should handle the inputEvent data and trigger the callback
	     * @virtual
	     */
	    handler: function() { },
	
	    /**
	     * bind the events
	     */
	    init: function() {
	        this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
	        this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
	        this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
	    },
	
	    /**
	     * unbind the events
	     */
	    destroy: function() {
	        this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
	        this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
	        this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
	    }
	};
	
	/**
	 * create new input type manager
	 * called by the Manager constructor
	 * @param {Hammer} manager
	 * @returns {Input}
	 */
	function createInputInstance(manager) {
	    var Type;
	    var inputClass = manager.options.inputClass;
	
	    if (inputClass) {
	        Type = inputClass;
	    } else if (SUPPORT_POINTER_EVENTS) {
	        Type = PointerEventInput;
	    } else if (SUPPORT_ONLY_TOUCH) {
	        Type = TouchInput;
	    } else if (!SUPPORT_TOUCH) {
	        Type = MouseInput;
	    } else {
	        Type = TouchMouseInput;
	    }
	    return new (Type)(manager, inputHandler);
	}
	
	/**
	 * handle input events
	 * @param {Manager} manager
	 * @param {String} eventType
	 * @param {Object} input
	 */
	function inputHandler(manager, eventType, input) {
	    var pointersLen = input.pointers.length;
	    var changedPointersLen = input.changedPointers.length;
	    var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
	    var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));
	
	    input.isFirst = !!isFirst;
	    input.isFinal = !!isFinal;
	
	    if (isFirst) {
	        manager.session = {};
	    }
	
	    // source event is the normalized value of the domEvents
	    // like 'touchstart, mouseup, pointerdown'
	    input.eventType = eventType;
	
	    // compute scale, rotation etc
	    computeInputData(manager, input);
	
	    // emit secret event
	    manager.emit('hammer.input', input);
	
	    manager.recognize(input);
	    manager.session.prevInput = input;
	}
	
	/**
	 * extend the data with some usable properties like scale, rotate, velocity etc
	 * @param {Object} manager
	 * @param {Object} input
	 */
	function computeInputData(manager, input) {
	    var session = manager.session;
	    var pointers = input.pointers;
	    var pointersLength = pointers.length;
	
	    // store the first input to calculate the distance and direction
	    if (!session.firstInput) {
	        session.firstInput = simpleCloneInputData(input);
	    }
	
	    // to compute scale and rotation we need to store the multiple touches
	    if (pointersLength > 1 && !session.firstMultiple) {
	        session.firstMultiple = simpleCloneInputData(input);
	    } else if (pointersLength === 1) {
	        session.firstMultiple = false;
	    }
	
	    var firstInput = session.firstInput;
	    var firstMultiple = session.firstMultiple;
	    var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;
	
	    var center = input.center = getCenter(pointers);
	    input.timeStamp = now();
	    input.deltaTime = input.timeStamp - firstInput.timeStamp;
	
	    input.angle = getAngle(offsetCenter, center);
	    input.distance = getDistance(offsetCenter, center);
	
	    computeDeltaXY(session, input);
	    input.offsetDirection = getDirection(input.deltaX, input.deltaY);
	
	    var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
	    input.overallVelocityX = overallVelocity.x;
	    input.overallVelocityY = overallVelocity.y;
	    input.overallVelocity = (abs(overallVelocity.x) > abs(overallVelocity.y)) ? overallVelocity.x : overallVelocity.y;
	
	    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
	    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;
	
	    input.maxPointers = !session.prevInput ? input.pointers.length : ((input.pointers.length >
	        session.prevInput.maxPointers) ? input.pointers.length : session.prevInput.maxPointers);
	
	    computeIntervalInputData(session, input);
	
	    // find the correct target
	    var target = manager.element;
	    if (hasParent(input.srcEvent.target, target)) {
	        target = input.srcEvent.target;
	    }
	    input.target = target;
	}
	
	function computeDeltaXY(session, input) {
	    var center = input.center;
	    var offset = session.offsetDelta || {};
	    var prevDelta = session.prevDelta || {};
	    var prevInput = session.prevInput || {};
	
	    if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
	        prevDelta = session.prevDelta = {
	            x: prevInput.deltaX || 0,
	            y: prevInput.deltaY || 0
	        };
	
	        offset = session.offsetDelta = {
	            x: center.x,
	            y: center.y
	        };
	    }
	
	    input.deltaX = prevDelta.x + (center.x - offset.x);
	    input.deltaY = prevDelta.y + (center.y - offset.y);
	}
	
	/**
	 * velocity is calculated every x ms
	 * @param {Object} session
	 * @param {Object} input
	 */
	function computeIntervalInputData(session, input) {
	    var last = session.lastInterval || input,
	        deltaTime = input.timeStamp - last.timeStamp,
	        velocity, velocityX, velocityY, direction;
	
	    if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
	        var deltaX = input.deltaX - last.deltaX;
	        var deltaY = input.deltaY - last.deltaY;
	
	        var v = getVelocity(deltaTime, deltaX, deltaY);
	        velocityX = v.x;
	        velocityY = v.y;
	        velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
	        direction = getDirection(deltaX, deltaY);
	
	        session.lastInterval = input;
	    } else {
	        // use latest velocity info if it doesn't overtake a minimum period
	        velocity = last.velocity;
	        velocityX = last.velocityX;
	        velocityY = last.velocityY;
	        direction = last.direction;
	    }
	
	    input.velocity = velocity;
	    input.velocityX = velocityX;
	    input.velocityY = velocityY;
	    input.direction = direction;
	}
	
	/**
	 * create a simple clone from the input used for storage of firstInput and firstMultiple
	 * @param {Object} input
	 * @returns {Object} clonedInputData
	 */
	function simpleCloneInputData(input) {
	    // make a simple copy of the pointers because we will get a reference if we don't
	    // we only need clientXY for the calculations
	    var pointers = [];
	    var i = 0;
	    while (i < input.pointers.length) {
	        pointers[i] = {
	            clientX: round(input.pointers[i].clientX),
	            clientY: round(input.pointers[i].clientY)
	        };
	        i++;
	    }
	
	    return {
	        timeStamp: now(),
	        pointers: pointers,
	        center: getCenter(pointers),
	        deltaX: input.deltaX,
	        deltaY: input.deltaY
	    };
	}
	
	/**
	 * get the center of all the pointers
	 * @param {Array} pointers
	 * @return {Object} center contains `x` and `y` properties
	 */
	function getCenter(pointers) {
	    var pointersLength = pointers.length;
	
	    // no need to loop when only one touch
	    if (pointersLength === 1) {
	        return {
	            x: round(pointers[0].clientX),
	            y: round(pointers[0].clientY)
	        };
	    }
	
	    var x = 0, y = 0, i = 0;
	    while (i < pointersLength) {
	        x += pointers[i].clientX;
	        y += pointers[i].clientY;
	        i++;
	    }
	
	    return {
	        x: round(x / pointersLength),
	        y: round(y / pointersLength)
	    };
	}
	
	/**
	 * calculate the velocity between two points. unit is in px per ms.
	 * @param {Number} deltaTime
	 * @param {Number} x
	 * @param {Number} y
	 * @return {Object} velocity `x` and `y`
	 */
	function getVelocity(deltaTime, x, y) {
	    return {
	        x: x / deltaTime || 0,
	        y: y / deltaTime || 0
	    };
	}
	
	/**
	 * get the direction between two points
	 * @param {Number} x
	 * @param {Number} y
	 * @return {Number} direction
	 */
	function getDirection(x, y) {
	    if (x === y) {
	        return DIRECTION_NONE;
	    }
	
	    if (abs(x) >= abs(y)) {
	        return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
	    }
	    return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
	}
	
	/**
	 * calculate the absolute distance between two points
	 * @param {Object} p1 {x, y}
	 * @param {Object} p2 {x, y}
	 * @param {Array} [props] containing x and y keys
	 * @return {Number} distance
	 */
	function getDistance(p1, p2, props) {
	    if (!props) {
	        props = PROPS_XY;
	    }
	    var x = p2[props[0]] - p1[props[0]],
	        y = p2[props[1]] - p1[props[1]];
	
	    return Math.sqrt((x * x) + (y * y));
	}
	
	/**
	 * calculate the angle between two coordinates
	 * @param {Object} p1
	 * @param {Object} p2
	 * @param {Array} [props] containing x and y keys
	 * @return {Number} angle
	 */
	function getAngle(p1, p2, props) {
	    if (!props) {
	        props = PROPS_XY;
	    }
	    var x = p2[props[0]] - p1[props[0]],
	        y = p2[props[1]] - p1[props[1]];
	    return Math.atan2(y, x) * 180 / Math.PI;
	}
	
	/**
	 * calculate the rotation degrees between two pointersets
	 * @param {Array} start array of pointers
	 * @param {Array} end array of pointers
	 * @return {Number} rotation
	 */
	function getRotation(start, end) {
	    return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
	}
	
	/**
	 * calculate the scale factor between two pointersets
	 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
	 * @param {Array} start array of pointers
	 * @param {Array} end array of pointers
	 * @return {Number} scale
	 */
	function getScale(start, end) {
	    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
	}
	
	var MOUSE_INPUT_MAP = {
	    mousedown: INPUT_START,
	    mousemove: INPUT_MOVE,
	    mouseup: INPUT_END
	};
	
	var MOUSE_ELEMENT_EVENTS = 'mousedown';
	var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';
	
	/**
	 * Mouse events input
	 * @constructor
	 * @extends Input
	 */
	function MouseInput() {
	    this.evEl = MOUSE_ELEMENT_EVENTS;
	    this.evWin = MOUSE_WINDOW_EVENTS;
	
	    this.pressed = false; // mousedown state
	
	    Input.apply(this, arguments);
	}
	
	inherit(MouseInput, Input, {
	    /**
	     * handle mouse events
	     * @param {Object} ev
	     */
	    handler: function MEhandler(ev) {
	        var eventType = MOUSE_INPUT_MAP[ev.type];
	
	        // on start we want to have the left mouse button down
	        if (eventType & INPUT_START && ev.button === 0) {
	            this.pressed = true;
	        }
	
	        if (eventType & INPUT_MOVE && ev.which !== 1) {
	            eventType = INPUT_END;
	        }
	
	        // mouse must be down
	        if (!this.pressed) {
	            return;
	        }
	
	        if (eventType & INPUT_END) {
	            this.pressed = false;
	        }
	
	        this.callback(this.manager, eventType, {
	            pointers: [ev],
	            changedPointers: [ev],
	            pointerType: INPUT_TYPE_MOUSE,
	            srcEvent: ev
	        });
	    }
	});
	
	var POINTER_INPUT_MAP = {
	    pointerdown: INPUT_START,
	    pointermove: INPUT_MOVE,
	    pointerup: INPUT_END,
	    pointercancel: INPUT_CANCEL,
	    pointerout: INPUT_CANCEL
	};
	
	// in IE10 the pointer types is defined as an enum
	var IE10_POINTER_TYPE_ENUM = {
	    2: INPUT_TYPE_TOUCH,
	    3: INPUT_TYPE_PEN,
	    4: INPUT_TYPE_MOUSE,
	    5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
	};
	
	var POINTER_ELEMENT_EVENTS = 'pointerdown';
	var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';
	
	// IE10 has prefixed support, and case-sensitive
	if (window.MSPointerEvent && !window.PointerEvent) {
	    POINTER_ELEMENT_EVENTS = 'MSPointerDown';
	    POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
	}
	
	/**
	 * Pointer events input
	 * @constructor
	 * @extends Input
	 */
	function PointerEventInput() {
	    this.evEl = POINTER_ELEMENT_EVENTS;
	    this.evWin = POINTER_WINDOW_EVENTS;
	
	    Input.apply(this, arguments);
	
	    this.store = (this.manager.session.pointerEvents = []);
	}
	
	inherit(PointerEventInput, Input, {
	    /**
	     * handle mouse events
	     * @param {Object} ev
	     */
	    handler: function PEhandler(ev) {
	        var store = this.store;
	        var removePointer = false;
	
	        var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
	        var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
	        var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;
	
	        var isTouch = (pointerType == INPUT_TYPE_TOUCH);
	
	        // get index of the event in the store
	        var storeIndex = inArray(store, ev.pointerId, 'pointerId');
	
	        // start and mouse must be down
	        if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
	            if (storeIndex < 0) {
	                store.push(ev);
	                storeIndex = store.length - 1;
	            }
	        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
	            removePointer = true;
	        }
	
	        // it not found, so the pointer hasn't been down (so it's probably a hover)
	        if (storeIndex < 0) {
	            return;
	        }
	
	        // update the event in the store
	        store[storeIndex] = ev;
	
	        this.callback(this.manager, eventType, {
	            pointers: store,
	            changedPointers: [ev],
	            pointerType: pointerType,
	            srcEvent: ev
	        });
	
	        if (removePointer) {
	            // remove from the store
	            store.splice(storeIndex, 1);
	        }
	    }
	});
	
	var SINGLE_TOUCH_INPUT_MAP = {
	    touchstart: INPUT_START,
	    touchmove: INPUT_MOVE,
	    touchend: INPUT_END,
	    touchcancel: INPUT_CANCEL
	};
	
	var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
	var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';
	
	/**
	 * Touch events input
	 * @constructor
	 * @extends Input
	 */
	function SingleTouchInput() {
	    this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
	    this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
	    this.started = false;
	
	    Input.apply(this, arguments);
	}
	
	inherit(SingleTouchInput, Input, {
	    handler: function TEhandler(ev) {
	        var type = SINGLE_TOUCH_INPUT_MAP[ev.type];
	
	        // should we handle the touch events?
	        if (type === INPUT_START) {
	            this.started = true;
	        }
	
	        if (!this.started) {
	            return;
	        }
	
	        var touches = normalizeSingleTouches.call(this, ev, type);
	
	        // when done, reset the started state
	        if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
	            this.started = false;
	        }
	
	        this.callback(this.manager, type, {
	            pointers: touches[0],
	            changedPointers: touches[1],
	            pointerType: INPUT_TYPE_TOUCH,
	            srcEvent: ev
	        });
	    }
	});
	
	/**
	 * @this {TouchInput}
	 * @param {Object} ev
	 * @param {Number} type flag
	 * @returns {undefined|Array} [all, changed]
	 */
	function normalizeSingleTouches(ev, type) {
	    var all = toArray(ev.touches);
	    var changed = toArray(ev.changedTouches);
	
	    if (type & (INPUT_END | INPUT_CANCEL)) {
	        all = uniqueArray(all.concat(changed), 'identifier', true);
	    }
	
	    return [all, changed];
	}
	
	var TOUCH_INPUT_MAP = {
	    touchstart: INPUT_START,
	    touchmove: INPUT_MOVE,
	    touchend: INPUT_END,
	    touchcancel: INPUT_CANCEL
	};
	
	var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';
	
	/**
	 * Multi-user touch events input
	 * @constructor
	 * @extends Input
	 */
	function TouchInput() {
	    this.evTarget = TOUCH_TARGET_EVENTS;
	    this.targetIds = {};
	
	    Input.apply(this, arguments);
	}
	
	inherit(TouchInput, Input, {
	    handler: function MTEhandler(ev) {
	        var type = TOUCH_INPUT_MAP[ev.type];
	        var touches = getTouches.call(this, ev, type);
	        if (!touches) {
	            return;
	        }
	
	        this.callback(this.manager, type, {
	            pointers: touches[0],
	            changedPointers: touches[1],
	            pointerType: INPUT_TYPE_TOUCH,
	            srcEvent: ev
	        });
	    }
	});
	
	/**
	 * @this {TouchInput}
	 * @param {Object} ev
	 * @param {Number} type flag
	 * @returns {undefined|Array} [all, changed]
	 */
	function getTouches(ev, type) {
	    var allTouches = toArray(ev.touches);
	    var targetIds = this.targetIds;
	
	    // when there is only one touch, the process can be simplified
	    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
	        targetIds[allTouches[0].identifier] = true;
	        return [allTouches, allTouches];
	    }
	
	    var i,
	        targetTouches,
	        changedTouches = toArray(ev.changedTouches),
	        changedTargetTouches = [],
	        target = this.target;
	
	    // get target touches from touches
	    targetTouches = allTouches.filter(function(touch) {
	        return hasParent(touch.target, target);
	    });
	
	    // collect touches
	    if (type === INPUT_START) {
	        i = 0;
	        while (i < targetTouches.length) {
	            targetIds[targetTouches[i].identifier] = true;
	            i++;
	        }
	    }
	
	    // filter changed touches to only contain touches that exist in the collected target ids
	    i = 0;
	    while (i < changedTouches.length) {
	        if (targetIds[changedTouches[i].identifier]) {
	            changedTargetTouches.push(changedTouches[i]);
	        }
	
	        // cleanup removed touches
	        if (type & (INPUT_END | INPUT_CANCEL)) {
	            delete targetIds[changedTouches[i].identifier];
	        }
	        i++;
	    }
	
	    if (!changedTargetTouches.length) {
	        return;
	    }
	
	    return [
	        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
	        uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true),
	        changedTargetTouches
	    ];
	}
	
	/**
	 * Combined touch and mouse input
	 *
	 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
	 * This because touch devices also emit mouse events while doing a touch.
	 *
	 * @constructor
	 * @extends Input
	 */
	
	var DEDUP_TIMEOUT = 2500;
	var DEDUP_DISTANCE = 25;
	
	function TouchMouseInput() {
	    Input.apply(this, arguments);
	
	    var handler = bindFn(this.handler, this);
	    this.touch = new TouchInput(this.manager, handler);
	    this.mouse = new MouseInput(this.manager, handler);
	
	    this.primaryTouch = null;
	    this.lastTouches = [];
	}
	
	inherit(TouchMouseInput, Input, {
	    /**
	     * handle mouse and touch events
	     * @param {Hammer} manager
	     * @param {String} inputEvent
	     * @param {Object} inputData
	     */
	    handler: function TMEhandler(manager, inputEvent, inputData) {
	        var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),
	            isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);
	
	        if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
	            return;
	        }
	
	        // when we're in a touch event, record touches to  de-dupe synthetic mouse event
	        if (isTouch) {
	            recordTouches.call(this, inputEvent, inputData);
	        } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
	            return;
	        }
	
	        this.callback(manager, inputEvent, inputData);
	    },
	
	    /**
	     * remove the event listeners
	     */
	    destroy: function destroy() {
	        this.touch.destroy();
	        this.mouse.destroy();
	    }
	});
	
	function recordTouches(eventType, eventData) {
	    if (eventType & INPUT_START) {
	        this.primaryTouch = eventData.changedPointers[0].identifier;
	        setLastTouch.call(this, eventData);
	    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
	        setLastTouch.call(this, eventData);
	    }
	}
	
	function setLastTouch(eventData) {
	    var touch = eventData.changedPointers[0];
	
	    if (touch.identifier === this.primaryTouch) {
	        var lastTouch = {x: touch.clientX, y: touch.clientY};
	        this.lastTouches.push(lastTouch);
	        var lts = this.lastTouches;
	        var removeLastTouch = function() {
	            var i = lts.indexOf(lastTouch);
	            if (i > -1) {
	                lts.splice(i, 1);
	            }
	        };
	        setTimeout(removeLastTouch, DEDUP_TIMEOUT);
	    }
	}
	
	function isSyntheticEvent(eventData) {
	    var x = eventData.srcEvent.clientX, y = eventData.srcEvent.clientY;
	    for (var i = 0; i < this.lastTouches.length; i++) {
	        var t = this.lastTouches[i];
	        var dx = Math.abs(x - t.x), dy = Math.abs(y - t.y);
	        if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
	            return true;
	        }
	    }
	    return false;
	}
	
	var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
	var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;
	
	// magical touchAction value
	var TOUCH_ACTION_COMPUTE = 'compute';
	var TOUCH_ACTION_AUTO = 'auto';
	var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
	var TOUCH_ACTION_NONE = 'none';
	var TOUCH_ACTION_PAN_X = 'pan-x';
	var TOUCH_ACTION_PAN_Y = 'pan-y';
	var TOUCH_ACTION_MAP = getTouchActionProps();
	
	/**
	 * Touch Action
	 * sets the touchAction property or uses the js alternative
	 * @param {Manager} manager
	 * @param {String} value
	 * @constructor
	 */
	function TouchAction(manager, value) {
	    this.manager = manager;
	    this.set(value);
	}
	
	TouchAction.prototype = {
	    /**
	     * set the touchAction value on the element or enable the polyfill
	     * @param {String} value
	     */
	    set: function(value) {
	        // find out the touch-action by the event handlers
	        if (value == TOUCH_ACTION_COMPUTE) {
	            value = this.compute();
	        }
	
	        if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
	            this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
	        }
	        this.actions = value.toLowerCase().trim();
	    },
	
	    /**
	     * just re-set the touchAction value
	     */
	    update: function() {
	        this.set(this.manager.options.touchAction);
	    },
	
	    /**
	     * compute the value for the touchAction property based on the recognizer's settings
	     * @returns {String} value
	     */
	    compute: function() {
	        var actions = [];
	        each(this.manager.recognizers, function(recognizer) {
	            if (boolOrFn(recognizer.options.enable, [recognizer])) {
	                actions = actions.concat(recognizer.getTouchAction());
	            }
	        });
	        return cleanTouchActions(actions.join(' '));
	    },
	
	    /**
	     * this method is called on each input cycle and provides the preventing of the browser behavior
	     * @param {Object} input
	     */
	    preventDefaults: function(input) {
	        var srcEvent = input.srcEvent;
	        var direction = input.offsetDirection;
	
	        // if the touch action did prevented once this session
	        if (this.manager.session.prevented) {
	            srcEvent.preventDefault();
	            return;
	        }
	
	        var actions = this.actions;
	        var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
	        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
	        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];
	
	        if (hasNone) {
	            //do not prevent defaults if this is a tap gesture
	
	            var isTapPointer = input.pointers.length === 1;
	            var isTapMovement = input.distance < 2;
	            var isTapTouchTime = input.deltaTime < 250;
	
	            if (isTapPointer && isTapMovement && isTapTouchTime) {
	                return;
	            }
	        }
	
	        if (hasPanX && hasPanY) {
	            // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
	            return;
	        }
	
	        if (hasNone ||
	            (hasPanY && direction & DIRECTION_HORIZONTAL) ||
	            (hasPanX && direction & DIRECTION_VERTICAL)) {
	            return this.preventSrc(srcEvent);
	        }
	    },
	
	    /**
	     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
	     * @param {Object} srcEvent
	     */
	    preventSrc: function(srcEvent) {
	        this.manager.session.prevented = true;
	        srcEvent.preventDefault();
	    }
	};
	
	/**
	 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
	 * @param {String} actions
	 * @returns {*}
	 */
	function cleanTouchActions(actions) {
	    // none
	    if (inStr(actions, TOUCH_ACTION_NONE)) {
	        return TOUCH_ACTION_NONE;
	    }
	
	    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
	    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);
	
	    // if both pan-x and pan-y are set (different recognizers
	    // for different directions, e.g. horizontal pan but vertical swipe?)
	    // we need none (as otherwise with pan-x pan-y combined none of these
	    // recognizers will work, since the browser would handle all panning
	    if (hasPanX && hasPanY) {
	        return TOUCH_ACTION_NONE;
	    }
	
	    // pan-x OR pan-y
	    if (hasPanX || hasPanY) {
	        return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
	    }
	
	    // manipulation
	    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
	        return TOUCH_ACTION_MANIPULATION;
	    }
	
	    return TOUCH_ACTION_AUTO;
	}
	
	function getTouchActionProps() {
	    if (!NATIVE_TOUCH_ACTION) {
	        return false;
	    }
	    var touchMap = {};
	    var cssSupports = window.CSS && window.CSS.supports;
	    ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function(val) {
	
	        // If css.supports is not supported but there is native touch-action assume it supports
	        // all values. This is the case for IE 10 and 11.
	        touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
	    });
	    return touchMap;
	}
	
	/**
	 * Recognizer flow explained; *
	 * All recognizers have the initial state of POSSIBLE when a input session starts.
	 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
	 * Example session for mouse-input: mousedown -> mousemove -> mouseup
	 *
	 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
	 * which determines with state it should be.
	 *
	 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
	 * POSSIBLE to give it another change on the next cycle.
	 *
	 *               Possible
	 *                  |
	 *            +-----+---------------+
	 *            |                     |
	 *      +-----+-----+               |
	 *      |           |               |
	 *   Failed      Cancelled          |
	 *                          +-------+------+
	 *                          |              |
	 *                      Recognized       Began
	 *                                         |
	 *                                      Changed
	 *                                         |
	 *                                  Ended/Recognized
	 */
	var STATE_POSSIBLE = 1;
	var STATE_BEGAN = 2;
	var STATE_CHANGED = 4;
	var STATE_ENDED = 8;
	var STATE_RECOGNIZED = STATE_ENDED;
	var STATE_CANCELLED = 16;
	var STATE_FAILED = 32;
	
	/**
	 * Recognizer
	 * Every recognizer needs to extend from this class.
	 * @constructor
	 * @param {Object} options
	 */
	function Recognizer(options) {
	    this.options = assign({}, this.defaults, options || {});
	
	    this.id = uniqueId();
	
	    this.manager = null;
	
	    // default is enable true
	    this.options.enable = ifUndefined(this.options.enable, true);
	
	    this.state = STATE_POSSIBLE;
	
	    this.simultaneous = {};
	    this.requireFail = [];
	}
	
	Recognizer.prototype = {
	    /**
	     * @virtual
	     * @type {Object}
	     */
	    defaults: {},
	
	    /**
	     * set options
	     * @param {Object} options
	     * @return {Recognizer}
	     */
	    set: function(options) {
	        assign(this.options, options);
	
	        // also update the touchAction, in case something changed about the directions/enabled state
	        this.manager && this.manager.touchAction.update();
	        return this;
	    },
	
	    /**
	     * recognize simultaneous with an other recognizer.
	     * @param {Recognizer} otherRecognizer
	     * @returns {Recognizer} this
	     */
	    recognizeWith: function(otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
	            return this;
	        }
	
	        var simultaneous = this.simultaneous;
	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	        if (!simultaneous[otherRecognizer.id]) {
	            simultaneous[otherRecognizer.id] = otherRecognizer;
	            otherRecognizer.recognizeWith(this);
	        }
	        return this;
	    },
	
	    /**
	     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
	     * @param {Recognizer} otherRecognizer
	     * @returns {Recognizer} this
	     */
	    dropRecognizeWith: function(otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
	            return this;
	        }
	
	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	        delete this.simultaneous[otherRecognizer.id];
	        return this;
	    },
	
	    /**
	     * recognizer can only run when an other is failing
	     * @param {Recognizer} otherRecognizer
	     * @returns {Recognizer} this
	     */
	    requireFailure: function(otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
	            return this;
	        }
	
	        var requireFail = this.requireFail;
	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	        if (inArray(requireFail, otherRecognizer) === -1) {
	            requireFail.push(otherRecognizer);
	            otherRecognizer.requireFailure(this);
	        }
	        return this;
	    },
	
	    /**
	     * drop the requireFailure link. it does not remove the link on the other recognizer.
	     * @param {Recognizer} otherRecognizer
	     * @returns {Recognizer} this
	     */
	    dropRequireFailure: function(otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
	            return this;
	        }
	
	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	        var index = inArray(this.requireFail, otherRecognizer);
	        if (index > -1) {
	            this.requireFail.splice(index, 1);
	        }
	        return this;
	    },
	
	    /**
	     * has require failures boolean
	     * @returns {boolean}
	     */
	    hasRequireFailures: function() {
	        return this.requireFail.length > 0;
	    },
	
	    /**
	     * if the recognizer can recognize simultaneous with an other recognizer
	     * @param {Recognizer} otherRecognizer
	     * @returns {Boolean}
	     */
	    canRecognizeWith: function(otherRecognizer) {
	        return !!this.simultaneous[otherRecognizer.id];
	    },
	
	    /**
	     * You should use `tryEmit` instead of `emit` directly to check
	     * that all the needed recognizers has failed before emitting.
	     * @param {Object} input
	     */
	    emit: function(input) {
	        var self = this;
	        var state = this.state;
	
	        function emit(event) {
	            self.manager.emit(event, input);
	        }
	
	        // 'panstart' and 'panmove'
	        if (state < STATE_ENDED) {
	            emit(self.options.event + stateStr(state));
	        }
	
	        emit(self.options.event); // simple 'eventName' events
	
	        if (input.additionalEvent) { // additional event(panleft, panright, pinchin, pinchout...)
	            emit(input.additionalEvent);
	        }
	
	        // panend and pancancel
	        if (state >= STATE_ENDED) {
	            emit(self.options.event + stateStr(state));
	        }
	    },
	
	    /**
	     * Check that all the require failure recognizers has failed,
	     * if true, it emits a gesture event,
	     * otherwise, setup the state to FAILED.
	     * @param {Object} input
	     */
	    tryEmit: function(input) {
	        if (this.canEmit()) {
	            return this.emit(input);
	        }
	        // it's failing anyway
	        this.state = STATE_FAILED;
	    },
	
	    /**
	     * can we emit?
	     * @returns {boolean}
	     */
	    canEmit: function() {
	        var i = 0;
	        while (i < this.requireFail.length) {
	            if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
	                return false;
	            }
	            i++;
	        }
	        return true;
	    },
	
	    /**
	     * update the recognizer
	     * @param {Object} inputData
	     */
	    recognize: function(inputData) {
	        // make a new copy of the inputData
	        // so we can change the inputData without messing up the other recognizers
	        var inputDataClone = assign({}, inputData);
	
	        // is is enabled and allow recognizing?
	        if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
	            this.reset();
	            this.state = STATE_FAILED;
	            return;
	        }
	
	        // reset when we've reached the end
	        if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
	            this.state = STATE_POSSIBLE;
	        }
	
	        this.state = this.process(inputDataClone);
	
	        // the recognizer has recognized a gesture
	        // so trigger an event
	        if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
	            this.tryEmit(inputDataClone);
	        }
	    },
	
	    /**
	     * return the state of the recognizer
	     * the actual recognizing happens in this method
	     * @virtual
	     * @param {Object} inputData
	     * @returns {Const} STATE
	     */
	    process: function(inputData) { }, // jshint ignore:line
	
	    /**
	     * return the preferred touch-action
	     * @virtual
	     * @returns {Array}
	     */
	    getTouchAction: function() { },
	
	    /**
	     * called when the gesture isn't allowed to recognize
	     * like when another is being recognized or it is disabled
	     * @virtual
	     */
	    reset: function() { }
	};
	
	/**
	 * get a usable string, used as event postfix
	 * @param {Const} state
	 * @returns {String} state
	 */
	function stateStr(state) {
	    if (state & STATE_CANCELLED) {
	        return 'cancel';
	    } else if (state & STATE_ENDED) {
	        return 'end';
	    } else if (state & STATE_CHANGED) {
	        return 'move';
	    } else if (state & STATE_BEGAN) {
	        return 'start';
	    }
	    return '';
	}
	
	/**
	 * direction cons to string
	 * @param {Const} direction
	 * @returns {String}
	 */
	function directionStr(direction) {
	    if (direction == DIRECTION_DOWN) {
	        return 'down';
	    } else if (direction == DIRECTION_UP) {
	        return 'up';
	    } else if (direction == DIRECTION_LEFT) {
	        return 'left';
	    } else if (direction == DIRECTION_RIGHT) {
	        return 'right';
	    }
	    return '';
	}
	
	/**
	 * get a recognizer by name if it is bound to a manager
	 * @param {Recognizer|String} otherRecognizer
	 * @param {Recognizer} recognizer
	 * @returns {Recognizer}
	 */
	function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
	    var manager = recognizer.manager;
	    if (manager) {
	        return manager.get(otherRecognizer);
	    }
	    return otherRecognizer;
	}
	
	/**
	 * This recognizer is just used as a base for the simple attribute recognizers.
	 * @constructor
	 * @extends Recognizer
	 */
	function AttrRecognizer() {
	    Recognizer.apply(this, arguments);
	}
	
	inherit(AttrRecognizer, Recognizer, {
	    /**
	     * @namespace
	     * @memberof AttrRecognizer
	     */
	    defaults: {
	        /**
	         * @type {Number}
	         * @default 1
	         */
	        pointers: 1
	    },
	
	    /**
	     * Used to check if it the recognizer receives valid input, like input.distance > 10.
	     * @memberof AttrRecognizer
	     * @param {Object} input
	     * @returns {Boolean} recognized
	     */
	    attrTest: function(input) {
	        var optionPointers = this.options.pointers;
	        return optionPointers === 0 || input.pointers.length === optionPointers;
	    },
	
	    /**
	     * Process the input and return the state for the recognizer
	     * @memberof AttrRecognizer
	     * @param {Object} input
	     * @returns {*} State
	     */
	    process: function(input) {
	        var state = this.state;
	        var eventType = input.eventType;
	
	        var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
	        var isValid = this.attrTest(input);
	
	        // on cancel input and we've recognized before, return STATE_CANCELLED
	        if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
	            return state | STATE_CANCELLED;
	        } else if (isRecognized || isValid) {
	            if (eventType & INPUT_END) {
	                return state | STATE_ENDED;
	            } else if (!(state & STATE_BEGAN)) {
	                return STATE_BEGAN;
	            }
	            return state | STATE_CHANGED;
	        }
	        return STATE_FAILED;
	    }
	});
	
	/**
	 * Pan
	 * Recognized when the pointer is down and moved in the allowed direction.
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function PanRecognizer() {
	    AttrRecognizer.apply(this, arguments);
	
	    this.pX = null;
	    this.pY = null;
	}
	
	inherit(PanRecognizer, AttrRecognizer, {
	    /**
	     * @namespace
	     * @memberof PanRecognizer
	     */
	    defaults: {
	        event: 'pan',
	        threshold: 10,
	        pointers: 1,
	        direction: DIRECTION_ALL
	    },
	
	    getTouchAction: function() {
	        var direction = this.options.direction;
	        var actions = [];
	        if (direction & DIRECTION_HORIZONTAL) {
	            actions.push(TOUCH_ACTION_PAN_Y);
	        }
	        if (direction & DIRECTION_VERTICAL) {
	            actions.push(TOUCH_ACTION_PAN_X);
	        }
	        return actions;
	    },
	
	    directionTest: function(input) {
	        var options = this.options;
	        var hasMoved = true;
	        var distance = input.distance;
	        var direction = input.direction;
	        var x = input.deltaX;
	        var y = input.deltaY;
	
	        // lock to axis?
	        if (!(direction & options.direction)) {
	            if (options.direction & DIRECTION_HORIZONTAL) {
	                direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
	                hasMoved = x != this.pX;
	                distance = Math.abs(input.deltaX);
	            } else {
	                direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
	                hasMoved = y != this.pY;
	                distance = Math.abs(input.deltaY);
	            }
	        }
	        input.direction = direction;
	        return hasMoved && distance > options.threshold && direction & options.direction;
	    },
	
	    attrTest: function(input) {
	        return AttrRecognizer.prototype.attrTest.call(this, input) &&
	            (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));
	    },
	
	    emit: function(input) {
	
	        this.pX = input.deltaX;
	        this.pY = input.deltaY;
	
	        var direction = directionStr(input.direction);
	
	        if (direction) {
	            input.additionalEvent = this.options.event + direction;
	        }
	        this._super.emit.call(this, input);
	    }
	});
	
	/**
	 * Pinch
	 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function PinchRecognizer() {
	    AttrRecognizer.apply(this, arguments);
	}
	
	inherit(PinchRecognizer, AttrRecognizer, {
	    /**
	     * @namespace
	     * @memberof PinchRecognizer
	     */
	    defaults: {
	        event: 'pinch',
	        threshold: 0,
	        pointers: 2
	    },
	
	    getTouchAction: function() {
	        return [TOUCH_ACTION_NONE];
	    },
	
	    attrTest: function(input) {
	        return this._super.attrTest.call(this, input) &&
	            (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
	    },
	
	    emit: function(input) {
	        if (input.scale !== 1) {
	            var inOut = input.scale < 1 ? 'in' : 'out';
	            input.additionalEvent = this.options.event + inOut;
	        }
	        this._super.emit.call(this, input);
	    }
	});
	
	/**
	 * Press
	 * Recognized when the pointer is down for x ms without any movement.
	 * @constructor
	 * @extends Recognizer
	 */
	function PressRecognizer() {
	    Recognizer.apply(this, arguments);
	
	    this._timer = null;
	    this._input = null;
	}
	
	inherit(PressRecognizer, Recognizer, {
	    /**
	     * @namespace
	     * @memberof PressRecognizer
	     */
	    defaults: {
	        event: 'press',
	        pointers: 1,
	        time: 251, // minimal time of the pointer to be pressed
	        threshold: 9 // a minimal movement is ok, but keep it low
	    },
	
	    getTouchAction: function() {
	        return [TOUCH_ACTION_AUTO];
	    },
	
	    process: function(input) {
	        var options = this.options;
	        var validPointers = input.pointers.length === options.pointers;
	        var validMovement = input.distance < options.threshold;
	        var validTime = input.deltaTime > options.time;
	
	        this._input = input;
	
	        // we only allow little movement
	        // and we've reached an end event, so a tap is possible
	        if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
	            this.reset();
	        } else if (input.eventType & INPUT_START) {
	            this.reset();
	            this._timer = setTimeoutContext(function() {
	                this.state = STATE_RECOGNIZED;
	                this.tryEmit();
	            }, options.time, this);
	        } else if (input.eventType & INPUT_END) {
	            return STATE_RECOGNIZED;
	        }
	        return STATE_FAILED;
	    },
	
	    reset: function() {
	        clearTimeout(this._timer);
	    },
	
	    emit: function(input) {
	        if (this.state !== STATE_RECOGNIZED) {
	            return;
	        }
	
	        if (input && (input.eventType & INPUT_END)) {
	            this.manager.emit(this.options.event + 'up', input);
	        } else {
	            this._input.timeStamp = now();
	            this.manager.emit(this.options.event, this._input);
	        }
	    }
	});
	
	/**
	 * Rotate
	 * Recognized when two or more pointer are moving in a circular motion.
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function RotateRecognizer() {
	    AttrRecognizer.apply(this, arguments);
	}
	
	inherit(RotateRecognizer, AttrRecognizer, {
	    /**
	     * @namespace
	     * @memberof RotateRecognizer
	     */
	    defaults: {
	        event: 'rotate',
	        threshold: 0,
	        pointers: 2
	    },
	
	    getTouchAction: function() {
	        return [TOUCH_ACTION_NONE];
	    },
	
	    attrTest: function(input) {
	        return this._super.attrTest.call(this, input) &&
	            (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
	    }
	});
	
	/**
	 * Swipe
	 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function SwipeRecognizer() {
	    AttrRecognizer.apply(this, arguments);
	}
	
	inherit(SwipeRecognizer, AttrRecognizer, {
	    /**
	     * @namespace
	     * @memberof SwipeRecognizer
	     */
	    defaults: {
	        event: 'swipe',
	        threshold: 10,
	        velocity: 0.3,
	        direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
	        pointers: 1
	    },
	
	    getTouchAction: function() {
	        return PanRecognizer.prototype.getTouchAction.call(this);
	    },
	
	    attrTest: function(input) {
	        var direction = this.options.direction;
	        var velocity;
	
	        if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
	            velocity = input.overallVelocity;
	        } else if (direction & DIRECTION_HORIZONTAL) {
	            velocity = input.overallVelocityX;
	        } else if (direction & DIRECTION_VERTICAL) {
	            velocity = input.overallVelocityY;
	        }
	
	        return this._super.attrTest.call(this, input) &&
	            direction & input.offsetDirection &&
	            input.distance > this.options.threshold &&
	            input.maxPointers == this.options.pointers &&
	            abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
	    },
	
	    emit: function(input) {
	        var direction = directionStr(input.offsetDirection);
	        if (direction) {
	            this.manager.emit(this.options.event + direction, input);
	        }
	
	        this.manager.emit(this.options.event, input);
	    }
	});
	
	/**
	 * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
	 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
	 * a single tap.
	 *
	 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
	 * multi-taps being recognized.
	 * @constructor
	 * @extends Recognizer
	 */
	function TapRecognizer() {
	    Recognizer.apply(this, arguments);
	
	    // previous time and center,
	    // used for tap counting
	    this.pTime = false;
	    this.pCenter = false;
	
	    this._timer = null;
	    this._input = null;
	    this.count = 0;
	}
	
	inherit(TapRecognizer, Recognizer, {
	    /**
	     * @namespace
	     * @memberof PinchRecognizer
	     */
	    defaults: {
	        event: 'tap',
	        pointers: 1,
	        taps: 1,
	        interval: 300, // max time between the multi-tap taps
	        time: 250, // max time of the pointer to be down (like finger on the screen)
	        threshold: 9, // a minimal movement is ok, but keep it low
	        posThreshold: 10 // a multi-tap can be a bit off the initial position
	    },
	
	    getTouchAction: function() {
	        return [TOUCH_ACTION_MANIPULATION];
	    },
	
	    process: function(input) {
	        var options = this.options;
	
	        var validPointers = input.pointers.length === options.pointers;
	        var validMovement = input.distance < options.threshold;
	        var validTouchTime = input.deltaTime < options.time;
	
	        this.reset();
	
	        if ((input.eventType & INPUT_START) && (this.count === 0)) {
	            return this.failTimeout();
	        }
	
	        // we only allow little movement
	        // and we've reached an end event, so a tap is possible
	        if (validMovement && validTouchTime && validPointers) {
	            if (input.eventType != INPUT_END) {
	                return this.failTimeout();
	            }
	
	            var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
	            var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;
	
	            this.pTime = input.timeStamp;
	            this.pCenter = input.center;
	
	            if (!validMultiTap || !validInterval) {
	                this.count = 1;
	            } else {
	                this.count += 1;
	            }
	
	            this._input = input;
	
	            // if tap count matches we have recognized it,
	            // else it has began recognizing...
	            var tapCount = this.count % options.taps;
	            if (tapCount === 0) {
	                // no failing requirements, immediately trigger the tap event
	                // or wait as long as the multitap interval to trigger
	                if (!this.hasRequireFailures()) {
	                    return STATE_RECOGNIZED;
	                } else {
	                    this._timer = setTimeoutContext(function() {
	                        this.state = STATE_RECOGNIZED;
	                        this.tryEmit();
	                    }, options.interval, this);
	                    return STATE_BEGAN;
	                }
	            }
	        }
	        return STATE_FAILED;
	    },
	
	    failTimeout: function() {
	        this._timer = setTimeoutContext(function() {
	            this.state = STATE_FAILED;
	        }, this.options.interval, this);
	        return STATE_FAILED;
	    },
	
	    reset: function() {
	        clearTimeout(this._timer);
	    },
	
	    emit: function() {
	        if (this.state == STATE_RECOGNIZED) {
	            this._input.tapCount = this.count;
	            this.manager.emit(this.options.event, this._input);
	        }
	    }
	});
	
	/**
	 * Simple way to create a manager with a default set of recognizers.
	 * @param {HTMLElement} element
	 * @param {Object} [options]
	 * @constructor
	 */
	function Hammer(element, options) {
	    options = options || {};
	    options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
	    return new Manager(element, options);
	}
	
	/**
	 * @const {string}
	 */
	Hammer.VERSION = '2.0.7';
	
	/**
	 * default settings
	 * @namespace
	 */
	Hammer.defaults = {
	    /**
	     * set if DOM events are being triggered.
	     * But this is slower and unused by simple implementations, so disabled by default.
	     * @type {Boolean}
	     * @default false
	     */
	    domEvents: false,
	
	    /**
	     * The value for the touchAction property/fallback.
	     * When set to `compute` it will magically set the correct value based on the added recognizers.
	     * @type {String}
	     * @default compute
	     */
	    touchAction: TOUCH_ACTION_COMPUTE,
	
	    /**
	     * @type {Boolean}
	     * @default true
	     */
	    enable: true,
	
	    /**
	     * EXPERIMENTAL FEATURE -- can be removed/changed
	     * Change the parent input target element.
	     * If Null, then it is being set the to main element.
	     * @type {Null|EventTarget}
	     * @default null
	     */
	    inputTarget: null,
	
	    /**
	     * force an input class
	     * @type {Null|Function}
	     * @default null
	     */
	    inputClass: null,
	
	    /**
	     * Default recognizer setup when calling `Hammer()`
	     * When creating a new Manager these will be skipped.
	     * @type {Array}
	     */
	    preset: [
	        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
	        [RotateRecognizer, {enable: false}],
	        [PinchRecognizer, {enable: false}, ['rotate']],
	        [SwipeRecognizer, {direction: DIRECTION_HORIZONTAL}],
	        [PanRecognizer, {direction: DIRECTION_HORIZONTAL}, ['swipe']],
	        [TapRecognizer],
	        [TapRecognizer, {event: 'doubletap', taps: 2}, ['tap']],
	        [PressRecognizer]
	    ],
	
	    /**
	     * Some CSS properties can be used to improve the working of Hammer.
	     * Add them to this method and they will be set when creating a new Manager.
	     * @namespace
	     */
	    cssProps: {
	        /**
	         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
	         * @type {String}
	         * @default 'none'
	         */
	        userSelect: 'none',
	
	        /**
	         * Disable the Windows Phone grippers when pressing an element.
	         * @type {String}
	         * @default 'none'
	         */
	        touchSelect: 'none',
	
	        /**
	         * Disables the default callout shown when you touch and hold a touch target.
	         * On iOS, when you touch and hold a touch target such as a link, Safari displays
	         * a callout containing information about the link. This property allows you to disable that callout.
	         * @type {String}
	         * @default 'none'
	         */
	        touchCallout: 'none',
	
	        /**
	         * Specifies whether zooming is enabled. Used by IE10>
	         * @type {String}
	         * @default 'none'
	         */
	        contentZooming: 'none',
	
	        /**
	         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
	         * @type {String}
	         * @default 'none'
	         */
	        userDrag: 'none',
	
	        /**
	         * Overrides the highlight color shown when the user taps a link or a JavaScript
	         * clickable element in iOS. This property obeys the alpha value, if specified.
	         * @type {String}
	         * @default 'rgba(0,0,0,0)'
	         */
	        tapHighlightColor: 'rgba(0,0,0,0)'
	    }
	};
	
	var STOP = 1;
	var FORCED_STOP = 2;
	
	/**
	 * Manager
	 * @param {HTMLElement} element
	 * @param {Object} [options]
	 * @constructor
	 */
	function Manager(element, options) {
	    this.options = assign({}, Hammer.defaults, options || {});
	
	    this.options.inputTarget = this.options.inputTarget || element;
	
	    this.handlers = {};
	    this.session = {};
	    this.recognizers = [];
	    this.oldCssProps = {};
	
	    this.element = element;
	    this.input = createInputInstance(this);
	    this.touchAction = new TouchAction(this, this.options.touchAction);
	
	    toggleCssProps(this, true);
	
	    each(this.options.recognizers, function(item) {
	        var recognizer = this.add(new (item[0])(item[1]));
	        item[2] && recognizer.recognizeWith(item[2]);
	        item[3] && recognizer.requireFailure(item[3]);
	    }, this);
	}
	
	Manager.prototype = {
	    /**
	     * set options
	     * @param {Object} options
	     * @returns {Manager}
	     */
	    set: function(options) {
	        assign(this.options, options);
	
	        // Options that need a little more setup
	        if (options.touchAction) {
	            this.touchAction.update();
	        }
	        if (options.inputTarget) {
	            // Clean up existing event listeners and reinitialize
	            this.input.destroy();
	            this.input.target = options.inputTarget;
	            this.input.init();
	        }
	        return this;
	    },
	
	    /**
	     * stop recognizing for this session.
	     * This session will be discarded, when a new [input]start event is fired.
	     * When forced, the recognizer cycle is stopped immediately.
	     * @param {Boolean} [force]
	     */
	    stop: function(force) {
	        this.session.stopped = force ? FORCED_STOP : STOP;
	    },
	
	    /**
	     * run the recognizers!
	     * called by the inputHandler function on every movement of the pointers (touches)
	     * it walks through all the recognizers and tries to detect the gesture that is being made
	     * @param {Object} inputData
	     */
	    recognize: function(inputData) {
	        var session = this.session;
	        if (session.stopped) {
	            return;
	        }
	
	        // run the touch-action polyfill
	        this.touchAction.preventDefaults(inputData);
	
	        var recognizer;
	        var recognizers = this.recognizers;
	
	        // this holds the recognizer that is being recognized.
	        // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
	        // if no recognizer is detecting a thing, it is set to `null`
	        var curRecognizer = session.curRecognizer;
	
	        // reset when the last recognizer is recognized
	        // or when we're in a new session
	        if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
	            curRecognizer = session.curRecognizer = null;
	        }
	
	        var i = 0;
	        while (i < recognizers.length) {
	            recognizer = recognizers[i];
	
	            // find out if we are allowed try to recognize the input for this one.
	            // 1.   allow if the session is NOT forced stopped (see the .stop() method)
	            // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
	            //      that is being recognized.
	            // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
	            //      this can be setup with the `recognizeWith()` method on the recognizer.
	            if (session.stopped !== FORCED_STOP && ( // 1
	                    !curRecognizer || recognizer == curRecognizer || // 2
	                    recognizer.canRecognizeWith(curRecognizer))) { // 3
	                recognizer.recognize(inputData);
	            } else {
	                recognizer.reset();
	            }
	
	            // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
	            // current active recognizer. but only if we don't already have an active recognizer
	            if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
	                curRecognizer = session.curRecognizer = recognizer;
	            }
	            i++;
	        }
	    },
	
	    /**
	     * get a recognizer by its event name.
	     * @param {Recognizer|String} recognizer
	     * @returns {Recognizer|Null}
	     */
	    get: function(recognizer) {
	        if (recognizer instanceof Recognizer) {
	            return recognizer;
	        }
	
	        var recognizers = this.recognizers;
	        for (var i = 0; i < recognizers.length; i++) {
	            if (recognizers[i].options.event == recognizer) {
	                return recognizers[i];
	            }
	        }
	        return null;
	    },
	
	    /**
	     * add a recognizer to the manager
	     * existing recognizers with the same event name will be removed
	     * @param {Recognizer} recognizer
	     * @returns {Recognizer|Manager}
	     */
	    add: function(recognizer) {
	        if (invokeArrayArg(recognizer, 'add', this)) {
	            return this;
	        }
	
	        // remove existing
	        var existing = this.get(recognizer.options.event);
	        if (existing) {
	            this.remove(existing);
	        }
	
	        this.recognizers.push(recognizer);
	        recognizer.manager = this;
	
	        this.touchAction.update();
	        return recognizer;
	    },
	
	    /**
	     * remove a recognizer by name or instance
	     * @param {Recognizer|String} recognizer
	     * @returns {Manager}
	     */
	    remove: function(recognizer) {
	        if (invokeArrayArg(recognizer, 'remove', this)) {
	            return this;
	        }
	
	        recognizer = this.get(recognizer);
	
	        // let's make sure this recognizer exists
	        if (recognizer) {
	            var recognizers = this.recognizers;
	            var index = inArray(recognizers, recognizer);
	
	            if (index !== -1) {
	                recognizers.splice(index, 1);
	                this.touchAction.update();
	            }
	        }
	
	        return this;
	    },
	
	    /**
	     * bind event
	     * @param {String} events
	     * @param {Function} handler
	     * @returns {EventEmitter} this
	     */
	    on: function(events, handler) {
	        if (events === undefined) {
	            return;
	        }
	        if (handler === undefined) {
	            return;
	        }
	
	        var handlers = this.handlers;
	        each(splitStr(events), function(event) {
	            handlers[event] = handlers[event] || [];
	            handlers[event].push(handler);
	        });
	        return this;
	    },
	
	    /**
	     * unbind event, leave emit blank to remove all handlers
	     * @param {String} events
	     * @param {Function} [handler]
	     * @returns {EventEmitter} this
	     */
	    off: function(events, handler) {
	        if (events === undefined) {
	            return;
	        }
	
	        var handlers = this.handlers;
	        each(splitStr(events), function(event) {
	            if (!handler) {
	                delete handlers[event];
	            } else {
	                handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
	            }
	        });
	        return this;
	    },
	
	    /**
	     * emit event to the listeners
	     * @param {String} event
	     * @param {Object} data
	     */
	    emit: function(event, data) {
	        // we also want to trigger dom events
	        if (this.options.domEvents) {
	            triggerDomEvent(event, data);
	        }
	
	        // no handlers, so skip it all
	        var handlers = this.handlers[event] && this.handlers[event].slice();
	        if (!handlers || !handlers.length) {
	            return;
	        }
	
	        data.type = event;
	        data.preventDefault = function() {
	            data.srcEvent.preventDefault();
	        };
	
	        var i = 0;
	        while (i < handlers.length) {
	            handlers[i](data);
	            i++;
	        }
	    },
	
	    /**
	     * destroy the manager and unbinds all events
	     * it doesn't unbind dom events, that is the user own responsibility
	     */
	    destroy: function() {
	        this.element && toggleCssProps(this, false);
	
	        this.handlers = {};
	        this.session = {};
	        this.input.destroy();
	        this.element = null;
	    }
	};
	
	/**
	 * add/remove the css properties as defined in manager.options.cssProps
	 * @param {Manager} manager
	 * @param {Boolean} add
	 */
	function toggleCssProps(manager, add) {
	    var element = manager.element;
	    if (!element.style) {
	        return;
	    }
	    var prop;
	    each(manager.options.cssProps, function(value, name) {
	        prop = prefixed(element.style, name);
	        if (add) {
	            manager.oldCssProps[prop] = element.style[prop];
	            element.style[prop] = value;
	        } else {
	            element.style[prop] = manager.oldCssProps[prop] || '';
	        }
	    });
	    if (!add) {
	        manager.oldCssProps = {};
	    }
	}
	
	/**
	 * trigger dom event
	 * @param {String} event
	 * @param {Object} data
	 */
	function triggerDomEvent(event, data) {
	    var gestureEvent = document.createEvent('Event');
	    gestureEvent.initEvent(event, true, true);
	    gestureEvent.gesture = data;
	    data.target.dispatchEvent(gestureEvent);
	}
	
	assign(Hammer, {
	    INPUT_START: INPUT_START,
	    INPUT_MOVE: INPUT_MOVE,
	    INPUT_END: INPUT_END,
	    INPUT_CANCEL: INPUT_CANCEL,
	
	    STATE_POSSIBLE: STATE_POSSIBLE,
	    STATE_BEGAN: STATE_BEGAN,
	    STATE_CHANGED: STATE_CHANGED,
	    STATE_ENDED: STATE_ENDED,
	    STATE_RECOGNIZED: STATE_RECOGNIZED,
	    STATE_CANCELLED: STATE_CANCELLED,
	    STATE_FAILED: STATE_FAILED,
	
	    DIRECTION_NONE: DIRECTION_NONE,
	    DIRECTION_LEFT: DIRECTION_LEFT,
	    DIRECTION_RIGHT: DIRECTION_RIGHT,
	    DIRECTION_UP: DIRECTION_UP,
	    DIRECTION_DOWN: DIRECTION_DOWN,
	    DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
	    DIRECTION_VERTICAL: DIRECTION_VERTICAL,
	    DIRECTION_ALL: DIRECTION_ALL,
	
	    Manager: Manager,
	    Input: Input,
	    TouchAction: TouchAction,
	
	    TouchInput: TouchInput,
	    MouseInput: MouseInput,
	    PointerEventInput: PointerEventInput,
	    TouchMouseInput: TouchMouseInput,
	    SingleTouchInput: SingleTouchInput,
	
	    Recognizer: Recognizer,
	    AttrRecognizer: AttrRecognizer,
	    Tap: TapRecognizer,
	    Pan: PanRecognizer,
	    Swipe: SwipeRecognizer,
	    Pinch: PinchRecognizer,
	    Rotate: RotateRecognizer,
	    Press: PressRecognizer,
	
	    on: addEventListeners,
	    off: removeEventListeners,
	    each: each,
	    merge: merge,
	    extend: extend,
	    assign: assign,
	    inherit: inherit,
	    bindFn: bindFn,
	    prefixed: prefixed
	});
	
	// this prevents errors when Hammer is loaded in the presence of an AMD
	//  style loader but by script tag, not by the loader.
	var freeGlobal = (typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : {})); // jshint ignore:line
	freeGlobal.Hammer = Hammer;
	
	if (true) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	        return Hammer;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof module != 'undefined' && module.exports) {
	    module.exports = Hammer;
	} else {
	    window[exportName] = Hammer;
	}
	
	})(window, document, 'Hammer');


/***/ }
]);
//# sourceMappingURL=index.js.map