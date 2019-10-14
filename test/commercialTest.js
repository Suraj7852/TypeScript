const assert = require('chai').assert;
const commercial = require('../CDP/commercial');

describe('commercial', function(){
    it('it should be valid person id',function(){
        let val = commercial.buy('suraj',1,10);
        assert.equal(val.message.toString(),"enter valid person Id");
    })
    it('it should not be null',function(){
        let val = commercial.buy(null,1,10);
        assert.equal(val.message.toString(),"It should be number");
    })
    it('it should not be undefined',function(){
        let val = commercial.buy(undefined,1,10);
        assert.equal(val.message.toString(),"It should be number");
    })
    it('it should not be null',function(){
        let val = commercial.sell(null,1,10);
        assert.equal(val.message.toString(),"It should be number");
    })
    it('it should not be undefined',function(){
        let val = commercial.sell(undefined,1,10);
        assert.equal(val.message.toString(),"It should be number");
    })

})