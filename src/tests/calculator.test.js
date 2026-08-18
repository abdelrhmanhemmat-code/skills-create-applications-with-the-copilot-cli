const { add, subtract, multiply, divide } = require('../calculator');

describe('Calculator basic operations', () => {
  test('addition: 2 + 3 = 5', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('addition with multiple args: 1 + 2 + 3 = 6', () => {
    expect(add(1, 2, 3)).toBe(6);
  });

  test('subtraction: 10 - 4 = 6', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test('subtraction single arg returns same value', () => {
    expect(subtract(5)).toBe(5);
  });

  test('multiplication: 45 * 2 = 90', () => {
    expect(multiply(45, 2)).toBe(90);
  });

  test('multiplication with multiple args: 2*3*4 = 24', () => {
    expect(multiply(2, 3, 4)).toBe(24);
  });

  test('division: 20 / 5 = 4', () => {
    expect(divide(20, 5)).toBe(4);
  });

  test('division single arg returns same value', () => {
    expect(divide(7)).toBe(7);
  });

  test('division by zero should throw', () => {
    expect(() => divide(4, 0)).toThrow('Division by zero');
  });

  test('invalid operand types should throw', () => {
    expect(() => add(1, 'a')).toThrow();
    expect(() => subtract('x')).toThrow();
    expect(() => multiply(2, null)).toThrow();
  });
});
