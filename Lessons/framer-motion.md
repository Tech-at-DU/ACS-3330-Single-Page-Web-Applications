# 🎞️ Animation with Framer Motion in React

## 📘 Introduction

Framer Motion is a **powerful and popular animation library** for React. It provides simple, declarative APIs to animate elements based on state, component lifecycle, and user gestures. With built-in features like spring physics, layout transitions, and exit animations, Framer Motion lets you bring your React UI to life — no extra CSS or JavaScript required.

This lesson introduces Framer Motion with practical examples for use in any React app, including Vite-based projects.

---

## 👀 Get Inspired: Amazing Animation Examples

Before we dive into Framer Motion code, let's see what good animation looks like! Explore these real-world examples where motion enhances the user experience:



- 🎨 [Framer Motion Examples Gallery](https://examples.motion.dev)
- 🛍️ [Linear (linear.app)](https://linear.app/)
- 🛠️ [Vercel Homepage](https://vercel.com)
- 📦 [Framer.com](https://www.framer.com/)

**👀 Goal:**
As you browse, look for:
- How elements move naturally (fade, slide, pop)
- How hover and tap interactions add responsiveness
- How animations feel subtle — enhancing the design, not distracting

💬 **AI Prompt:**
> "Find websites or portfolios that use Framer Motion or modern web animation techniques to create smooth, professional UI transitions."
> 
> "What are some award-winning websites with inspiring animations I can study?"

---

## ✅ Why Use Framer Motion?

- Still widely used and actively maintained
- Easy to implement animations with `initial`, `animate`, and `exit`
- Built-in support for presence transitions, gestures, and layout-aware animations
- Works great with modern build tools like Vite and frameworks like Next.js or Remix

---

## ⚡ Installation

```bash
npm install framer-motion
```

Works immediately with Vite, CRA, and modern React setups.

---

## ✨ Basic Example: Fade In Card

```jsx
import { motion } from 'framer-motion'

function Card() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="p-4 bg-white rounded shadow-md"
    >
      Hello with animation!
    </motion.div>
  )
}
```

Framer Motion redefines all of the standard components like `div`, `p`, `h1`, etc. as `motion.div`, `motion.p`, `motion.h1` etc. These can be animated with props like: `initial`, `animate`, `exit` and more. 

### ✅ Check Your Understanding
- What happens if you leave out `initial`?
- Can you animate multiple properties?

💬 **AI Prompt:** "How can I animate both opacity and scale at the same time?"

### How to apply this? 
You can use the idea above to animate all of the elements on a "page" or in a component. 

- import motion with: `import { motion } from 'framer-motion'`
- Add `motion.` to the front each tag that will animate. For example: `<div>` becomes `<motion.div>`. 
- Set `initial` to set the starting properties of each element.
- Set `animate` to animate elements to their ending properties. 
- You can animate any CSS property. Use the JS (camel case) version of the property name. You can also use `x` and `y` which are not standard CSS property names. For example: 

```JS
<motion.h1
  initial={{ y: 10, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  className='text-5xl font-semibold text-slate-700 mb-3 ml-5'
>{Math.round(main.temp)}&deg;
</motion.h1>
```

Do this for each element. Adjust the propties to get the effect you are looking for. 

The `transition` attribute allows you to control the duration, delay, and more. Try this: 

```JS
<motion.p
  initial={{ y: 10, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ delay: 0.3 }}
  className='text-lg text-gray-600 capitalize mb-1'>
  {weather[0].description}
</motion.p>
```

This element will delay 0.3 secs before its animation begins. Use this to "sequence" or "choreograph" your motion! 

There are more properties than these Framer Motion is a robust tool with many options!

Check out the docs: https://motion.dev/docs/react-animation

Be sure to read the first 5 sections under Animation: 
- [Overview](https://motion.dev/docs/react-animation)
- [Gestures](https://motion.dev/docs/react-gestures)
- [Layout](https://motion.dev/docs/react-layout-animations)
- [Scroll](https://motion.dev/docs/react-scroll-animations)
- [Transitions](https://motion.dev/docs/react-transitions)


---

## 🔁 AnimatePresence
`AnimatePresence` handles elements that are added and removed from the DOM. Make it the parent of elements that will be dynamically rendered. 

```jsx
import { AnimatePresence, motion } from 'framer-motion'

function Modal({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50"
        >
          Modal content
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

🧠 **Why use a `key`?**
Framer Motion needs a unique `key` to properly track entering and exiting components. Without a key, exit animations won't run reliably.

### ✅ Check Your Understanding
- Why do we need AnimatePresence?
- What happens without a key?

💬 **AI Prompt:** "Explain how AnimatePresence controls unmounting animations."

---

## 🤸 Gesture-Based Animations

### 🧠 What Are Gestures?

Gestures are user interactions like hover, tap, drag, and focus. Framer Motion lets you animate based on these without adding event listeners manually.

### ✋ Supported Gesture Types:

- `whileHover`
- `whileTap`
- `drag`
- `whileFocus`
- `whileInView`

```jsx
<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  className="bg-blue-600 text-white px-4 py-2 rounded"
>
  Click Me
</motion.button>
```

### ✅ Check Your Understanding
- How would you animate color on hover?

💬 **AI Prompt:** "How can I animate background color transitions on hover?"

---

## 🎨 Advanced Example: Variants and Staggering

### 🧠 What Are Variants?

Variants allow you to define animation states separately from your component JSX, keeping code clean and modular.

### 🧠 What is Staggering?

Staggering means delaying child animations one after another for a cascading effect using `staggerChildren`.

```jsx
const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

function AnimatedList({ items }) {
  return (
    <motion.ul 
      initial="hidden" 
      animate="visible" 
      variants={listVariants}
    >
      {items.map((item) => (
        <motion.li 
          key={item} 
          variants={itemVariants}
        >
          {item}
        </motion.li>
      ))}
    </motion.ul>
  )
}
```

✅ Perfect for menus, lists, and galleries!

💬 **AI Prompt:** "How does staggerChildren work in Framer Motion?"

---

## 🧪 Challenge: Bring Framer Motion Into Your Final Project

As you work on your final project, try incorporating **Framer Motion** to enhance UX!

### Suggested Ideas:
- **[Page Transitions](https://www.framer.com/motion/page-transitions/)**
- **[Modal Animations](https://www.framer.com/motion/examples/modal/)**
- **[Hover Effects](https://www.framer.com/motion/examples/gestures/)**
- **[List Animations](https://www.framer.com/motion/examples/list-items/)**
- **[Drag and Drop](https://www.framer.com/motion/examples/drag/)**
- **[Form Feedback](https://www.framer.com/motion/examples/form-feedback/)**

💬 **AI Prompts to Explore:**
- "How can I add page transitions using AnimatePresence?"
- "Give me ideas for animating form validation feedback."

---

## 🧠 Reflect: How Did You Use Animation in Your Project?

- Where did you use animation?
- What techniques did you apply?
- How did animation improve UX?
- What challenges did you face?

🎯 Add a few sentences to your README or project notes.

💬 **AI Prompt:** "Help me reflect on how animation improved UX in my app."

---

## 📋 Bonus: Framer Motion vs Other Libraries

| Feature                  | Framer Motion | CSS Transitions | GSAP |
|---------------------------|---------------|-----------------|------|
| Easy for React components | ✅             | ❌               | ✅    |
| Gesture support           | ✅             | ❌               | ✅    |
| Layout transitions        | ✅             | ❌               | ✅    |
| Timeline animations       | ❌ (basic)     | ❌               | ✅    |

---

## 📚 Resources

- [Framer Motion Docs](https://www.framer.com/motion)
- [Framer Motion GitHub](https://github.com/framer/motion)
- [Awesome Framer Motion Examples](https://codesandbox.io/examples/package/framer-motion)

---

## ✅ Self-Assessment: Reflect on Your Learning

Before you finish this lesson, take a few minutes to assess your understanding:

- [ ] I can explain what Framer Motion is and why it's used.
- [ ] I understand how to use `motion.div` with `initial`, `animate`, and `exit` props.
- [ ] I know how to use `AnimatePresence` for exit animations.
- [ ] I can create gesture-based animations with `whileHover` and `whileTap`.
- [ ] I know how to organize animations using `variants` and `staggerChildren`.
- [ ] I explored real-world animation examples and reflected on what makes them effective.
- [ ] I used AI prompts responsibly to deepen my understanding.

🎯 **Challenge Yourself:**  
Where can you apply animation in your final project to improve the user experience?
