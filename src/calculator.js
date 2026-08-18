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

module.exports = { add, subtract, multiply, divide };

// --- CLI behavior when invoked directly ---
if (require.main === module) {
  const [,, op, ...args] = process.argv;

  function printHelp() {
    console.log('Node.js CLI Calculator - supports: addition, subtraction, multiplication, division');
    console.log('Usage: node src/calculator.js <operation> <number> [number ...]');
    console.log('Operations: add | +, subtract | - , multiply | * | x, divide | /');
    console.log('Examples:');
    console.log('  node src/calculator.js add 1 2 3');
    console.log('  node src/calculator.js * 2 3 4');
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
    } else {
      console.error(`Unknown operation: ${op}`);
      printHelp();
      process.exit(1);
    }

    console.log(result);
  } catch (err) {
    console.error(err.message);
    if (err.message && err.message.includes('Division by zero')) process.exit(3);
    process.exit(2);
  }
}
