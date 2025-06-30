console.log("\n🎯 Object Destructuring");

const profile = {
  username: "venky",
  email: "venky@gmail.com",
  social: {
    twitter: "@venky",
  },
};

const {
  username,
  email,
  social: { twitter },
} = profile;
console.log(username); // venky
console.log(twitter); // @venky
