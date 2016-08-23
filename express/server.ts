
import * as express from "express";
import * as bodyParser from "body-parser";
const path = require('path');

export class expressServer{

    constructor() {
         
    }


    createServer(): Promise<any>{
        let promise = new Promise((resolve, reject) => {
        let app = express();
        app.use(express.static('./'));

        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, '../../app/index.html'));
        });

        let server = app.listen(8081, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Listening on port 8081.');
                resolve(server);
            }
        });
       });

       return promise;
    }
}