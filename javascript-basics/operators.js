// operators tutorial

// arithmetic operators
let a = 10;
let b = 5;  

console.log(a + b); // 15
console.log(a - b); // 5
console.log(a * b); // 50
console.log(a / b); // 2
console.log(a % b); // 0

// assignment operators
let c = 20;
c += 10; // c = c + 10
console.log(c); // 30

// Don't show the result of the following operations, just write the code

c -= 5; // c = c - 5
c *= 2; // c = c * 2
c /= 5; // c = c / 5
c %= 3; // c = c % 3

console.log(c); // 1

// comparison operators
console.log(a == b);
console.log(a != b);
console.log(a > b);
console.log(a < b);
console.log(a >= b);
console.log(a <= b);

// logical operators
let x = true;
let y = false;

console.log(x && y); // false
console.log(x || y); // true
console.log(!x); // false
console.log(!y); // true

if (a > b) {
    console.log("a is greater than b");
} else {
    console.log("a is not greater than b");
}

// ternary operator is a shorthand for if-else statement
let result = (a > b) ? "a is greater than b" : "a is not greater than b";

console.log(result); // a is greater than b


// what else left in operators? bitwise operators, typeof operator, instanceof operator, delete operator, in operator, void operator, comma operator, etc. We can cover them in the next tutorial if you want!      

// cover it now

// bitwise operators
let m = 5; // 0101 in binary
let n = 3; // 0011 in binary

console.log(m & n); // 1 (0001 in binary)
console.log(m | n); // 7 (0111 in binary)
console.log(m ^ n); // 6 (0110 in binary)
console.log(~m);    // -6 (inverts the bits of m)
console.log(m << 1); // 10 (shifts bits of m to the left by 1)
console.log(m >> 1); // 2 (shifts bits of m to the right by 1)

// typeof operator
console.log(typeof a); // "number"
console.log(typeof x); // "boolean"
console.log(typeof person); // "object"

// instanceof operator
console.log(person instanceof Object); // true
console.log(numbers instanceof Array); // true

// delete operator
delete person.email;
console.log(person.email); // undefined

// in operator
console.log("name" in person); // true
console.log("email" in person); // false

// void operator
console.log(void 0); // undefined

// comma operator
let p = (1, 2, 3); // p is assigned the value of the last expression, which is 3
console.log(p); // 3    
