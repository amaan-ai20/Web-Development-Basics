# Reading & Modifying Elements

Once you've selected an element, you'll want to **read** its content and **change** it. The DOM splits this into two categories:

- **Content** — the text or HTML inside the element (`textContent`, `innerText`, `innerHTML`).
- **Attributes** — values on the tag itself like `id`, `href`, `src`, `data-*` (`getAttribute`, `setAttribute`, `removeAttribute`).

We'll use this HTML throughout:

```html
<!DOCTYPE html>
<html>
  <body>
    <h1 id="title">Hello <em>World</em></h1>

    <p class="bio" data-user-id="42">
      Read more on <a id="link" href="https://example.com" target="_blank">my site</a>.
    </p>

    <img id="avatar" src="/old.png" alt="Avatar">
  </body>
</html>
```

---

## Part 1 — Content: `textContent` vs `innerText` vs `innerHTML`

All three get or set what's **inside** an element, but they behave very differently.

### `textContent`

Gets or sets the **raw text** of the element and all its descendants. HTML tags are treated as literal text — not parsed.

```js
const title = document.getElementById('title');

// Read
console.log(title.textContent);
// "Hello World"  — tags stripped, plain text

// Write (overwrites children)
title.textContent = 'Hi there!';
// <h1>Hi there!</h1>

// Writing HTML? It becomes literal text, not markup:
title.textContent = '<em>Bold?</em>';
// Renders as: <em>Bold?</em>   (visible angle brackets)
```

- Fastest of the three.
- Returns text from **all** nodes, including hidden ones.
- **Safe** against HTML injection — user input can't become markup.

### `innerText`

Similar to `textContent` but **respects CSS**: it only returns visible text and triggers a layout reflow to figure out what's visible.

```js
// Given:
// <p id="msg">Visible <span style="display:none">hidden</span> text</p>

const msg = document.getElementById('msg');

msg.textContent;  // "Visible hidden text"
msg.innerText;    // "Visible  text"   — skips display:none
```

- Slower because it forces layout.
- Preserves line breaks for block elements.
- Use when you care about **what the user actually sees**.

### `innerHTML`

Gets or sets the element's content as an **HTML string**. The browser parses it into real DOM nodes.

```js
const bio = document.querySelector('.bio');

// Read — includes child tags
console.log(bio.innerHTML);
// 'Read more on <a id="link" href="...">my site</a>.'

// Write — string is parsed as HTML
bio.innerHTML = 'Visit <strong>my new site</strong>!';
// <strong> becomes a real element
```

**Warning — XSS risk.** Never insert untrusted user input with `innerHTML`:

```js
const userInput = '<img src=x onerror="alert(1)">';
bio.innerHTML = userInput;  // ❌ script runs!
bio.textContent = userInput; // ✅ safely displayed as text
```

### Quick comparison

| Property | Parses HTML? | Respects CSS? | Speed | Safe for user input? |
|----------|-------------|---------------|-------|-----------------------|
| `textContent` | No | No | Fast | ✅ Yes |
| `innerText` | No | Yes (visible only) | Slow (reflow) | ✅ Yes |
| `innerHTML` | Yes | No | Medium | ❌ No (XSS) |

**Rule of thumb:**
- Plain text in/out → `textContent`.
- What the user sees on screen → `innerText`.
- Building or reading HTML structure → `innerHTML` (trusted input only).

---

## Part 2 — Attributes: `getAttribute` / `setAttribute` / `removeAttribute`

Attributes are the `key="value"` pairs on the opening tag. Three methods cover all the basics.

### `getAttribute(name)`

Returns the attribute's value as a **string**, or `null` if it doesn't exist.

```js
const link = document.getElementById('link');

link.getAttribute('href');    // "https://example.com"
link.getAttribute('target');  // "_blank"
link.getAttribute('missing'); // null
```

Works great for custom `data-*` attributes too:

```js
const bio = document.querySelector('.bio');
bio.getAttribute('data-user-id');  // "42"
```

### `setAttribute(name, value)`

Adds the attribute if missing, or overwrites its value.

```js
const avatar = document.getElementById('avatar');

avatar.setAttribute('src', '/new.png');
avatar.setAttribute('alt', 'Profile picture');
avatar.setAttribute('width', '120');

// Custom data attributes
avatar.setAttribute('data-loaded', 'true');
```

The value is always stored as a string, even if you pass a number or boolean.

### `removeAttribute(name)`

Deletes the attribute entirely. No error if it doesn't exist.

```js
const link = document.getElementById('link');

link.removeAttribute('target');   // link no longer opens in new tab
link.removeAttribute('nonsense'); // silently does nothing
```

### Attributes vs. properties (gotcha)

For many attributes, the DOM also exposes a **property** you can access directly:

```js
const link = document.getElementById('link');

link.href;                  // "https://example.com/"  — resolved URL
link.getAttribute('href');  // "https://example.com"   — exact string
```

Rules of thumb:
- For everyday use (`id`, `href`, `src`, `value`, `className`), the property is shorter and usually what you want.
- For **custom attributes** (`data-*`, `aria-*`), use `getAttribute`/`setAttribute` (or the `dataset` shortcut for `data-*`).
- `setAttribute` always sets the raw string; direct property assignment may coerce types.

```js
// data-* shortcut using dataset
const bio = document.querySelector('.bio');
bio.dataset.userId;        // "42"   (kebab-case → camelCase)
bio.dataset.userId = '99'; // updates data-user-id
```

---

## Full Working Example

Save as `index.html` and open in a browser:

```html
<!DOCTYPE html>
<html>
<head><title>Read & Modify Demo</title></head>
<body>
  <h1 id="title">Hello <em>World</em></h1>

  <p class="bio" data-user-id="42">
    Read more on <a id="link" href="https://example.com" target="_blank">my site</a>.
  </p>

  <img id="avatar" src="https://via.placeholder.com/80" alt="Avatar">

  <hr>
  <button id="run">Run demo</button>
  <pre id="log"></pre>

  <script>
    const log = (msg) => {
      document.getElementById('log').textContent += msg + '\n';
    };

    document.getElementById('run').addEventListener('click', () => {
      const title = document.getElementById('title');
      const bio   = document.querySelector('.bio');
      const link  = document.getElementById('link');
      const img   = document.getElementById('avatar');

      // --- Content ---
      log('textContent: ' + title.textContent);  // "Hello World"
      log('innerHTML:   ' + title.innerHTML);    // "Hello <em>World</em>"

      // Safely update text
      title.textContent = 'Hi there!';

      // Rebuild HTML structure
      bio.innerHTML = 'Updated bio with <strong>bold</strong> text.';

      // --- Attributes ---
      log('href before: ' + link.getAttribute('href'));

      link.setAttribute('href', 'https://anthropic.com');
      link.removeAttribute('target');

      log('href after:  ' + link.getAttribute('href'));

      // Swap image
      img.setAttribute('src', 'https://via.placeholder.com/120/4287f5');
      img.setAttribute('alt', 'Updated avatar');

      // Read and update a data attribute
      log('user id: ' + bio.dataset.userId);
      bio.dataset.userId = '99';
      log('new id:  ' + bio.getAttribute('data-user-id'));
    });
  </script>
</body>
</html>
```

Click **Run demo**, open the console, and watch the page change while the log shows each read/write step.
