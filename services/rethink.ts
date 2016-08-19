/// <reference path="../typings/index.d.ts" />
import * as r from "rethinkdb";


export class rethinkdb {

    conn:r.Connection;

    constructor() {        
        r.connect({
            host: 'rethink-currency.2feabafe.svc.dockerapp.io',
            port: 28016
        }, (err, conn)=>{
            this.conn = conn;
        });        
    }

    doSave(data){
         if (this.conn) {
            r.db("Poloniex").table("Event").insert(data).run(this.conn, (err, res) =>{
                if (err) throw err;
                console.log(res);
            })
        }
    }

}
