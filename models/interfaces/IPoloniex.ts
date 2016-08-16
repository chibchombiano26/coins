export interface IPoloniex{
    baseVolume: number;
    high24hr: number;
    highestBid: number;
    isFrozen: number;
    last: number;
    low24hr: number;
    lowestAsk: number;
    percentChange: number;
    quoteVolume: number;
    date: Date;
    epoch : number;
    currencyPair: string;
}