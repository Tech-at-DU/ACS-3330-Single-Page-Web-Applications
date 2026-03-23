# ACS 3330 Lesson 1: Introduction to React & Functional Programming

## Overview

This lesson provides a foundational review of React and an introduction to functional programming principles.

## Learning Objectives

By the end of this lesson, you will be able to:

- Create React components
- Use JSX for rendering UI
- Apply functional programming concepts like map, filter, and reduce

## Understanding Single Page Applications (SPAs)

Traditional websites reload a new page when navigating. In contrast, Single Page Applications (SPAs) dynamically update the content on the current page without a full reload.

### Why SPAs?

The shift to SPAs improves performance and user experience. Gmail is a well-known example—it loads once and updates dynamically as you interact with emails.

### Learn More

Read this introduction to SPAs: [What is a Single Page Application?](https://www.bloomreach.com/en/blog/2018/07/what-is-a-single-page-application.html)?

## The JavaScript Ecosystem

JavaScript continues to evolve. Take a quick tour of State of JS to see the latest trends and innovations.

## React Project Starters & Libraries

Create React App is no longer maintained. Modern React projects use faster and more flexible tools.

### Common React Starters

- **Vite (Recommended)**
  - Fast dev server and simple setup
  - Minimal configuration
  - Good default for most projects

- **Next.js**
  - Full framework (routing, server rendering, API routes)
  - Used for production apps and larger systems
  - Adds complexity you may not need yet

- **Expo (React Native)**
  - Used for mobile apps
  - Not relevant for web SPAs in this course

### Why This Matters

Different starters shape how your app is structured:

- Routing may be built-in (Next.js) or manual (Vite + React Router)
- File structure and conventions vary
- Build tools and performance differ

For this class, we use **Vite** so you understand the pieces instead of hiding them behind a framework.

https://vite.dev

### 🔹 Quick Check

- What files does Vite generate that start your app?
- Where is React actually rendered to the DOM?
- What would you need to add to support routing?

## Why Learn React?

React is one of the most widely used frontend libraries, known for its efficiency and developer-friendly workflow. Many top companies rely on React, including:

- Airbnb
- Facebook
- Netflix
- Uber
- Twitter

### What is React?

The React team describes it as:

> "A JavaScript library for building user interfaces."

Visit [React's official site](https://react.dev) and explore their introduction.

## Core Concepts of React

React is built on three main concepts:

### 1. Components

**React applications are made up of components.** Each component manages its own state and re-renders when data changes.

#### 🔹 Active Learning Task:
1. **Set up a React project (Vite):**
  - Open a terminal and run:
    ```sh
    npm create vite@latest my-app
    cd my-app
    npm install
    npm run dev
    ```
  - Choose the **React** template when prompted.
  - Open the project in your code editor and explore the file structure.
  - Locate `main.jsx` and `App.jsx` and identify where your app starts.
2. **Explore "A Simple Component":**
  - Visit React's documentation and find the "A Simple Component" section.
  - Copy the example code below into your App.js file:
    ```jsx
    function Welcome(props) {
      return <h1>Hello, {props.name}</h1>;
    }
    ```
  - Modify it to display your name and test it in your browser.
  - Inspect `main.jsx` and explain how React mounts your component to the DOM. Where does this happen?
  - Pair up with a classmate to discuss how it works.

### 2. JSX

JSX allows us to write UI elements in a syntax that looks like HTML but is actually JavaScript.

#### 🔹 Try This:

- Visit [Introducing JSX](https://reactjs.org/docs/introducing-jsx.html)
- Copy this JSX snippet into [Babel's REPL](https://babeljs.io/repl/):
  ```jsx
  import React from 'react';

  function App() {
    return (
      <div className="App">
        <h1>Hello, World!</h1>
      </div>
    );
  }

  export default App;
  ```
- Compare the compiled JavaScript output. What changed?

### 3. Virtual DOM

The **Virtual DOM** improves performance by reducing direct interactions with the real DOM.

#### 🔹 Discussion Prompt:

- Read [React's Virtual DOM explanation](https://legacy.reactjs.org/docs/faq-internals.html)
- Explain the Virtual DOM in your own words to AI and ask for feedback: "Did I explain React's Virtual DOM correctly? How can I improve my explanation?"
- Why is manipulating the real DOM slow? How does React optimize updates?

## Functional Programming in React

React embraces **functional programming**, where functions play a central role. Key principles:

- Pure functions (no side effects)
- Immutability (data does not change in place)
- Higher-order functions (map, filter, reduce)

### Using map, filter, and reduce

#### `map`

The `map` function creates a new array by applying a function to each element.

```js
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8]
```

🔹 **Try This:** Create an array of names and use map to convert them to uppercase.
Ask AI for feedback: **"Does my map function follow best practices?"**

#### `filter`

The filter function creates a new array with only the elements that satisfy a condition.

```JS
const numbers = [1, 2, 3, 4, 5, 6];
const evens = numbers.filter(num => num % 2 === 0);
console.log(evens); // [2, 4, 6]
```

🔹 **Try This:** Given an array of numbers, filter out all values less than 10.
Ask AI for feedback: **"Is my filter condition correct? How can I optimize it?"**

#### `reduce`

The `reduce` function applies a function to accumulate values into a single result.

```js
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum); // 10
```

🔹 **Try This:** Use reduce to find the product of an array of numbers.
Ask AI for feedback: **"Is my reduce function efficient? Can I improve its readability?"**

--- 

## **Final Thoughts**

- ✅ **map, filter, and reduce are methods of the Array class.**
- ✅ **map, filter, and reduce are built on functional programming ideas.**;
- ✅ **map, filter, and reduce are abstractions that cover standard operations that programmers perform on arrays.**

📌 **AI Reflection Prompt:** *"Review my explanation of array.map(). <Insert your explanation here>"*

📌 **AI Reflection Prompt:** *"Review my explanation of array.filter(). <Insert your explanation here>"*

📌 **AI Reflection Prompt:** *"Review my explanation of array.reduce(). <Insert your explanation here>"*

## After-Class

Complete additional challenges: [React Product List]()

Additional Resources

- [React Tutorial](https://react.dev/learn/tutorial-tic-tac-toe)
- [Understanding JSX](https://react.dev/learn/writing-markup-with-jsx)
- [JavaScript Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
