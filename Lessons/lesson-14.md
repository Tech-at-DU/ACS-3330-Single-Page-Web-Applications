# Lesson 14: Framer Motion II

## Overview

In this lesson you will go deeper with Framer Motion. You will:

- Organise animations with variants
- Stagger list animations with `staggerChildren`
- Trigger animations on scroll with `whileInView`
- Use layout animations for smooth reordering and resizing
- Continue polishing your Assignment 4 project for presentation

---

## Recap (10 min)

From Lesson 13:
- `motion.div` replaces standard elements
- `initial` → `animate` → `exit` controls the animation lifecycle
- `AnimatePresence` is required for exit animations
- `whileHover` and `whileTap` handle gestures without state

Today's patterns build on these. You will use them to animate groups of elements, respond to scroll, and handle layout changes smoothly.

---

## Part 1 — Variants (25 min)

So far every animation prop has been written inline. For complex components this gets repetitive. **Variants** let you define animation states as named objects and reference them by name.

```jsx
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

<motion.div
  variants={cardVariants}
  initial="hidden"
  animate="visible"
  transition={{ duration: 0.4 }}
>
```

Instead of repeating `{ opacity: 0, y: 20 }` across multiple components, you define it once and reference it by name.

### Staggering children

Variants become powerful when combined with `staggerChildren`. Define variants for a parent and its children — the parent orchestrates the timing.

```jsx
const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 }
}

function ResultList({ items }) {
  return (
    <motion.ul
      variants={listVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map(item => (
        <motion.li key={item.id} variants={itemVariants}>
          {item.name}
        </motion.li>
      ))}
    </motion.ul>
  )
}
```

Each list item animates in 80ms after the previous one. The children do not need their own `initial` or `animate` — they inherit from the parent variant.

This is the right pattern for any list of API results in your Assignment 4 project.

> 💡 AI Prompt: "How does staggerChildren work in Framer Motion variants?"

> 💡 AI Prompt: "How do I animate a list of items from an API response with Framer Motion?"

---

## Part 2 — Scroll Animations with `whileInView` (20 min)

`whileInView` triggers an animation when the element scrolls into the viewport. It works the same as `animate` — you define the target state and it runs when the element becomes visible.

```jsx
<motion.section
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true }}
>
  Section content
</motion.section>
```

`viewport={{ once: true }}` means the animation runs once the first time the element enters the viewport and does not repeat on scroll. Remove it if you want the animation to replay each time.

### Practical use

If your Assignment 4 project has multiple sections or a long list, `whileInView` makes the page feel alive as the user scrolls without animating everything at load time.

```jsx
{items.map(item => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3 }}
  >
    <ItemCard item={item} />
  </motion.div>
))}
```

> 💡 AI Prompt: "What is the difference between animate and whileInView in Framer Motion?"

---

## Part 3 — Layout Animations (20 min)

Layout animations handle a different problem: when an element changes size or position due to state changes, Framer Motion can animate that change smoothly.

Add the `layout` prop to any element whose size or position might change:

```jsx
<motion.div layout className="p-4 bg-white rounded">
  {expanded ? <FullContent /> : <Summary />}
</motion.div>
```

When `expanded` changes and the div grows or shrinks, Framer Motion interpolates the transition instead of snapping.

### Animating filter/sort results

If your project filters or sorts a list, wrapping items with `layout` makes the reordering animate smoothly:

```jsx
{filteredItems.map(item => (
  <motion.div key={item.id} layout>
    <ItemCard item={item} />
  </motion.div>
))}
```

The `key` must be stable — tied to the item's ID, not its index — otherwise React remounts the element instead of moving it.

> 💡 AI Prompt: "How do I animate list reordering with Framer Motion layout prop?"

---

## Break (15 min)

---

## Part 4 — Polish Your Project (50 min)

Presentation is on Monday. Use this time to add the finishing touches.

Work through this checklist. Not every item applies to every project — pick what makes sense for yours.

**Animation:**
- [ ] Page load — main content fades in on mount
- [ ] List results — staggered entry using variants
- [ ] Cards or buttons — `whileHover` lift or scale
- [ ] Loading → data transition — `AnimatePresence` between states
- [ ] Scroll sections — `whileInView` for longer pages

**UI:**
- [ ] Layout is consistent — spacing and alignment make sense
- [ ] Typography has hierarchy — headings, body text, labels are visually distinct
- [ ] Empty, loading, and error states are all handled and styled
- [ ] The app works on a narrow browser window

**Code:**
- [ ] No console errors or warnings
- [ ] No commented-out code left in
- [ ] README describes the project and how to run it

> 💡 AI Prompt: "What are common final polish steps before presenting a React project?"

---

## Presentation Prep (15 min)

Presentations are Monday. Plan what you will show.

A good project presentation covers:

1. **What the app does** — one or two sentences, no jargon
2. **A live demo** — show the core user flow, not every feature
3. **One technical decision you made** — state management choice, API choice, a component you are proud of
4. **One thing you would do differently** — shows self-awareness and growth

You have 5 minutes. Practice saying what the app does out loud before Monday.

---

## Key Concepts

| Concept | Description |
|---|---|
| Variants | Named animation states defined outside JSX |
| `staggerChildren` | Delays each child's animation relative to the previous |
| `whileInView` | Triggers animation when element enters the viewport |
| `viewport={{ once: true }}` | Animation runs once, not on every scroll |
| `layout` | Smoothly animates size and position changes |

---

## Further Reading

- [Variants](https://motion.dev/docs/react-animation#variants)
- [Scroll Animations](https://motion.dev/docs/react-scroll-animations)
- [Layout Animations](https://motion.dev/docs/react-layout-animations)
- [Transitions](https://motion.dev/docs/react-transitions)
