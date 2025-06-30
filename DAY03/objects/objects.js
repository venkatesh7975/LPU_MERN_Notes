console.log("📦 JavaScript Object Basics");

// Creating an object
const person = {
  name: "Venkatesh",
  age: 25,
  isTrainer: true,
  skills: ["JavaScript", "React", "Node.js"],
  address: {
    city: "Bhimavaram",
    country: "India"
  },
  greet: function () {
    console.log("Hello, my name is " + this.name);
  }
};

// Accessing properties
console.log("Name:", person.name);
console.log("City:", person.address.city);

// Accessing using bracket notation
console.log("Country:", person["address"]["country"]);

// Calling method
person.greet();

// Add a new property
person.email = "venkatesh@example.com";
console.log("Email:", person.email);

// Update property
person.age = 26;
console.log("Updated Age:", person.age);

// Delete a property
delete person.isTrainer;
console.log("After Deletion:", person);

// Check if property exists
console.log("Has email?", "email" in person);  // true
console.log("Has salary?", person.hasOwnProperty("salary")); // false

// Iterate over object
console.log("\n🔁 Looping through object:");
for (let key in person) {
  console.log(key + ":", person[key]);
}
