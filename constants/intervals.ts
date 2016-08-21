export class interval{
    static tickCreation : number = 1000 * 20;
    static tick : number = 1000 * 60 * 10;
    static cleanTick : number = 1000 * 60 * 20; 
    static dbName: string = "Poloniex";
    static tableNames : string[] = ["Event","Tick"];
    static dbConnection : string = "localhost";
    static dbConnectionPort : number = 28015;
}

