"use strict";
var index_1 = require("./services/index");
var server = (function () {
    function server() {
        var _this = this;
        this.poloniexService = new index_1.Polinex();
        this.poloniexService.connection.onopen = function (session, detail) {
            session.subscribe("ticker", _this.onTickerEvent);
        };
    }
    server.prototype.onTickerEvent = function (args) {
        console.log("Event:", args[0]);
    };
    return server;
}());
exports.server = server;
new server();
//# sourceMappingURL=server.js.map