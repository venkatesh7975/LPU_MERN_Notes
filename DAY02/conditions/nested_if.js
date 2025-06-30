let isStudent = true;
let marks = 85;

if (isStudent) {
  if (marks >= 90) {
    console.log("Grade: A+");
  } else if (marks >= 75) {
    console.log("Grade: A");
  } else {
    console.log("Grade: B or below");
  }
} else {
  console.log("Not a student");
}
