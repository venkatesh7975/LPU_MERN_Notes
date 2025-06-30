function countdown(n) {
  if (n <= 0) {
    console.log("Go!");
    return;
  }
  console.log(n);
  countdown(n - 1);
}

countdown(3);
