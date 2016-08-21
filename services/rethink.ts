/// <reference path="../typings/index.d.ts" />
import * as r from "rethinkdb";
import * as _ from "lodash";
import { interval } from "../constants/index";


export class rethinkdb {

    conn:r.Connection;

    constructor() {
     setTimeout(()=>{
         console.log("Connecting...");
         this.connecDb();
     }, interval.tickCreation);
                 
    }

    connecDb(){

        console.log("Connecting...", process.env.RDB_HOST || interval.dbConnection, process.env.RDB_PORT || interval.dbConnectionPort );
        
        r.connect({
            host: process.env.RDB_HOST || interval.dbConnection, 
            port: process.env.RDB_PORT || interval.dbConnectionPort,
        }, (err, conn)=>{
            
            //Validate the connection to rethink db engine, if not wait while is connected
            if(err){
                setTimeout(()=>{
                    this.connecDb();
                    console.log("Timeout fired");
                },interval.tickCreation)
                return;
            }
            else{
                this.conn = conn;
                this.checkExistDb();
                this.cleanTick();
            }
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

    checkExistDb(){
        if(this.conn){
        console.log("Listing databases....");
        r.dbList().run(this.conn).then((list)=>{
            
            let existDb = list.indexOf(interval.dbName)

            if(existDb == -1){
                r.dbCreate(interval.dbName).run(this.conn).then(()=>{

                    _.each(interval.tableNames, (e)=>{
                        this.createTable(e);
                    })

                })
            }
            
        })
      }
    }

    createTable(tableName){
        if(this.conn){
            r.db(interval.dbName).tableCreate(tableName).run(this.conn);
        }
    }

    doSave(data, tableName){
         if (this.conn) {
            r.db(interval.dbName).table(tableName).insert(data).run(this.conn, (err, res) =>{
                if (err) throw err;
                console.log(res);
            })
        }
    }
}
