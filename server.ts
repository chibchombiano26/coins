import { Polinex, rethinkdb } from "./services/index"

class server{

    poloniexService : Polinex;
    allCoins : any;

    constructor() {
        this.poloniexService = new Polinex();
        this.poloniexService.connection.onopen = (session, detail) =>{
            session.subscribe("ticker", this.onTickerEvent)
        }

        this.poloniexService.getAllCoins().then((coins)=>{
            debugger
        })

        setInterval(() => { 
             
        }, 1000 * 60 * 1);
    }

    onTickerEvent(args: Array<any>): void {
        console.log("Event:", args[0]);
     }
 

}
export = new server();