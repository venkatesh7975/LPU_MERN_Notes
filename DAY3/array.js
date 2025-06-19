// let arr = [];
// arr.push(3);
// arr.push("venkatesh");
// arr.push([1, 2, 3]);
// arr.push({ laptop: "hp" });
// arr.push(null);
// arr.push(true);
// console.log("before pop", arr);
// arr.pop();
// console.log("after pop", arr);

// arr.unshift("unshift");
// console.log("after unshift", arr);

// arr.shift();

// console.log("after shift", arr);

// let arr = [1, 2, 3];
// arr.splice(2, 2, 4, 5); // remove /replace  /// splice (index,del num,new value)
// console.log(arr);

// console.log(arr.join(""));
// console.log(arr.reverse());

let nums = [1, 74, 23, 3, 6];
function mul(num) {
  return num * 2;
}
let res = nums.map(mul);

console.log(nums);

// let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// //adding +1 to every element in the array
// //output: [ 2, 3, 4, 5, 6, 7, 8, 9,10]
// let evennumbers=arr.filter(function (num) {
//   return num % 2 === 0;
// });

// console.log(arr);
