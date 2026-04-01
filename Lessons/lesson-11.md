# ACS 3330 — Lesson 11: `useEffect` with OpenWeatherMap

## Overview

In this lesson you will use `useEffect` to build the data-fetching behavior for a **weather app**. The app will fetch weather data from a web API and display it on the screen. A user will input a zip code and your app will fetch the current weather report for that area. 

Your weather app needs to:

- fetch weather data from **OpenWeatherMap**
- fetch again when the city changes
- show loading, success, and error states
- avoid common `useEffect` mistakes

This lesson focuses on the parts of `useEffect` you need for this project.

---

## Learning Goals

By the end of this lesson you should be able to:

- explain what `useEffect` is used for
- write a `fetchWeather` function for OpenWeatherMap
- fetch data with `useEffect`
- use a dependency array correctly
- avoid common mistakes like infinite loops
- update the weather app when user input changes

---

# ⏱️ Part 1 — Framing the Problem (15 min)

## Quick Write (2 min)

Answer this question:

**When should an app fetch data?**

Write at least 2 answers.

---

## Whole-Class Discussion (8 min)

Be ready to share ideas.

Possible answers include:

- when the app first loads
- when the user searches for a city
- when the city changes
- when the user refreshes the weather

---

## Key Idea

The weather app has to do work **after render**.

That work is called a **side effect**.

Examples:

- fetching data from an API
- starting a timer
- updating page content

React gives us `useEffect` to handle this.

---

# ⏱️ Part 2 — The Basic `useEffect` Pattern (20 min)

## Syntax

The useEffect function signature:

```jsx
useEffect(() => {
  // side effect here
}, [dependencies])
```

The first argument is a function.

The second argument is the **dependency array**. It controls when the effect runs.

---

## Three Patterns You Need Today

### 1. Run once after mount

Mount means the component appears in the UI for the first time.

```jsx
useEffect(() => {
  console.log('run once')
}, [])
```

Important! The dependency array is empty!

If an effect runs "after mount," it runs after that first render.

For a weather app, this is useful when you want to fetch initial data as soon as the component appears.

### 2. Run when a value changes

```jsx
useEffect(() => {
  console.log('city changed')
}, [city])
```

Important! The dependency array contains a dependency. A dependency is a value that might change, if the value changes useEffect will run again. 

### 3. Clean up when needed

```jsx
useEffect(() => {
  const id = setInterval(() => {
    console.log('tick')
  }, 1000)

  return () => clearInterval(id)
}, [])
```

Important! useEffect is returning a function! The returned function runs on unmount.

Unmount means the component is removed from the UI.

---

## Quick Check (Chat — 5 min)

Look at the following `useEffect` examples. Answer these questions: 

- Which one runs once?
- Which one runs when a value changes?
- Which one might run too often?

```jsx
useEffect(() => {}, []) 
useEffect(() => {}, [city]) 
useEffect(() => {}) 
```

Be ready to explain your reasoning in one sentence.

---

# ⏱️ Part 3 — OpenWeatherMap Setup (20 min)

## What We Need

To fetch live weather data, you need:

- an OpenWeatherMap API key
- a `.env` file
- a helper function named `fetchWeather`

---

## Environment Variable

Create a `.env` file in the root of your project:

```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

Important:

- in Vite, environment variables must start with `VITE_`
- after editing `.env`, restart the dev server
- do not commit your real API key

---

## OpenWeatherMap Endpoint

We will use the current weather endpoint.

Example request:

```txt
https://api.openweathermap.org/data/2.5/weather?q=San%20Rafael&units=imperial&appid=YOUR_KEY
```

This request includes:

- `q` → city name
- `units=imperial` → Fahrenheit
- `appid` → your API key

---

## `fetchWeather` Helper

Use a helper function to keep API code out of your component.

```jsx
async function fetchWeather(city) {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY
  const encodedCity = encodeURIComponent(city)
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&units=imperial&appid=${apiKey}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Could not load weather')
  }

  const data = await response.json()
  return data
}
```

The code above uses an `async function`. It also uses the `await` keyword.  

Important! `async` and `await` work with `Promise`. Read about these here: https://javascript.info/async

---

## Quick Check (Pairs — 5 min)

Work with a partner.

Explain:

- why do we use `encodeURIComponent(city)`?
- why do we check `response.ok`?
- why is it useful to keep `fetchWeather` separate from the component?

---

# ⏱️ Part 4 — Activity: Predict Effect Behavior (20 min)

## Activity (Pairs — 10 min)

Work with a partner.

For each example below, discuss:

- when does it run?
- what could go wrong?
- does it need cleanup?

### Example A

```jsx
useEffect(() => {
  console.log('hello')
}, [])
```

### Example B

```jsx
useEffect(() => {
  fetchWeather(city)
}, [city])
```

### Example C

```jsx
useEffect(() => {
  const id = setInterval(() => console.log('tick'), 1000)
  return () => clearInterval(id)
}, [])
```

### Example D

```jsx
useEffect(() => {
  setCount(count + 1)
})
```

Write down one short note for each.

---

## Debrief

Be ready to explain:

- which example is dangerous
- why dependency arrays matter

---

# ⏱️ Part 5 — Guided Build: Fetch Weather on Mount (30 min)

## Starting State

We need state for:

- weather data
- loading
- error

```jsx
const [weather, setWeather] = useState(null)
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)
```

---

## Example Pattern

```jsx
useEffect(() => {
  async function loadWeather() {
    try {
      setLoading(true)
      setError(null)

      const data = await fetchWeather('San Rafael')
      setWeather(data)
    } catch (err) {
      setError('Could not load weather')
    } finally {
      setLoading(false)
    }
  }

  loadWeather()
}, [])
```

---

## Pause and Think (Chat — 5 min)

Answer these in chat:

1. Why is the dependency array empty here?
2. Why do we set `loading` before the fetch?
3. Why do we clear the error before fetching again?

---

## Important Note

Do **not** make the effect callback itself `async`.

Bad:

```jsx
useEffect(async () => {
  // avoid this
}, [])
```

Better:

```jsx
useEffect(() => {
  async function loadData() {
    // async work here
  }

  loadData()
}, [])
```

---

# ⏱️ Break (10 min)

---

# ⏱️ Part 6 — Activity: Fix the Broken Effect (25 min)

## Activity (Pairs — 12 min)

Work with a partner.

Each example below is broken.

For each one:

- identify what is wrong
- describe the visible bug
- rewrite it so it works

### Broken Example A

```jsx
useEffect(() => {
  fetchWeather(city).then(setWeather)
  setLoading(false)
}, [weather])
```

### Broken Example B

```jsx
useEffect(() => {
  fetchWeather(city).then(setWeather)
}, [])
```

### Broken Example C

```jsx
useEffect(() => {
  setLoading(false)
  fetchWeather(city).then(data => setWeather(data))
}, [city])
```

Write your fixes down.

---

## Share Out

Be ready to explain one broken example.

---

# ⏱️ Part 7 — Fetch Again When the City Changes (25 min)

## Goal

Now we want the effect to run again when the user chooses a new city.

---

## Example Pattern

```jsx
useEffect(() => {
  if (!city) return

  async function loadWeather() {
    try {
      setLoading(true)
      setError(null)

      const data = await fetchWeather(city)
      setWeather(data)
    } catch (err) {
      setError('Could not load weather')
    } finally {
      setLoading(false)
    }
  }

  loadWeather()
}, [city])
```

---

## Quick Questions (Pairs — 5 min)

Discuss:

- why do we guard with `if (!city) return`?
- what happens if `city` starts as an empty string?
- why does `city` belong in the dependency array?

---

# ⏱️ Part 8 — Activity: Design the Weather App State Flow (20 min)

## Activity (Pairs — 10 min)

Given this state:

```jsx
const [city, setCity] = useState('')
const [weather, setWeather] = useState(null)
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)
```

Write a short sequence describing what happens when the user searches for a city.

Include:

1. what triggers the effect
2. what state changes happen before fetch
3. what happens on success
4. what happens on failure

Example format:

- user enters city
- loading becomes true
- error is cleared
- fetch begins
- ...

---

## Share

Be ready to read your sequence aloud.

---

# ⏱️ Part 9 — Stretch: Polling and Cleanup (10 min)

## Advanced Example

This is optional / stretch material.

```jsx
useEffect(() => {
  if (!city) return

  const id = setInterval(() => {
    fetchWeather(city).then(setWeather)
  }, 10000)

  return () => clearInterval(id)
}, [city])
```

## Discuss

- Why is cleanup required?
- What happens if we forget cleanup?
- Should polling start if no city is selected?

---

# Weather App Requirements for This Week

By the end of this lesson and the related assignment, you should be able to:

- set up an OpenWeatherMap API key
- write a `fetchWeather` helper
- fetch weather data with `useEffect`
- update weather when the city changes
- manage loading state
- manage error state
- avoid obvious effect bugs

---

## Lab / Practice

Continue your weather app.

Minimum target for today:

1. Store `city`, `weather`, `loading`, and `error` in state
2. Create a `fetchWeather` helper
3. Use `useEffect` to fetch weather data
4. Refetch when the city changes
5. Show evidence that your effect is running correctly

---

## Reflection

Write short answers:

1. What does the dependency array do?
2. Why is `fetchWeather` useful as a separate function?
3. What state does your weather app need in order to fetch data correctly?