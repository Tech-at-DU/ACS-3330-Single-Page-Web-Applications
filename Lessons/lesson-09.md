# Lesson 9: Redux Toolkit

## Overview

In this lesson you will refactor the clicker game from Zustand to Redux Toolkit. You will:

- Map Zustand concepts directly to their RTK equivalents
- Create a slice with `createSlice`
- Set up a store with `configureStore`
- Read state with `useSelector` and dispatch actions with `useDispatch`
- Understand why RTK is the industry standard for larger applications

---

## Interview Context

You passed the first interview. The team liked your solution.

They have called you back. This time the interviewer says:

> "Our codebase uses Redux Toolkit as the standard for state management. We'd like to see you refactor your clicker game to use RTK instead of Zustand. The behavior should be identical — we're just changing the state layer."

This is a realistic scenario. Companies have standards. Being able to adapt your solution to a team's chosen tools is a skill interviewers evaluate directly.

**Before you start, write down your clarifying questions.** Some worth considering:

- Should the state shape stay the same?
- Is there a preferred folder structure for slices and the store?
- Should I keep Zustand installed, or remove it entirely?
- Are there any RTK features the team expects me to use beyond `createSlice`?

Bring your questions to the instructor before you write any code.

---

## Part 1 — The Mapping (20 min)

You already understand global state. You already know why it exists. The concepts in RTK are the same — the API is different.

| Zustand | Redux Toolkit |
|---|---|
| `create((set) => ({ ... }))` | `createSlice` + `configureStore` |
| State and updaters in one object | State in `initialState`, updaters in `reducers` |
| Call a function from the store | `dispatch` an action |
| `useGameStore((state) => state.x)` | `useSelector((state) => state.game.x)` |
| No Provider needed | `<Provider store={store}>` wraps the app |

Three key differences to keep in mind as you work:

1. **Actions are separate from state.** In Zustand you wrote functions directly in the store. In RTK, `createSlice` generates action creators that you dispatch.
2. **You need a Provider.** RTK uses React context under the hood. The `<Provider>` makes the store available to all components.
3. **State is namespaced.** Because the store can hold multiple slices, state is accessed via the slice name: `state.game.score` instead of `state.score`.

> 💡 AI Prompt: "How does Redux Toolkit's createSlice compare to Zustand's create function?"

Install Redux Toolkit before moving on:

```bash
npm install @reduxjs/toolkit react-redux
```

---

## Part 2 — Build the Store (25 min)

This part is instructor-led. The store layer introduces new APIs — `createSlice`, `configureStore`, and `Provider` — that you have not written before. Follow along, then you will use this as the foundation for the challenge.

### Create the Slice

Create `src/store/gameSlice.js`. This replaces `src/store.js` from the Zustand version.

```js
import { createSlice } from '@reduxjs/toolkit'

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    score: 0,
    multiplier: 1,
    clicks: 0,
  },
  reducers: {
    click: (state) => {
      state.score += state.multiplier
      state.clicks += 1
    },
    buyUpgrade: (state) => {
      state.score -= state.multiplier * 10
      state.multiplier += 1
    }
  }
})

export const { click, buyUpgrade } = gameSlice.actions
export default gameSlice.reducer
```

Notice that `click` and `buyUpgrade` look like they mutate state directly. RTK uses a library called **Immer** under the hood, which intercepts these writes and produces a new state object safely. You can write it as if you're mutating — RTK handles immutability for you.

> 💡 AI Prompt: "What is Immer and why does Redux Toolkit use it?"

---

### Configure the Store

Create `src/store/store.js`:

```js
import { configureStore } from '@reduxjs/toolkit'
import gameReducer from './gameSlice'

export const store = configureStore({
  reducer: {
    game: gameReducer
  }
})
```

The key `game` is what namespaces your state. In components you will read `state.game.score`, not `state.score`.

---

### Add the Provider

In `src/main.jsx`, wrap your app with the Redux Provider:

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
```

> 💡 AI Prompt: "What does the Redux Provider component do and why does it need to wrap the whole app?"

---

## Break (15 min)

---

## Part 3 — Refactor the Components (45 min)

The store is set up. The app will not work yet — the components still import from Zustand.

Your job is to refactor each component to use RTK. Remove the Zustand imports and replace them using only two tools:

- `useSelector` — to read state from the store
- `useDispatch` — to send actions to the store
- The action creators exported from `gameSlice.js`

Use the mapping table from Part 1. The logic inside each component does not change — only where it gets its state and how it updates it.

**Components to refactor:**
- `Header.jsx`
- `Clicker.jsx`
- `UpgradeShop.jsx`

`App.jsx` and `GameArea.jsx` do not need changes — they pass no props and import nothing from the store.

When all three components are refactored, the app should behave identically to the Zustand version. If behavior changes, the bug is in the refactor, not the logic.

> 💡 AI Prompt: "What is the difference between useSelector and useDispatch in React Redux?"

---

## Part 4 — Stretch Challenge (20 min)

The interviewer adds a follow-up requirement:

> "We'd also like to track a leaderboard — the top 5 scores. Can you add that as a separate slice?"

Create a `leaderboardSlice.js` that:
- Holds an array of top scores
- Has an action to submit the current score
- Only keeps the top 5, sorted highest first

Wire it into the store alongside `gameSlice`. This is the RTK pattern for real applications — one store, multiple slices, each responsible for its own domain.

> 💡 AI Prompt: "How do I manage multiple slices in a Redux Toolkit store?"

---

## Debrief — What Changed and What Didn't (10 min)

**What stayed the same:**
- `App.jsx` and `GameArea.jsx` — untouched
- The state shape (`score`, `multiplier`, `clicks`)
- The logic inside each action
- No props anywhere in the component tree

**What changed:**
- `create()` became `createSlice()` + `configureStore()`
- Store functions became dispatched actions
- `useGameStore` became `useSelector` + `useDispatch`
- A `<Provider>` is now required

The behavior is identical. RTK adds more ceremony, but that structure makes large codebases easier to navigate, debug, and test.

**What interviewers look for in a refactor challenge:**

| | Response |
|---|---|
| **Weak** | Rewrites everything from scratch without comparing the two approaches |
| **Good** | Identifies the mapping between libraries before writing code |
| **Strong** | Asks about team conventions, keeps the diff minimal, explains the tradeoffs |

A refactor that changes the minimum necessary is a better signal than one that rewrites everything.

---

## Key Concepts

| Concept | Zustand | Redux Toolkit |
|---|---|---|
| Define state | Inside `create()` | `initialState` in `createSlice` |
| Update state | Functions in the store | Reducers in `createSlice` |
| Read state | `useGameStore(state => state.x)` | `useSelector(state => state.game.x)` |
| Write state | Call the function | `dispatch(actionCreator())` |
| Wire up | No setup needed | `configureStore` + `<Provider>` |

---

## Further Reading

- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [createSlice API](https://redux-toolkit.js.org/api/createSlice)
- [React Redux Quick Start](https://react-redux.js.org/introduction/quick-start)
