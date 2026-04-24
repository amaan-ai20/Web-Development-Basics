// Data Types

// String
let name = "John Doe";

// Number
let age = 30;

// Boolean
let isStudent = true;

// Null
let emptyValue = null;

// Undefined
let undefinedValue;

// Array
let numbers = [1, 2, 3, 4, 5];

// int, float, double are not separate data types in JavaScript; they are all represented as Number.

// Null and Undefined are distinct data types in JavaScript. Null represents the intentional absence of any object value, while Undefined indicates that a variable has been declared but has not yet been assigned a value.

// console.log(emptyValue); // null
// console.log(undefinedValue); // undefined

// console.log(emptyValue === undefinedValue); // false

// console.log(typeof name); // "string"
// console.log(typeof age); // "number"
// console.log(typeof isStudent); // "boolean"
// console.log(typeof person); // "object"
// console.log(typeof numbers); // "object" (arrays are a type of object in JavaScript)
// console.log(typeof emptyValue); // "object"
// console.log(typeof undefinedValue); // "undefined"



// Object
let person = {
    name: "Jane Doe",
    age: 25,
    isStudent: false,
    "some property": "This is a property with spaces in its name"
};

console.log(typeof person); // "object"

console.log(person.name); // "Jane Doe"
console.log(person.age); // 25
console.log(person.isStudent); // false

// You can also add new properties to the object
person.email = "jane.doe@example.com";
console.log(person.email); // "jane.doe@example.com"        

console.log(person);

// delete property from object
delete person.isStudent;
console.log(person);

// accessing a non-existent property
console.log(person.isStudent); // undefined

// accessing a property using bracket notation
console.log(person["name"]); // "Jane Doe"

// accessing a non-existent property using bracket notation
console.log(person["isStudent"]); // undefined

console.log(person["some property"]); // "This is a property with spaces in its name"

