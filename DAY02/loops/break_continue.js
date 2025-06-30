for (let i = 1; i <= 10; i++) {
  if (i === 5) break; // exit the loop
  console.log(i); // 1 2 3 4
}

for (let i = 1; i <= 5; i++) {
  if (i === 3) continue; // skip this iteration
  console.log(i); // 1 2 4 5
}
