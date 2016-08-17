/// <reference path="../typings/index.d.ts" />
import { poloniex } from '../models/model/index';
import * as moment from "moment";

export class transformObject{


    constructor() {
        
    }

    convertToObjectToType(obj:any) : poloniex {        
        var poloniex: any = new Object();        
        poloniex.baseVolume = parseFloat(obj.baseVolume);
        poloniex.currencyPair = "";
        poloniex.date = new Date();
        poloniex.epoch = moment().valueOf();
        poloniex.high24hr = parseFloat(obj.high24hr);
        poloniex.highestBid = parseFloat(obj.highestBid);
        poloniex.isFrozen = parseInt(obj.isFrozen);
        poloniex.last = parseFloat(obj.lowestAsk);
        poloniex.low24hr = parseFloat(obj.low24hr);
        poloniex.lowestAsk = parseFloat(obj.lowestAsk);
        poloniex.percentChange = parseFloat(obj.percentChange);
        poloniex.quoteVolume = parseFloat(obj.quoteVolume);
        return <poloniex>poloniex;
    }


    //Convert the element to an poloniex object
    convertToObjectArray(arr:any) : poloniex{

        let poloniex = {
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

        return poloniex;

    }

    iterateProperties(Object) {
        var value = {};
        for (var key in Object) {
                if (Object.hasOwnProperty(key)) {
                        value[key]  = this.convertToObjectToType(Object[key]);
                }
        }

    return value;
   }

}