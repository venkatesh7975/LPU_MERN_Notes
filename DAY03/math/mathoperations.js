console.log("🔢 Basic Arithmetic Operations");
let a = 10;
let b = 3;

console.log("a + b =", a + b);      // Addition → 13
console.log("a - b =", a - b);      // Subtraction → 7
console.log("a * b =", a * b);      // Multiplication → 30
console.log("a / b =", a / b);      // Division → 3.333...
console.log("a % b =", a % b);      // Modulus → 1
console.log("a ** b =", a ** b);    // Exponentiation → 1000

console.log("\n🔁 Increment/Decrement");
let x = 5;
console.log("Post-increment (x++):", x++); // → 5 (then x becomes 6)
console.log("Pre-increment (++x):", ++x); // → 7

console.log("Post-decrement (x--):", x--); // → 7 (then x becomes 6)
console.log("Pre-decrement (--x):", --x); // → 5

console.log("\n🧮 Rounding Functions");
console.log("Math.round(4.6):", Math.round(4.6)); // → 5
console.log("Math.floor(4.9):", Math.floor(4.9)); // → 4
console.log("Math.ceil(4.1):", Math.ceil(4.1));   // → 5
console.log("Math.trunc(4.9):", Math.trunc(4.9)); // → 4

console.log("\n🔼 Max/Min/Absolute");
console.log("Math.max(1, 5, 3):", Math.max(1, 5, 3)); // → 5
console.log("Math.min(1, 5, 3):", Math.min(1, 5, 3)); // → 1
console.log("Math.abs(-7):", Math.abs(-7));          // → 7

console.log("\n📏 Power and Roots");
console.log("Math.pow(2, 3):", Math.pow(2, 3));   // → 8
console.log("2 ** 3:", 2 ** 3);                   // → 8 (same)
console.log("Math.sqrt(25):", Math.sqrt(25));     // → 5

console.log("\n🎲 Random Numbers");
console.log("Random [0,1):", Math.random()); // e.g. 0.27683
console.log("Random 0–9:", Math.floor(Math.random() * 10));
console.log("Random 1–6 (dice):", Math.floor(Math.random() * 6) + 1);

console.log("\n📐 Trigonometric Functions");
console.log("Math.sin(PI/2):", Math.sin(Math.PI / 2)); // → 1
console.log("Math.cos(0):", Math.cos(0));              // → 1
console.log("Math.tan(PI/4):", Math.tan(Math.PI / 4)); // → ~1

console.log("\n🧮 Logarithmic/Exponential");
console.log("Math.log(10):", Math.log(10));     // Natural log
console.log("Math.log10(100):", Math.log10(100)); // → 2
console.log("Math.exp(1):", Math.exp(1));       // e^1 ≈ 2.718

console.log("\n🧪 NaN, Infinity, Division Edge Cases");
console.log("5 / 0 =", 5 / 0);           // → Infinity
console.log("-5 / 0 =", -5 / 0);         // → -Infinity
console.log("0 / 0 =", 0 / 0);           // → NaN
console.log('"abc" * 3 =', "abc" * 3);   // → NaN
console.log('typeof NaN =', typeof NaN); // → "number"

console.log("\n🔄 Assignment Operators");
let n = 10;
n += 5; // n = n + 5
console.log("n += 5:", n); // → 15

n *= 2;
console.log("n *= 2:", n); // → 30

n %= 7;
console.log("n %= 7:", n); // → 2

console.log("\n🔡 Type Coercion in Math");
console.log('"5" + 3 =', "5" + 3);   // → "53" (string concatenation)
console.log('"5" - 3 =', "5" - 3);   // → 2 (string coerced to number)
console.log('"5" * "2" =', "5" * "2"); // → 10

console.log("\n🔢 Conversions");
console.log('parseInt("42px") =', parseInt("42px"));       // → 42
console.log('parseFloat("3.14pie") =', parseFloat("3.14pie")); // → 3.14
console.log('Number("42") =', Number("42"));               // → 42
console.log('Number("hello") =', Number("hello"));         // → NaN

console.log("\n🎯 Rounding to 2 Decimal Places");
let pi = 3.14159;
console.log("Rounded:", Math.round(pi * 100) / 100); // → 3.14

console.log("\n🧠 Average of Array Example");
function average(arr) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}
console.log("Average of [10, 20, 30]:", average([10, 20, 30])); // → 20

console.log("\n📅 Practical Math: OTP Generator");
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}
console.log("OTP:", generateOTP());

console.log("\n📈 Exponentiation vs Math.pow");
console.log("3 ** 4 =", 3 ** 4);         // 81
console.log("Math.pow(3, 4) =", Math.pow(3, 4)); // 81

console.log("\n🔢 Modulo for Even/Odd");
let num = 7;
console.log(`${num} is ${num % 2 === 0 ? "Even" : "Odd"}`); // → 7 is Odd


// console.log(Math.round(2.49));

// console.log(Math.round(Math.random() * 1000));

//guess the input

// let userinput = 2;

// let randomNumber = Math.floor(Math.random() * 5);
// if (userinput === randomNumber) {
//   console.log("your guess is correct");
// } else {
//   console.log("try again", randomNumber);
// }
// let num = 1.233333333;
// console.log(num.toFixed(2));
