const expect = require('expect')
const {isRealString} = require('./validation')


describe('isRealString function', () => {

    it('should reject non-string values', ()=> {
        const someValue = 123;
        const ans = isRealString(someValue)
        expect(!ans).toBeTruthy() 
    })

    it('should reject string with only spaces', () => {
        const someValue = '    ';
        const ans = isRealString(someValue)
        expect(!ans).toBeTruthy() 
    })

    it('should allow string with non-space characters', () => {
        const someValue = 'sahil';
        const ans = isRealString(someValue)
        expect(ans).toBeTruthy() 
    })

})