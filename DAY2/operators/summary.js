// 🔹 SETUP
let num1 = 10;
let num2 = 3;
let str1 = "Hello";
let str2 = " World";
let bool1 = true;
let bool2 = false;
let arr = [1, 2, 3];
let obj = { name: "Venky" };
let nothing = null;
let notDefined;

// ===============================
// 🔹 1. ARITHMETIC OPERATORS
// ===============================

console.log("== Arithmetic ==");

console.log(num1 + num2); // 13
console.log(num1 - num2); // 7
console.log(num1 * num2); // 30
console.log(num1 / num2); // 3.333
console.log(num1 % num2); // 1
console.log(num1 ** num2); // 10^3 = 1000

let a = 5;
console.log(a++); // 5 (post-increment, returns then adds)
console.log(++a); // 7 (pre-increment, adds then returns)

// With strings
console.log(str1 + str2); // "Hello World" (concatenation)

// With booleans (true = 1, false = 0)
console.log(true + 5); // 6
console.log(false * 10); // 0

// With null and undefined
console.log(null + 1); // 1 (null becomes 0)
console.log(undefined + 1); // NaN

console.log("\n");

// ===============================
// 🔹 2. ASSIGNMENT OPERATORS
// ===============================

console.log("== Assignment ==");

let x = 10;
x += 5; // x = x + 5
console.log(x); // 15

x -= 3; // 12
x *= 2; // 24
x /= 4; // 6
x %= 4; // 2
x **= 2; // 4

console.log(x); // 4

console.log("\n");

// ===============================
// 🔹 3. COMPARISON OPERATORS
// ===============================

console.log("== Comparison ==");

// Loose equality
console.log(5 == "5"); // true (value is same)
console.log(5 === "5"); // false (type is different)

// Not equal
console.log(10 != "10"); // false
console.log(10 !== "10"); // true

// Greater / Less than
console.log(10 > 5); // true
console.log(10 < 5); // false
console.log(10 >= 10); // true
console.log(10 <= 9); // false

// With strings (alphabetical comparison)
console.log("apple" < "banana"); // true

console.log("\n");

// ===============================
// 🔹 4. LOGICAL OPERATORS
// ===============================

console.log("== Logical ==");

// AND
console.log(true && false); // false
console.log(5 > 2 && 10 < 20); // true

// OR
console.log(false || true); // true
console.log(10 < 5 || 5 === 5); // true

// NOT
console.log(!true); // false
console.log(!0); // true (0 is falsy)

console.log("\n");

// ===============================
// 🔹 5. TERNARY OPERATOR
// ===============================

console.log("== Ternary ==");

let age = 18;
let canVote = age >= 18 ? "Yes" : "No";
console.log("Can vote? " + canVote); // Yes

console.log("\n");

// ===============================
// 🔹 6. TYPE & UNARY OPERATORS
// ===============================

console.log("== Typeof & Unary ==");

console.log(typeof 123); // "number"
console.log(typeof "Venky"); // "string"
console.log(typeof undefined); // "undefined"
console.log(typeof null); // "object" (JS quirk)

console.log(!true); // false
console.log(+false); // 0
console.log(+true); // 1
console.log(+null); // 0
console.log(+undefined); // NaN

console.log("\n");

// ===============================
// 🔹 7. STRING OPERATIONS
// ===============================

console.log("== String Operators ==");

let combined = "Venky" + " " + "M";
console.log(combined); // "Venky M"

let repeated = "Hi! ".repeat(3);
console.log(repeated); // "Hi! Hi! Hi! "

console.log("\n");

// ===============================
// 🔹 8. NULLISH COALESCING (??)
// ===============================

console.log("== Nullish Coalescing ==");

let username = null;
let displayName = username ?? "Guest";
console.log(displayName); // Guest

let userAge = 0;
console.log(userAge ?? 18); // 0 (because 0 is NOT null/undefined)

console.log("\n");

// ===============================
// 🔹 9. OPTIONAL CHAINING (?.)
// ===============================

console.log("== Optional Chaining ==");

let user = {
  name: "Venky",
  profile: {
    location: "India"
  }
};

console.log(user.profile?.location); // "India"
console.log(user.settings?.theme); // undefined (no error)

console.log("\n");

// ===============================
// 🔹 10. BITWISE OPERATORS (Advanced)
// ===============================

console.log("== Bitwise ==");

console.log(5 & 1); // 1
console.log(5 | 1); // 5
console.log(5 ^ 1); // 4
console.log(~5);    // -6 (invert all bits)
console.log(5 << 1); // 10 (left shift)
console.log(5 >> 1); // 2 (right shift)

console.log("\n");

// ===============================
// 🔹 11. instanceof and in
// ===============================

console.log("== instanceof & in ==");

console.log(arr instanceof Array); // true
console.log(obj instanceof Object); // true

console.log("name" in obj); // true
console.log("age" in obj); // false

console.log("\n");

// ===============================
// 🔹 BONUS: Falsy Values with || and &&
// ===============================

console.log("== Falsy Checks ==");

console.log("" || "default");     // "default"
console.log(null || "fallback");  // "fallback"
console.log(undefined || "set");  // "set"
console.log("Venky" && "M");      // "M" (truthy && truthy = last one)

