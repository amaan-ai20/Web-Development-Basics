# Selecting Elements from the DOM

Before you can read or change anything on a page, you need a **reference** to the element. The DOM gives you several ways to find elements — each with its own strengths.

We'll use this sample HTML throughout:

```html
<!DOCTYPE html>
<html>
  <body>
    <h1 id="title">My Blog</h1>

    <ul class="posts">
      <li class="post featured">First Post</li>
      <li class="post">Second Post</li>
      <li class="post">Third Post</li>
    </ul>

    <button id="load-more">Load more</button>
  </body>
</html>
```

---

## 1. `getElementById`

Returns a **single element** whose `id` matches, or `null` if none exists. IDs must be unique per page.

```js
const title = document.getElementById('title');
console.log(title.textContent);   // "My Blog"

title.textContent = 'My Awesome Blog';
title.style.color = 'tomato';
```

- Fastest lookup — browsers index elements by id.
- Pass the id **without** the `#` prefix.
- Returns `null` if not found, so guard before using: `if (title) { ... }`.

---

## 2. `getElementsByClassName`

Returns a **live `HTMLCollection`** of all elements with the given class.

```js
const posts = document.getElementsByClassName('post');

console.log(posts.length);        // 3
console.log(posts[0].textContent); // "First Post"

// Iterate — HTMLCollection is array-like, not an array
for (const post of posts) {
  post.style.padding = '8px';
}
```

**"Live" means the collection updates automatically** when the DOM changes:

```js
const posts = document.getElementsByClassName('post');
console.log(posts.length);  // 3

const newPost = document.createElement('li');
newPost.className = 'post';
document.querySelector('.posts').appendChild(newPost);

console.log(posts.length);  // 4 — updated without re-querying!
```

---

## 3. `getElementsByTagName`

Same idea, but matches by tag name. Also returns a live `HTMLCollection`.

```js
const allListItems = document.getElementsByTagName('li');
const allButtons   = document.getElementsByTagName('button');

console.log(allListItems.length);  // 3

// Special wildcard: every element on the page
const everything = document.getElementsByTagName('*');
```

You can also call it on a specific element to scope the search:

```js
const list = document.getElementById('load-more');
const items = document.getElementsByTagName('li');  // whole document
```

---

## 4. `querySelector`

Returns the **first element** matching any **CSS selector**, or `null`.

```js
document.querySelector('#title');          // by id
document.querySelector('.post');           // first element with class "post"
document.querySelector('li.featured');     // combined selectors
document.querySelector('ul.posts > li');   // child combinator
document.querySelector('[id="load-more"]'); // attribute selector
```

Because it takes any CSS selector, it's the most flexible option:

```js
const firstFeatured = document.querySelector('.post.featured');
firstFeatured.style.fontWeight = 'bold';
```

---

## 5. `querySelectorAll`

Returns a **static `NodeList`** of all matching elements.

```js
const posts = document.querySelectorAll('.post');

console.log(posts.length);  // 3

// NodeList supports forEach directly
posts.forEach((post, i) => {
  post.textContent = `Post #${i + 1}`;
});
```

**"Static" means the list is a snapshot** — it does **not** update when the DOM changes:

```js
const posts = document.querySelectorAll('.post');
console.log(posts.length);  // 3

const newPost = document.createElement('li');
newPost.className = 'post';
document.querySelector('.posts').appendChild(newPost);

console.log(posts.length);  // still 3 — the snapshot didn't change
```

To convert a NodeList to a real array (for `map`, `filter`, etc.):

```js
const postArray = Array.from(document.querySelectorAll('.post'));
const titles = postArray.map(p => p.textContent);
```

---

## Quick Comparison

| Method | Returns | Live? | Selector type |
|--------|---------|-------|----------------|
| `getElementById` | single `Element` or `null` | — | id only |
| `getElementsByClassName` | `HTMLCollection` | ✅ live | class name |
| `getElementsByTagName` | `HTMLCollection` | ✅ live | tag name |
| `querySelector` | first `Element` or `null` | — | any CSS selector |
| `querySelectorAll` | `NodeList` | ❌ static | any CSS selector |

---

## Which Should You Use?

- **Know the id?** → `getElementById` (shortest, fastest).
- **Need a single element by class/tag/complex rule?** → `querySelector`.
- **Need many elements and want to iterate with `forEach`/`map`?** → `querySelectorAll`.
- **Need a collection that auto-updates as the DOM changes?** → `getElementsByClassName` / `getElementsByTagName`.

In practice, `querySelector` and `querySelectorAll` cover 90% of cases because their CSS-selector syntax is already familiar.

---

## Full Working Example

Save this as `index.html` and open it in a browser:

```html
<!DOCTYPE html>
<html>
<head><title>Selectors Demo</title></head>
<body>
  <h1 id="title">My Blog</h1>

  <ul class="posts">
    <li class="post featured">First Post</li>
    <li class="post">Second Post</li>
    <li class="post">Third Post</li>
  </ul>

  <button id="load-more">Load more</button>

  <script>
    // 1. getElementById
    const title = document.getElementById('title');
    title.style.color = 'steelblue';

    // 2. getElementsByClassName (live)
    const posts = document.getElementsByClassName('post');
    for (const p of posts) p.style.listStyle = 'square';

    // 3. getElementsByTagName
    const items = document.getElementsByTagName('li');
    console.log(`${items.length} list items found`);

    // 4. querySelector
    const featured = document.querySelector('.post.featured');
    featured.style.background = 'gold';

    // 5. querySelectorAll
    const allPosts = document.querySelectorAll('.post');
    allPosts.forEach((p, i) => {
      p.textContent = `${i + 1}. ${p.textContent}`;
    });

    // Button click — new element appears, live collection updates
    document.getElementById('load-more').addEventListener('click', () => {
      const newPost = document.createElement('li');
      newPost.className = 'post';
      newPost.textContent = 'New Post';
      document.querySelector('.posts').appendChild(newPost);

      console.log('live  HTMLCollection:', posts.length);     // grows
      console.log('static NodeList:     ', allPosts.length);  // stays 3
    });
  </script>
</body>
</html>
```

Open DevTools, click **Load more**, and watch the two counts diverge — that's the live vs. static distinction in action.
