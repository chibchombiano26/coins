import { Polinex } from "./services/index"

export class server{

    poloniexService : Polinex;

    constructor() {
        this.poloniexService = new Polinex();
        this.poloniexService.connection.onopen = (session, detail) =>{
            session.subscribe("ticker", this.onTickerEvent)
        }
    }

    onTickerEvent(args: Array<any>): void {
        console.log("Event:", args[0]);
     }

}

new server();