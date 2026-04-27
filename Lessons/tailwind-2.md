# Lesson 12: Tailwind CSS — Continued

## Overview

In this lesson you will extend your Tailwind work from Lesson 11. You will:

- Use `clsx` to apply Tailwind classes conditionally
- Build responsive layouts with breakpoint prefixes
- Use `group` and `peer` for parent-child and sibling styling
- Continue styling your Assignment 4 project toward Milestone 2

---

## Milestone 2 Check-in (10 min)

Milestone 2 is due today. Your core features should be working:

- [ ] Data fetching complete — API returns data and displays it
- [ ] State reads and writes work
- [ ] Basic UI is in place

If core features are not working, prioritize those over Tailwind polish today. A styled app that does not work is not ready to ship.

---

## Part 1 — Conditional Classes with `clsx` (25 min)

As your components grow, you will need to apply classes based on props or state. String concatenation gets messy fast:

```jsx
// Hard to read, easy to break
<button className={"px-4 py-2 " + (isActive ? "bg-blue-500" : "bg-gray-300")}>
```

`clsx` solves this cleanly.

### Install

```bash
npm install clsx
```

### Basic usage

```jsx
import clsx from 'clsx'

<div className={clsx('p-4 rounded', isActive && 'bg-blue-500')} />
```

`clsx` joins class strings and ignores falsy values. If `isActive` is false, `bg-blue-500` is not included.

### Object syntax — multiple conditions

```jsx
<button
  className={clsx(
    'px-4 py-2 rounded font-medium transition-colors',
    {
      'bg-blue-600 text-white hover:bg-blue-700': isActive,
      'bg-gray-200 text-gray-600 hover:bg-gray-300': !isActive,
    }
  )}
>
```

### Accepting `className` from a parent

When building reusable components, always allow the parent to pass additional classes:

```jsx
function Card({ className, children }) {
  return (
    <div className={clsx('p-6 bg-white rounded-lg shadow', className)}>
      {children}
    </div>
  )
}
```

This makes your components composable — the parent can extend the base styles without overriding them.

### Quick reference

```jsx
clsx('a', 'b')                    // "a b"
clsx('a', false, 'b')             // "a b"
clsx('a', isTrue && 'b')          // "a b" or "a"
clsx({ 'a': true, 'b': false })   // "a"
clsx('a', { 'b': true })          // "a b"
```

> 💡 AI Prompt: "When should I use clsx instead of a ternary in className?"

---

### Challenge — Style a Component with State

In your Assignment 4 project, find a component that has at least one piece of state that affects its appearance. Use `clsx` to apply different Tailwind classes based on that state.

Good candidates: a button that is active/inactive, a card that is selected, a filter tab that is applied, a form field that has an error.

---

## Part 2 — Responsive Design (20 min)

Tailwind is mobile-first. You write the base style for small screens, then add prefixes to override at larger breakpoints.

```jsx
<div className="text-sm md:text-base lg:text-lg">
```

This reads: small text by default, base size on medium screens, large on large screens.

### Breakpoints

| Prefix | Min width | Roughly |
|---|---|---|
| (none) | 0px | Mobile |
| `sm:` | 640px | Large phone |
| `md:` | 768px | Tablet |
| `lg:` | 1024px | Laptop |
| `xl:` | 1280px | Desktop |

### Common responsive patterns

**Stack on mobile, row on desktop:**
```jsx
<div className="flex flex-col md:flex-row gap-4">
```

**Single column on mobile, grid on desktop:**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

**Hide on mobile, show on desktop:**
```jsx
<aside className="hidden lg:block">
```

> 💡 AI Prompt: "How do I make a card grid responsive with Tailwind?"

---

## Part 3 — Group and Peer (20 min)

### `group` — style children based on parent state

Add `group` to a parent element, then use `group-hover:` on children to style them when the parent is hovered.

```jsx
<div className="group p-4 bg-white rounded-lg hover:bg-blue-50">
  <h3 className="text-gray-900 group-hover:text-blue-600 font-medium">
    Card Title
  </h3>
  <p className="text-gray-500 group-hover:text-blue-400 text-sm">
    Card description
  </p>
  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500">
    View →
  </span>
</div>
```

When the card is hovered, all three children respond — without any JavaScript or state.

### `peer` — style a sibling based on another sibling's state

Add `peer` to an element, then use `peer-{state}:` on a sibling that comes after it.

```jsx
<input
  type="text"
  className="peer border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
  placeholder="Enter value"
/>
<p className="hidden peer-focus:block text-sm text-blue-500 mt-1">
  Tip: enter a valid value
</p>
```

The hint paragraph is hidden until the input is focused — no state, no `useState`, no event handler.

Common `peer` states: `peer-focus:`, `peer-checked:`, `peer-invalid:`, `peer-disabled:`

> 💡 AI Prompt: "Show me a real example of using Tailwind peer to style a form label based on input state"

---

## Break (15 min)

---

## Part 4 — Polish Assignment 4 (50 min)

Continue styling your Assignment 4 project. By the end of this session you should have a UI that looks intentional — not unstyled, not perfect, but clearly designed.

Work through this checklist:

- [ ] Main layout uses `flex` or `grid` with consistent spacing
- [ ] Typography is consistent — headings, body text, and labels use different weights and sizes
- [ ] At least one interactive element uses a hover state
- [ ] At least one component uses `clsx` for conditional styling
- [ ] The layout does not break on a narrow browser window

If your project has a list of items (products, characters, countries), make them a responsive grid. If it has a form, style the inputs and button with focus states. If it has a loading state, make sure it looks distinct from the data state.

> 💡 AI Prompt: "Review my component and suggest Tailwind improvements: [paste JSX]"

> 💡 AI Prompt: "How do I style a loading skeleton with Tailwind?"

---

## Share Out (15 min)

Show one component you styled today. Explain:

- What classes you used and why
- Anything that did not work the way you expected
- Whether you used `clsx` and what condition it handles

---

## Key Concepts

| Concept | Example |
|---|---|
| `clsx` | `clsx('base', isActive && 'active-class')` |
| Mobile-first | Base styles apply to mobile, prefixes override upward |
| Responsive prefix | `md:grid-cols-2` — applies at 768px and above |
| `group` | Parent state affects child styling |
| `peer` | Sibling state affects next sibling styling |

---

## Further Reading

- [Tailwind Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [Tailwind Hover/Focus/State](https://tailwindcss.com/docs/hover-focus-and-other-states)
- [clsx on npm](https://www.npmjs.com/package/clsx)
