"use strict";
var index_1 = require("./services/index");
var index_2 = require("./util/index");
var index_3 = require("./constants/index");
var util = new index_2.transformObject();
var allCoins;
var currencyPrice = new index_1.currentCurrencyPrice();
var db = new index_1.rethinkdb();
var server = (function () {
    function server() {
        var _this = this;
        this.poloniexService = new index_1.Polinex();
        this.poloniexService.connection.onopen = function (session, detail) {
            session.subscribe("ticker", _this.onTickerEvent);
        };
        this.poloniexService.getAllCoins().then(function (coins) {
            coins["USDCOP"] = {};
            allCoins = coins;
        });
        this.doSave();
    }
    server.prototype.doSave = function () {
        try {
            setInterval(function () {
                if (allCoins) {
                    db.doSave(allCoins, index_3.interval.tableNames[0]);
                }
            }, index_3.interval.tick);
        }
        catch (ex) {
            console.log(ex);
        }
    };
    server.prototype.onTickerEvent = function (args) {
        var obj = util.convertToObject(args);
        var tableName = index_3.interval.tableNames[1];
        db.doSave(obj, tableName);
        //Get current price of the colombian peso
        if (currencyPrice.getPoloniexValue()) {
            allCoins["USDCOP"] = currencyPrice.getPoloniexValue();
        }
        if (allCoins) {
            allCoins[obj.currencyPair] = obj;
        }
    };
    return server;
}());
module.exports = new server();
//# sourceMappingURL=server.js.map