let a = "5";
let b = 5;

if (a == b) {
  console.log("Loose equality: values match"); // true
}

if (a === b) {
  console.log("Strict equality: values & type match");
} else {
  console.log("Strict equality: does not match"); // this runs
}
