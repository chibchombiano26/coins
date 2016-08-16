/// <reference path="../typings/modules/autobahn/autobahn.d.ts" />
import * as autobahn from "autobahn";

 export class Polinex{

     wsuri : string = "wss://api.poloniex.com";
     connection : autobahn.Connection;

     constructor() {

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