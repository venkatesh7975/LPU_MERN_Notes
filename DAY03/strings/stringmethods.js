// 1. Creating Strings
let str1 = "Hello";
let str2 = 'World';
let str3 = `Template literal with ${str1} and ${str2}`; 

console.log(str1, str2);
console.log(str3);

// 2. String Length and Accessing Characters
console.log("Length of str1:", str1.length);  // 5
console.log("First char:", str1[0]);           // H
console.log("Char at index 2:", str1.charAt(2)); // l

// 3. Strings are immutable
str1[0] = "h";       // No effect
console.log("After trying to change first char:", str1); // Hello

// 4. Concatenation
let concat = str1 + " " + str2;
console.log("Concatenation:", concat);

// 5. Template literals (multiline and interpolation)
let multiLine = `This is
a multi-line
string.`;

console.log(multiLine);

// 6. Searching in strings
let phrase = "JavaScript is awesome";

console.log("Index of 'Script':", phrase.indexOf("Script"));   // 4
console.log("Last index of 'a':", phrase.lastIndexOf("a"));   // 3
console.log("Includes 'awesome':", phrase.includes("awesome")); // true

// 7. Extracting parts of strings
console.log("slice(4,10):", phrase.slice(4, 10));       // Script
console.log("substring(4,10):", phrase.substring(4, 10)); // Script
console.log("substr(4,6):", phrase.substr(4, 6));        // Script

// 8. Case conversion
console.log("toLowerCase():", phrase.toLowerCase());
console.log("toUpperCase():", phrase.toUpperCase());

// 9. Trimming and padding
let spaced = "   padded string   ";
console.log("Original with spaces:", `"${spaced}"`);
console.log("trim():", `"${spaced.trim()}"`);
console.log("padStart(20, '*'):", `"${"5".padStart(20, '*')}"`);
console.log("padEnd(10, '-'):", `"${"5".padEnd(10, '-')}"`);

// 10. Splitting and joining
let fruits = "apple,banana,orange";
let fruitArr = fruits.split(",");
console.log("Split fruits:", fruitArr);

let joined = fruitArr.join(" & ");
console.log("Joined fruits:", joined);

// 11. Replacing and repeating
let text = "foo bar foo";
console.log("Replace first 'foo':", text.replace("foo", "baz"));
console.log("Replace all 'foo':", text.replaceAll("foo", "baz"));  // ES2021+

console.log("Repeat 'ha' 3 times:", "ha".repeat(3));

// 12. Checking start and end
console.log("Starts with 'Java':", phrase.startsWith("Java"));
console.log("Ends with 'some':", phrase.endsWith("some"));

// 13. Escape sequences
console.log("New line:\nSecond line");
console.log("Tab:\tTabbed text");
console.log("Quote: \"Double quotes\"");

// 14. String comparison
console.log("'apple' < 'banana':", "apple" < "banana");  // true
console.log("'2' < '10':", "2" < "10");                   // false (lexicographic)

// 15. Using template literals with expressions
let a = 5, b = 10;
console.log(`Sum of ${a} + ${b} = ${a + b}`);

// 16. Immutability demo with method chaining
let original = "hello";
let upper = original.toUpperCase();
console.log("Original:", original);   // hello
console.log("Uppercase:", upper);     // HELLO

// 17. Accessing characters in a loop
for (let i = 0; i < phrase.length; i++) {
  console.log(`Char at ${i}:`, phrase[i]);
}

// 18. Unicode escape sequences
console.log("Unicode char \\u2764:", "\u2764");  // ❤️

// 19. Using split with regex
let csv = "one,two;three four";
let parts = csv.split(/[,; ]/);
console.log("Split by comma, semicolon, space:", parts);

// 20. Template literal multiline example
const html = `
  <div>
    <h1>${str1} ${str2}</h1>
    <p>${phrase}</p>
  </div>
`;
console.log("HTML template literal:", html);
