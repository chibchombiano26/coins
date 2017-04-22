"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../typings/index.d.ts" />
var autobahn = require("autobahn");
var request = require("request");
var transformObject_1 = require("../util/transformObject");
var Polinex = (function () {
    function Polinex() {
        this.wsuri = "wss://api.poloniex.com";
        this.urlAllCoins = "https://poloniex.com/public?command=returnTicker";
        this.util = new transformObject_1.transformObject();
        this.connection = new autobahn.Connection({
            url: this.wsuri,
            realm: "realm1"
        });
        this.connection.open();
    }
    Polinex.prototype.getAllCoins = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            var currencies;
            request(_this.urlAllCoins, function (error, response, body) {
                if (error) {
                    return;
                }
                currencies = _this.util.iterateProperties(JSON.parse(body));
                resolve(currencies);
            });
        });
        return promise;
    };
    return Polinex;
}());
exports.Polinex = Polinex;
//# sourceMappingURL=poloniex.js.map