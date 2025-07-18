console.log("Fetching data..."); // Logs a message to indicate the start of the fetch operation

function fetchData() {
  fetch("https://jsonplaceholder.typicode.com/posts") // Returns a Promise for the HTTP response
    .then((res) => res.json()) // Returns a Promise for the parsed JSON data
    .then((data) => {
      console.log(data); // Logs the array of post objects
    })
    .catch((err) => {
      console.error("Error:", err); // Handles any errors during fetch or JSON parsing
    });
}

fetchData(); // Calls the function

console.log("Data fetched successfully!"); // Logs a message to indicate the fetch operation has completed
