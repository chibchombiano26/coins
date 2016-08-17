"use strict";
var index_1 = require("./services/index");
var server = (function () {
    function server() {
        var _this = this;
        this.poloniexService = new index_1.Polinex();
        this.poloniexService.connection.onopen = function (session, detail) {
            session.subscribe("ticker", _this.onTickerEvent);
        };
        this.poloniexService.getAllCoins().then(function (coins) {
            debugger;
        });
        setInterval(function () {
        }, 1000 * 60 * 1);
    }
    server.prototype.onTickerEvent = function (args) {
        console.log("Event:", args[0]);
    };
    return server;
}());
module.exports = new server();
//# sourceMappingURL=server.js.map