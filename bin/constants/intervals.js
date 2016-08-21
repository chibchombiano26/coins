"use strict";
var interval = (function () {
    function interval() {
    }
    interval.tickCreation = 1000 * 20;
    interval.tick = 1000 * 60 * 10;
    interval.cleanTick = 1000 * 60 * 20;
    interval.dbName = "Poloniex";
    interval.tableNames = ["Event", "Tick"];
    interval.dbConnection = "localhost";
    interval.dbConnectionPort = 28015;
    return interval;
}());
exports.interval = interval;
//# sourceMappingURL=intervals.js.map