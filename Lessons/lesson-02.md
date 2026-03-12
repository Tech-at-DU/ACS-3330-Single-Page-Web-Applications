# ACS 3330 - Lesson 2: React Props and State

## Overview

This lesson explores **props and state in React**, essential concepts for managing data flow in your applications. You will learn how to pass data between components, manage local state, and lift state to the parent for better control.

Try these prompts with your favorite AI:

> "What are props and state in react apps, give me a beginner, intermediate, and advanced explanation."

> "What do mutable and immutable mean in this context?"

---

## Learning Objectives

By the end of this lesson, you will be able to:
- Describe **Props and State** and their differences.
- Use **Props** to pass data to components.
- Use **State** to manage local component data.
- Lift state to a parent component for shared state management.
- Apply best practices for **immutability** in React.
- Implement ESLint for **professional coding standards**.

---

## **Review**
Before we begin, take a few minutes to answer:
1. What is a **single-page application**?
2. Name some **pros and cons** of single-page applications.
3. Create a **new React project**.
4. In your own words, what is **JSX** and why is it useful?

---

## **Props and State in React**

### **What are Props?**
Props (**short for "properties"**) are **read-only** values passed from a **parent component** to a **child component**. Props allow components to be reusable and configurable.

### **What is State?**
State represents **internal component data** that **can change over time**. Updating state triggers a re-render of the component.

### **React's Rendering Model**
A React component **re-renders** when:
1. **It receives new props.**
2. **Its internal state changes.**

Understanding this helps prevent unnecessary renders and optimize performance.

---

# Props, State, and lifting State Lab

The goal of this lab is to explore Props, State, and Lifting State. 

## **Part 1: Creating a Counter Component (Props)**
Let's create a simple **counter** that displays:
- A **label** (passed via props)
- A **count value** (passed via props)
- Two buttons (`+` and `-`)

### **1.1 Set Up a React Project**

```sh
npm create vite@latest
cd props-and-state
npm run dev
```

### **1.2 Create a Counter Component**
Create a new file: `Counter.js`

```jsx
function Counter(props) {
  return (
    <div className="Counter">
      <small>{props.label}</small>
      <h1>{props.value}</h1>
      <button>+</button>
      <button>-</button>
    </div>
  );
}

export default Counter;
```

🔹 **AI Review Prompt:** *"Does my Counter component follow best practices? How could I improve reusability?"*

### **1.3 Use the Counter Component in `App.js`**
Modify `App.js`:
```jsx
import './App.css';
import Counter from './Counter';

function App() {
  return (
    <div className="App">
      <Counter label="Apples" value={1} />
      <Counter label="Oranges" value={3} />
    </div>
  );
}

export default App;
```

Now, the **Counter component is reusable**—just pass different `label` and `value` props.

🔹 **AI Review Prompt:** *"How does React handle multiple instances of the same component?"*

---

## **Part 2: Adding State to the Counter**
Now, let's **store the counter value in state**, so it updates dynamically.

### **2.1 Import `useState`**
Edit `Counter.js`:
```jsx
import { useState } from 'react';
```

### **2.2 Use `useState` to Track Count**
Modify `Counter.js`:
```jsx
function Counter(props) {
  const [count, setCount] = useState(0);

  return (
    <div className="Counter">
      <small>{props.label}</small>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}

export default Counter;
```

🔹 **AI Prompt:** *"Why does counter update when state changes?"*

🔹 **AI Prompt:** *"How does React know when to re-render a component after state changes?"*

🔹 **AI Prompt:** *"Explain what is happening on this line: const [count, setCount] = useState(0);"*

🔹 **AI Prompt:** *"I used useState here, is there an alternative way to create state variables?"*

🔹 **AI Debugging Prompt:** *"Why does my counter not update when I click the buttons?"*

**💡 Key Concept:**  
Calling `setCount(newValue)` **triggers a re-render**.  
Simply modifying `count` **without calling `setCount` will not update the UI**.

---

## **Part 3: Lifting State**
Now, let’s **store state at the parent level** (App.js) instead of inside `Counter.js`.

### **3.1 Why Lift State?**
- Allows **multiple counters** to **share data**.
- Enables **calculating totals** across counters.

🔹 **AI Prompt:** *"What does 'lifting state' mean?"*

### **3.2 Move State to `App.js`**
Modify `App.js`:
```jsx
import { useState } from 'react';
import Counter from './Counter';

function App() {
  const [counts, setCounts] = useState([1, 4, 3]);

  return (
    <div className="App">
      {counts.map((value, index) => (
        <Counter key={index} label={`Counter ${index + 1}`} value={value} />
      ))}
    </div>
  );
}

export default App;
```

Now, `App.js` manages the **state** and passes it **down to `Counter.js` as props**.

🔹 **AI Review Prompt:** *"Does lifting state make my app more efficient? Why or why not?"*

---

## **Part 4: Updating State from Child Components**
Now, let's **modify state from child components** by passing a **callback function** as a prop.

🔹 **AI Prompt:** *"What is a callback function?"*

### **4.1 Pass `increment` and `decrement` Functions as Props**
Modify `App.js`:
```jsx
function App() {
  const [counts, setCounts] = useState([1, 4, 3]);

  const updateCount = (index, delta) => {
    const newCounts = [...counts]; // Copy array (immutability)
    newCounts[index] += delta;
    setCounts(newCounts);
  };

  return (
    <div className="App">
      {counts.map((value, index) => (
        <Counter
          key={index}
          label={`Counter ${index + 1}`}
          value={value}
          increment={() => updateCount(index, 1)}
          decrement={() => updateCount(index, -1)}
        />
      ))}
    </div>
  );
}
```

🔹 **AI Prompt (inlcude the code above):** *"Where is the callback function in this code block?"*

### **4.2 Call These Functions in `Counter.js`**
Modify `Counter.js`:
```jsx
function Counter(props) {
  return (
    <div className="Counter">
      <small>{props.label}</small>
      <h1>{props.value}</h1>
      <button onClick={props.increment}>+</button>
      <button onClick={props.decrement}>-</button>
    </div>
  );
}

export default Counter;
```

🔹 **AI Review Prompt:** *"How does passing functions as props improve component design?"*

---

## **Part 5: Enhancements & Stretch Challenges**

### **5.1 Show the Total of All Counters**
Modify `App.js`:
```jsx
<h1>Total Count: { /* TODO: Calculate total count here */ }</h1>
```

🔹 **AI Prompt:** *"How would you calculate `totalCount` from the `counts` array? Try using `.reduce()` to sum the values."*

### **💡 Stretch Challenges**
#### 🔹 **Stretch Challenge 1: Reset Button**
- Add a "Reset" button that resets all counters to `0`.

#### 🔹 **Stretch Challenge 2: Limit Counter Range**
- Prevent counters from going **below `0`** or above `10`.

#### 🔹 **Stretch Challenge 3: Dynamic Counter List**
- Add a "➕ Add Counter" button to dynamically add new counters.

🔹 **AI Stretch Prompt:** *"What’s the best way to dynamically add components in React?"*

#### 🔹 **Stretch Challenge 3: Dynamic Counter List**
- Add a "➖ remove Counter" button to dynamically remove a counter. This might be best added in the Counter Component. You may need a callback... 

🔹 **AI Stretch Prompt:** *"How can I add a button that will remove a counter?"*  For this prompt try dragging App.js and Counter.js into the AI window. 

---

## **Final Thoughts**

- ✅ **Props and state are core feature of React components.**
- ✅ **Props allow components to receive values from outside.**;
- ✅ **State is stored internally by a component.**
- ✅ **A component renders when it receives props, or when state chnages.**

📌 **AI Reflection Prompt:** *"Review my explanation of React props and state. <Insert your explanation here>"*

---

## **After Class**
- Continue working on [Assignment 1](../Assignments/Assignment-01.md).

---

## **Resources**
- [React Props](https://react.dev/learn/passing-props-to-a-component)
- [React State](https://react.dev/learn/updating-objects-in-state)
- [Lifting State](https://react.dev/learn/sharing-state-between-components)
