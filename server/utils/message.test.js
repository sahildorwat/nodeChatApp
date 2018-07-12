const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message')

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

describe('generateLocationMessage', () => {
    it('should generate correct message', ()=> {
        const from = 'sahil'
        const longitude = 1;
        const latitude = 1;
        const message = generateLocationMessage (from , latitude, longitude);
        expect(message.from).toBe(from);
        expect(message.url).toBe(`https://www.google.com/maps/?q=${latitude},${longitude}`);
        expect(message.createdAt).toBeA('number');
    })
})