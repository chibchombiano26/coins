import { Polinex, rethinkdb, currentCurrencyPrice } from "./services/index";
import { transformObject } from "./util/index";
import { interval } from "./constants/index";


let util: transformObject = new transformObject();
let allCoins:any;
let currencyPrice = new currentCurrencyPrice();
let db : rethinkdb = new rethinkdb();

class server{

    poloniexService : Polinex;

    constructor() {

        this.poloniexService = new Polinex();        
        this.poloniexService.connection.onopen = (session, detail) =>{
            session.subscribe("ticker", this.onTickerEvent)
        }

        this.poloniexService.getAllCoins().then((coins)=>{            
            coins["USDCOP"] = {};
            allCoins = coins;
        })

        this.doSave();
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

         let obj = util.convertToObject(args);
         let tableName = interval.tableNames[1];
         db.doSave(obj, tableName);

         //Get current price of the colombian peso
         if(currencyPrice.getPoloniexValue()){             
             allCoins["USDCOP"] =  currencyPrice.getPoloniexValue();
         }


         if (allCoins) {
            allCoins[obj.currencyPair] = obj;
        }

        console.log("Event:", (allCoins[obj.currencyPair]).currencyPair);
     }
 

}
export = new server();