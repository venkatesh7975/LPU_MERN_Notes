function process(callback) {
  console.log("Before callback");
  callback();
  console.log("After callback");
}

process(function () {
  console.log("I am a callback");
});
