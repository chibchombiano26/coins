"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require('path');
var expressServer = (function () {
    function expressServer() {
    }
    expressServer.prototype.createServer = function () {
        var promise = new Promise(function (resolve, reject) {
            var app = express();
            app.use(express.static('./'));
            app.get('*', function (req, res) {
                res.sendFile(path.join(__dirname, '../../app/index.html'));
            });
            var server = app.listen(8081, function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Listening on port 8081.');
                    resolve(server);
                }
            });
        });
        return promise;
    };
    return expressServer;
}());
exports.expressServer = expressServer;
//# sourceMappingURL=server.js.map