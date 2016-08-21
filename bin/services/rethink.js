"use strict";
/// <reference path="../typings/index.d.ts" />
var r = require("rethinkdb");
var _ = require("lodash");
var index_1 = require("../constants/index");
var rethinkdb = (function () {
    function rethinkdb() {
        var _this = this;
        setTimeout(function () {
            console.log("Connecting...");
            _this.connecDb();
        }, index_1.interval.tickCreation);
    }
    rethinkdb.prototype.connecDb = function () {
        var _this = this;
        console.log("Connecting...", process.env.RDB_HOST || index_1.interval.dbConnection, process.env.RDB_PORT || index_1.interval.dbConnectionPort);
        r.connect({
            host: process.env.RDB_HOST || index_1.interval.dbConnection,
            port: process.env.RDB_PORT || index_1.interval.dbConnectionPort,
        }, function (err, conn) {
            //Validate the connection to rethink db engine, if not wait while is connected
            if (err) {
                setTimeout(function () {
                    _this.connecDb();
                    console.log("Timeout fired");
                }, index_1.interval.tickCreation);
                return;
            }
            else {
                _this.conn = conn;
                _this.checkExistDb();
                _this.cleanTick();
            }
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
    rethinkdb.prototype.checkExistDb = function () {
        var _this = this;
        if (this.conn) {
            console.log("Listing databases....");
            r.dbList().run(this.conn).then(function (list) {
                var existDb = list.indexOf(index_1.interval.dbName);
                if (existDb == -1) {
                    r.dbCreate(index_1.interval.dbName).run(_this.conn).then(function () {
                        _.each(index_1.interval.tableNames, function (e) {
                            _this.createTable(e);
                        });
                    });
                }
            });
        }
    };
    rethinkdb.prototype.createTable = function (tableName) {
        if (this.conn) {
            r.db(index_1.interval.dbName).tableCreate(tableName).run(this.conn);
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