"use strict";
var poloniex = (function () {
    function poloniex(baseVolume, high24hr, highestBid, isFrozen, last, low24hr, lowestAsk, percentChange, quoteVolume, date, epoch, currencyPair) {
        this.baseVolume = baseVolume;
        this.high24hr = high24hr;
        this.highestBid = highestBid;
        this.isFrozen = isFrozen;
        this.last = last;
        this.low24hr = low24hr;
        this.lowestAsk = lowestAsk;
        this.percentChange = percentChange;
        this.quoteVolume = quoteVolume;
        this.date = date;
        this.epoch = epoch;
        this.currencyPair = currencyPair;
    }
    return poloniex;
}());
exports.poloniex = poloniex;
//# sourceMappingURL=poloniex.js.map