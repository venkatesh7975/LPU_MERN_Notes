function sumAll(...numbers) {
  let total = 0;
  for (let num of numbers) {
    total += num;
  }
  return total;
}

console.log(sumAll(1, 2, 3, 4)); // 10
