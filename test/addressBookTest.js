const assert = require('chai').assert;
const AddressBook = require('../AddressBook/addressbook');

describe('Add', function(){
    it('first name should not be undefined',function(){
        let val = AddressBook.AddInAdressBook(undefined,'kumar','Dhurwa','ranchi','jharkhand',834004,9334158709);
        assert.equal(val.message.toString(),"It should be string");
    })
    it('first name should not be null',function(){
        let val = AddressBook.AddInAdressBook(null,'kumar','Dhurwa','ranchi','jharkhand',834004,9334158709);
        assert.equal(val.message.toString(),"It should be string");
    })
    it('state should not be undefined',function(){
        let val = AddressBook.AddInAdressBook('suraj','kumar','Dhurwa','ranchi',undefined,834004,9334158709);
        assert.equal(val.message.toString(),"It should be string");
    })
    it('state should not be null',function(){
        let val = AddressBook.AddInAdressBook('suraj','kumar','Dhurwa','ranchi',null,834004,9334158709);
        assert.equal(val.message.toString(),"It should be string");
    })
    it('it should be 6 digit',function(){
        let val = AddressBook.AddInAdressBook('suraj','kumar','Dhurwa','ranchi','jharkhand',8348004,9334158709);
        assert.equal(val.message.toString(),"zip must be 6 digit long");
    })
    it('it should be 10 digit',function(){
        let val = AddressBook.AddInAdressBook('suraj','kumar','Dhurwa','ranchi','jharkhand',834804,93345584158709);
        assert.equal(val.message.toString(),"phone number must start with 6,7,8 or 9 and must be 10 digit long");
    })
    it('it should return sucessful',function(){
        let val = AddressBook.AddInAdressBook('suraj','kumar','Dhurwa','ranchi','jharkhand',834804,9334158709);
        assert.equal(val,"sucessful");
    })

})