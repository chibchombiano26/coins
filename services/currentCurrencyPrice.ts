import {poloniex} from "../models/model/poloniex";
import { interval } from "../constants/index";
let YQL = require('yql');

let poloniexValue: poloniex;

export class currentCurrencyPrice {

    
    constructor() {

        setInterval(() => {
            this.getValue();
        }, interval.tick);

    }

    getPoloniexValue() : poloniex{
        return poloniexValue;
    }

    getValue(){
        
        let query = new YQL('select * from yahoo.finance.xchange where pair in ("USDCOP")');
        let _poloniex;

        query.exec((err, data) => {
          let __poloniex =  data.query.results.rate;

          if(__poloniex){
            _poloniex = {
                    baseVolume: parseFloat(__poloniex.Rate),
                    high24hr: 0,
                    highestBid: 0,
                    isFrozen: 0,
                    last: 0,
                    low24hr: 0,
                    lowestAsk: parseFloat(__poloniex.Rate),
                    percentChange: 0,
                    quoteVolume: 0,
                    date: new Date(),
                    epoch: 0,
                    currencyPair: "USDCOP"
            }

            poloniexValue = <poloniex>_poloniex;
          }
          else{
              return new poloniex(0,0,0,0,0,0,0,0,0,new Date(),0, "USDCOP");
          }

        });
    }



}