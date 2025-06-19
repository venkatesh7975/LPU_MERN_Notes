let student = {
  name: "suresh",
  age: 20,
  subjects: ["maths", "english"],
  address: {
    city: "hyderabad",
  },
};
// console.log(Object.keys(student)); // ['age', 'subjects', 'address']
// console.log(Object.values(student)); // ['suresh', 20, ['maths', 'english'], { city: 'hyderabad' }]
console.log(Object.entries(student)); // [['name', 'suresh'], ['age', 20], ['subjects', ['maths', 'english']], ['address', { city: 'hyderabad' }]]
