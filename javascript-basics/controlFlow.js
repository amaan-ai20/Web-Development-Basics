// Control Flow Tutorial

// 1. If-Else Statements
let age = 18;

if (age >= 18) {
    console.log("You are an adult.");
} else {
    console.log("You are a minor.");
}

// 2. Switch Statements
let day = "Monday";

switch (day) {
    case "Monday":
        console.log("Start of the work week.");
        break;
    case "Friday":
        console.log("Weekend is near!");
        break;
    default:
        console.log("Midweek day.");
}

// 3. For Loop
for (let i = 0; i < 5; i++) {
    console.log(`nikhil is good boy: ${i}`);
}
console.log("------------------------------------------------------")
for (let i = 0; i < 5; i++) {
    console.log("nikhil is bad boy: " + i);
}

// concatenation of string tutorial

let str1 = "Hello";
let str2 = "World";
let result = str1 + " " + str2;
console.log(result);

// Template Literals (ES6)
let name = "Alice";
let greeting = `Hello, ${name}!`;
console.log(greeting);


// string and number concatenation
let num1 = 10;

console.log("The sum is: " + num1);

// string and boolean concatenation
let isLoggedIn = true;
console.log("Is user logged in? " + isLoggedIn);



// // 4. While Loop
let count = 0;

while (count < 3) {
    console.log("Count: " + count);
    count++;
}

// // 5. Do-While Loop
let num = 1;

do {
    console.log("Number: " + num);
    num++;
} while (num <= 3);



// // 6. Break and Continue
for (let i = 0; i < 5; i++) {
    if (i === 2) {
        continue; // Skip iteration when i is 2
    }
    if (i === 4) {
        break; // Exit the loop when i is 4
    }
    console.log("Iteration: " + i);
}

// one more example of break and continue

for (let i = 0; i < 5; i++) {
    if (i === 2) {
        continue; // Skip iteration when i is 2
    }
    if (i === 4) {
        break; // Exit the loop when i is 4
    }
    console.log("Iteration: " + i);
}

// a one more harder one


for (let i = 0; i < 5; i++) {
    if (i === 2) {
        continue; // Skip iteration when i is 2
    }
    if (i === 4) {
        break; // Exit the loop when i is 4
    }
    console.log("Iteration: " + i);
}

// give more harder example of break and continue

for (let i = 0; i < 5; i++) {
    if (i === 2) {
        continue; // Skip iteration when i is 2
    }
    if (i === 4) {
        break; // Exit the loop when i is 4
    }
    console.log("Iteration: " + i);
}

// Harder example: find the first pair of numbers in a 2D matrix
// whose sum equals a target. Use labeled break to exit both loops,
// and continue to skip negative numbers entirely.

const matrix = [
    [1, -2, 3, 4],
    [5, 6, -7, 8],
    [9, 10, 11, 12],
];
const target = 17;

outer: for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] < 0) {
            continue; // skip negatives
        }
        for (let k = j + 1; k < matrix[i].length; k++) {
            if (matrix[i][k] < 0) {
                continue; // skip negatives in inner search
            }
            if (matrix[i][j] + matrix[i][k] === target) {
                console.log(`Found pair at row ${i}: ${matrix[i][j]} + ${matrix[i][k]} = ${target}`);
                break outer; // exit all three loops at once
            }
        }
    }
}

// Harder example 2: process a stream of user actions, skipping
// invalid entries with `continue`, and stopping on a "logout" with `break`.

const actions = ["login", "view", "", "click", "logout", "purchase"];

for (let i = 0; i < actions.length; i++) {
    const action = actions[i];

    if (!action) {
        continue; // skip empty/invalid action
    }

    if (action === "logout") {
        console.log("Session ended. Stopping processing.");
        break;
    }

    console.log(`Processing action #${i}: ${action}`);
}