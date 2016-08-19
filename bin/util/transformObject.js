"use strict";
var moment = require("moment");
var transformObject = (function () {
    function transformObject() {
    }
    transformObject.prototype.convertToObject = function (arr) {
        var data = {
            currencyPair: arr[0],
            last: parseFloat(arr[1]),
            lowestAsk: parseFloat(arr[2]),
            highestBid: parseFloat(arr[3]),
            percentChange: parseFloat(arr[4]),
            baseVolume: parseFloat(arr[5]),
            quoteVolume: parseInt(arr[6]),
            isFrozen: arr[7],
            high24hr: parseFloat(arr[8]),
            low24hr: parseFloat(arr[9]),
            date: new Date(),
            epoch: moment().valueOf()
        };
        return data;
    };
    transformObject.prototype.convertToObjectToType = function (obj) {
        var poloniex = new Object();
        poloniex.baseVolume = parseFloat(obj.baseVolume);
        poloniex.currencyPair = "";
        poloniex.date = new Date();
        poloniex.epoch = moment().valueOf();
        poloniex.high24hr = parseFloat(obj.high24hr);
        poloniex.highestBid = parseFloat(obj.highestBid);
        poloniex.isFrozen = parseInt(obj.isFrozen);
        poloniex.last = parseFloat(obj.lowestAsk);
        poloniex.low24hr = parseFloat(obj.low24hr);
        poloniex.lowestAsk = parseFloat(obj.lowestAsk);
        poloniex.percentChange = parseFloat(obj.percentChange);
        poloniex.quoteVolume = parseFloat(obj.quoteVolume);
        return poloniex;
    };
    //Convert the element to an poloniex object
    transformObject.prototype.convertToObjectArray = function (arr) {
        var poloniex = {
            currencyPair: arr[0],
            last: parseFloat(arr[1]),
            lowestAsk: parseFloat(arr[2]),
            highestBid: parseFloat(arr[3]),
            percentChange: parseFloat(arr[4]),
            baseVolume: parseFloat(arr[5]),
            quoteVolume: parseInt(arr[6]),
            isFrozen: arr[7],
            high24hr: parseFloat(arr[8]),
            low24hr: parseFloat(arr[9]),
            date: new Date(),
            epoch: moment().valueOf()
        };
        return poloniex;
    };
    transformObject.prototype.iterateProperties = function (Object) {
        var value = {};
        for (var key in Object) {
            if (Object.hasOwnProperty(key)) {
                value[key] = this.convertToObjectToType(Object[key]);
            }
        }
        return value;
    };
    return transformObject;
}());
exports.transformObject = transformObject;
//# sourceMappingURL=transformObject.js.map