import { IPoloniex } from "../interfaces/index";


export class poloniex implements IPoloniex {

    constructor(
        public baseVolume: number,
        public high24hr: number,
        public highestBid: number,
        public isFrozen: number,
        public last: number,
        public low24hr: number,
        public lowestAsk: number,
        public percentChange: number,
        public quoteVolume: number,
        public date: Date,
        public epoch: number,
        public currencyPair: string) {
    }

}