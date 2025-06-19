//Scope refers to where variables are accessible in your code.

// Global Scope
function greet() {
  var name = "Venkatesh";
  // ✅ Accessible inside function
}
greet();
console.log(name);

// // Block Scope
// {
//   let a = 10;
//   const b = 20;
//   var c = 30;
// }

// console.log(a); // ❌ Error
// console.log(b); // ❌ Error
// console.log(c); // ✅ 30 → `var` is not block-scoped

// // Function Scope
// function outerFunction() {
//   let x = 5;

//   function innerFunction() {
//     console.log(x); // ✅ Accessible from inner function
//   }

//   innerFunction();
// }
