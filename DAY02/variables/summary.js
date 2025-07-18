// ===============================
// ✅ JavaScript Variables – Master File
// ===============================

// 🔸 Declaration and Initialization
console.log("🔹 Declaration and Initialization");

let name = "Venky"; // Declared and initialized
let age; // Only declared
age = 25; // Initialized later

console.log("Name:", name); // Venky
console.log("Age:", age); // 25

console.log("\n");

// ===============================
// 🔸 var vs let vs const
// ===============================

console.log("🔹 var vs let vs const");

// 1️⃣ var – Function Scoped
var a = 10;
var a = 20; // Redeclaration allowed
a = 30; // Reassignment allowed
console.log("var a:", a); // 30

// 2️⃣ let – Block Scoped
let b = 100;
// let b = 200; ❌ Error: Cannot redeclare
b = 150;
console.log("let b:", b); // 150

// 3️⃣ const – Block Scoped & Immutable Reference
const PI = 3.14;
// PI = 3.14159; ❌ Error: Cannot reassign
console.log("const PI:", PI);

console.log("\n");

// ===============================
// 🔸 Block Scope Demo
// ===============================

console.log("🔹 Block Scope Demo");

{
  var outerVar = "I'm var";
  let outerLet = "I'm let";
  const outerConst = "I'm const";

  console.log("Inside block:", outerVar); // OK
  console.log("Inside block:", outerLet); // OK
  console.log("Inside block:", outerConst); // OK
}

console.log("Outside block:", outerVar); // OK
// console.log(outerLet); ❌ ReferenceError
// console.log(outerConst); ❌ ReferenceError

console.log("\n");

// ===============================
// 🔸 Function Scope (var only)
// ===============================

console.log("🔹 Function Scope");

function testScope() {
  var inside = "function var";
  let innerLet = "function let";
}
testScope();
// console.log(inside); ❌ ReferenceError
// console.log(innerLet); ❌ ReferenceError

console.log("\n");

// ===============================
// 🔸 Hoisting Demo
// ===============================

console.log("🔹 Hoisting");

// var is hoisted with 'undefined'
console.log(hoistedVar); // undefined
var hoistedVar = 10;

// let and const are hoisted but in TDZ
// console.log(hoistedLet); ❌ ReferenceError
let hoistedLet = 20;

console.log("hoistedLet:", hoistedLet);

console.log("\n");

// ===============================
// 🔸 Reassignment vs Redeclaration
// ===============================

console.log("🔹 Reassignment vs Redeclaration");

let x = 1;
x = 2; // ✅ Reassignment

// let x = 3; ❌ Cannot redeclare in same scope

const y = 5;
// y = 10; ❌ Cannot reassign const

var z = 100;
var z = 200; // ✅ Redeclare with var
z = 300; // ✅ Reassign
console.log("z:", z); // 300

console.log("\n");

// ===============================
// 🔸 const with Arrays and Objects
// ===============================

console.log("🔹 const with Arrays & Objects");

// const with array
const numbers = [1, 2, 3];
numbers.push(4); // ✅ You can change content
console.log("numbers:", numbers); // [1, 2, 3, 4]

// numbers = [5, 6]; ❌ Reassignment not allowed

// const with object
const person = { name: "Venky" };
person.name = "Venkat"; // ✅ Changing properties
console.log("person:", person); // { name: "Venkat" }

console.log("\n");

// ===============================
// 🔸 Dynamic Typing in JS
// ===============================

console.log("🔹 Dynamic Typing");

let dynamicVar = 42;
console.log("Before:", typeof dynamicVar); // number

dynamicVar = "Now I'm a string";
console.log("After:", typeof dynamicVar); // string

dynamicVar = true;
console.log("Now a boolean:", typeof dynamicVar); // boolean

console.log("\n");

// ===============================
// 🔸 Best Practices
// ===============================

console.log("🔹 Best Practices");

// ✅ Use const by default
// ✅ Use let if you need reassignment
// ❌ Avoid var unless dealing with legacy code

console.log("✅ Use const/let. Avoid var.");
