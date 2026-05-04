# Lesson 13: Framer Motion I

## Overview

In this lesson you will add animation to your React projects using Framer Motion. You will:

- Understand what Framer Motion is and when animation adds value
- Animate components with `initial`, `animate`, and `transition`
- Handle mount and unmount animations with `AnimatePresence`
- Add gesture animations with `whileHover` and `whileTap`
- Apply at least one animation to your Assignment 4 project

Animation is not required for Assignment 4 — but a project that moves well is more memorable to present.

---

## Get Inspired (10 min)

Before writing any code, spend a few minutes looking at what good animation looks like in production:

- [Framer Motion Examples](https://examples.motion.dev)
- [Linear](https://linear.app)
- [Vercel](https://vercel.com)

As you browse, notice: animations are subtle. They reinforce what the UI is doing — they do not distract from it. The best animations are the ones users do not consciously notice.

> 💡 AI Prompt: "What makes UI animation feel natural rather than distracting?"

---

## Part 1 — Setup (10 min)

Install Framer Motion:

```bash
npm install framer-motion
```

Framer Motion works by replacing standard HTML elements with `motion` equivalents. A `<div>` becomes `<motion.div>`, an `<li>` becomes `<motion.li>`. Every HTML element has a `motion` version.

```jsx
import { motion } from 'framer-motion'
```

No provider or store setup needed. Import and use.

---

## Part 2 — Basic Animation (20 min)

Every `motion` component accepts three core props:

| Prop | Description |
|---|---|
| `initial` | The starting state before the animation runs |
| `animate` | The target state the element animates toward |
| `transition` | Controls duration, delay, easing, and spring physics |

```jsx
import { motion } from 'framer-motion'

function Card() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-4 bg-white rounded-lg shadow"
    >
      Hello
    </motion.div>
  )
}
```

This component fades in and slides up when it mounts. You can animate any CSS property — use camelCase for properties with hyphens (`backgroundColor`, not `background-color`). Framer Motion also adds `x` and `y` as shorthand for `translateX` and `translateY`.

### Sequencing with `delay`

Add a `delay` to the `transition` to stagger elements manually:

```jsx
<motion.h1
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Title
</motion.h1>

<motion.p
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, delay: 0.15 }}
>
  Subtitle
</motion.p>
```

> 💡 AI Prompt: "What CSS properties can Framer Motion animate?"

> 💡 AI Prompt: "What is the difference between duration and delay in a Framer Motion transition?"

---

## Part 3 — AnimatePresence (20 min)

`initial` and `animate` handle elements entering the DOM. To animate elements as they *leave*, you need `AnimatePresence`.

`AnimatePresence` watches its children. When a child is removed from the render tree, it plays the child's `exit` animation before actually unmounting it.

```jsx
import { AnimatePresence, motion } from 'framer-motion'

function Notification({ show, message }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="notification"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="p-3 bg-green-100 text-green-800 rounded"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

Two things to notice:
- The `key` prop is required. Framer Motion uses it to track which element is entering and exiting.
- Without `AnimatePresence`, `exit` does nothing — React removes the element immediately before the animation can run.

Good uses in Assignment 4: loading states appearing and disappearing, modals, error messages, empty state placeholders.

> 💡 AI Prompt: "Why does Framer Motion need a key prop on elements inside AnimatePresence?"

---

## Break (15 min)

---

## Part 4 — Gesture Animations (20 min)

Framer Motion handles hover and tap animations without event listeners or state:

```jsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="px-4 py-2 bg-blue-500 text-white rounded"
>
  Click me
</motion.button>
```

The button scales up slightly on hover and presses down on click. This kind of micro-interaction makes a UI feel polished and responsive.

### Available gesture props

| Prop | When it applies |
|---|---|
| `whileHover` | While the cursor is over the element |
| `whileTap` | While the element is being clicked or tapped |
| `whileFocus` | While the element has keyboard focus |
| `whileInView` | While the element is visible in the viewport |

You can combine gesture props with `initial`/`animate`:

```jsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  whileHover={{ scale: 1.02, boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
  className="p-6 bg-white rounded-lg cursor-pointer"
>
```

> 💡 AI Prompt: "How do I animate a card lift effect on hover with Framer Motion?"

---

## Part 5 — Apply to Your Project (50 min)

Open your Assignment 4 project. Pick two or three places where animation would feel natural — not everywhere, just where it adds something.

Good starting points:

- **Page load** — fade in the main content with `initial={{ opacity: 0 }}` and `animate={{ opacity: 1 }}`
- **List items** — each item fades in as it renders
- **Buttons and cards** — `whileHover` scale or shadow lift
- **Loading → data transition** — `AnimatePresence` between your loading state and your data

Apply your animations, run the app, and adjust until it feels right. If something feels too fast, slow the `duration`. If it feels overdone, reduce the scale values or remove the animation entirely.

> 💡 AI Prompt: "Review my Framer Motion animation and tell me if it feels natural: [paste code]"

---

## Share Out (20 min)

Show one animation you added. Explain:
- Where you added it and why that felt like the right place
- What props you used
- Whether you would keep it or remove it, and why

---

## A Note on Accessibility

Some users have vestibular disorders that make motion on screen uncomfortable or disorienting. CSS and JavaScript both provide a way to respect this:

```jsx
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

<motion.div
  animate={{ opacity: 1, y: prefersReducedMotion ? 0 : -10 }}
>
```

If a user has "Reduce Motion" enabled in their OS settings, `prefersReducedMotion` will be true and the animation will not run. Worth keeping in mind for any project going to real users.

> 💡 AI Prompt: "How do I respect prefers-reduced-motion in Framer Motion?"

---

## Key Concepts

| Concept | Description |
|---|---|
| `motion.div` | A div that can be animated with Framer Motion props |
| `initial` | Starting state of the animation |
| `animate` | Target state the element animates toward |
| `exit` | State the element animates to before unmounting |
| `transition` | Controls duration, delay, easing |
| `AnimatePresence` | Required wrapper for exit animations to work |
| `whileHover` / `whileTap` | Gesture-based animation states |

---

## Further Reading

- [Framer Motion Docs](https://motion.dev/docs/react-animation)
- [AnimatePresence](https://motion.dev/docs/react-animate-presence)
- [Gestures](https://motion.dev/docs/react-gestures)
