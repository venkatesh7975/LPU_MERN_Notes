// ===================
// 1. Creating Arrays
// ===================
let arr1 = [1, 2, 3];
let arr2 = new Array(4);          // Array with 4 empty slots
let arr3 = Array.of(10, 20, 30);  // [10, 20, 30]
let arr4 = Array.from('hello');   // ['h', 'e', 'l', 'l', 'o']

console.log('Created Arrays:', arr1, arr2, arr3, arr4);

// ===================
// 2. Accessing Elements
// ===================
console.log('First element:', arr1[0]);
console.log('Last element:', arr1[arr1.length - 1]);

// ===================
// 3. Adding/Removing Elements
// ===================
arr1.push(4);       // Add to end
arr1.unshift(0);    // Add to start
console.log('After push & unshift:', arr1);

arr1.pop();         // Remove from end
arr1.shift();       // Remove from start
console.log('After pop & shift:', arr1);

// ===================
// 4. Updating Elements
// ===================
arr1[1] = 100;
console.log('After update index 1:', arr1);

// ===================
// 5. Looping Through Arrays
// ===================
console.log('Using for loop:');
for (let i = 0; i < arr1.length; i++) {
  console.log(i, arr1[i]);
}

console.log('Using for..of loop:');
for (let val of arr1) {
  console.log(val);
}

console.log('Using forEach:');
arr1.forEach((val, idx) => console.log(idx, val));

// ===================
// 6. Searching
// ===================
console.log('Includes 100?', arr1.includes(100));
console.log('Index of 100:', arr1.indexOf(100));
console.log('Find > 50:', arr1.find(x => x > 50));
console.log('FindIndex > 50:', arr1.findIndex(x => x > 50));

// ===================
// 7. Filtering & Mapping
// ===================
let evens = arr1.filter(x => x % 2 === 0);
let doubled = arr1.map(x => x * 2);
console.log('Evens:', evens);
console.log('Doubled:', doubled);

// ===================
// 8. Reducing & Aggregating
// ===================
let sum = arr1.reduce((acc, val) => acc + val, 0);
let product = arr1.reduce((acc, val) => acc * val, 1);
console.log('Sum:', sum);
console.log('Product:', product);

// ===================
// 9. Sorting & Reversing
// ===================
arr1.sort((a, b) => a - b);      // Ascending
console.log('Sorted Asc:', arr1);

arr1.sort((a, b) => b - a);      // Descending
console.log('Sorted Desc:', arr1);

arr1.reverse();
console.log('Reversed:', arr1);

// ===================
// 10. Copying & Cloning
// ===================
let shallowCopy = [...arr1];
let sliceCopy = arr1.slice();
let deepCopy = JSON.parse(JSON.stringify(arr1));
console.log('Copies:', shallowCopy, sliceCopy, deepCopy);

// ===================
// 11. Slice vs Splice
// ===================
let sliced = arr1.slice(1, 3);   // Non-destructive
console.log('Sliced:', sliced);

let spliced = arr1.splice(1, 2); // Destructive: removes elements at index 1 and 2
console.log('Spliced:', spliced);
console.log('After splice arr1:', arr1);

// ===================
// 12. Flattening Arrays
// ===================
let nested = [1, [2, 3], [4, [5, 6]]];
console.log('Flat 1:', nested.flat());
console.log('Flat Infinity:', nested.flat(Infinity));

// ===================
// 13. Join & Split
// ===================
let str = arr3.join('-');
console.log('Joined string:', str);

let splitArr = 'a,b,c'.split(',');
console.log('Split array:', splitArr);

// ===================
// 14. Fill & CopyWithin
// ===================
let fillArr = new Array(5).fill(0);
console.log('Fill:', fillArr);

let copyWithinArr = [1, 2, 3, 4, 5];
copyWithinArr.copyWithin(0, 3, 5);  // Copies elements at indices 3 and 4 to start
console.log('CopyWithin:', copyWithinArr);

// ===================
// 15. Destructuring
// ===================
let [first, second, ...rest] = [10, 20, 30, 40, 50];
console.log('Destructuring:', first, second, rest);

// ===================
// 16. Spread & Rest
// ===================
let arrA = [1, 2, 3];
let arrB = [4, 5, 6];
let merged = [...arrA, ...arrB];
console.log('Merged with spread:', merged);

// ===================
// 17. Array Checking
// ===================
console.log('Is arrA array?', Array.isArray(arrA));
console.log('Type of arrA:', typeof arrA);

// ===================
// 18. Remove Duplicates
// ===================
let dupArr = [1, 2, 2, 3, 3, 3];
let unique = [...new Set(dupArr)];
console.log('Unique:', unique);

// ===================
// 19. Merging Arrays
// ===================
let concatArr = arrA.concat(arrB);
console.log('Concatenated:', concatArr);

// ===================
// 20. Iterators: entries, keys, values
// ===================
for (let [index, value] of arrA.entries()) {
  console.log('Entry:', index, value);
}

for (let key of arrA.keys()) {
  console.log('Key:', key);
}

for (let val of arrA.values()) {
  console.log('Value:', val);
}

// ===================
// 21. Zipping Arrays
// ===================
function zip(a, b) {
  return a.map((v, i) => [v, b[i]]);
}
let zipped = zip(arrA, arrB);
console.log('Zipped:', zipped);

// ===================
// 22. Random Element & Shuffle
// ===================
let randomElement = arrA[Math.floor(Math.random() * arrA.length)];
console.log('Random element:', randomElement);

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
shuffle(arrA);
console.log('Shuffled arrA:', arrA);

// ===================
// 23. Partitioning Arrays (evens & odds)
// ===================
let even = arrB.filter(x => x % 2 === 0);
let odds = arrB.filter(x => x % 2 !== 0);
console.log('Evens:', even);
console.log('Odds:', odds);

// ===================
// 24. Chunking Arrays
// ===================
function chunk(arr, size) {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
}
console.log('Chunks of 2:', chunk(arrB, 2));

// ===================
// 25. Deep Flatten
// ===================
function flattenDeep(arr) {
  return arr.reduce((acc, val) =>
    Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
}
console.log('Deep Flatten:', flattenDeep(nested));




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
//adding +1 to every element in the array
//output: [ 2, 3, 4, 5, 6, 7, 8, 9,10]
// let evennumbers=arr.filter(function (num) {
//   return num % 2 === 0;
// });

// console.log(arr);
