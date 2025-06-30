## JavaScript Functions - Complete Notes

### 🧠 What is a Function?

A **function** is a block of code designed to perform a specific task. It can be reused throughout the code by invoking (calling) it.

### 🔹 Declaring Functions

```js
function greet() {
  console.log("Hello!");
}
```

### 🔹 Calling a Function

```js
greet(); // Output: Hello!
```

### 🧪 Function with Parameters

```js
function greet(name) {
  console.log("Hello, " + name);
}

greet("Venkatesh"); // Output: Hello, Venkatesh
```

### 🔄 Function with Return

```js
function add(a, b) {
  return a + b;
}

let result = add(3, 5); // result = 8
```

### 🧾 Function Expressions

```js
const greet = function(name) {
  return "Hi " + name;
};

console.log(greet("Venkatesh"));
```

### 🪄 Arrow Functions (ES6)

```js
const add = (a, b) => a + b;
console.log(add(5, 6)); // 11

const greet = name => console.log("Hello, " + name);
greet("Venkatesh");
```

### 🔄 Function Scope

```js
function testScope() {
  let x = 10;
  if (true) {
    let y = 20;
    console.log(x, y); // Accessible
  }
  console.log(x); // Accessible
  // console.log(y); // Error
}
```

### 📦 Default Parameters

```js
function greet(name = "Guest") {
  console.log("Hello, " + name);
}

greet(); // Hello, Guest
```

### 🧪 Rest Parameters

```js
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}

console.log(sum(1, 2, 3, 4)); // 10
```

### 📤 Returning Multiple Values (Using Arrays/Objects)

```js
function calc(a, b) {
  return [a + b, a * b];
}
let [sum, product] = calc(3, 4);

function getUser() {
  return { name: "Venkatesh", age: 22 };
}
let { name, age } = getUser();
```

### 🔁 Callback Functions

```js
function greet(name, callback) {
  console.log("Hello " + name);
  callback();
}

greet("Venkatesh", () => console.log("Welcome!"));
```

### 🔁 Higher Order Functions

A **higher-order function** takes another function as an argument or returns a function.

```js
function multiply(factor) {
  return function(num) {
    return factor * num;
  };
}

const double = multiply(2);
console.log(double(5)); // 10
```

### 🎯 Immediately Invoked Function Expression (IIFE)

```js
(function() {
  console.log("This runs immediately!");
})();
```

### 🧠 Closures

A **closure** is when a function remembers its lexical scope even when it's executed outside that scope.

```js
function outer() {
  let name = "Venkatesh";
  return function inner() {
    console.log("Hello, " + name);
  };
}

const greetUser = outer();
greetUser(); // Hello, Venkatesh
```

### 🔍 Function Hoisting

Function declarations are hoisted. You can call them before their definition.

```js
sayHi();
function sayHi() {
  console.log("Hi!");
}
```

### ⛔ Function Expression Not Hoisted

```js
// greet(); // Error
const greet = function() {
  console.log("Hi!");
};
```

### 🧩 Named vs Anonymous Functions

```js
// Named
function sayHi() { console.log("Hi"); }

// Anonymous
const sayHello = function() { console.log("Hello"); };
```

### 🧠 Recursion

Function calling itself repeatedly until a base condition is met.

```js
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}

console.log(factorial(5)); // 120
```

### 🧼 Pure Functions

Given same input, always return same output and do not cause side effects.

```js
function square(x) {
  return x * x;
}
```

### 🛠 Utility Example: Function to Check Prime

```js
function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}
```
console.log(isPrime(7)); // true