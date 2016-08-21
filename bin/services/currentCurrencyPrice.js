"use strict";
var poloniex_1 = require("../models/model/poloniex");
var index_1 = require("../constants/index");
var index_2 = require("../services/index");
var YQL = require('yql');
var poloniexValue;
var db = new index_2.rethinkdb();
var tableName = index_1.interval.tableNames[1];
var currentCurrencyPrice = (function () {
    function currentCurrencyPrice() {
        var _this = this;
        setInterval(function () {
            _this.getValue();
            try {
                db.doSave(_this.getPoloniexValue(), tableName);
            }
            catch (ex) { }
        }, index_1.interval.tick);
    }
    currentCurrencyPrice.prototype.getPoloniexValue = function () {
        return poloniexValue;
    };
    currentCurrencyPrice.prototype.getValue = function () {
        var query = new YQL('select * from yahoo.finance.xchange where pair in ("USDCOP")');
        var _poloniex;
        query.exec(function (err, data) {
            var __poloniex = data.query.results.rate;
            if (__poloniex) {
                _poloniex = {
                    baseVolume: parseFloat(__poloniex.Rate),
                    high24hr: 0,
                    highestBid: 0,
                    isFrozen: 0,
                    last: parseFloat(__poloniex.Rate),
                    low24hr: 0,
                    lowestAsk: parseFloat(__poloniex.Rate),
                    percentChange: 0,
                    quoteVolume: 0,
                    date: new Date(),
                    epoch: 0,
                    currencyPair: "USDCOP"
                };
                poloniexValue = _poloniex;
            }
            else {
                return new poloniex_1.poloniex(0, 0, 0, 0, 0, 0, 0, 0, 0, new Date(), 0, "USDCOP");
            }
        });
    };
    return currentCurrencyPrice;
}());
exports.currentCurrencyPrice = currentCurrencyPrice;
//# sourceMappingURL=currentCurrencyPrice.js.map