/*
 * 分时线的十字线以及显示的数据
 */
import util from './commonUtil'
import constant from './constantsUtil'

let crossHair = util.createCommonG({
    "transform": "translate(0, -9999)",
    "class": "charts-tooltip"
});
let crossHair_v = util.createCommonPath({
    "stroke": constant.CROSS_LINE_COLOR,
    visibility: "hidden",
    "stroke-width": 1
});
let crossHair_h = util.createCommonPath({
    "stroke": constant.CROSS_LINE_COLOR,
    visibility: "hidden",
    "stroke-width": 1
});
let crossHair_data_path = util.createCommonPath({
    stroke: "#7cb5ec",
    "stroke-width": 1
}, crossHair);
let crossHair_data = util.createCommonText({
    style: "font-size:12px;color:#fff;fill:#fff;",
    x: 8,
    y: 5
}, crossHair);
let crossHair_data_time = util.createCommonSpan({
    x: 8,
    dy: 13
}, crossHair_data);
let crossHair_data_openPrice = util.createCommonSpan({
    x: 8,
    dy: 13
}, crossHair_data);
let crossHair_data_closePrice = util.createCommonSpan({
    x: 8,
    dy: 13
}, crossHair_data);
let crossHair_data_highPrice = util.createCommonSpan({
    x: 8,
    dy: 13
}, crossHair_data);
let crossHair_data_lowPrice = util.createCommonSpan({
    x: 8,
    dy: 13
}, crossHair_data);
var margin = {},
    height, width;
export default {
    createCrossHair: function(parent, t, l, r, b, w, h) {
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
    hidden: function() {
        crossHair_v.setAttribute("visibility", "hidden");
        crossHair_h.setAttribute("visibility", "hidden");
        crossHair.setAttribute("transform", "translate(0, -9999)");
    },
    show: function(x, y, time, op, cp, hp, lp,preCp) {
        util.setCommonAttr(crossHair_v, {
            d: "M{0},{1}L{0},{2}".format(Math.round(x), margin.top, height - margin.bottom),
            "visibility": "visible"
        });
        util.setCommonAttr(crossHair_h, {
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

        util.setCommonAttr(crossHair_data_path, {
            d: "M{0},{1}L{2},{3},L{4},{5}L{6},{7}Z".format(3, 0, 148, 0, 148, 85, 3, 85)
        })
        crossHair_data_time.textContent = "时间：" + time;
        crossHair_data_openPrice.textContent = "开盘价：" + op;
         util.setCommonAttr(crossHair_data_openPrice, {
            fill: preCp&&util.getPriceColor(op-preCp)
        })
        crossHair_data_closePrice.textContent = "收盘价：" + cp;
         util.setCommonAttr(crossHair_data_closePrice, {
            fill: preCp&&util.getPriceColor(cp-preCp)
        })
        crossHair_data_highPrice.textContent = "最高价：" + hp;
         util.setCommonAttr(crossHair_data_highPrice, {
            fill: preCp&&util.getPriceColor(hp-preCp)
        })
        crossHair_data_lowPrice.textContent = "最低价：" + lp;
         util.setCommonAttr(crossHair_data_lowPrice, {
            fill: preCp&&util.getPriceColor(lp-preCp)
        })
    }
}
