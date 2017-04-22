"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interval = (function () {
    function interval() {
    }
    return interval;
}());
interval.tickCreation = 1000 * 20;
interval.tick = 1000 * 60 * 10;
interval.cleanTick = 1000 * 60 * 20; // 6 hours clean db every 6 hours 
interval.copTicket = 1000 * 60 * 6; // 6 hours 
interval.dbName = "Poloniex";
interval.tableNames = ["Event", "Tick"];
interval.dbConnection = "localhost";
interval.dbConnectionPort = 28015;
exports.interval = interval;
//# sourceMappingURL=intervals.js.map