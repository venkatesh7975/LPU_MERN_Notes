//json
let jsobj = {
  name: "suresh",
};
//jsobj  to JSON string  
let jsonString = JSON.stringify(jsobj);  //while sending the data to server
console.log(jsonString); // {"name":"suresh","age":20,"subjects":["maths","english"],"address":{"city":"hyderabad"}}
//JSON string to jsObj
let jsObject = JSON.parse(jsonString); // while recieving data from server
console.log(jsObject); // { name: 'suresh', age: 20, subjects: [ 'maths', 'english' ], address: { city: 'hyderabad' }

