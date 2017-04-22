import {poloniex} from "../models/model/poloniex";
import { interval } from "../constants/index";
import { rethinkdb } from "../services/index";
import * as request from "request";

let YQL = require('yql');
let poloniexValue: poloniex;
let db : rethinkdb = new rethinkdb();
let tableName = interval.tableNames[1];

export class currentCurrencyPrice {

    
    constructor() {
        setInterval(() => {            
            try{db.doSave(this.getPoloniexValue(), tableName);} catch(ex){}
        }, interval.tick);
    }

    getPoloniexValue() : poloniex{
        return poloniexValue;
    }

    getCurrency(){
        return new Promise((resolve, reject)=>{
            request("http://www.apilayer.net/api/live?access_key=df0ae00c0e459d1d2031710b64038d47&format=1", (error, response, body) =>{
                
                if(error){
                    return null;
                }

                let value = JSON.parse(body).quotes['USDCOP'];
                resolve(value);
            })
        })
    } 



}