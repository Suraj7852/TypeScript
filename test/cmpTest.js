const assert = require('chai').assert;
const cmp = require('../CMP/cmp');

describe('clinic', function(){
    it('it should be string',function(){
        let val = cmp.AddPat(undefined,1,9334158709,32);
        assert.equal(val.message.toString(),"It should be string");
    })
    it('it should be string',function(){
        let val = cmp.AddPat(null,1,9334158709,32);
        assert.equal(val.message.toString(),"It should be string");
    })
    it('it should be string',function(){
        let val = cmp.AddPat('suraj',1,93341858709,32);
        assert.equal(val.message.toString(),"phone number must start with 7,8 or 9 and must be 10 digit long");
    })
    it('it should be sucessful',function(){
        let val = cmp.AddPat('suraj',1,9334158709,32);
        assert.equal(val,"sucessful");
    })
})