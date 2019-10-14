"use strict";
exports.__esModule = true;
var cdp = require("./commercial");
var util = require("../utility");
while (true) {
    try {
        console.log("Enter choice\n1 => BUY\n2 => SELL\n3 => STOCK DETAILS\n4 => PERSON DETAILS\n5 => TRANSECTION DETAILS\n6 => EXIT");
        var choice = util.intInput();
        switch (choice) {
            case 1:
                console.log("Enter person id: ");
                var personID = util.intInput();
                console.log("Enter stock id to purches: ");
                var stockid = util.intInput();
                console.log("enter no of shares u want: ");
                var shares = util.intInput();
                var id = cdp.buy(personID, stockid, shares);
                if (id instanceof Error) {
                    throw id.message;
                }
                break;
            case 2:
                console.log("Enter your person id: ");
                var person = util.intInput();
                console.log("Enter person id to purches: ");
                var personid = util.intInput();
                console.log("enter no of shares u want: ");
                var share = util.intInput();
                cdp.sell(person, personid, share);
                break;
            case 3:
                cdp.showStock();
                break;
            case 4:
                cdp.showPerson();
                break;
            case 5:
                cdp.showTransection();
                break;
            case 6:
                process.exit();
            default:
                console.log("Envalid choice!!!!!");
                break;
        }
    }
    catch (error) {
        console.log(error);
    }
}
