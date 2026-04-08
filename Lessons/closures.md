# **ACS 3330 — Lesson: Closures & Async JavaScript**

*How JavaScript handles time, state, and async behavior (and why your React code sometimes breaks)*

---

## 🎯 Lesson Goal

> Closures are what allow functions to remember values when they run later.  
> That’s why callbacks, promises, and async/await all work.

---

## Section 1 — Functions That Run Later (Closures + Callbacks)

### Core Idea

A function can run later and still remember variables from when it was created.  
That is a **closure**.

---

### Example

```js
let message = "Hello";

setTimeout(() => {
  console.log(message);
}, 1000);

message = "Goodbye";
```

### Questions

- What prints?
- Why?

---

### Key Takeaways

- `setTimeout` uses a **callback**
- The callback runs later
- It still remembers variables → **closure**

---

### Activity — Predict the Output

```js
function test() {
  let value = 0;

  setTimeout(() => {
    console.log(value);
  }, 1000);

  value = 5;
}

test();
```

👉 What prints? Why?

---

### Important Insight

> Closures capture variables, not values.

---

## Section 2 — When Closures Go Wrong

### Example

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000 * i);
}
```

### Questions

- What prints?
- Why?

---

### Fix

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000 * i);
}
```

---

### Key Idea

- `var` → one shared variable
- `let` → new variable per iteration

👉 Closures expose how scope really works

---

## Section 3 — Promises & async/await (Same Idea, New Syntax)

### How JavaScript Runs Async Code (Simplified)

JavaScript runs one thing at a time.

When you use async functions like `setTimeout`, `fetch`, or `.then()`:

1. The function is scheduled to run later
2. JavaScript keeps running the rest of your code
3. When the async work is ready, the callback is added to a queue
4. JavaScript runs it after the current code finishes

---

### Example

```js
console.log("start");

setTimeout(() => {
  console.log("inside timeout");
}, 0);

console.log("end");
```

### Question

What prints?

---

### Answer

<details>
<summary>Show answer</summary>

```
start
end
inside timeout
```

</details>

---

### Key Idea

> Async callbacks don’t interrupt your code.  
> They wait their turn.

---

### Why This Matters

- Your callback runs later
- It uses a closure
- It may see updated (or stale) values

👉 This is why closures + async behavior are connected

---

### What is a Promise?

A **Promise** is an object that represents a value that will exist in the future.

It has three states:

- **pending** → still waiting for the result
- **fulfilled** → operation succeeded
- **rejected** → operation failed

Instead of getting the value immediately, you attach a callback using `.then()`:

```js
promise.then(result => {
  console.log(result);
});
```

👉 The function passed to `.then()` is a **callback**
👉 That callback uses a **closure** to access variables

---

### Example: Promise

```js
fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log(data);
  });
```

### Questions

- Where does `data` come from?
- Why is it available here?

---


### What is async/await?

An `async` function always returns a **Promise**.

```js
async function example() {
  return 42;
}

// This actually returns: Promise { 42 }
```

---

### What does `await` do?

`await` pauses execution of the function until a Promise resolves.

```js
const res = await fetch(url);
```

This means:

- The function stops at this line
- It waits for the Promise to resolve
- Then continues with the resolved value

---

### Important Rules

- `await` can **only be used inside an `async` function`
- `async/await` is just cleaner syntax for `.then()`

These two are equivalent:

```js
fetch(url).then(res => res.json());
```

```js
const res = await fetch(url);
const data = await res.json();
```

👉 Under the hood, this is still callbacks + closures

---

### Example: async/await

```js
async function getWeather() {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
}
```

---

### Unifying Idea

| Concept | What it really is |
|--------|------------------|
| callback | function that runs later |
| closure | how it remembers variables |
| promise | organized callbacks |
| async/await | cleaner syntax for promises |

---

### Key Insight

> Closures are what make async JavaScript possible.

---

## Section 4 — React: Stale Closures & Real Bugs

### Example

```jsx
useEffect(() => {
  setInterval(() => {
    console.log(count);
  }, 2000);
}, []);
```

### Questions

- Why doesn’t `count` update?

---

### Explanation

- The callback runs later
- It captured the **old value of `count`**
- → stale closure

---

### Fix 1 — Functional State Update

```jsx
setCount(prev => prev + 1);
```

---

### Fix 2 — Safer Interval Pattern

```jsx
useEffect(() => {
  const interval = setInterval(() => {
    setCount(prev => {
      console.log(prev);
      return prev;
    });
  }, 2000);

  return () => clearInterval(interval);
}, []);
```

---

### Apply to Your Weather App

Ask yourself:

- Where are you using async code?
- What variables are captured in callbacks?
- Could anything be stale?

---

### Final Takeaway

> If your async code behaves strangely, it’s usually a closure problem.

---

## Reflection

1. What is a closure in your own words?
2. How do callbacks use closures?
3. Why do stale closures happen in React?
4. Where might this affect your weather app?

---

## Final Thought

Closures are not just a JavaScript feature.

They are the reason async JavaScript—and React—work the way they do.