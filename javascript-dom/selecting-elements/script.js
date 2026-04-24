const title = document.getElementById('title');


console.log(title.textContent);   // "My Blog"

title.textContent = 'My Awesome Blog';


title.style.color = 'red';


const posts = document.getElementsByClassName('post');

console.log(posts.length);   // 3

for (let i = 0; i < posts.length; i++) {
    console.log(posts[i].textContent);
}

// increase padding of all posts
for (const post of posts) {
    post.style.padding = '20px';
}

const allListItems = document.getElementsByTagName('li');
const allButtons   = document.getElementsByTagName('button');


console.log(allListItems.length);   // 3
console.log(allButtons.length);      // 1

const everything = document.getElementsByTagName('*');

console.log(everything.length);     // 9


document.querySelector('#title');          // by id
document.querySelector('.post');           // first element with class "post"
document.querySelector('li.featured');     // combined selectors
document.querySelector('ul.posts > li');   // child combinator
document.querySelector('[id="load-more"]'); // attribute selector


document.querySelector('.featured');

console.log(document.querySelector('.post').textContent);   // "Post 2"


const posts1 = document.querySelectorAll('.post');

console.log(posts1.length);  // 3

// NodeList supports forEach directly
posts1.forEach((post, i) => {
  post.textContent = `Post #${i + 1}`;
});
