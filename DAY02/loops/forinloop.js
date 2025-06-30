let student = {
  name: "Venky",
  age: 25,
  course: "JavaScript",
};

for (let key in student) {
  console.log(`${key}: ${student[key]}`);
}

//Use for objects, not arrays. It gives keys, not values.
// The for...in loop iterates over the enumerable properties of an object.
// In this case, it iterates over the properties of the `student` object.
// The `key` variable holds the name of each property, and `student[key]` accesses the value associated with that property.
// This will print each key-value pair in the format "key: value" for the `