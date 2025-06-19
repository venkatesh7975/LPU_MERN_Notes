//The Promise object represents the eventual completion 
// (or failure) of an asynchronous operation and its resulting value.




































const promise = new Promise((resolve, reject) => {
  const success = true; // Simulate success or failure
  if (success) {
    resolve("Operation was successful!");
  } else {
    reject("Operation failed.");
  }
});

promise
  .then((message) => {
    console.log(message); // This will run if the promise is resolved
  })
  .catch((error) => {
    console.error(error); // This will run if the promise is rejected
  })
  .finally(() => {
    console.log("Promise has settled (either resolved or rejected).");
  });