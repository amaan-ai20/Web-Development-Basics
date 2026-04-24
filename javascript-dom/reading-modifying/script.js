const title = document.getElementById('title');


// Read
console.log(title.textContent);

title.textContent = 'Hi there!';

title.textContent = 'Hi <em>there!</em>';


{/* <p id="msg">Visible <span style="display:none">hidden</span> text</p> */}

const msg = document.getElementById('msg');

console.log(msg.textContent); // Gets all text, including hidden text, ignores CSS
console.log(msg.innerText); // Respect CSS, ignores hidden text



console.log(msg.innerHTML); // Gets HTML, including hidden text, ignores CSS

title.innerHTML = 'Hi <em>there!</em>';


const link = document.getElementById('link');

console.log(link.getAttribute('href')); // Get the href attribute value

console.log(link.getAttribute('target'));

// List all remaining attributes

const bio = document.querySelector('.bio');

console.log(bio.getAttribute('data-user-id'));  // "42"

// remove __blank attribute
link.removeAttribute('target');

// set __blank attribute
link.setAttribute('target', '_blank');

