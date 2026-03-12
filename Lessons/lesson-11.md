# **ACS 3330 - Lesson 11: `useEffect`**  

## **Overview**  
Students will build a **Live Weather Dashboard** that:  
- Fetches weather **when the app mounts**.  
- Updates **when the city changes**.  
- **Polls for new weather data** every 10 seconds.  
- Cleans up effects **when the component unmounts**.  

By the end of this lesson, students will understand **all key uses of `useEffect`**.  

That’s a solid start! Here's a slightly refined version of your section to clarify and tighten the language while still being beginner-friendly. I’ve also restructured the examples a little to help students see the differences more clearly:

---

### How to use the `useEffect` hook

The `useEffect` hook lets you run side effects in your React components. It’s useful in the following scenarios:

- **When a component mounts:**  
  Run code once, right after the component is added to the DOM.  
  _Example: initializing data or setting up a listener._

- **When a component updates:**  
  Run code after every render, unless you specify dependencies.  
  _Example: syncing the DOM or triggering animations after render._

- **When specific dependencies change:**  
  Run code only when certain values (like props or state) change.  
  _Example: fetching new data when a `userId` changes._

- **When a component unmounts:**  
  Clean up resources when the component is removed from the DOM.  
  _Example: clearing a timer or removing an event listener._

You control when `useEffect` runs by passing a **dependency array** as the second argument:

```jsx
useEffect(() => {
  // effect code here

  return () => {
    // cleanup code here (runs on unmount or before next effect)
  };
}, [/* dependencies go here */]);
```

---

### 1. **When a component mounts**
Use an empty dependency array to run the effect only once when the component is first rendered.

```jsx
import { useEffect } from "react";

function Welcome() {
  useEffect(() => {
    console.log("Component mounted");
    // Code here runs only once when this component is mounted
  }, []); // empty dependency array

  return <h1>Welcome!</h1>;
}
```

---

### 2. **When a component updates**
If you don’t provide a dependency array, the effect runs after **every** render.

```jsx
import { useEffect, useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Component updated");
    // Code here runs each time this component updates
    // For example, when the count changes
  }); // no dependency array

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}
```

---

### 3. **When specific dependencies change**
Provide an array with specific dependencies to control when the effect runs.

```jsx
import { useEffect, useState } from "react";

function UserProfile({ userId }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    console.log(`Fetching data for user ${userId}`);
    // Simulate data fetching
    setUserData({ name: "User " + userId });
    // Code here runs only when userId Changes
  }, [userId]); // dependency: userId

  return <div>{userData ? userData.name : "Loading..."}</div>;
}
```

---

### 4. **When a component unmounts**
Use the cleanup function inside `useEffect` to run code when the component unmounts.

```jsx
import { useEffect } from "react";

function Timer() {
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Tick...");
    }, 1000);

    // Return a clean up function
    return () => {
      clearInterval(interval);
      console.log("Timer cleaned up");
      // Code here runs when this component is unmounted
    };
  }, []);

  return <p>Timer is running. Open the console.</p>;
}
```

---

**Challenge:** Test the examples for yourself. 

**Stretch Challenge:** You may notice that React logs the messages from these components twice! Try this prompt: 

> "When I log messages from react components they almost always appear twice in the console, why is that?"

---

### 🧠 **Example: `UserDashboard` component**
Add this component to a React project to test `useEffect` and try the ideas described above. 

```jsx
import { useEffect, useState } from "react";

function UserDashboard({ userId }) {
  const [user, setUser] = useState(null);
  const [isOnline, setIsOnline] = useState(true);
  const [tick, setTick] = useState(0);

  // 1. Run once when component mounts
  useEffect(() => {
    console.log("Component mounted");

    // Simulate data fetch
    setTimeout(() => {
      setUser({ name: `User ${userId}`, status: "active" });
    }, 1000);

    // 4. Cleanup when component unmounts
    const interval = setInterval(() => {
      setTick(t => t + 1); // Trigger re-renders every second
    }, 1000);

    return () => {
      console.log("Cleaning up timer...");
      clearInterval(interval);
    };
  }, []);

  // 2. Runs after every render (component update)
  useEffect(() => {
    console.log("Component updated");
  });

  // 3. Runs only when userId changes
  useEffect(() => {
    console.log(`User ID changed to ${userId}`);
    // Refetch user data or update view
    setUser(null);
    setTimeout(() => {
      setUser({ name: `User ${userId}`, status: "active" });
    }, 1000);
  }, [userId]);

  return (
    <div>
      <h2>User Dashboard</h2>
      <p><strong>Tick:</strong> {tick}</p>
      {user ? (
        <>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Status:</strong> {user.status}</p>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
      <button onClick={() => setIsOnline(o => !o)}>
        Toggle Online ({isOnline ? "Online" : "Offline"})
      </button>
    </div>
  );
}
```

**Challenge 1:**
Create a new component with the code above. Open the console and refresh. You should see, something like: 

```
[Log] 1) Component mounted (UserDashBoard.jsx, line 25)
[Log] 3) Component updated (UserDashBoard.jsx, line 39)
[Log] 4) User ID changed to EdamameBean (UserDashBoard.jsx, line 42)
[Log] 2) Cleaning up timer... (UserDashBoard.jsx, line 34)
[Log] 1) Component mounted (UserDashBoard.jsx, line 25)
[Log] 3) Component updated (UserDashBoard.jsx, line 39)
[Log] 4) User ID changed to EdamameBean (UserDashBoard.jsx, line 42)
[Log] 3) Component updated (UserDashBoard.jsx, line 39)
```

Find these comments in the component. Notice some of the commonents appear twice! Ask the AI:

- "When I log messages from react components they almost always appear twice in the console, why is that?"

Try removing the doubled comments...

**Challenge 2:**
Notice that comment "Cleaning up timer..." never appears. This should happen when the component is unmounted. To make this happen you need the `<UserDashboard />` component to be conditionally rendered, and to be able to toggle this! 

Add a button that allows you to show and hide the `<UserDashbaord />` component. 

With this in place, you should see messages telling you the component mounted and unmounted is you toggle its display. 

**Challenge 3:**
There is a possibility for problems! "Stale Closure" is a problem that can happen with `useEffect`. 

Change: 

```JS
const interval = setInterval(() => {
  setTick(t => t + 1); // Trigger re-renders every second
}, 1000);
```

To: 

```JS
const interval = setInterval(() => {
  setTick(tick + 1); // Trigger re-renders every second
}, 1000);
```

Testing this, the timer is no longer counting! Ask the AI: 

- "Explain "stale closure", what is it, why does it occur, and how can I resolve it?"
- "<provide the two code snippets above> What is the difference between these two code snippets?"

---

### 💡 What's happening:

| Effect                      | Code snippet                                            | Description                                               |
|----------------------------|----------------------------------------------------------|-----------------------------------------------------------|
| **On mount**               | `useEffect(() => { ... }, [])`                          | Fetches user data, starts a timer                         |
| **On update**              | `useEffect(() => { console.log("Component updated") })` | Logs after every render                                   |
| **On dependency change**   | `useEffect(() => { ... }, [userId])`                    | Refetches user when `userId` changes                      |
| **On unmount**             | `return () => { clearInterval(...) }`                  | Cleans up timer                                           |

---

## Lab Assignment
Answer todays questions on Gradscope: Lab 2 - useEffect.
