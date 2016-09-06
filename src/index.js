import $ from 'jquery'
import stock from './controller'
let intervalId = null;
$(function() {
    var h = document.documentElement.clientHeight / 2;
    var w = document.documentElement.clientWidth;
    var svgElement = document.getElementById("chart");
    stock.init(svgElement, w, h, true);
    addEvents();
    drawHq(true);
})

function addEvents() {
    $("input[type='button'][key]").click(function() {
        stock.setPeriod(+$(this).attr("key"));
        drawHq(false);
    });
    var chart = document.getElementById("chart");
    chart.addEventListener("touchstart", function(e) {
        stock.touchStart(e.touches[0].clientX);
    });
    chart.addEventListener("touchmove", function(e) {
        e.preventDefault();
        stock.touchMove(e.changedTouches[0].clientX);
    });
     chart.addEventListener("touchend", function(e) {
        stock.touchEnd();
    });
}

function drawHq(flag) {
    if (flag) {
        intervalId = setInterval(function() {
            stock.getPanKou();
        }, 1000);
        stock.getPanKou();
    }
    stock.getTime().done(drawHandler)
}

function drawHandler() {
    stock.draw();
}
