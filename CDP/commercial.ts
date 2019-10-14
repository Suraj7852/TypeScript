/**
 * 
 * @author   : Suraj Kumar Nag
 * Date      : 3/09/2019
 * Purpose   : To create the Commercial Data Processing in which they can
 *             Buy Stock
 *             Sell Stock
 *             To show transection Details
 **/
import * as util from '../utility';
import moment = require('moment');
import {Icommercial} from './commercialInterface';

// this class is to create object of person
class Person{
    private personId: number;
    private PersonName: string;
    private balance: number;
    private shares: number;
    private sharesPrice: number;

    constructor(personId:number,PersonName:string,balance:number,shares:number,sharesPrice:number) {
        this.personId = personId;
        this.PersonName = PersonName;
        this.balance = balance;
        this.shares = shares;
        this.sharesPrice = sharesPrice;
    }
}

// to create object of stock
class stock {
    private stockId : number;
    private stockName: string;
    private noOfShares: number;
    private sharesPrice: number;

    constructor(stockId: number, stockName: string, noOfShares: number, sharesPrice: number) {
        this.stockId = stockId;
        this.stockName = stockName;
        this.noOfShares = noOfShares;
        this.sharesPrice = sharesPrice;
    }
}

//to store the transection details
class transection {
    private transId: number;
    private personId: number;
    private noShare: number;
    private operation: string;
    private dateTime: string;

    constructor(transId: number,personId: number, noShare: number, operation: string, dateTime: string) {
        this.transId = transId;
        this.personId = personId;
        this.noShare = noShare;
        this.operation = operation;
        this.dateTime = dateTime;
    }
}

//alll the logic is implemented here
class commercial implements Icommercial {
    private stockArray = new Array();
    private personArray = new Array();
    private transectionArray = new Array();

    //to read the existing person
    readPerson(){
        try {
            let per = util.ReadFile('./person.json');
            for(let i=0;i<per.length;i++)
            {
                let personId = per[i]['personId'];
                let PersonName = per[i]['PersonName'];
                let balance = per[i]['balance'];
                let shares = per[i]['shares'];
                let sharesPrice = per[i]['sharesPrice'];
                let person = new Person(personId,PersonName,balance,shares,sharesPrice);
                this.personArray.push(person);
                //console.log(this.personArray[i]);
            }
        } catch (error) {
            console.log(error);
        }     
        
    }

    //to read existing stock of company
    readStock(){
        try {
            let Stock = util.ReadFile('./stock.json');
            for(let i=0;i<Stock.length;i++)
            {
                let stockId = Stock[i]['stockId'];
                let stockName = Stock[i]['stockName'];
                let noOfShares = Stock[i]['noOfShares'];
                let sharesPrice = Stock[i]['sharesPrice'];
                let st = new stock(stockId,stockName,noOfShares,sharesPrice);
                this.stockArray.push(st);
            }
        } catch (error) {
            console.log(error)
        }
       
    }

    //to read the transection details
    readTransection() {
        try {
            let tran = util.ReadFile('./transection.json');
            for(let i=0;i<tran.length;i++)
            {
                if(tran[i]!=null)
                {
                    let transId = tran[i]['transId'];
                    let personId = tran[i]['personId'];
                    let noShare = tran[i]['noShare'];
                    let operation = tran[i]['operation'];
                    let dateTime = tran[i]['dateTime'];
                    let tr = new transection(transId,personId, noShare, operation, dateTime);
                    this.transectionArray.push(tr);  
                }
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    // to buy any stock by a person
    buy(person,stockid,share){
        try {
            if(person == undefined || person == null)
                throw new Error( "It should be number");
            if(stockid == undefined || stockid == null)
                throw new Error( "It should be number");
            if(share == undefined || share == null)
                throw new Error( "It should be number");
            let personArrayIndex = -1;
            let stockArrayIndex = -1;
            let flag: boolean = false;
            for(let i=0;i<this.personArray.length;i++)
            {
                if(this.personArray[i].personId == person)
                {
                    personArrayIndex = i;
                    flag  = true;
                }   
            }
            if(flag == false)
                throw new Error("enter valid person Id");
                
            let isFound: boolean = false;

            for(let i=0;i<this.stockArray.length;i++)
            {
                if(this.stockArray[i]['stockId'] == stockid)
                {
                    stockArrayIndex = i;
                    isFound = true;
                }     
            }
            if(isFound == false)
                throw new Error("Enter valid stock Id");
            
            if(flag==true && isFound==true)
            {
                //console.log(share);
                let amount:number = this.stockArray[stockArrayIndex].sharesPrice*share;
                //console.log(amount);
                if(this.stockArray[stockArrayIndex].noOfShares > share && this.personArray[personArrayIndex].balance >= amount)
                {
                    this.personArray[personArrayIndex].shares += share;
                    this.personArray[personArrayIndex].balance -= amount;
                    this.stockArray[stockArrayIndex].noOfShares -= share;
                    console.log("BUY Sucessfull!!!! ")
                }    
                else
                    throw new Error("There is no enough share left!!! or balance!!!!");
            }
            let dt = moment(new Date()).format('DD-MM-YYYY  HH:MM');
            let transId = this.transectionArray.length++;
            let personId = this.personArray[personArrayIndex].personId;
            let noShare = share;
            let operation = "BUY";
            let dateTime = dt
            let tr = new transection(transId,personId,noShare,operation,dateTime);
            this.transectionArray.push(tr);


            util.WriteJsonFile('./person.json',this.personArray);
            util.WriteJsonFile('./stock.json',this.stockArray);
            util.WriteJsonFile('./transection.json',this.transectionArray);
        } catch (error) {
            return error;
        }
        
    }


    // to sell to any person
    sell(person,personid,share)
    {
        try {
            if(person == undefined || person == null)
                throw new Error( "It should be number");
            if(personid == undefined || personid == null)
                throw new Error( "It should be number");
            if(share == undefined || share == null)
                throw new Error( "It should be number");
    
            let person1ArrayIndex = -1;
            let person2ArrayIndex = -1;
            let flag: boolean = false;
            //console.log(this.personArray[1].personId);
            for(let i=0;i<this.personArray.length;i++)
            {
                if(this.personArray[i].personId == person)
                {
                    person1ArrayIndex = i;
                    flag  = true;
                }   
            }
            if(flag == false)
                throw new Error("enter valid person Id");
            
            let isFound: boolean = false;
    
            for(let i=0;i<this.personArray.length;i++)
            {
                if(this.personArray[i]['personId'] == personid)
                {
                    person2ArrayIndex = i;
                    isFound = true;
                }     
            }
            if(isFound == false)
                throw new Error("Enter valid person Id");  
            
            if(person == personid)
                throw new Error("this is the same id!! ");
    
            if(flag==true && isFound==true)
            {
                
                let amount:number = this.personArray[person2ArrayIndex].sharesPrice*share;
                //console.log(amount);
                if(this.personArray[person2ArrayIndex].shares > share && this.personArray[person1ArrayIndex].balance >= amount)
                {
                    this.personArray[person1ArrayIndex].shares += share;
                    this.personArray[person2ArrayIndex].shares -= share;
                    this.personArray[person1ArrayIndex].balance -= amount;
                    this.personArray[person2ArrayIndex].balance += amount;
                    console.log("SELL Sucessfull!!!!!");
                }    
                else
                    throw new Error("There is no enough share left!!! or balance!!!!");    
            }
            let transId = this.transectionArray.length++;
            let personId = this.personArray[person1ArrayIndex].personId;
            let noShare = this.personArray[person2ArrayIndex].shares;
            let operation = "SELL";
            let dateTime = moment(new Date()).format('DD-MM-YYYY  HH:MM');
            let tr = new transection(transId, personId, noShare, operation, dateTime);
            this.transectionArray.push(tr);
    
            util.WriteJsonFile('./person.json',this.personArray);
            util.WriteJsonFile('./transection.json',this.transectionArray);
        } catch (error) {
            return error
        }
        
    }

    // to see the existing details of stock
    showStock()
    {
        try {
            console.log("%%%%%%%%%%%%%%%%%%Stock%%%%%%%%%%%%%%%%");
            console.log(`stockId  stockName noOfShares  sharesPrice`)
            for(let i=0;i<this.stockArray.length;i++)
            {
                console.log(`${this.stockArray[i].stockId}        ${this.stockArray[i].stockName}        ${this.stockArray[i].noOfShares}           ${this.stockArray[i].sharesPrice}`);
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    // to see the existing details of person in console
    showPerson()
    {
        try {
            console.log("%%%%%%%%%%%%%%% PERSON %%%%%%%%%%%%%%%");
            console.log(`personId  PersonName    balance     share    sharesPrice`)
            for(let i=0;i<this.personArray.length;i++)
            {
                console.log(`${this.personArray[i].personId}        ${this.personArray[i].PersonName}       ${this.personArray[i].balance}    ${this.personArray[i].shares}      ${this.personArray[i].sharesPrice}`)
            }
        } catch (error) {
            console.log(error)
        }
       
    }

    // to see the existing details of transection done by person
    showTransection()
    {
        try {
            console.log("%%%%%%%%%%%%%%%%%%% TRANSECTION %%%%%%%%%%%%%%%");
            console.log(`transId   personId   noShare   operation    dateTime`);
            for(let i=0;i<this.transectionArray.length;i++)
            {
                if(this.transectionArray[i]!=null)
                console.log(`${this.transectionArray[i].transId}           ${this.transectionArray[i].personId}        ${this.transectionArray[i].noShare}          ${this.transectionArray[i].operation}    ${this.transectionArray[i].dateTime}`)
            }
        } catch (error) {
            console.log(error)
        }
        
    }
}
let c = new commercial();
c.readStock();
c.readPerson();
c.readTransection();
export = c;
