const { add, divide } = require('./server');

describe('Math functions', () => {
    it('adds two numbers', () => {
        expect(add(2, 3)).toBe(5);
    });

    test('divides two numbers', () => {
        expect(divide(10, 2)).toBe(5);
    });
 test('divides two numbers', () => {
        expect(divide(120, 2)).toBe(60);
    });
    test('throws error when dividing by zero', () => {
        expect(() => divide(10, 0)).toThrow('Cannot divide by zero');
    });
});
