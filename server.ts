import { Polinex, rethinkdb, currentCurrencyPrice } from "./services/index";
import { transformObject } from "./util/index";
import { interval } from "./constants/index";


let util: transformObject = new transformObject();
let allCoins:any;
let currencyPrice = new currentCurrencyPrice();

class server{

    poloniexService : Polinex;    
    db : rethinkdb = new rethinkdb();

    constructor() {

        this.poloniexService = new Polinex();        
        this.poloniexService.connection.onopen = (session, detail) =>{
            session.subscribe("ticker", this.onTickerEvent)
        }

        this.poloniexService.getAllCoins().then((coins)=>{            
            coins["USDCOP"] = {};
            allCoins = coins;
        })

        setInterval(() => {             
            if(allCoins){
                this.db.doSave(allCoins);
            }         
        }, interval.tick);
    }

    onTickerEvent(args: Array<any>): void {
         
         let obj = util.convertToObject(args);

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