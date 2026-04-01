# 🌦️ ACS 3330 – Assignment: React Weather App with OpenWeatherMap API

## 📝 Description
In this assignment, you will build a React app that connects to the **OpenWeatherMap API** and displays real-time weather data for a given zip code.

This project will span **two weeks**:

- **Week 1:** Fetching data with `useEffect`
- **Week 2:** Conditional rendering and UI states

You will use:
- the **controlled component pattern** for form input
- **useEffect** for data fetching
- **conditional rendering** to manage UI states

---

## 🎯 Learning Goals

By completing this assignment, you will:

- Use **controlled inputs** in React
- Fetch data from an API using **useEffect**
- Manage application state (`weather`, `loading`, `error`)
- Build dynamic UI with **conditional rendering**

---

## 🧩 Assignment Structure

### Week 1 — Data Fetching (`useEffect`)
Focus on:
- form input
- API requests
- managing state

### Week 2 — Conditional Rendering
Focus on:
- displaying different UI states
- improving user experience
- handling loading and errors visually

---

## 🚀 Getting Started

1. Create a new React project (Vite recommended)
2. Sign up for an API key at:
   https://openweathermap.org
3. Create a `.env` file:

```env
VITE_OPENWEATHER_API_KEY=your_key_here
```

⚠️ Important:
- Restart your dev server after editing `.env`
- Do NOT commit your API key

---

## 🔧 Challenges

### 1️⃣ Create a React App
- Scaffold a new project
- Render a basic `Weather` component

---

### 2️⃣ Controlled Input Form
- Add a form to enter a **zip code**
- Use state to control the input
- Display the current zip code for testing

💡 Stretch:
- Add validation (5 digits)
- Add unit selection (metric / imperial)

---

### 3️⃣ Create a Weather Component
- Replace default `App` content
- Render a header and basic layout

---

### 4️⃣ Fetch Weather Data (**useEffect Required**)

You must:

- Write a `fetchWeather(zip)` helper
- Use `useEffect` to fetch data
- Fetch when the user submits a zip code

Your app must include state for:

```js
const [zip, setZip] = useState('')
const [weather, setWeather] = useState(null)
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)
```

Minimum requirements:
- Fetch from OpenWeatherMap using zip
- Log response to console
- Display at least ONE value (e.g. temperature)

💡 Stretch:
- Use `async/await`
- Handle errors with `try/catch`

---

### 5️⃣ Display Weather with a Subcomponent
- Create a `DisplayWeather` component
- Pass weather data as props

💡 Stretch:
- Check `cod === 200` for success
- Display error messages

---

### 6️⃣ Conditional Rendering (Week 2)

Next week, you will update your app to show:

- No data yet
- Loading state
- Error state
- Weather data

Do NOT worry about this yet—we will cover it in the next lesson.

---

## ✅ Week 1 Minimum Requirements

By the end of Week 1, your app must:

- use a controlled input for zip code
- use `useEffect` to fetch data
- store weather data in state
- manage `loading` and `error` (UI optional)
- display at least one weather value

---

## 🎨 Stretch Challenges

Choose any:

- Show humidity, pressure, wind
- Style UI based on weather conditions
- Show weather icons
- Add geolocation support
- Use a different OpenWeather endpoint:
  - hourly forecast
  - 5-day forecast
  - 16-day forecast

---

## ⚠️ Common Mistakes

Avoid:

- calling `fetch` inside render
- forgetting dependency arrays
- not handling errors
- not resetting loading state
- mixing up zip vs city queries

---

## 🧰 Assessment Rubric

| Category | Does Not Meet | Meets Expectations | Exceeds Expectations |
|----------|--------------|-------------------|---------------------|
| **Completion** | Incomplete | Week 1 requirements met | Week 2 + stretch features |
| **Data Fetching (useEffect)** | No API call | Fetch works | Correct useEffect + clean logic |
| **State Management** | Missing state | Basic state works | Clear separation (weather/loading/error) |
| **Functionality** | Broken UI | Displays weather data | Rich data + polished UI |
| **Architecture** | All in App | Uses components | Well-structured component system |
| **Code Quality** | Messy | Clean code | Well-named, readable, documented |

---

## 🎉 Final Note

This assignment is about building a **real-world React app**.

Focus on:

- clean state management
- correct use of `useEffect`
- building features step-by-step

You’ll improve the UI and polish next week.