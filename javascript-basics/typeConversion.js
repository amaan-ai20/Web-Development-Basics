// TypeConversion in js. With Console.log() we can see the output of the code. But when don't show output in the comments strictly in this file.

// Don't show output in the comments strictly in this file.

// 1. String Conversion
let value = true;
console.log(typeof value); // boolean

value = String(value);
console.log(typeof value); // string

// 2. Numeric Conversion
console.log( "6" / "2" ); // 3

let str = "123";
console.log(typeof str); // string

let num = Number(str);
console.log(typeof num); // number

// 3. Boolean Conversion
console.log( Boolean(1) ); // true 
console.log( Boolean(0) ); // false

console.log( Boolean("hello") ); // true
console.log( Boolean("") ); // false

// Note: For empty strings and "0", the numeric conversion also gives zero. So, these are false in a boolean context as well.

// Summary:
// String Conversion – Occurs when we output something. Can be performed with String(value). The conversion to string is usually obvious for primitive values.
// Numeric Conversion – Occurs in math operations. Can be performed with Number(value).
// The conversion follows the rules:
// Value	Becomes…
// undefined	NaN
// null	0
// true / false	1 / 0
// string	The string is read “as is”, whitespaces (includes spaces, tabs \t, newlines \n etc.) from both ends are ignored. An empty string becomes 0. An error gives NaN.
