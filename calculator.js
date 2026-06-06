function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) throw new Error("Cannot divide by zero");
  return a / b;
}

function squareRoot(a) {
  if (a < 0) throw new Error("Cannot take square root of a negative number");
  return Math.sqrt(a);
}

function power(base, exp) {
  return Math.pow(base, exp);
}

function factorial(n) {
  if (n < 0) throw new Error("Factorial is not defined for negative numbers");
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}

function getOperation(name) {
  const operations = {
    add,
    subtract,
    multiply,
    divide,
    squareRoot,
    power,
    factorial,
  };
  return operations[name] || null;
}

function calculate(name, ...args) {
  const operation = getOperation(name);
  if (!operation) throw new Error(`Unknown operation: "${name}"`);
  return operation(...args);
}

try {
  calculate("divide", 5, 0);
} catch (e) {
  console.log("Error:", e.message); // Cannot divide by zero
}

try {
  calculate("squareRoot", -9);
} catch (e) {
  console.log("Error:", e.message); 
}


console.log(calculate("add", 10, 5));       
console.log(calculate("subtract", 10, 4));   
console.log(calculate("multiply", 3, 7));    
console.log(calculate("divide", 20, 4));     
console.log(calculate("squareRoot", 81));    
console.log(calculate("power", 2, 10));      
console.log(calculate("factorial", 6));      
