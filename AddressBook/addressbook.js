"use strict";
var util = require("../utility");
var input = require("readline-sync");
// This class is for adding person in addressbook
var Person = /** @class */ (function () {
    function Person(firstName, lastName, address, city, state, zip, phone) {
        this.firstName = firstName,
            this.lastName = lastName,
            this.address = address,
            this.city = city,
            this.state = state,
            this.zip = zip,
            this.phone = phone;
        //let person = new Person(firstName,lastName,address,city,state,zip,phone);
    }
    return Person;
}());
// all the logic are implemented here.
var AddressBook = /** @class */ (function () {
    function AddressBook() {
        this.personArray = new Array();
    }
    // to show the existing contact details
    AddressBook.prototype.ShowExistingContact = function () {
        try {
            var hold = util.ReadFile('./AddressBook.json');
            for (var i = 0; i < hold.length; i++) {
                var firstName = hold[i]['firstName'];
                var lastName = hold[i]['lastName'];
                var address = hold[i]['address'];
                var city = hold[i]['city'];
                var state = hold[i]['state'];
                var zip = hold[i]['zip'];
                var phone = hold[i]['phone'];
                var person = new Person(firstName, lastName, address, city, state, zip, phone);
                this.personArray.push(person);
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    // to add new person in addresssbook
    AddressBook.prototype.AddInAdressBook = function (firstName, lastName, address, city, state, zip, phone) {
        try {
            if (firstName == undefined || firstName == null)
                throw new Error("It should be string");
            if (lastName == undefined || lastName == null)
                throw new Error("It should be string");
            if (address == undefined || address == null)
                throw new Error("It should be string");
            if (city == undefined || city == null)
                throw new Error("It should be string");
            if (state == undefined || state == null)
                throw new Error("It should be string");
            var zipregex = /^[0-9]{6}$/;
            if (!zipregex.test(zip)) {
                throw new Error('zip must be 6 digit long');
            }
            var phoneregex = /^[7-9]{1}[0-9]{9}$/;
            if (!phoneregex.test(phone)) {
                throw new Error('phone number must start with 7,8 or 9 and must be 10 digit long');
            }
            var newadd = new Person(firstName, lastName, address, city, state, zip, phone);
            this.personArray.push(newadd);
            this.Save();
            return "sucessful";
        }
        catch (error) {
            return error;
        }
    };
    //to edit the existing contact..
    AddressBook.prototype.edit = function (index) {
        try {
            console.log("You cant change first name nad lastname:");
            var update = input.questionInt("Enter 0 to change adress\n1 to change city name\n2 to change state\n3 to change zip code\n4 to change ph.No.");
            if (update == 0) {
                console.log("Enter address: ");
                var up = util.stringInput();
                this.personArray[index].address = up;
            }
            else if (update == 1) {
                console.log("Enter city: ");
                var up = util.stringInput();
                this.personArray[index].city = up;
            }
            else if (update == 2) {
                console.log("Enter state: ");
                var up = util.stringInput();
                this.personArray[index].state = up;
            }
            else if (update == 3) {
                console.log("Enter zip: ");
                var up = util.stringInput();
                this.personArray[index].zip = up;
            }
            else if (update == 4) {
                console.log("Enter mob.No.: ");
                var up = util.stringInput();
                var mobNoReg = /^[6-9]\d{9}$/;
                if (mobNoReg.test(up)) {
                    this.personArray[index].phone = up;
                }
                else {
                    console.log("Invalid Mobile Number\n");
                }
            }
            else {
                console.log("Enter valid input:");
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    // sorting by name in existing contact
    AddressBook.prototype.sortByName = function () {
        try {
            var temp;
            for (var i = 0; i < this.personArray.length; i++) {
                for (var j = i + 1; j < this.personArray.length; j++) {
                    if (this.personArray[i].firstName > this.personArray[j].firstName) {
                        temp = this.personArray[i];
                        this.personArray[i] = this.personArray[j];
                        this.personArray[j] = temp;
                    }
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    //Sortng by the ZIp code
    AddressBook.prototype.sortByZip = function () {
        try {
            var temp;
            for (var i = 0; i < this.personArray.length; i++) {
                for (var j = i + 1; j < this.personArray.length; j++) {
                    if (this.personArray[i].zip > this.personArray[j].zip) {
                        temp = this.personArray[i];
                        this.personArray[i] = this.personArray[j];
                        this.personArray[j] = temp;
                    }
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    // Delete the existing contact
    AddressBook.prototype.deleteContact = function (index) {
        try {
            this.personArray = util.removeInArray(this.personArray, index);
        }
        catch (error) {
            console.log(error);
        }
    };
    // to write the contact in file
    AddressBook.prototype.Save = function () {
        try {
            util.WriteJsonFile('./AddressBook.json', this.personArray);
        }
        catch (error) {
            console.log(error);
        }
    };
    // to show the existing contact in console
    AddressBook.prototype.printAddBook = function () {
        try {
            console.log("Sl.N0.  firstName   lastName   adress       city         state          zip           ph_No");
            console.log("---------------------------------------------------------------------------------------------");
            for (var i = 0; i < this.personArray.length; i++) {
                console.log(i + "        " + this.personArray[i].firstName + "      " + this.personArray[i].lastName + "       " + this.personArray[i].address + "     " + this.personArray[i].city + "     " + this.personArray[i].state + "      " + this.personArray[i].zip + "     " + this.personArray[i].phone);
            }
            console.log("---------------------------------------------------------------------------------------------");
        }
        catch (error) {
            console.log(error);
        }
    };
    return AddressBook;
}());
var add = new AddressBook();
module.exports = add;
