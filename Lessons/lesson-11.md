# **ACS 3330 - Lesson 11: `useEffect` in a Live Weather Dashboard**  

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
    };
  }, []);

  return <p>Timer is running. Open the console.</p>;
}
```

---

Yes! Here's a single React component that brings all the `useEffect` patterns together in a meaningful way. It simulates a **user dashboard** that:

- Loads data when the component mounts
- Responds to prop or state changes
- Cleans up a timer when it unmounts
- Logs updates on every render (so you can *see* it's updating)

**Challenge:** Test the examples for yourself. 

**Stretch Challenge:** You may notice that React logs the messages from these components twice! Try this prompt: 

> "When I log messages from react components they almost always appear twice in the console, why is that?"

---

### 🧠 **Example: `UserDashboard` component**

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

---

### 💡 What's happening:

| Effect                      | Code snippet                                            | Description                                               |
|----------------------------|----------------------------------------------------------|-----------------------------------------------------------|
| **On mount**               | `useEffect(() => { ... }, [])`                          | Fetches user data, starts a timer                         |
| **On update**              | `useEffect(() => { console.log("Component updated") })` | Logs after every render                                   |
| **On dependency change**   | `useEffect(() => { ... }, [userId])`                    | Refetches user when `userId` changes                      |
| **On unmount**             | `return () => { clearInterval(...) }`                  | Cleans up timer                                           |

---



















---

## **Example 1**

```sh
npx create-react-app live-weather-dashboard
cd live-weather-dashboard
npm start
```  
They’ll install **dotenv** for managing API keys:  
```sh
npm install dotenv
```  
Then, create a `.env` file in the root folder:  
```
REACT_APP_WEATHER_API_KEY=your_openweathermap_api_key
```

---

# **Part 1: `useEffect` on Mount – Fetch Weather Data When App Loads**  
The first effect **runs only once** when the app loads.  

### **✏️ Add Initial Fetch in `WeatherDashboard.js`**
```jsx
import { useState, useEffect } from "react";

function WeatherDashboard() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("London");

  useEffect(() => {
    console.log("Fetching weather data on mount...");

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
      .then(response => response.json())
      .then(data => {
        setWeather(data);
        setLoading(false);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []); // Runs only once on mount

  return (
    <div>
      {loading ? <p>Loading weather...</p> : <p>Weather: {weather.weather[0].description}</p>}
    </div>
  );
}

export default WeatherDashboard;
```

📌 **AI Debugging Prompt:** *"Why does `useEffect` only run once when the component mounts?"*  

---

# **Part 2: `useEffect` with Dependency – Update Weather When City Changes**  
The next effect **runs when the city changes**.

### **✏️ Modify `useEffect` to Fetch Weather on City Change**
```jsx
useEffect(() => {
  console.log(`Fetching weather for ${city}...`);

  setLoading(true);
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
    .then(response => response.json())
    .then(data => {
      setWeather(data);
      setLoading(false);
    })
    .catch(error => console.error("Error fetching data:", error));
}, [city]); // Runs whenever `city` changes
```

📌 **AI Debugging Prompt:** *"How does adding `city` as a dependency affect when `useEffect` runs?"*  

---

# **Part 3: `useEffect` for Updates – Polling for Weather Every 10 Seconds**  
Now, students will **fetch updated weather every 10 seconds**.

### **✏️ Modify `useEffect` for Polling**
```jsx
useEffect(() => {
  console.log("Starting weather update interval...");

  const intervalId = setInterval(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
      .then(response => response.json())
      .then(data => {
        setWeather(data);
        console.log("Weather updated!");
      })
      .catch(error => console.error("Error fetching data:", error));
  }, 10000); // Runs every 10 seconds

  return () => {
    console.log("Cleaning up interval...");
    clearInterval(intervalId); // Cleanup when component unmounts
  };
}, [city]); // Runs when `city` changes
```

📌 **AI Debugging Prompt:** *"Why do we need `clearInterval(intervalId)`? What happens if we forget it?"*  

---

# **Part 4: `useEffect` on Unmount – Cleanup Side Effects**  
To prevent memory leaks, we’ll **reset the interval when switching cities**.

📌 **Key Concept:** **Every time `city` updates, a new `setInterval` starts. The old one must be removed!**

---

# **Part 5: Dynamic Background Color Based on Weather**
Now, students will change the **background color** dynamically based on the weather condition.

### **✏️ Modify `useEffect` to Change the Background**
```jsx
useEffect(() => {
  if (!weather) return;

  const condition = weather.weather[0].main;
  let bgColor = "white";

  if (condition === "Clear") bgColor = "lightblue";
  if (condition === "Rain") bgColor = "gray";
  if (condition === "Snow") bgColor = "lightgray";

  document.body.style.backgroundColor = bgColor;

  return () => {
    document.body.style.backgroundColor = "white"; // Reset when unmounting
  };
}, [weather]); // Runs when `weather` changes
```

📌 **AI Prompt:** *"How can I improve this background color logic?"*  

---

# **💡 Stretch Challenges (Combine with OpenWeather API Assignment)**  
### **💡 Challenge 1: Allow Users to Enter a City**
- Modify the app to **let users type a city name** instead of hardcoding "London".

### **💡 Challenge 2: Show a "Last Updated" Timestamp**
- Display the **time of the last API request**.

### **💡 Challenge 3: Cache Previous API Requests**
- If a user enters the **same city twice**, **reuse old data** instead of making a new request.

### **💡 Challenge 4: Convert Temperature to Fahrenheit**
- The OpenWeather API returns temperature in **Kelvin**. Convert it to Fahrenheit before displaying.

### **💡 Challenge 5: Add a "Weather History" Feature**
- Store **past 5 weather results** and allow users to click on them.

📌 **AI Stretch Prompt:** *"How can I store the weather history in local storage so it persists across page reloads?"*

---

## **Final Thoughts**
- `useEffect` **controls when side effects happen** in React.  
- Cleanup functions **prevent memory leaks** and improve performance.  
- `useEffect` is essential for **fetching data, event listeners, and background updates**.  

📌 **AI Reflection Prompt:** *"Review my explanation of the useEffect hook. <You explain the useEffect hook in your own words>."* 

---

## **📚 After Class**
- **Complete the Weather project**.  
- Review **React’s Official Docs on `useEffect`**: [React Docs](https://react.dev/reference/react/useEffect).  
