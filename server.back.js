var autobahn = require('autobahn');
var request = require("request");
var r = require('rethinkdb');
var moment = require('moment');
var wsuri = "wss://api.poloniex.com";
var currencies;
var _ = require('lodash');
var connection = new autobahn.Connection({
        url: wsuri,
        realm: "realm1"
});

var conn;

r.connect({
        host: 'rethink-currency.2feabafe.svc.dockerapp.io',
        port: 28016
}, function(err, _conn) {
        if (err) throw err;
        conn = _conn;
});

request("https://poloniex.com/public?command=returnTicker", function(error, response, body) {        
        currencies = iterateProperties(JSON.parse(body));
        console.log(body);
});

connection.onopen = function(session) {
        function marketEvent(args, kwargs) {
                console.log(args);
        }

        function tickerEvent(args, kwargs) {
                var obj = convertToObject(args);

                if (currencies) {
                        currencies[obj.currencyPair] = obj;
                }

                console.log(args);
        }

        function trollboxEvent(args, kwargs) {
                console.log(args);
        }

        //session.subscribe('BTC_XMR', marketEvent);
        session.subscribe('ticker', tickerEvent);
        //session.subscribe('trollbox', trollboxEvent);
}

function convertToObject(arr) {

        var data = {
                currencyPair: arr[0],
                last: parseFloat(arr[1]),
                lowestAsk: parseFloat(arr[2]),
                highestBid: parseFloat(arr[3]),
                percentChange: parseFloat(arr[4]),
                baseVolume: parseFloat(arr[5]),
                quoteVolume: parseInt(arr[6]),
                isFrozen: arr[7],
                high24hr: parseFloat(arr[8]),
                low24hr: parseFloat(arr[9]),
                date: new Date(),
                epoch : moment().valueOf()
        }

        return data;
}

function iterateProperties(Object) {
        var value = {};
        for (var key in Object) {
                if (Object.hasOwnProperty(key)) {
                        value[key]  = convertToObjectToType(Object[key]);
                }
        }

        return value;
}


function convertToObjectToType(obj) {

        return {
                baseVolume: parseFloat(obj.baseVolume),
                high24hr: parseFloat(obj.high24hr),
                highestBid: parseFloat(obj.highestBid),
                isFrozen: parseInt(obj.isFrozen),
                last: parseFloat(obj.last),
                low24hr: parseFloat(obj.low24hr),
                lowestAsk: parseFloat(obj.lowestAsk),
                percentChange: parseFloat(obj.percentChange),
                quoteVolume: parseFloat(obj.quoteVolume),
                date: new Date(),
                epoch : moment().valueOf()
        }
}

function doSave(data) {
        if (conn) {
                r.db("Poloniex").table("Event").insert(data).run(conn, function(err, res) {
                        if (err) throw err;
                        console.log(res);
                });
        }
}

connection.onclose = function() {
        console.log("Websocket connection closed");
}

connection.open();

setInterval(function() {
        debugger
        if (conn && currencies) {
                doSave(currencies);
        }
}, 6000 * 1); //Ten minutes