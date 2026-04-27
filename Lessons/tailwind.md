# Lesson 11: Tailwind CSS

## Overview

In this lesson you will:

- Read and explain code you did not write (warm-up)
- Install Tailwind CSS in a Vite + React project
- Apply core utility classes to style a real component
- Add Tailwind to your Assignment 4 project

---

## Warm-up — Code Reading (25 min)

During the color challenge, two different approaches to generating a random hex color came up. Read both solutions below.

**Solution A:**

```js
function randomHex() {
  const value = Math.floor(Math.random() * 0xffffff)
  return `#${value.toString(16).padStart(6, '0')}`
}
```

**Solution B:**

```js
function hexGenerator() {
  const chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F']
  let hex = '#'
  for (let i = 0; i < 6; i++) {
    hex += chars[Math.floor(Math.random() * chars.length)]
  }
  return hex
}
```

Take 10 minutes to read both. Then answer these questions in writing before any discussion:

1. What does `0xffffff` represent? What is its decimal equivalent?
2. What does `.toString(16)` do? What does the `16` mean?
3. Why does Solution A need `.padStart(6, '0')`? When would the result be fewer than 6 characters without it? Give a specific example.
4. Can Solution A ever generate `#ffffff` (pure white)? Trace through the math and explain why or why not. Does Solution B have the same limitation?
5. Which solution would you rather maintain six months from now, and why?

**Discussion**

Question 3 is the most revealing. If you can answer it with a specific example — a color value that would break without `padStart` — you understand the code. If you cannot, you know what to look up.

Both solutions work. One is more concise. The other makes the logic explicit. Neither approach is wrong. What matters is that you can explain the one you chose.

> 💡 AI Prompt: "What does toString(16) do in JavaScript and why would you use it for hex colors?"

> 💡 AI Prompt: "What is padStart in JavaScript and when is it needed?"

---

## Part 1 — What is Tailwind? (10 min)

Tailwind is a utility-first CSS framework. Instead of writing CSS rules, you apply small single-purpose classes directly in your JSX.

Traditional CSS:
```css
.card {
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
```

Tailwind equivalent:
```jsx
<div className="p-4 bg-white rounded-lg shadow-sm">
```

The tradeoff: class lists get long, but you never leave your component file to style it. For most React apps, this speeds up development significantly.

---

## Part 2 — Setup (15 min)

Install Tailwind in your Vite + React project:

```bash
npm install tailwindcss @tailwindcss/vite
```

Update `vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

Replace the contents of `src/index.css` with:

```css
@import "tailwindcss";
```

Confirm `index.css` is imported in `main.jsx`:

```js
import './index.css'
```

Restart the dev server. If a `<h1>` loses its default size, Tailwind is working — it resets all browser styles by default.

> 💡 AI Prompt: "Why does Tailwind reset all my default browser styles and how do I work with that?"

---

## Part 3 — Core Classes (30 min)

These are the classes you will use most. Work through each group in the sandbox at [play.tailwindcss.com](https://play.tailwindcss.com) before applying them to your project.

### Layout

```jsx
<div className="flex items-center justify-between gap-4">
<div className="grid grid-cols-3 gap-6">
```

| Class | What it does |
|---|---|
| `flex` | `display: flex` |
| `grid` | `display: grid` |
| `grid-cols-3` | 3-column grid |
| `items-center` | align-items: center |
| `justify-between` | justify-content: space-between |
| `justify-center` | justify-content: center |
| `gap-4` | gap: 1rem |

### Spacing

Tailwind uses a spacing scale where each unit = 0.25rem (4px).

```jsx
<div className="p-4 mt-8 mb-2 px-6 py-3">
```

| Class | What it does |
|---|---|
| `p-4` | padding: 1rem (all sides) |
| `px-4` | padding left + right |
| `py-2` | padding top + bottom |
| `m-4` | margin: 1rem |
| `mt-8` | margin-top: 2rem |
| `space-y-4` | vertical gap between children |

### Typography

```jsx
<h1 className="text-2xl font-bold text-gray-900">
<p className="text-sm text-gray-500 leading-relaxed">
```

| Class | What it does |
|---|---|
| `text-sm / text-base / text-xl / text-2xl` | Font size |
| `font-normal / font-medium / font-bold` | Font weight |
| `text-gray-900` | Dark text color |
| `text-gray-500` | Muted text color |
| `leading-relaxed` | Comfortable line height |

### Color and Background

```jsx
<div className="bg-blue-500 text-white">
<div className="bg-gray-100 text-gray-800">
```

Colors follow the pattern `{property}-{color}-{shade}`. Shades run from 50 (light) to 950 (dark).

Common colors: `gray`, `red`, `orange`, `yellow`, `green`, `blue`, `purple`, `pink`

### Borders and Radius

```jsx
<div className="border border-gray-200 rounded-lg">
<button className="rounded-full border-2 border-blue-500">
```

| Class | What it does |
|---|---|
| `border` | 1px border |
| `border-2` | 2px border |
| `border-gray-200` | Border color |
| `rounded` | Small border radius |
| `rounded-lg` | Larger border radius |
| `rounded-full` | Fully rounded (pill/circle) |

### Hover States

```jsx
<button className="bg-blue-500 hover:bg-blue-600 text-white">
```

Add `hover:` before any utility class to apply it on hover. This works for colors, text, borders, shadows — anything.

---

## Break (15 min)

---

## Part 4 — Apply to Assignment 4 (50 min)

Open your Assignment 4 project. Add Tailwind if you have not already done so (follow the setup steps above).

Pick two components and style them using only Tailwind classes. Remove any existing CSS for those components.

At minimum your components should use:
- A layout class (`flex` or `grid`)
- Spacing (`p-`, `m-`, `gap-`)
- Typography (`text-`, `font-`)
- At least one hover state

Do not worry about making it perfect. The goal is to get comfortable writing Tailwind classes in JSX.

If you are not sure what to style first, start with your main layout in `App.jsx` and one card or list item component.

> 💡 AI Prompt: "Review my Tailwind classes and suggest improvements: [paste your JSX]"

---

## Milestone 1 Check-in (15 min)

Milestone 1 was due today. You should have:

- [ ] Project idea decided
- [ ] API chosen and confirmed working
- [ ] Vite project created
- [ ] Global store set up with at least one piece of state

If any of these are not done, talk to the instructor now.

---

## Key Concepts

| Concept | Example |
|---|---|
| Utility class | `p-4`, `text-xl`, `bg-blue-500` |
| State prefix | `hover:bg-blue-600` |
| Spacing scale | 1 unit = 0.25rem (4px) |
| Color scale | 50 (light) → 950 (dark) |

---

## Further Reading

- [Tailwind Docs](https://tailwindcss.com/docs)
- [Tailwind Play — sandbox](https://play.tailwindcss.com)
- [Tailwind Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)
