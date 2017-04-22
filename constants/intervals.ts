export class interval{
    static tickCreation : number = 1000 * 20;
    static tick : number = 1000 * 60 * 10;
    static cleanTick : number = 1000 * 60 * 20; // 6 hours clean db every 6 hours 
    static copTicket : number = 1000 * 60 * 6; // 6 hours 
    static dbName: string = "Poloniex";
    static tableNames : string[] = ["Event","Tick"];
    static dbConnection : string = "localhost";
    static dbConnectionPort : number = 28015;
}

