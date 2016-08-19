"use strict";
var index_1 = require("./services/index");
var index_2 = require("./util/index");
var index_3 = require("./constants/index");
var util = new index_2.transformObject();
var allCoins;
var currencyPrice = new index_1.currentCurrencyPrice();
var server = (function () {
    function server() {
        var _this = this;
        this.db = new index_1.rethinkdb();
        this.poloniexService = new index_1.Polinex();
        this.poloniexService.connection.onopen = function (session, detail) {
            session.subscribe("ticker", _this.onTickerEvent);
        };
        this.poloniexService.getAllCoins().then(function (coins) {
            coins["USDCOP"] = {};
            allCoins = coins;
        });
        setInterval(function () {
            if (allCoins) {
                _this.db.doSave(allCoins);
            }
        }, index_3.interval.tick);
    }
    server.prototype.onTickerEvent = function (args) {
        var obj = util.convertToObject(args);
        //Get current price of the colombian peso
        if (currencyPrice.getPoloniexValue()) {
            allCoins["USDCOP"] = currencyPrice.getPoloniexValue();
        }
        if (allCoins) {
            allCoins[obj.currencyPair] = obj;
        }
        console.log("Event:", (allCoins[obj.currencyPair]).currencyPair);
    };
    return server;
}());
module.exports = new server();
//# sourceMappingURL=server.js.map