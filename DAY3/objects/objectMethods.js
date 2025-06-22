console.log("\n🛠 Object Methods");

const student = {
  id: 101,
  name: "Ravi",
  branch: "CSE",
};

// 🔹 Object.keys() - returns array of keys
console.log("Keys:", Object.keys(student)); // ['id', 'name', 'branch']

// 🔹 Object.values() - returns array of values
console.log("Values:", Object.values(student)); // [101, 'Ravi', 'CSE']

// 🔹 Object.entries() - returns key-value pairs
console.log("Entries:", Object.entries(student));
// [['id', 101], ['name', 'Ravi'], ['branch', 'CSE']]

// 🔹 Object.freeze() - prevents changes
Object.freeze(student);
student.name = "Changed"; // won't change
console.log("After freeze:", student);

// 🔹 Object.seal() - allows updates but no adding/removing
const sealedObj = { x: 10 };
Object.seal(sealedObj);
sealedObj.x = 20; // ✅ allowed
sealedObj.y = 30; // ❌ ignored
delete sealedObj.x; // ❌ ignored
console.log("Sealed Object:", sealedObj);

// 🔹 Object.assign() - merging objects
const a = { name: "A" };
const b = { age: 30 };
const merged = Object.assign({}, a, b);
console.log("Merged:", merged); // { name: 'A', age: 30 }

// 🔹 Spread operator for shallow copy
const clone = { ...student };
console.log("Clone:", clone);

// 🔹 Object.hasOwn() - modern alternative to hasOwnProperty
console.log("Has 'name'?", Object.hasOwn(student, "name")); // true

// 🔹 Object.defineProperty()
const user = {};
Object.defineProperty(user, "id", {
  value: 123,
  writable: false,
  enumerable: true,
  configurable: false,
});
console.log("Defined property:", user.id);
user.id = 456; // won't change
console.log("After attempt to change id:", user.id);
