let isLoggedIn = false;
let defaultName = "Guest";

let displayName = isLoggedIn && "User"; // false
console.log(displayName); // false

let name = isLoggedIn || defaultName; // fallback
console.log(name); // Guest
