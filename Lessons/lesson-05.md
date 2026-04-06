# ACS 3330 — Lesson 5: Conditional Rendering for API Apps

## Overview

In the last lesson, you used `useEffect` to fetch data from the OpenWeather API.

Now you have a new problem:

> Your data does not exist immediately.

This lesson is about **what your UI should display at each stage of an API request**.

Instead of focusing on syntax, we will focus on **real application states**:
- loading
- error
- success
- empty

By the end of this lesson, your weather app will behave like a real application.

---

## Learning Objectives

By the end of this lesson, you will be able to:

- design UI for **asynchronous data states**
- safely render data from an API without crashes
- choose appropriate conditional rendering patterns
- distinguish between **loading, error, empty, and success states**
- debug common rendering issues in React apps

---

## Essential Question

**What should your UI show when your data is not ready yet?**

---

## Before You Start

You should already have:

- a working OpenWeather API request using `useEffect`
- state for:
  - `weather`
  - `loading`
  - `error`
- a basic component that displays weather data

---

# Part 1 — The Real Problem (10 min)

Your weather app is not always in the same state.

At different times, it might be:

1. **Empty** → user hasn’t searched yet  
2. **Loading** → waiting for API response  
3. **Error** → request failed  
4. **Success** → data loaded  

If you don’t handle these correctly, your app will:

- crash (`cannot read property of undefined`)
- show blank screens
- confuse users

## Activity — Map Your App States (5–10 min)

With a partner, list all possible states of your app:

- before search
- loading
- error
- success

For each state, answer:

- What should the user see?
- What should NOT be visible?

Be ready to share one decision with the class.

---

# Part 2 — Core UI States (30 min)

Challenge: 
- Create a new Vite project. 
- Delete the contents of App.jsx

## State 1 — Loading

```jsx
{loading && <p>Loading weather data...</p>}
```

## Build — Loading State

- Define a state variable `loading` (default: `false`)
- Add a button that toggles `loading`

Example:

```jsx
const [loading, setLoading] = useState(false)

<button onClick={() => setLoading(l => !l)}>
  Toggle Loading
</button>
```

## Test

- Click the button
- The loading message should appear and disappear

---

## State 2 — Error

```jsx
{error && <p className="error">Error: {error.message}</p>}
```

## Build — Error State

- Define a state variable `error` (default: `undefined`)
- Add a button to set an error
- Add a button to clear the error

Example:

```jsx
const [error, setError] = useState(undefined)

<button onClick={() => setError({ message: 'Something went wrong' })}>
  Set Error
</button>

<button onClick={() => setError(undefined)}>
  Clear Error
</button>
```

## Test

- Click "Set Error" → error message appears
- Click "Clear Error" → error message disappears

---

## State 3 — Success

```jsx
{weather && <WeatherDisplay data={weather} />}
```

## Build — Success State

- Define a state variable `weather` (default: `undefined`)
- Add a button that sets `weather` to mock data

Example:

```jsx
const [weather, setWeather] = useState(undefined)

<button onClick={() => setWeather({
  name: 'London',
  main: { temp: 280.32 },
  weather: [{ description: 'light drizzle', icon: '09d' }]
})}>
  Set Weather
</button>
```

## Test

- Click the button
- Weather UI should render

---

## State 4 — Empty

```jsx
{!weather && !loading && !error && <p>Search for a city</p>}
```

## Build — Empty State

- Add a button that clears `weather`

Example:

```jsx
<button onClick={() => setWeather(undefined)}>
  Clear Weather
</button>
```

## Test

- Click "Clear Weather"
- The empty state message should render

---

## Better Pattern: Early Returns

This is often clearer:

```jsx
if (loading) {
  return <p>Loading...</p>
}

if (error) {
  return <p>Error: {error.message}</p>
}

if (!weather) {
  return <p>Search for a city</p>
}

return <WeatherDisplay data={weather} />
```

---

## Checkpoint 1

Your app should now:

- show loading message during fetch
- show error message if request fails
- show weather data when successful
- show prompt when empty

---

# Part 2.5 — Real API Edge Case: 404 in Success Response (15 min)

OpenWeather sometimes returns a **successful HTTP response** that contains an error:

```js
{ cod: 404, message: "city not found" }
```

This means:

- `fetch` did NOT throw an error
- `error` state may still be `undefined`
- but the data is NOT valid weather data

---

## Build — Simulate 404 Response

Add a button that sets `weather` to:

```js
{ cod: 404, message: "city not found" }
```

Example:

```jsx
<button onClick={() => setWeather({ cod: 404, message: 'city not found' })}>
  Simulate 404
</button>
```

---

## Activity — What Happens?

Try to render:

```jsx
<p>{weather.main.temp}</p>
```

### Questions:

- Does this crash?
- Why?
- Is this a "success" state or an "error" state?

---

## Fix — Handle API-Level Errors

Update your rendering logic to detect this case:

```jsx
if (weather?.cod === 404) {
  return <p>City not found</p>
}
```

---

## Key Insight

Not all errors come from `catch`.

Sometimes:

- the request succeeds
- but the data itself represents an error

You must handle BOTH:

- network errors → `error`
- API errors → `weather.cod`

---

# Part 3 — Preventing Crashes (20 min)

## The Most Common Bug

```jsx
weather.main.temp
```

This crashes when `weather` is `null`.

---

## Fix 1 — Conditional Check

```jsx
weather && weather.main.temp
```

---

## Fix 2 — Optional Chaining (Preferred)

```jsx
weather?.main?.temp
```

---

## Your Task

Find any place where your app might crash and fix it using:

- `&&`
- or `?.`

---

## Checkpoint 2

Your app should:

- never crash due to missing data
- safely render even before API response

---

# Part 4 — Choosing the Right Pattern (15 min)

You don’t need 5 patterns. Focus on these:

## `if/else` → full UI states

```jsx
if (loading) return <Loading />
```

## `&&` → show or hide

```jsx
{error && <Error />}
```

## ternary → one of two options

```jsx
{weather ? <Weather /> : <Empty />}
```

---

## Rule of Thumb

- complex state → use `if/else`
- optional UI → use `&&`
- two options → use ternary

---

## Activity — Debug This UI

This code has a problem:

```jsx
{weather && <Weather />}
{loading && <Loading />}
```

### Questions:

- What happens if both are true?
- What UI will the user see?
- Is this correct?

Fix it using `if/else` or early returns.

---

# Part 5 — Build Your Weather UI (30–40 min)

## Required Features

Your app must:

- handle loading state
- handle error state
- handle empty state
- safely render weather data

---

## Suggested Structure

```jsx
if (loading) return <Loading />
if (error) return <Error message={error.message} />
if (!weather) return <Empty />

return <WeatherDisplay data={weather} />
```

---

## Checkpoint 3

Your app should feel stable:

- no crashes
- no undefined errors
- clear UI at every stage

---

# Part 6 — Enhancements (Stretch Work)

## Stretch 1 — Weather Icon

```jsx
{weather && (
  <img 
    src={`https://openweathermap.org/img/wn/${weather.icon}.png`} 
    alt={weather.description} 
  />
)}
```

---

## Stretch 2 — Dynamic Background

```jsx
const bg = weather?.main === "Rain" ? "rainy" : "sunny"
return <div className={bg}>...</div>
```

---

## Stretch 3 — Last Updated

```jsx
{weather && (
  <p>Last updated: {new Date(lastUpdated).toLocaleTimeString()}</p>
)}
```

---

## Stretch 4 — Outfit Suggestion

```jsx
const suggestion =
  temp < 40 ? "Wear a coat" :
  temp > 70 ? "T-shirt weather" :
  "Light jacket recommended"

return <p>{suggestion}</p>
```

---

## Stretch 5 — Better Empty State

Replace:

```jsx
<p>Search for a city</p>
```

With a more polished UI.

---

# Part 7 — Common Bugs (10 min)

## ❌ Crash: Cannot read property of undefined

Cause:
- rendering before data exists

Fix:

```jsx
weather?.main?.temp
```

---

## ❌ UI flickers or disappears

Cause:
- incorrect condition order

Fix:
- check `loading` first
- then `error`
- then `data`

---

## ❌ Nothing renders

Cause:
- missing return in conditional

Fix:
- ensure every branch returns JSX

---

# Part 8 — Discussion & Reflection (10 min)

## Group Discussion

In small groups, compare your apps:

- How did you structure your conditions?
- Did anyone use a different approach?
- Which version is easier to understand?

Choose one example to share with the class.

---

## Reflection

Answer:

1. What states does your app handle?
2. What caused the most bugs?
3. Where did you use `&&`, ternary, or `if/else`?
4. How did conditional rendering improve your app?

---

# Definition of Done

Your app:

- does not crash
- handles loading, error, empty, and success states
- safely renders API data
- has clear UI feedback for the user

---

# Final Thoughts

Conditional rendering is not about syntax.

It’s about:

> Designing UI that behaves correctly when your data changes.

If your app works in all states, you’ve done it right.