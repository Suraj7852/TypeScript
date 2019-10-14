"use strict";
var Person = /** @class */ (function () {
    function Person(firstName, lastName, address, city, state, zip, phone) {
        this.firstName = firstName,
            this.lastName = lastName,
            this.address = address,
            this.city = city,
            this.state = state,
            this.zip = zip,
            this.phone = phone;
    }
    return Person;
}());
module.exports = Person;
