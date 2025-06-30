console.log(sum(2, 3)); // ✅ Works due to hoisting

function sum(a, b) {
  return a + b;
}

// console.log(add(2, 3)); ❌ Error

const add = function (a, b) {
  return a + b;
};
