# Event Object, Bubbling, Capturing & Delegation

When an event fires, the browser hands your handler an **event object** packed with details about what happened. Understanding that object — plus how events travel through the DOM — unlocks powerful patterns like **delegation**.

We'll use this HTML throughout:

```html
<!DOCTYPE html>
<html>
  <body>
    <div id="outer" style="padding:30px; background:#fdd;">
      outer
      <div id="middle" style="padding:30px; background:#dfd;">
        middle
        <button id="inner" style="padding:10px;">inner button</button>
      </div>
    </div>

    <ul id="todos">
      <li>Buy milk</li>
      <li>Walk the dog</li>
      <li>Learn DOM</li>
    </ul>
    <form id="signup">
      <input name="email" type="email">
      <button>Submit</button>
    </form>
  </body>
</html>
```

---

## Part 1 — The Event Object

Every handler receives one argument — conventionally called `e` or `event`:

```js
button.addEventListener('click', (e) => {
  console.log(e);
});
```

### `e.target`

The **exact element** that originated the event — even if the listener is on an ancestor.

```js
document.getElementById('outer').addEventListener('click', (e) => {
  console.log('Listener on:', e.currentTarget.id);  // always "outer"
  console.log('Clicked:    ', e.target.id);         // "inner", "middle", or "outer"
});
```

- `e.target` — where the event originated.
- `e.currentTarget` — the element the listener is attached to (same as `this` in a non-arrow handler).

This difference is the foundation of event delegation (Part 3).

### `e.preventDefault()`

Cancels the browser's **default action** for the event — without stopping the event itself.

```js
// Stop a link from navigating
link.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('Link click intercepted');
});

// Stop a form from reloading the page
form.addEventListener('submit', (e) => {
  e.preventDefault();
  sendToApi(new FormData(form));
});

// Intercept Ctrl/Cmd+S
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault();
    save();
  }
});
```

Not every event is cancelable. Check `e.cancelable` if you're unsure.

### `e.stopPropagation()`

Stops the event from continuing to travel up (or down) the DOM. Other listeners on the same element still run.

```js
inner.addEventListener('click', (e) => {
  e.stopPropagation();   // ancestors will NOT see this click
});
```

Related: `e.stopImmediatePropagation()` — stops propagation **and** prevents other listeners on the same element from running. Use sparingly.

### Other useful properties

```js
e.type           // "click", "keydown", etc.
e.timeStamp      // ms since page load
e.clientX / Y    // mouse coordinates (viewport)
e.pageX / Y      // mouse coordinates (document, including scroll)
e.key / e.code   // keyboard events
e.ctrlKey / .shiftKey / .altKey / .metaKey   // modifier flags
```

---

## Part 2 — Bubbling & Capturing

When you click the **inner button**, the event doesn't fire only there. It travels through the DOM in three phases:

```
                        window
                          ↓
                       document
                          ↓                      1. CAPTURING
                         html                       (top → target)
                          ↓
                         body
                          ↓
                        outer
                          ↓
                        middle
                          ↓
                     ┌── inner ──┐              2. TARGET
                     └────↓──────┘
                        middle
                          ↓
                        outer                   3. BUBBLING
                          ↓                       (target → top)
                         body
                          ↓
                       ... back up
```

### Bubbling (the default)

By default, handlers run during the **bubbling** phase — from the target upward:

```js
outer.addEventListener('click',  () => console.log('outer'));
middle.addEventListener('click', () => console.log('middle'));
inner.addEventListener('click',  () => console.log('inner'));

// Click the inner button → logs:
// inner
// middle
// outer
```

That's why clicking the button also triggers listeners on its ancestors.

### Capturing

Pass `{ capture: true }` (or the legacy `true` as the third argument) to listen during the capturing phase instead:

```js
outer.addEventListener('click',  () => console.log('outer'),  { capture: true });
middle.addEventListener('click', () => console.log('middle'), { capture: true });
inner.addEventListener('click',  () => console.log('inner'));

// Click the inner button → logs:
// outer     ← capture
// middle    ← capture
// inner     ← target
```

Capturing is rare in application code — most patterns rely on bubbling.

### Stopping propagation

```js
inner.addEventListener('click', (e) => {
  e.stopPropagation();
  console.log('inner — stops here');
});

outer.addEventListener('click', () => console.log('outer'));

// Clicking inner logs only "inner — stops here"
```

### Events that don't bubble

A few common events **don't** bubble: `focus`, `blur`, `mouseenter`, `mouseleave`, `load`, `scroll` (on most elements). Their bubbling alternatives exist: `focusin` / `focusout`, `mouseover` / `mouseout`.

---

## Part 3 — Event Delegation

**Delegation** = attach **one** listener to a parent and handle events from any descendant. It leverages bubbling.

### The problem

You have a list where items are added and removed dynamically:

```js
// ❌ Naive approach — attach a listener to every <li>
document.querySelectorAll('#todos li').forEach(li => {
  li.addEventListener('click', () => li.remove());
});

// Problem: new items added later won't have a listener.
// Also: N listeners for N items is wasteful.
```

### The delegation pattern

```js
const list = document.getElementById('todos');

list.addEventListener('click', (e) => {
  // Only act if an <li> was clicked
  if (e.target.tagName === 'LI') {
    e.target.remove();
  }
});

// Works for existing AND future <li> elements — no rebinding needed.
```

### `closest()` — the delegation helper

Real UIs have nested markup (an icon inside a button inside a card). `e.target` might be the icon — but you want the card. Use `closest()`:

```js
list.addEventListener('click', (e) => {
  const li = e.target.closest('li');
  if (!li || !list.contains(li)) return;  // clicked outside a todo

  li.classList.toggle('done');
});
```

`element.closest(selector)` walks up from `element` and returns the nearest ancestor (or self) that matches — or `null`.

### When to delegate

- Many similar children (list items, table rows, cards).
- Children are added/removed dynamically.
- You want a single source of truth for behavior.

### When NOT to delegate

- Events that don't bubble (`focus`, `blur`, `mouseenter`) — use `focusin` / `mouseover` or attach directly.
- Only one or two elements need the handler — direct binding is clearer.

---

## Full Working Example

Save as `index.html` and open in a browser:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Events Deep Dive</title>
  <style>
    body { font-family: sans-serif; max-width: 600px; margin: 2rem auto; }
    #outer  { padding: 30px; background: #fdd; }
    #middle { padding: 30px; background: #dfd; }
    #inner  { padding: 10px; }
    .log    { background: #111; color: #0f0; padding: 10px; height: 180px;
              overflow-y: auto; font-family: monospace; font-size: 12px;
              margin-top: 1rem; }
    li.done { text-decoration: line-through; color: #888; }
    li      { cursor: pointer; }
  </style>
</head>
<body>
  <h2>Bubbling demo — click the button</h2>
  <div id="outer">
    outer
    <div id="middle">
      middle
      <button id="inner">inner button</button>
    </div>
  </div>

  <h2>Delegation demo — click items to toggle, × to delete</h2>
  <ul id="todos">
    <li>Buy milk <button class="del">×</button></li>
    <li>Walk the dog <button class="del">×</button></li>
    <li>Learn DOM <button class="del">×</button></li>
  </ul>
  <button id="add-todo">Add todo</button>

  <div class="log" id="log"></div>

  <script>
    const logEl = document.getElementById('log');
    const log = (msg) => {
      logEl.innerHTML += `<div>${msg}</div>`;
      logEl.scrollTop = logEl.scrollHeight;
    };

    // --- Bubbling demo ---
    ['outer', 'middle', 'inner'].forEach(id => {
      document.getElementById(id).addEventListener('click', (e) => {
        log(`bubble — listener on #${e.currentTarget.id}, target: #${e.target.id}`);
      });
    });

    // Hold Shift while clicking inner to stop propagation
    document.getElementById('inner').addEventListener('click', (e) => {
      if (e.shiftKey) {
        e.stopPropagation();
        log('⛔ stopPropagation() — outer/middle will NOT fire');
      }
    });

    // --- Delegation demo ---
    const list = document.getElementById('todos');

    list.addEventListener('click', (e) => {
      // Delete button? Remove the whole <li>
      if (e.target.matches('.del')) {
        e.stopPropagation();               // don't also toggle "done"
        const li = e.target.closest('li');
        log(`delete → "${li.firstChild.textContent.trim()}"`);
        li.remove();
        return;
      }

      // Otherwise, toggle the <li>
      const li = e.target.closest('li');
      if (li && list.contains(li)) {
        li.classList.toggle('done');
        log(`toggle → "${li.firstChild.textContent.trim()}"`);
      }
    });

    // Add a new todo — delegation handles it automatically
    let n = 4;
    document.getElementById('add-todo').addEventListener('click', () => {
      const li = document.createElement('li');
      li.innerHTML = `Todo #${n++} <button class="del">×</button>`;
      list.append(li);
      log('added new todo');
    });
  </script>
</body>
</html>
```

Click the nested divs to see bubbling, hold **Shift** when clicking the inner button to see `stopPropagation`, then play with the todo list — one listener handles toggles, deletes, *and* items added after the page loaded.
