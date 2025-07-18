//  let name = "Venkatesh";

// function greet() {

//   return function () {
//     console.log("Hi " + name);
//   };
// }
// greet()();

// // Lexical Scope means:

// // A function can access variables that were declared in the same place or in outer (parent) functions where it is written in the code.

function restarant() {
  let order = "a burger ";

  return function waiter() {
    console.log(order + " delivered");
  };
}
let res = restarant();
res();
