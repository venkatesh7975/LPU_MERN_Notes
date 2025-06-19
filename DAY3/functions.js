//functions statement,
function hello() {
  console.log("Hello");
}
//function expression
const hai = function () {
  console.log("hai");
};
//arrow function
const hru = () => {
  console.log("how are you");
};
//higher order function
function hof(hello, hai, hru) {
  hello();
  hai();
  hru();
}
hof(hello, hai, hru);
