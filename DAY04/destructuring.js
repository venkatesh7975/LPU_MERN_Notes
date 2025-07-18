// //destructuring
// const person = {
//   name: "John",
//   age: 30,
// };
// const { name, age } = person;
// console.log(name, age);
// // };
// // Destructuring assignment
// const { name, age, address: { city, zip } } = person;
// console.log(name); // John
// console.log(age); // 30
// console.log(city); // New York
// console.log(zip); // 10001

// //array destructuring
// const numbers = [1, 2, 3, 4, 5];
// const [first, second, ...rest] = numbers;
// console.log(first); // 1
// console.log(second); // 2
// console.log(rest); // [3, 4, 5]

// //spreading and destructuring
// const arr1 = [1, 2, 3];
// const arr2 = [4, 5, 6];
// const combined = [...arr1, ...arr2];
// console.log(combined); // [1, 2, 3, 4, 5, 6]

let nums1 = [1, 2, 3, 4];
let nums2 = [, 5, 6, 7, 8];
let res = [...nums1, ...nums2]; //spread operator
// const [a, b, ...abc] = nums1;//rest operator
console.log(res);
