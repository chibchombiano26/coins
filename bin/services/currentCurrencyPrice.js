"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../constants/index");
var index_2 = require("../services/index");
var request = require("request");
var YQL = require('yql');
var poloniexValue;
var db = new index_2.rethinkdb();
var tableName = index_1.interval.tableNames[1];
var currentCurrencyPrice = (function () {
    function currentCurrencyPrice() {
        var _this = this;
        setInterval(function () {
            try {
                db.doSave(_this.getPoloniexValue(), tableName);
            }
            catch (ex) { }
        }, index_1.interval.tick);
    }
    currentCurrencyPrice.prototype.getPoloniexValue = function () {
        return poloniexValue;
    };
    currentCurrencyPrice.prototype.getCurrency = function () {
        return new Promise(function (resolve, reject) {
            request("http://www.apilayer.net/api/live?access_key=df0ae00c0e459d1d2031710b64038d47&format=1", function (error, response, body) {
                if (error) {
                    return null;
                }
                var value = JSON.parse(body).quotes['USDCOP'];
                resolve(value);
            });
        });
    };
    return currentCurrencyPrice;
}());
exports.currentCurrencyPrice = currentCurrencyPrice;
//# sourceMappingURL=currentCurrencyPrice.js.map