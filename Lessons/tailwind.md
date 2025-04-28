# 🎨 Using Tailwind CSS with React

## 📘 Introduction

Tailwind CSS is a **utility-first CSS framework** that allows you to rapidly build modern user interfaces directly in your HTML or JSX. Instead of writing custom CSS, you compose your UI using small, composable utility classes.

This lesson introduces Tailwind from a practical perspective: first in vanilla HTML, then within a React app.

---

## ❓ Why Tailwind?

- Faster styling: No switching between markup and stylesheets
- Fewer decisions: Use pre-defined spacing, colors, sizes
- Consistent UI: Tailwind enforces design tokens
- Responsive by default: Use `sm:`, `md:`, `lg:` prefixes

Tailwind’s biggest tradeoff? Class lists can get long. But with consistent naming and no custom CSS, it’s often worth it.

---

## 🚀 Initial Setup with HTML (No Build Tool)

Use the CDN version of Tailwind to try it out:

```html
<script src="https://cdn.tailwindcss.com"></script>
```

Try this HTML in a file:

```html
<body class="flex justify-center items-center min-h-screen">
  <h1 class="text-4xl font-bold text-blue-600">Hello Tailwind!</h1>
</body>
```

✅ Live edit here: [Tailwind Play](https://play.tailwindcss.com)

---

## ⚛️ Using Tailwind with React

---

## ⚡️ Installing Tailwind in a Vite + React Project

If you're using [Vite](https://vitejs.dev) for your React project (which is fast and modern), follow these steps:

### 1️⃣ Create a Vite + React project

```bash
npm create vite@latest my-vite-app -- --template react
cd my-vite-app
npm install
```

### 2️⃣ Install Tailwind and dependencies

Follow the guide here: https://tailwindcss.com/docs/installation/using-vite



```bash
npm install tailwindcss @tailwindcss/vite
```

### 3️⃣ Configure tailwind.config.js

```js
// tailwind.config.js
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
		react(), 
		tailwindcss()
	],
})

```

### 4️⃣ Add Tailwind to your CSS

```css
/* src/index.css */
@import "tailwindcss";
```

You can remove everything else here. 

Then import it in `main.jsx`:

```js
import './index.css'
```

Now start your dev server:

```bash
npm run dev
```

🎉 You’re ready to use Tailwind in your Vite + React app!

---

## ✨ Tailwind Cheatsheet

| Utility         | Example                                     |
| --------------- | ------------------------------------------- |
| Color           | `text-blue-500`, `bg-green-100`             |
| Spacing         | `p-4`, `mt-8`, `gap-2`                      |
| Flex/Grid       | `flex`, `justify-center`, `grid-cols-3`     |
| Typography      | `text-xl`, `font-bold`, `leading-loose`     |
| Border & Radius | `rounded-lg`, `border-2`, `border-gray-300` |
| Effects         | `shadow-md`, `hover:bg-blue-500`            |

📚 Full docs: [tailwindcss.com/docs](https://tailwindcss.com/docs)

Compare npm packages here: 

https://npm-compare.com/classnames,clsx,tailwind-merge

The link above compares: clsx, classnames, and tailwind-merge.

---

## 🧠 Gotchas and Tips

### ⚠️ Tailwind Workflow Tips
- **VS Code**: Install the Tailwind CSS IntelliSense extension for autocompletion
- **Production builds**: Tailwind removes unused styles based on the `content` key in your `tailwind.config.js`
- **Class conflicts**: Use utilities like `clsx` to manage conditional styles

---

### 4️⃣ UnoCSS
- A utility-first, atomic CSS engine that generates styles on demand
- Extremely fast and customizable
- Built for modern frameworks like Vite

```bash
npm install -D unocss
```

UnoCSS offers flexible syntax like shortcuts, safelists, and presets — making it powerful for power users or those who want a Tailwind-like system without the full framework.

📦 Docs: [https://uno.css](https://uno.css)

## 📚 Resources

- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Tailwind Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)
- [Tailwind Play (sandbox)](https://play.tailwindcss.com)

---

## 🧰 Using `clsx` and `classnames` with Tailwind

As your components grow, you’ll often want to apply Tailwind classes **conditionally** based on props or state.  
Manually building class strings can get messy fast.

Instead, use utilities like [`clsx`](https://www.npmjs.com/package/clsx) or [`classnames`](https://www.npmjs.com/package/classnames) to help!

---

### 🛠 Install `clsx`
```bash
npm install clsx
```

Or install `classnames` if you prefer:
```bash
npm install classnames
```

---

### ✅ Example: Conditional Button Styles with `clsx`

```jsx
import clsx from 'clsx'

function Button({ isActive }) {
  return (
    <button
      className={clsx(
        'px-4 py-2 rounded text-white',
        {
          'bg-blue-600 hover:bg-blue-700': isActive,
          'bg-gray-400 hover:bg-gray-500': !isActive,
        }
      )}
    >
      {isActive ? 'Active' : 'Inactive'}
    </button>
  );
}
```

- If `isActive` is true, the button is blue.
- If `isActive` is false, the button is gray.

---

### ✅ Example: Dynamic Card Component with `classnames`

```jsx
import classNames from 'classnames'

function Card({ featured }) {
  const cardClass = classNames(
    'p-6 rounded shadow-md',
    { 'bg-yellow-100 border-yellow-400': featured },
    { 'bg-white border-gray-300': !featured }
  )

  return (
    <div className={cardClass}>
      <h2 className="text-xl font-bold">Card Title</h2>
    </div>
  )
}
```

---

### 🤔 When to Use
| Scenario | Solution |
|:---|:---|
| You have **conditional classes** | ✅ Use `clsx` or `classnames` |
| You want **dynamic props** or **logic-heavy styling** | ✅ Use these tools |
| Simple static classes | ❌ No need — regular `className=\"...\"` is fine |

---

📚 Official docs:  
- [clsx on npm](https://www.npmjs.com/package/clsx)  
- [classnames on npm](https://www.npmjs.com/package/classnames)

---

# 📋 Summary

| What You Had | What We Add |
|:------------|:------------|
| Mention of `clsx` in a tip | ✅ Full explanation |
| No examples | ✅ Code examples (Button, Card) |
| No guidance when to use | ✅ Simple decision chart |
