#!/usr/bin/env node

// calculator.js
// Supported operations:
// - Addition
// - Subtraction
// - Multiplication
// - Division

// This file exports pure functions for each operation so they can be unit tested
// and also provides a small CLI interface when invoked directly.

function ensureNumber(x) {
  if (typeof x !== 'number' || Number.isNaN(x)) {
    throw new TypeError(`Invalid number: ${x}`);
  }
  return x;
}

function add(...nums) {
  if (nums.length === 0) return 0;
  const ns = nums.map(ensureNumber);
  return ns.reduce((a, b) => a + b, 0);
}

function subtract(...nums) {
  if (nums.length === 0) throw new Error('subtract requires at least one operand');
  const ns = nums.map(ensureNumber);
  if (ns.length === 1) return ns[0];
  return ns.slice(1).reduce((a, b) => a - b, ns[0]);
}

function multiply(...nums) {
  if (nums.length === 0) return 1;
  const ns = nums.map(ensureNumber);
  return ns.reduce((a, b) => a * b, 1);
}

function divide(...nums) {
  if (nums.length === 0) throw new Error('divide requires at least one operand');
  const ns = nums.map(ensureNumber);
  if (ns.length === 1) return ns[0];
  return ns.slice(1).reduce((a, b) => {
    if (b === 0) throw new Error('Division by zero');
    return a / b;
  }, ns[0]);
}

// New operations: modulo, power, squareRoot
function modulo(...nums) {
  if (nums.length < 2) throw new Error('modulo requires at least two operands');
  const ns = nums.map(ensureNumber);
  return ns.slice(1).reduce((a, b) => {
    if (b === 0) throw new Error('Modulo by zero');
    return a % b;
  }, ns[0]);
}

function power(base, exponent) {
  const b = ensureNumber(base);
  const e = ensureNumber(exponent);
  return Math.pow(b, e);
}

function squareRoot(n) {
  const x = ensureNumber(n);
  if (x < 0) throw new Error('Square root of negative number');
  return Math.sqrt(x);
}

module.exports = { add, subtract, multiply, divide, modulo, power, squareRoot };

// --- CLI behavior when invoked directly ---
if (require.main === module) {
  const [,, op, ...args] = process.argv;

  function printHelp() {
    console.log('Node.js CLI Calculator - supports: addition, subtraction, multiplication, division, modulo, power, square root');
    console.log('Usage: node src/calculator.js <operation> <number> [number ...]');
    console.log('Operations: add | +, subtract | - , multiply | * | x, divide | /, mod | %, pow | ^, sqrt');
    console.log('Examples:');
    console.log('  node src/calculator.js add 1 2 3');
    console.log('  node src/calculator.js * 2 3 4');
    console.log('  node src/calculator.js mod 10 3');
    console.log('  node src/calculator.js pow 2 8');
    console.log('  node src/calculator.js sqrt 9');
  }

  if (!op || args.length === 0) {
    printHelp();
    process.exit(1);
  }

  const nums = args.map((s) => {
    const n = Number(s);
    if (Number.isNaN(n)) {
      console.error(`Invalid number: ${s}`);
      process.exit(2);
    }
    return n;
  });

  const o = op.toLowerCase();
  try {
    let result;
    if (['add', '+', 'sum'].includes(o)) {
      result = add(...nums);
    } else if (['subtract', 'sub', '-'].includes(o)) {
      result = subtract(...nums);
    } else if (['multiply', 'mul', '*', 'x'].includes(o)) {
      result = multiply(...nums);
    } else if (['divide', 'div', '/'].includes(o)) {
      result = divide(...nums);
    } else if (['mod', '%'].includes(o)) {
      result = modulo(...nums);
    } else if (['pow', '^'].includes(o)) {
      if (nums.length !== 2) {
        throw new Error('power requires exactly two operands');
      }
      result = power(nums[0], nums[1]);
    } else if (['sqrt', 'squareroot'].includes(o)) {
      if (nums.length !== 1) {
        throw new Error('squareRoot requires exactly one operand');
      }
      result = squareRoot(nums[0]);
    } else {
      console.error(`Unknown operation: ${op}`);
      printHelp();
      process.exit(1);
    }

    console.log(result);
  } catch (err) {
    console.error(err.message);
    if (err.message && (err.message.includes('Division by zero') || err.message.includes('Modulo by zero'))) process.exit(3);
    if (err.message && err.message.includes('Square root of negative')) process.exit(4);
    process.exit(2);
  }
}
