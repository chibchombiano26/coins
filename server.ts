import { Polinex, rethinkdb, currentCurrencyPrice } from "./services/index";
import { transformObject } from "./util/index";
import { interval } from "./constants/index";
import * as http from "http";
import * as url from "url";
import { horizon_server } from "./horizon/horizon_server";


let util: transformObject = new transformObject();
let allCoins:any;
let currencyPrice = new currentCurrencyPrice();
let db : rethinkdb = new rethinkdb();
let COP: any;

class server{

    poloniexService : Polinex;
    horizon : horizon_server;
    


    constructor() {

        this.poloniexService = new Polinex();        
        this.poloniexService.connection.onopen = (session, detail) =>{
            session.subscribe("ticker", this.onTickerEvent)
        }

        this.poloniexService.getAllCoins().then((coins)=>{            
            coins["USDCOP"] = {};
            allCoins = coins;
        })

        /*
        this.horizon = new horizon_server();
        this.horizon.initServer();
        this.doSave();
        */

        this.init();
    }

    init(){

        //first call
        currencyPrice.getCurrency().then(function(value){
            COP = value;
        })

        setInterval(()=>{
            currencyPrice.getCurrency().then(function(value){
                COP = value;
            })
        }, interval.copTicket);
    }

    doSave(){
        try{
        setInterval(() => {             
            if(allCoins){
                db.doSave(allCoins, interval.tableNames[0]);
            }         
        }, interval.tick);
        }
        catch(ex){
            console.log(ex);
        }
    }

    onTickerEvent(args: Array<any>): void {

        console.log(args);
        
        /*
         let obj = util.convertToObject(args);
         obj['COP'] = obj.last * COP;

         let tableName = interval.tableNames[1];
         //db.doSave(obj, tableName);

         //Get current price of the colombian peso
         if(currencyPrice.getPoloniexValue()){             
             allCoins["USDCOP"] =  currencyPrice.getPoloniexValue();
         }


         if (allCoins) {
            allCoins[obj.currencyPair] = obj;
        }
      */
        
     }
 

}
export = new server();