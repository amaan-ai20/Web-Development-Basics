# Creating & Removing Elements

So far we've found existing elements and changed their content. Now let's **build new elements** from scratch, **insert** them wherever we want in the tree, and **remove** them when we're done.

We'll use this starting HTML for every example:

```html
<!DOCTYPE html>
<html>
  <body>
    <h1>Todo List</h1>

    <ul id="todos">
      <li>Buy milk</li>
      <li>Walk the dog</li>
    </ul>

    <button id="add">Add todo</button>
    <button id="clear">Clear all</button>
  </body>
</html>
```

---

## Part 1 — Creating Nodes

New elements aren't in the DOM until you insert them. You first **create** them in memory, then **attach** them to a parent.

### `document.createElement(tagName)`

Creates a fresh element node.

```js
const li = document.createElement('li');
li.textContent = 'Learn DOM';
li.className = 'todo';

// Not on the page yet — it exists only in memory.
document.body.contains(li);  // false
```

You can set any property before inserting: `textContent`, `className`, `id`, attributes, styles, event listeners.

### `document.createTextNode(text)`

Creates a plain **text node** (no tag around it).

```js
const text = document.createTextNode('Just some text');
document.body.appendChild(text);
```

You rarely need this in practice — setting `element.textContent = '...'` is simpler. It's useful when you need to mix text and elements inside the same parent precisely.

---

## Part 2 — Inserting Nodes

Once created, a node needs a home. These methods attach it to a parent.

### `parent.appendChild(node)`

The classic. Adds `node` as the **last child** of `parent`.

```js
const list = document.getElementById('todos');

const li = document.createElement('li');
li.textContent = 'Learn DOM';

list.appendChild(li);
// <ul>
//   <li>Buy milk</li>
//   <li>Walk the dog</li>
//   <li>Learn DOM</li>   ← added at end
// </ul>
```

If `node` is already in the DOM somewhere else, it **moves** instead of copying.

### `parent.append(...nodes)` (modern)

Like `appendChild`, but with upgrades:

- Accepts **multiple nodes** at once.
- Accepts **plain strings** (automatically wrapped in text nodes).
- Returns nothing (don't chain off it).

```js
const li = document.createElement('li');
li.textContent = 'First thing';

list.append(li, 'and some text', document.createElement('hr'));
```

### `parent.prepend(...nodes)`

Same as `append`, but inserts at the **beginning**.

```js
const li = document.createElement('li');
li.textContent = 'Top priority!';

list.prepend(li);
// Inserted as the first child of <ul>
```

### `parent.insertBefore(newNode, referenceNode)`

The classic way to insert at a **specific position**. Places `newNode` right before `referenceNode`.

```js
const list = document.getElementById('todos');
const second = list.children[1];  // "Walk the dog"

const li = document.createElement('li');
li.textContent = 'Inserted in the middle';

list.insertBefore(li, second);
// <ul>
//   <li>Buy milk</li>
//   <li>Inserted in the middle</li>   ← new
//   <li>Walk the dog</li>
// </ul>
```

To insert at the end, pass `null` as the reference:

```js
list.insertBefore(li, null);  // equivalent to appendChild
```

### `element.insertAdjacentElement(position, newElement)`

The most flexible inserter. Takes a **position string** relative to the element:

| Position | Where it inserts |
|----------|------------------|
| `'beforebegin'` | Before the element itself (as a sibling) |
| `'afterbegin'`  | Inside, as the first child |
| `'beforeend'`   | Inside, as the last child |
| `'afterend'`    | After the element itself (as a sibling) |

```html
<!-- beforebegin -->
<ul id="todos">
  <!-- afterbegin -->
  <li>Buy milk</li>
  <li>Walk the dog</li>
  <!-- beforeend -->
</ul>
<!-- afterend -->
```

```js
const list = document.getElementById('todos');

const top = document.createElement('li');
top.textContent = 'Top';
list.insertAdjacentElement('afterbegin', top);

const bottom = document.createElement('li');
bottom.textContent = 'Bottom';
list.insertAdjacentElement('beforeend', bottom);

const heading = document.createElement('h2');
heading.textContent = 'Tasks:';
list.insertAdjacentElement('beforebegin', heading);
```

Related variants for convenience:
- `insertAdjacentHTML(position, htmlString)` — parses an HTML string.
- `insertAdjacentText(position, text)` — inserts plain text.

### Which insert should I use?

- **Adding to the end** → `append` (or `appendChild` if you prefer the classic).
- **Adding to the start** → `prepend`.
- **At a specific index** → `insertBefore` or `insertAdjacentElement`.
- **Relative to a sibling** → `insertAdjacentElement` (clearer than computing references).

---

## Part 3 — Removing Nodes

### `element.remove()` (modern, preferred)

Removes the element from its parent. No arguments needed.

```js
const list = document.getElementById('todos');
const first = list.firstElementChild;

first.remove();
// "Buy milk" is gone
```

### `parent.removeChild(node)` (classic)

Removes `node` from `parent`. Returns the removed node (so you can reinsert it elsewhere).

```js
const list = document.getElementById('todos');
const first = list.firstElementChild;

const removed = list.removeChild(first);
console.log(removed.textContent);  // "Buy milk" — still in memory

// You can reinsert it later
list.appendChild(removed);
```

Throws if `node` isn't actually a child of `parent`, so it's stricter than `.remove()`.

### Removing everything inside an element

```js
// Simple, but forces HTML parsing
list.innerHTML = '';

// Safer, explicit
while (list.firstChild) {
  list.firstChild.remove();
}

// Modern one-liner
list.replaceChildren();
```

---

## Quick Reference

| Task | Use |
|------|-----|
| Create a tag | `document.createElement('div')` |
| Create text | `document.createTextNode('hi')` or set `textContent` |
| Add at end | `parent.append(node)` |
| Add at start | `parent.prepend(node)` |
| Add before a sibling | `parent.insertBefore(new, ref)` |
| Add relative to element | `element.insertAdjacentElement(pos, new)` |
| Remove self | `element.remove()` |
| Remove a child | `parent.removeChild(child)` |
| Empty a container | `parent.replaceChildren()` |

---

## Full Working Example

Save as `index.html` and open in a browser:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Create & Remove Demo</title>
  <style>
    li { cursor: pointer; padding: 4px; }
    li:hover { background: #ffe; }
    .done { text-decoration: line-through; color: #888; }
  </style>
</head>
<body>
  <h1>Todo List</h1>

  <ul id="todos">
    <li>Buy milk</li>
    <li>Walk the dog</li>
  </ul>

  <input id="new-todo" placeholder="New todo...">
  <button id="add">Add to end</button>
  <button id="add-top">Add to top</button>
  <button id="insert-middle">Insert in middle</button>
  <button id="clear">Clear all</button>

  <p><em>Click any todo to remove it.</em></p>

  <script>
    const list  = document.getElementById('todos');
    const input = document.getElementById('new-todo');

    function makeTodo(text) {
      const li = document.createElement('li');
      li.textContent = text;
      return li;
    }

    // Add to end using append (accepts strings AND nodes)
    document.getElementById('add').addEventListener('click', () => {
      const text = input.value.trim();
      if (!text) return;
      list.append(makeTodo(text));
      input.value = '';
    });

    // Add to top using prepend
    document.getElementById('add-top').addEventListener('click', () => {
      list.prepend(makeTodo('⭐ Priority task'));
    });

    // Insert in the middle using insertBefore
    document.getElementById('insert-middle').addEventListener('click', () => {
      const middleIndex = Math.floor(list.children.length / 2);
      const ref = list.children[middleIndex];
      const li = makeTodo('Sneaky middle task');
      if (ref) {
        list.insertBefore(li, ref);
      } else {
        list.append(li);
      }
    });

    // Clear everything
    document.getElementById('clear').addEventListener('click', () => {
      list.replaceChildren();
    });

    // Click a todo to remove it (event delegation)
    list.addEventListener('click', (e) => {
      if (e.target.tagName === 'LI') {
        e.target.remove();
      }
    });

    // Demo insertAdjacentElement — add a footer after the list
    const footer = document.createElement('p');
    footer.textContent = '— end of list —';
    list.insertAdjacentElement('afterend', footer);
  </script>
</body>
</html>
```

Try it: type a todo, add it to the end/top/middle, click todos to remove them, or clear everything. Every button showcases a different insertion or removal method.
