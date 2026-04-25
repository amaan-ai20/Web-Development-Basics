// let buttons = document.querySelectorAll('button');

// // New way of adding event listeners using arrow functions
// buttons.forEach(button => {
//     button.addEventListener('click', (event) => {
//         console.log(event);
//         alert('Button was clicked!');
//     });
// });


// document.getElementById('outer').addEventListener('click', (e) => {
//     console.log(e);             // "click"
//     console.log('Listener on:', e.currentTarget.id);  // always "outer"
//     console.log('Clicked:    ', e.target.id);         // "inner", "middle", or "outer"
// });


// document.querySelector('form').addEventListener('submit', (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     console.log('Form submitted!');
// });

const outer = document.getElementById('outer');
const middle = document.getElementById('middle');
const inner = document.getElementById('inner');


outer.addEventListener('click',  () => console.log('outer'));
middle.addEventListener('click', () => console.log('middle'));
inner.addEventListener('click',  (event) =>{ 
    console.log('inner')
    event.stopPropagation();
});


// ❌ Naive approach — attach a listener to every <li>
// document.querySelectorAll('#todos li').forEach(li => {
//   li.addEventListener('click', () => li.remove());
// });

const list = document.getElementById('todos');

// list.addEventListener('click', (e) => {
//   // Only act if an <li> was clicked
//   if (e.target.tagName === 'LI') {
//     e.target.remove();
//   }
// });

const li = document.createElement('li');
li.textContent = 'New item'; // No listener!
document.getElementById('todos').appendChild(li);


// Problem: new items added later won't have a listener.
// Also: N listeners for N items is wasteful.

// Add class style red color. define it.

list.addEventListener('click', (e) => {
  const li = e.target.closest('li');
  if (!li || !list.contains(li)) return;  // clicked outside a todo

  li.classList.toggle('done');
});
