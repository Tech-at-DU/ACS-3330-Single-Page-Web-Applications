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

## Part 1 — Zustand to RTK (25 min)

### The Mapping

You already understand global state. You already know why it exists. The concepts in RTK are the same — the API is different.

| Zustand | Redux Toolkit |
|---|---|
| `create((set) => ({ ... }))` | `createSlice` + `configureStore` |
| State and updaters in one object | State in `initialState`, updaters in `reducers` |
| Call a function from the store | `dispatch` an action |
| `useGameStore((state) => state.x)` | `useSelector((state) => state.game.x)` |
| No Provider needed | `<Provider store={store}>` wraps the app |

The biggest differences:

1. **Actions are separate from state.** In Zustand you wrote functions directly in the store. In RTK, `createSlice` generates action creators that you dispatch.
2. **You need a Provider.** RTK uses React context under the hood. The `<Provider>` makes the store available to all components.
3. **State is namespaced.** Because the store can hold multiple slices, state is accessed via the slice name: `state.game.score` instead of `state.score`.

> 💡 AI Prompt: "How does Redux Toolkit's createSlice compare to Zustand's create function?"

---

### Install Redux Toolkit

```bash
npm install @reduxjs/toolkit react-redux
```

You can uninstall Zustand once the refactor is complete:

```bash
npm uninstall zustand
```

---

## Part 2 — Build the Store (25 min)

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

Notice that `click` and `buyUpgrade` look like they mutate state directly. RTK uses a library called **Immer** under the hood, which intercepts these mutations and produces a new state object safely. You can write it as if you're mutating — RTK handles immutability for you.

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

The key `game` here is what namespaces your state. When you read state in a component you will use `state.game.score`, not `state.score`.

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

## Part 3 — Refactor the Components (40 min)

Remove Zustand imports from each component. Replace them with `useSelector` to read state and `useDispatch` to send actions.

### App.jsx

`App` stays the same — no state, no props. This does not change.

```jsx
import Header from './components/Header'
import GameArea from './components/GameArea'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <GameArea />
    </div>
  )
}

export default App
```

---

### Header.jsx

Replace `useGameStore` with `useSelector`:

```jsx
import { useSelector } from 'react-redux'

function Header() {
  const score = useSelector((state) => state.game.score)
  const clicks = useSelector((state) => state.game.clicks)

  return (
    <header className="header">
      <h1>Clicker Game</h1>
      <span className="header-score">Score: {score}</span>
      <span>Clicks: {clicks}</span>
    </header>
  )
}

export default Header
```

---

### GameArea.jsx

No changes needed — it passes no props and imports nothing from the store.

---

### Clicker.jsx

Replace the Zustand function call with `dispatch`:

```jsx
import { useDispatch, useSelector } from 'react-redux'
import { click } from '../store/gameSlice'

function Clicker() {
  const dispatch = useDispatch()
  const multiplier = useSelector((state) => state.game.multiplier)

  return (
    <div className="clicker">
      <button className="click-button" onClick={() => dispatch(click())}>
        Click!
      </button>
      <p>+{multiplier} per click</p>
    </div>
  )
}

export default Clicker
```

---

### UpgradeShop.jsx

```jsx
import { useDispatch, useSelector } from 'react-redux'
import { buyUpgrade } from '../store/gameSlice'

function UpgradeShop() {
  const dispatch = useDispatch()
  const score = useSelector((state) => state.game.score)
  const multiplier = useSelector((state) => state.game.multiplier)
  const cost = multiplier * 10

  return (
    <div className="upgrade-shop">
      <h2>Upgrades</h2>
      <div className="upgrade">
        <div>
          <strong>Bigger Clicks</strong>
          <p>Each click earns +1 more point</p>
        </div>
        <button onClick={() => dispatch(buyUpgrade())} disabled={score < cost}>
          Buy ({cost} pts)
        </button>
      </div>
      <p className="multiplier-display">Current multiplier: x{multiplier}</p>
    </div>
  )
}

export default UpgradeShop
```

> 💡 AI Prompt: "What is the difference between useSelector and useDispatch in React Redux?"

---

### Verify

Run the app. The behavior should be identical to the Zustand version. If anything looks different, the bug is in the refactor, not the logic.

---

## Part 4 — Stretch Challenge (20 min)

### Add a Second Slice

The interviewer adds a follow-up requirement:

> "We'd also like to track a leaderboard — the top 5 scores across sessions. Can you add that as a separate slice?"

Add a `leaderboardSlice.js` that:
- Holds an array of top scores
- Has an action to submit the current score
- Only keeps the top 5, sorted highest first

Wire it into the store alongside `gameSlice`:

```js
export const store = configureStore({
  reducer: {
    game: gameReducer,
    leaderboard: leaderboardReducer
  }
})
```

This is the RTK pattern for real applications — one store, multiple slices, each responsible for its own domain.

> 💡 AI Prompt: "How do I manage multiple slices in a Redux Toolkit store?"

---

## Debrief — What Changed and What Didn't (10 min)

Look at the two versions side by side.

**What stayed the same:**
- `App.jsx` and `GameArea.jsx` — untouched
- The state shape (`score`, `multiplier`, `clicks`)
- The logic inside each action
- How components read and write state — one import, no props

**What changed:**
- `create()` became `createSlice()` + `configureStore()`
- Store functions became dispatched actions
- `useGameStore` became `useSelector` + `useDispatch`
- A `<Provider>` is now required

The behavior is identical. The difference is structure and convention — RTK adds more ceremony, but that ceremony makes large codebases easier to navigate, debug, and test.

**What interviewers are looking for in a refactor challenge:**

| | Response |
|---|---|
| **Weak** | Rewrites everything from scratch without comparing the two approaches |
| **Good** | Identifies the mapping between libraries before writing code |
| **Strong** | Asks about the team's conventions, keeps the diff minimal, explains tradeoffs |

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
