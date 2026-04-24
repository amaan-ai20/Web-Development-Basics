# DOM Tree & Browser Parsing

## What is the DOM?

The **Document Object Model (DOM)** is a tree-like representation of an HTML document that the browser builds in memory. Every HTML tag, attribute, and piece of text becomes a **node** in this tree, which JavaScript can read and modify.

## `window` vs `document`

These two globals are easy to confuse, but they represent different things:

- **`window`** — the browser tab/frame itself. It's the global object in the browser, so every global variable and built-in (`setTimeout`, `fetch`, `location`, `localStorage`) lives on it.
- **`document`** — the loaded page inside that window. It's the root of the DOM tree and exposes APIs to query and modify HTML (`querySelector`, `getElementById`, `body`).

```js
window === window.window;      // true — window is its own global
window.document === document;  // true — document is a property of window

window.innerWidth;             // viewport size (belongs to the window)
document.title;                // <title> text (belongs to the page)

window.addEventListener('resize', ...);   // tab was resized
document.addEventListener('click', ...);  // something in the page was clicked
```

Rule of thumb: **window = the container, document = the content.** If it's about the browser/tab (size, URL, timers, storage), use `window`. If it's about the HTML (elements, text, structure), use `document`.

## How the Browser Parses HTML

When you load a page, the browser performs these steps:

1. **Bytes → Characters** — raw bytes from the network are decoded (usually UTF-8).
2. **Characters → Tokens** — the tokenizer recognizes tags like `<div>`, `</p>`, attributes, and text.
3. **Tokens → Nodes** — each token becomes a node object with properties and methods.
4. **Nodes → DOM Tree** — nodes are linked into a parent/child hierarchy.
5. **DOM + CSSOM → Render Tree** — combined with styles, the browser computes what to paint.
6. **Layout → Paint** — positions are calculated, then pixels are drawn to the screen.

## Example: HTML to Tree

Given this markup:

```html
<html>
  <body>
    <h1>Hello</h1>
    <p>World</p>
  </body>
</html>
```

The browser builds:

```
document
└── html
    └── body
        ├── h1
        │   └── "Hello"   (text node)
        └── p
            └── "World"   (text node)
```

## Node Types

Every node has a `nodeType`. The common ones:

| Type | Constant | Example |
|------|----------|---------|
| 1 | `ELEMENT_NODE` | `<div>`, `<p>` |
| 3 | `TEXT_NODE` | `"Hello"` |
| 8 | `COMMENT_NODE` | `<!-- note -->` |
| 9 | `DOCUMENT_NODE` | `document` |

## Navigating the Tree

Once the DOM exists, JavaScript can walk it:

```js
const body = document.body;

body.children;        // live HTMLCollection of element children
body.firstElementChild;
body.lastElementChild;
body.parentElement;
body.nextElementSibling;
```

Use the `*Element*` variants to skip text and comment nodes.

## Why It Matters

- **Order blocks rendering.** A `<script>` in `<head>` without `defer`/`async` pauses parsing.
- **CSS blocks paint.** The browser waits for the CSSOM before showing content.
- **DOM size affects performance.** Deep or huge trees slow down layout and queries.

## Try It

Open any page, open DevTools, and run:

```js
document.documentElement   // the <html> node
document.body.childNodes   // every child, including text nodes
```

That's the live tree the browser built from the HTML source.
