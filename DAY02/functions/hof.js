function greetUser(name) {
  return function () {
    console.log("Hello, " + name);
  };
}

let greeter = greetUser("Venky");
greeter(); // Hello, Venky
// function that takes another function or returns a function.
