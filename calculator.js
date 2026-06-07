const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;

const divide = (a, b) => {
  if (b === 0) {
    throw new Error("Mathematical Error: Cannot divide by zero.");
  }
  return a / b;
};

const squareRoot = (num) => {
  if (num < 0) {
    throw new Error("Mathematical Error: Cannot take square root of a negative number.");
  }
  return Math.sqrt(num);
};

const power = (base, exponent) => Math.pow(base, exponent);

const factorial = (num) => {
  if (num < 0 || !Number.isInteger(num)) {
    throw new Error("Mathematical Error: Factorial is only defined for non-negative integers.");
  }
  if (num === 0 || num === 1) return 1;
  
  let result = 1;
  for (let i = 2; i <= num; i++) {
    result *= i;
  }
  return result;
};

const selectOperation = (operationName) => {
  const operations = {
    'add': add,
    'subtract': subtract,
    'multiply': multiply,
    'divide': divide,
    'sqrt': squareRoot,
    'power': power,
    'factorial': factorial
  };

  return operations[operationName] || null;
};

const calculate = (operationName, ...args) => {
  const operation = selectOperation(operationName);

  if (!operation) {
    return `Error: Operation '${operationName}' not found.`;
  }

  try {
    return operation(...args);
  } catch (error) {
    return error.message;
  }
};
