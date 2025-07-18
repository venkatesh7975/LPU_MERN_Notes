// //write a program for calculator using higher order function
// //

// //functions statement,
// function add(a, b) {
//   console.log("addition", a + b);
// }
// //function expression
// const sub = function (a, b) {
//   console.log("subtraction", a - b);
// };
// //arrow function
// const mul = (a, b) => {
//   console.log("mul", a * b);
// };
// //division
// function div(a, b) {
//   console.log("div", a / b);
// }

// //higher order function: a function either that accept function argument,
// // or it will return a function
// function calculator(add, sub, mul, div, a, b) {
//   add(a, b);
//   sub(a, b);
//   mul(a, b);
//   div(a, b);
// }

// calculator(add, sub, mul, div, 4, 6);

// // function hai() {
// //   console.log("hai");
// // }

// // function greet(hai) {
// //   hai();
// //   console.log("How are you ");
// // }
// // greet(hai);
let hai = "hai";
setInterval(function () {
  console.log(hai);
}, 1000);
