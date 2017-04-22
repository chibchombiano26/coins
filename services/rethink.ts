/// <reference path="../typings/index.d.ts" />
import * as r from "rethinkdb";
import * as _ from "lodash";
import { interval } from "../constants/index";

let db : any;
export class rethinkdb {

    conn:r.Connection;

    constructor() {
        this.connectDb();                 
    }

    connectDb(){

        console.log("Connecting...", process.env.RDB_HOST || interval.dbConnection, process.env.RDB_PORT || interval.dbConnectionPort );
        
        r.connect({
            host: process.env.RDB_HOST || interval.dbConnection, 
            port: process.env.RDB_PORT || interval.dbConnectionPort,
        }, (err, conn)=>{            
        });
    }

    cleanTick(){
        //Clean Tick after some time
        try{
        setInterval(() => {
            if(this.conn){            
                r.db(interval.dbName).table(interval.tableNames[1]).delete().run(this.conn);
            }
        }, interval.cleanTick);
        }
        catch(ex){
            console.log(ex);
        }
    }
    
    doSave(data, tableName){
         if (this.conn) {
            r.db(interval.dbName).table(tableName).insert(data).run(this.conn, (err, res) =>{
                if (err) throw err;
                //console.log(res);
            })
        }
    }
}
