"use strict";
var util = require("../utility");
var moment = require("moment");
var Person = /** @class */ (function () {
    function Person(personId, PersonName, balance, shares, sharesPrice) {
        this.personId = personId;
        this.PersonName = PersonName;
        this.balance = balance;
        this.shares = shares;
        this.sharesPrice = sharesPrice;
    }
    return Person;
}());
var stock = /** @class */ (function () {
    function stock(stockId, stockName, noOfShares, sharesPrice) {
        this.stockId = stockId;
        this.stockName = stockName;
        this.noOfShares = noOfShares;
        this.sharesPrice = sharesPrice;
    }
    return stock;
}());
var transection = /** @class */ (function () {
    function transection(transId, personId, noShare, operation, dateTime) {
        this.transId = transId;
        this.personId = personId;
        this.noShare = noShare;
        this.operation = operation;
        this.dateTime = dateTime;
    }
    return transection;
}());
var commercial = /** @class */ (function () {
    function commercial() {
        this.stockArray = new Array();
        this.personArray = new Array();
        this.transectionArray = new Array();
    }
    commercial.prototype.readPerson = function () {
        try {
            var per = util.ReadFile('./person.json');
            for (var i = 0; i < per.length; i++) {
                var personId = per[i]['personId'];
                var PersonName = per[i]['PersonName'];
                var balance = per[i]['balance'];
                var shares = per[i]['shares'];
                var sharesPrice = per[i]['sharesPrice'];
                var person = new Person(personId, PersonName, balance, shares, sharesPrice);
                this.personArray.push(person);
                //console.log(this.personArray[i]);
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    commercial.prototype.readStock = function () {
        try {
            var Stock = util.ReadFile('./stock.json');
            for (var i = 0; i < Stock.length; i++) {
                var stockId = Stock[i]['stockId'];
                var stockName = Stock[i]['stockName'];
                var noOfShares = Stock[i]['noOfShares'];
                var sharesPrice = Stock[i]['sharesPrice'];
                var st = new stock(stockId, stockName, noOfShares, sharesPrice);
                this.stockArray.push(st);
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    commercial.prototype.readTransection = function () {
        try {
            var tran = util.ReadFile('./transection.json');
            for (var i = 0; i < tran.length; i++) {
                if (tran[i] != null) {
                    var transId = tran[i]['transId'];
                    var personId = tran[i]['personId'];
                    var noShare = tran[i]['noShare'];
                    var operation = tran[i]['operation'];
                    var dateTime = tran[i]['dateTime'];
                    var tr = new transection(transId, personId, noShare, operation, dateTime);
                    this.transectionArray.push(tr);
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    commercial.prototype.buy = function (person, stockid, share) {
        try {
            if (person == undefined || person == null)
                throw new Error("It should be number");
            if (stockid == undefined || stockid == null)
                throw new Error("It should be number");
            if (share == undefined || share == null)
                throw new Error("It should be number");
            var personArrayIndex = -1;
            var stockArrayIndex = -1;
            var flag = false;
            for (var i = 0; i < this.personArray.length; i++) {
                if (this.personArray[i].personId == person) {
                    personArrayIndex = i;
                    flag = true;
                }
            }
            if (flag == false)
                throw new Error("enter valid person Id");
            var isFound = false;
            for (var i = 0; i < this.stockArray.length; i++) {
                if (this.stockArray[i]['stockId'] == stockid) {
                    stockArrayIndex = i;
                    isFound = true;
                }
            }
            if (isFound == false)
                throw new Error("Enter valid stock Id");
            if (flag == true && isFound == true) {
                //console.log(share);
                var amount = this.stockArray[stockArrayIndex].sharesPrice * share;
                //console.log(amount);
                if (this.stockArray[stockArrayIndex].noOfShares > share && this.personArray[personArrayIndex].balance >= amount) {
                    this.personArray[personArrayIndex].shares += share;
                    this.personArray[personArrayIndex].balance -= amount;
                    this.stockArray[stockArrayIndex].noOfShares -= share;
                    console.log("BUY Sucessfull!!!! ");
                }
                else
                    throw new Error("There is no enough share left!!! or balance!!!!");
            }
            var dt = moment(new Date()).format('DD-MM-YYYY  HH:MM');
            var transId = this.transectionArray.length++;
            var personId = this.personArray[personArrayIndex].personId;
            var noShare = share;
            var operation = "BUY";
            var dateTime = dt;
            var tr = new transection(transId, personId, noShare, operation, dateTime);
            this.transectionArray.push(tr);
            util.WriteJsonFile('./person.json', this.personArray);
            util.WriteJsonFile('./stock.json', this.stockArray);
            util.WriteJsonFile('./transection.json', this.transectionArray);
        }
        catch (error) {
            return error;
        }
    };
    commercial.prototype.sell = function (person, personid, share) {
        try {
            if (person == undefined || person == null)
                throw new Error("It should be number");
            if (personid == undefined || personid == null)
                throw new Error("It should be number");
            if (share == undefined || share == null)
                throw new Error("It should be number");
            var person1ArrayIndex = -1;
            var person2ArrayIndex = -1;
            var flag = false;
            //console.log(this.personArray[1].personId);
            for (var i = 0; i < this.personArray.length; i++) {
                if (this.personArray[i].personId == person) {
                    person1ArrayIndex = i;
                    flag = true;
                }
            }
            if (flag == false)
                throw new Error("enter valid person Id");
            var isFound = false;
            for (var i = 0; i < this.personArray.length; i++) {
                if (this.personArray[i]['personId'] == personid) {
                    person2ArrayIndex = i;
                    isFound = true;
                }
            }
            if (isFound == false)
                throw new Error("Enter valid person Id");
            if (person == personid)
                throw new Error("this is the same id!! ");
            if (flag == true && isFound == true) {
                var amount = this.personArray[person2ArrayIndex].sharesPrice * share;
                //console.log(amount);
                if (this.personArray[person2ArrayIndex].shares > share && this.personArray[person1ArrayIndex].balance >= amount) {
                    this.personArray[person1ArrayIndex].shares += share;
                    this.personArray[person2ArrayIndex].shares -= share;
                    this.personArray[person1ArrayIndex].balance -= amount;
                    this.personArray[person2ArrayIndex].balance += amount;
                    console.log("SELL Sucessfull!!!!!");
                }
                else
                    throw new Error("There is no enough share left!!! or balance!!!!");
            }
            var transId = this.transectionArray.length++;
            var personId = this.personArray[person1ArrayIndex].personId;
            var noShare = this.personArray[person2ArrayIndex].shares;
            var operation = "SELL";
            var dateTime = moment(new Date()).format('DD-MM-YYYY  HH:MM');
            var tr = new transection(transId, personId, noShare, operation, dateTime);
            this.transectionArray.push(tr);
            util.WriteJsonFile('./person.json', this.personArray);
            util.WriteJsonFile('./transection.json', this.transectionArray);
        }
        catch (error) {
            return error;
        }
    };
    commercial.prototype.showStock = function () {
        try {
            console.log("%%%%%%%%%%%%%%%%%%Stock%%%%%%%%%%%%%%%%");
            console.log("stockId  stockName noOfShares  sharesPrice");
            for (var i = 0; i < this.stockArray.length; i++) {
                console.log(this.stockArray[i].stockId + "        " + this.stockArray[i].stockName + "        " + this.stockArray[i].noOfShares + "           " + this.stockArray[i].sharesPrice);
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    commercial.prototype.showPerson = function () {
        try {
            console.log("%%%%%%%%%%%%%%% PERSON %%%%%%%%%%%%%%%");
            console.log("personId  PersonName    balance     share    sharesPrice");
            for (var i = 0; i < this.personArray.length; i++) {
                console.log(this.personArray[i].personId + "        " + this.personArray[i].PersonName + "       " + this.personArray[i].balance + "    " + this.personArray[i].shares + "      " + this.personArray[i].sharesPrice);
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    commercial.prototype.showTransection = function () {
        try {
            console.log("%%%%%%%%%%%%%%%%%%% TRANSECTION %%%%%%%%%%%%%%%");
            console.log("transId   personId   noShare   operation    dateTime");
            for (var i = 0; i < this.transectionArray.length; i++) {
                if (this.transectionArray[i] != null)
                    console.log(this.transectionArray[i].transId + "           " + this.transectionArray[i].personId + "        " + this.transectionArray[i].noShare + "          " + this.transectionArray[i].operation + "    " + this.transectionArray[i].dateTime);
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    return commercial;
}());
var c = new commercial();
c.readStock();
c.readPerson();
c.readTransection();
module.exports = c;
