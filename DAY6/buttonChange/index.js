let root = document.getElementById("root");

let button = document.createElement("button");

button.textContent = "Login";
let message = document.createElement("p");
root.appendChild(message);
root.appendChild(button);

message.textContent = "Please login";

button.style.backgroundColor = "green";
button.style.color = "white";
let isLogged = true;
button.onclick = function () {
  message.textContent = isLogged ? "Welcome" : "Please login";
  button.textContent = isLogged ? "Logout" : "Login";
  isLogged = !isLogged;
  button.style.backgroundColor = isLogged ? "green" : "red";
};

// button.onclick = function () {
//   alert("login button clicked");
// };

// button.addEventListener("click", function () {
//   alert("button clicked again");
// });

// button.onclick = function () {
//   alert("last button clicked");
// };
