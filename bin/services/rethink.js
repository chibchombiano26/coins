"use strict";
/// <reference path="../typings/index.d.ts" />
var r = require("rethinkdb");
var rethinkdb = (function () {
    function rethinkdb() {
        var _this = this;
        r.connect({
            host: 'rethink-currency.2feabafe.svc.dockerapp.io',
            port: 28016
        }, function (err, conn) {
            _this.conn = conn;
        });
    }
    rethinkdb.prototype.doSave = function (data) {
        if (this.conn) {
            r.db("Poloniex").table("Event").insert(data).run(this.conn, function (err, res) {
                if (err)
                    throw err;
                console.log(res);
            });
        }
    };
    return rethinkdb;
}());
exports.rethinkdb = rethinkdb;
//# sourceMappingURL=rethink.js.map