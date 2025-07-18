//logic for timer
let sec = 0;
let min = 0;
function timer() {
  sec += 1;
  if (sec > 59) {
    min += 1;
    sec = 0;
  }

  console.log("countdown", min + ":" + sec);
}

setInterval(timer, 100);
