"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../typings/index.d.ts" />
var r = require("rethinkdb");
var index_1 = require("../constants/index");
var db;
var rethinkdb = (function () {
    function rethinkdb() {
        this.connectDb();
    }
    rethinkdb.prototype.connectDb = function () {
        console.log("Connecting...", process.env.RDB_HOST || index_1.interval.dbConnection, process.env.RDB_PORT || index_1.interval.dbConnectionPort);
        r.connect({
            host: process.env.RDB_HOST || index_1.interval.dbConnection,
            port: process.env.RDB_PORT || index_1.interval.dbConnectionPort,
        }, function (err, conn) {
        });
    };
    rethinkdb.prototype.cleanTick = function () {
        var _this = this;
        //Clean Tick after some time
        try {
            setInterval(function () {
                if (_this.conn) {
                    r.db(index_1.interval.dbName).table(index_1.interval.tableNames[1]).delete().run(_this.conn);
                }
            }, index_1.interval.cleanTick);
        }
        catch (ex) {
            console.log(ex);
        }
    };
    rethinkdb.prototype.doSave = function (data, tableName) {
        if (this.conn) {
            r.db(index_1.interval.dbName).table(tableName).insert(data).run(this.conn, function (err, res) {
                if (err)
                    throw err;
                //console.log(res);
            });
        }
    };
    return rethinkdb;
}());
exports.rethinkdb = rethinkdb;
//# sourceMappingURL=rethink.js.map