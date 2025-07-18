let user = {
  username: "venky",
  password: "12345",
  isBlocked: false,
  attemptsLeft: 2,
};

let enteredUsername = "venky";
let enteredPassword = "12345";

if (user.isBlocked) {
  console.log("Your account is blocked.");
} else if (
  enteredUsername === user.username &&
  enteredPassword === user.password
) {
  console.log("Login successful");
} else {
  user.attemptsLeft--;
  if (user.attemptsLeft === 0) {
    user.isBlocked = true;
    console.log("Account blocked due to multiple failed attempts.");
  } else {
    console.log("Incorrect credentials. Attempts left: " + user.attemptsLeft);
  }
}
