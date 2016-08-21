/// <reference path="../typings/index.d.ts" />
import * as autobahn from "autobahn";
import * as request from "request";
import {transformObject} from "../util/transformObject"
import {poloniex} from "../models/model/index"

 export class Polinex{

     wsuri : string = "wss://api.poloniex.com";
     urlAllCoins : string = "https://poloniex.com/public?command=returnTicker";
     connection : autobahn.Connection;
     util : transformObject;

     constructor() {

        this.util = new transformObject()
        this.connection = new autobahn.Connection({
           url: this.wsuri,
           realm: "realm1"
        });

        //Create this event on the client
        /*this.connection.onopen = (session, detail) =>{
            session.subscribe("ticker", this.onTickerEvent)
        }*/   
        
        this.connection.open();
     }   

     getAllCoins() : Promise<any>{
        
        let promise = new Promise((resolve, reject) => {
            let currencies : any;
            request(this.urlAllCoins, (error, response, body) =>{

                if(error){
                    return;
                }

                currencies = this.util.iterateProperties(JSON.parse(body));                
                resolve(currencies);
            });            
        });

        return promise;

        
     }


     /*onTickerEvent(args: Array<any>): void {
        console.log("Event:", args[0]);
     }*/   


     /**********Example of event*********************/

     /*this.open = () => { this.OpenHandler(this); };
     
     public OpenHandler(context: DialogClass, event: Event, ui: DialogUIParams) { 
            var value = context.someField;
     }*/

     /***********************************************/

 }