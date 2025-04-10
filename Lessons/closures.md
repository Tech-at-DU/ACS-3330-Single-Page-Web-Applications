### **ACS 3330 - Lesson: Closures in JavaScript**

*Understanding closures and their impact on JavaScript and React*

---

## **Overview**

Closures are a **fundamental concept in JavaScript** that allow functions to **remember variables from their original scope** even after they have executed.

Closures are important for:

- **Callbacks and event handlers** (functions remembering variables).
- **Managing state and encapsulation** (data hiding).
- **Avoiding common pitfalls** (stale closures, memory leaks).
- **Understanding React behavior** (fixing stale closures in `useEffect`).

By the end of this lesson, you will be able to:
- ✅ **Define closures** and explain how they work.
- ✅ **Use closures in everyday programming** for state management.
- ✅ **Fix stale closures in React applications**.

---

**Be sure to try these examples with real code. Check the results in the console or the terminal!**

If you're not sure how to do that you can ask the AI, the instructor, or classmates!  

## **Review: Function Scope & Lexical Environment**

Before diving into closures, let’s revisit **scope**.

### 🔹 **Function Scope vs. Block Scope**

```js
function foo() {
  var a = 42; // Function scope
}

if (true) {
  let b = 99; // Block scope
}

{
  let c = 88; // Block scope (note! this is not an object!)
}

console.log(a, b, c) // What happens here? 
```

📌 **AI Prompt:** *"What happens if you try to access `a`, `b`, and `c` outside their scopes?"*

📌 **AI Prompt:** *"Can you create scope with just `{}` in JS?"*

---

# **Part 1: Closures and Functions**

A **closure** happens when a function **remembers** variables from its parent function, even after the parent function has returned.

### **🔹 Example: A Function That Remembers Its Variables**

```js
function makeCounter() {
  let count = 0;

  return function() {
    count += 1;
    return count;
  };
}

const counter1 = makeCounter();
console.log(counter1()); // 1
console.log(counter1()); // 2
console.log(counter1()); // 3

// Challenge: Make a second counter, what happens here?
// const counter2 = makeCounter();
// console.log(counter2()); // ?
// console.log(counter2()); // ?
```

✅ **Concept:** The **inner function** has access to `count`, even after `makeCounter()` has returned.

📌 **AI Debugging Prompt:** *"Why does `counter1` still remember `count`?"*

---

# **Part 2: Closures as Variables Captured by Function Scope**

Closures **retain variables from their original function scope**, even after execution.

### **🔹 Example: Closures in a Loop (`var` vs. `let`)**

```js
const buttons = [];
for (var i = 0; i < 3; i++) {
  buttons.push(() => console.log(i));
}

buttons[0](); // 3
buttons[1](); // 3
buttons[2](); // 3
```

📌 **Why?** `var` is **function-scoped**, so all callbacks share the same `i`, which has already reached `3`.

✅ **Fix:** Use **`let`** (block-scoped) or an **IIFE (Immediately Invoked Function Expression)**:

```js
// Note! var has become let here! 
for (let i = 0; i < 3; i++) {
  buttons.push(() => console.log(i));
}
// Now what happens?
buttons[0](); // ?
buttons[1](); // ?
buttons[2](); // ?
```

📌 **AI Debugging Prompt:** *"What happens if we replace `var` with `let`?"*

---

# **Part 3: Using Closures in Everyday Programming**

Closures **help manage state without global variables**.

### **🔹 Example: Data Hiding with Closures**

```js
function createBankAccount(initialBalance) {
  let balance = initialBalance;

  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      balance -= amount;
      return balance;
    },
    checkBalance() {
      return balance;
    }
  };
}

const myAccount = createBankAccount(100);
console.log(myAccount.deposit(50)); // 150
console.log(myAccount.withdraw(30)); // 120
console.log(myAccount.checkBalance()); // 120
```

✅ **Concept:** `balance` is **private**—it can’t be modified outside `createBankAccount`.

📌 **AI Prompt:** *"Why can’t we directly access `balance` from `myAccount`?"*

---

# **Part 4: Closures & Callbacks in React Applications**

Closures are **essential** in React, but they **can cause stale closures**.

### **🔹 Example: Stale Closures in React**

```jsx
import { useState, useEffect, useRef, useCallback } from "react";

function WatchCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setInterval(() => {
      console.log(`Count is: ${count}`); // ❌ What will this log?
    }, 2000);
  }, []);

  return (
    <div>
      {count}
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}
```

📌 **AI Prompt:** *"What do you think will happen when you click the button? Will the count update in the console?"*

### **Fix 3: Use `useCallback` to Prevent Stale Closures**

```jsx
const updateCount = useCallback(() => {
  setCount(prev => prev + 1);
}, []);

useEffect(() => {
  setInterval(updateCount, 2000);
}, []);
```

📌 **AI Prompt:** *"How does `useCallback` prevent stale closures in React?"*

--- 

### **Fix 4: Use set state callback to Prevent Stale Closures**

In cases where you are setting state within a clsoure, you can provide a callback as the argument to your set state function. This callback receives the latest value of state. 

```jsx
useEffect(() => {
  const interval = setInterval(() => {
    setCount(prev => { // prev is the latest value for count
      console.log(`Count is: ${prev}`);
      return prev;
    });
  }, 2000);

  return () => clearInterval(interval);
}, []);
```

---

# **Part 5: Closures in Event Listeners**

### **🔹 Example: Using Closures in Event Listeners**

```js
function createClickHandler(color) {
  return function () {
    console.log(`You clicked a ${color} button!`);
  };
}

const redButton = document.querySelector("#red");
const blueButton = document.querySelector("#blue");

redButton.addEventListener("click", createClickHandler("red"));
blueButton.addEventListener("click", createClickHandler("blue"));
```

📌 **AI Debugging Prompt:** *"Why does each button remember its own color?"*

---

## **Final Thoughts**

- ✅ **Closures allow functions to "remember" variables after execution.**
- ✅ **Closures help in private variables, event handlers, and optimizations.**;
- ✅ **In React, stale closures happen in `useEffect` when functions capture old values.**

📌 **AI Reflection Prompt:** *"Review my explanation of closures to check my understanding. <Insert your explanation here>"*

---

## **📚 After Class**

- **Read more about closures**: [JavaScript.info: Closures]([https://javascript.info/closure](https://javascript.info/closure))
