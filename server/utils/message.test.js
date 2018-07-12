const expect = require('expect');

const {generateMessage} = require('./message')

describe('generateMessage', () => {
    it('should generate correct message', ()=> {
        const from = 'sahil'
        const text = 'hiii'
        const message = generateMessage (from , text);
        expect(message.from).toBe(from);
        expect(message.text).toBe(text);
        expect(message.createdAt).toBeA('number');
    })
    
    
    
    
    
    
})