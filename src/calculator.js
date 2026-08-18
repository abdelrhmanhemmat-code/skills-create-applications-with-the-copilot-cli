#!/usr/bin/env node

// calculator.js
// Supported operations:
// - Addition
// - Subtraction
// - Multiplication
// - Division

// Usage examples:
//   node src/calculator.js add 1 2 3
//   node src/calculator.js + 1 2
//   node src/calculator.js subtract 10 4
//   node src/calculator.js / 20 5

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

let result;
const o = op.toLowerCase();

if (['add', '+', 'sum'].includes(o)) {
  // Addition: sum all numbers
  result = nums.reduce((a, b) => a + b, 0);
} else if (['subtract', 'sub', '-'].includes(o)) {
  // Subtraction: left-to-right (first number minus following numbers)
  if (nums.length === 1) {
    result = nums[0];
  } else {
    result = nums.slice(1).reduce((a, b) => a - b, nums[0]);
  }
} else if (['multiply', 'mul', '*', 'x'].includes(o)) {
  // Multiplication: multiply all numbers
  result = nums.reduce((a, b) => a * b, 1);
} else if (['divide', 'div', '/'].includes(o)) {
  // Division: left-to-right (first number divided by following numbers)
  if (nums.length === 1) {
    result = nums[0];
  } else {
    result = nums.slice(1).reduce((a, b) => {
      if (b === 0) {
        console.error('Error: Division by zero');
        process.exit(3);
      }
      return a / b;
    }, nums[0]);
  }
} else {
  console.error(`Unknown operation: ${op}`);
  printHelp();
  process.exit(1);
}

// Print the result (if it's an integer print without trailing .0)
if (Number.isInteger(result)) {
  console.log(result);
} else {
  console.log(result);
}
