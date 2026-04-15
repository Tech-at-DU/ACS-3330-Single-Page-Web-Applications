# Lesson 8: Application State

## Overview

In this lesson you will feel the problem that global state management solves before you learn the solution. You will:

- Identify the pain of **prop drilling** by working with a real app
- Understand why component state breaks down as apps grow
- Refactor the app to use **Zustand** — a minimal global state library
- Connect these concepts to the Redux tutorial you are working on

---

## Interview Context

This lesson is structured as a coding interview simulation.

You will be given a codebase and asked to add a feature — exactly the kind of task you might face in a real front-end interview. Before you write any code, you are expected to read the codebase, understand it, and ask clarifying questions.

Interviewers are not just evaluating whether you can add the feature. They are evaluating:

- Whether you read the existing code before touching it
- Whether you notice architectural problems
- Whether you can articulate tradeoffs
- How you respond when a better approach is suggested

**Before you write any code, write down the questions you would ask the interviewer.**

---

## Part 1 — The Problem (45 min)

### What is Prop Drilling?

So far you have used `useState` to manage state inside a component. When a child component needs that state, you pass it as a prop. When a grandchild needs it, you pass it through the child. This is **prop drilling** — passing props through components that don't need them just to get data to components that do.

This is fine for one or two levels. It breaks down when your app grows.

```
App (owns score)
 └── GameArea (doesn't need score, but must pass it)
      └── Clicker (needs score)
```

`GameArea` is stuck carrying state it has no use for. Every time you add a new piece of state, every component in the chain has to be updated.

---

### The Starter App

Clone or download the starter app from the class repo. Then run it:

```bash
npm install
npm run dev
```

The app is a simple clicker game. Click the button to earn points. Buy upgrades to increase your multiplier.

Take 10 minutes to read through the code before touching anything. Focus on:

- Where does state live?
- Which components use the state?
- Which components only pass it along?

**Component tree:**

```
App               → owns: score, multiplier
├── Header        → receives: score
└── GameArea      → receives: score, setScore, multiplier, setMultiplier
    ├── Clicker   → receives: score, setScore, multiplier
    └── UpgradeShop → receives: score, setScore, multiplier, setMultiplier
```

Open [GameArea.jsx](../clicker-game/src/components/GameArea.jsx) and look at its props. How many does it receive? How many does it actually use?

> 💡 AI Prompt: "What is prop drilling in React and why is it a problem?"

---

### The Interview Problem

The interviewer says:

> "We have a clicker game. We'd like to add a click counter — track the total number of clicks and show it in the header. How would you approach this?"

**Before you start coding, write down your clarifying questions.** Some good ones to consider:

- Where should this state live?
- Is this the only place the click count will be displayed?
- Are there more features like this planned?

Bring your questions to the instructor before you start.

---

### Challenge — Add a Click Counter

Add a new feature to the app: **track the total number of clicks** and display it in the Header.

Requirements:
- Count every time the Click button is pressed
- Display the total click count in the Header, next to the score

To complete this you will need to:

1. Add a `clicks` state to `App`
2. Pass `clicks` and `setClicks` through `GameArea` to `Clicker`
3. Pass `clicks` to `Header`

Work through it. Notice what you have to touch and why.

---

### Interview Follow-up Questions

A good interviewer will not just accept your solution — they will probe it. After you finish, be ready to answer:

- How many files did you have to modify to add one piece of state?
- Did `GameArea` need to know about `clicks` at all? Why did it have to?
- Imagine this app has 20 components instead of 5. What happens when the next feature request comes in?
- Is there a better way to structure this?

This last question is the one that leads somewhere. The interviewer is looking to see if you can identify the problem yourself — not just complete the task.

---

### Discussion

Before the break, the core question:

> If `GameArea` does not use `score`, `multiplier`, or `clicks` — why does it have to know about them?

The answer is: it shouldn't. That is exactly the problem global state solves.

---

## Break (15 min)

---

## Part 2 — The Solution (50 min)

### The Interviewer Responds

After you walk through your prop drilling solution, the interviewer says:

> "That works. How would you feel about this approach if the app had 20 components? Is there anything you'd do differently?"

This is a senior developer's answer to that question.

---

### Introducing Zustand

Zustand is a small global state library for React. It lets any component in your app read or update shared state directly — no props required.

You do not need a Provider. You do not need to thread props through the tree. Any component can connect to the store and use it.

Install it:

```bash
npm install zustand
```

---

### Create the Store

Create a new file `src/store.js`:

```js
import { create } from 'zustand'

const useGameStore = create((set) => ({
  score: 0,
  multiplier: 1,
  clicks: 0,
  click: () => set((state) => ({
    score: state.score + state.multiplier,
    clicks: state.clicks + 1
  })),
  buyUpgrade: () => set((state) => ({
    score: state.score - state.multiplier * 10,
    multiplier: state.multiplier + 1
  }))
}))

export default useGameStore
```

The store holds **state** and **the functions that update it** in one place. Any component can import `useGameStore` and connect to it.

> 💡 AI Prompt: "What is Zustand and how does it compare to useState?"

> 💡 AI Prompt: "In Zustand, what does the `set` function do?"

---

### Refactor App.jsx

With state now living in the store, `App` no longer needs `useState` at all. Remove the state and the props:

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

### Refactor GameArea.jsx

`GameArea` no longer receives or passes any props:

```jsx
import Clicker from './Clicker'
import UpgradeShop from './UpgradeShop'

function GameArea() {
  return (
    <div className="game-area">
      <Clicker />
      <UpgradeShop />
    </div>
  )
}

export default GameArea
```

---

### Refactor Header.jsx

`Header` reads directly from the store — no props:

```jsx
import useGameStore from '../store'

function Header() {
  const score = useGameStore((state) => state.score)
  const clicks = useGameStore((state) => state.clicks)

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

### Refactor Clicker.jsx

`Clicker` reads the `click` action from the store:

```jsx
import useGameStore from '../store'

function Clicker() {
  const click = useGameStore((state) => state.click)
  const multiplier = useGameStore((state) => state.multiplier)

  return (
    <div className="clicker">
      <button className="click-button" onClick={click}>
        Click!
      </button>
      <p>+{multiplier} per click</p>
    </div>
  )
}

export default Clicker
```

---

### Refactor UpgradeShop.jsx

```jsx
import useGameStore from '../store'

function UpgradeShop() {
  const score = useGameStore((state) => state.score)
  const multiplier = useGameStore((state) => state.multiplier)
  const buyUpgrade = useGameStore((state) => state.buyUpgrade)
  const cost = multiplier * 10

  return (
    <div className="upgrade-shop">
      <h2>Upgrades</h2>
      <div className="upgrade">
        <div>
          <strong>Bigger Clicks</strong>
          <p>Each click earns +1 more point</p>
        </div>
        <button onClick={buyUpgrade} disabled={score < cost}>
          Buy ({cost} pts)
        </button>
      </div>
      <p className="multiplier-display">Current multiplier: x{multiplier}</p>
    </div>
  )
}

export default UpgradeShop
```

---

### What Just Happened?

Look at `App.jsx` and `GameArea.jsx`. They have no props. They pass nothing down. 

Adding `clicks` to the Header required touching exactly two files: `store.js` and `Header.jsx`. Nothing in between had to change.

Compare that to the prop drilling version, where you had to modify `App`, `GameArea`, `Clicker`, and `Header` just to thread one new value through.

> 💡 AI Prompt: "What is a selector in Zustand and why should I only select the state I need?"

---

## Part 3 — Practice (35 min)

### Challenge — Add a New Feature Using Zustand

Add a **high score** to the game. The high score should update whenever the current score exceeds it.

Requirements:
- Track `highScore` in the store
- Display it in the Header
- Update it automatically whenever `score` exceeds it

Do this without passing any props. Every change lives in `store.js` and the component that displays it.

When you are done, notice how many files you touched. Compare that to what it would have taken with prop drilling.

### Stretch — Add an Auto-Clicker Upgrade

Add a second upgrade to `UpgradeShop` that, once purchased, automatically adds points every second.

Hint: You will need `useEffect` in a component, but the state all lives in the store.

---

## Debrief — What Interviewers Are Looking For (10 min)

In a real interview, the prop drilling problem is often used to assess seniority. Here is what different levels of answer look like:

| Level | Response |
|---|---|
| **Junior** | Implements prop drilling without noticing the problem |
| **Mid** | Implements it, notices it feels awkward, mentions it could be cleaner |
| **Senior** | Asks upfront about app scale, proposes global state before writing a line |

You do not need to be a senior developer to give a senior answer. You need to ask the right questions before you start coding.

---

## Connecting to Redux

Zustand and Redux solve the same problem. The difference is structure and convention.

| | Zustand | Redux Toolkit |
|---|---|---|
| Store setup | `create()` — a few lines | `configureStore()` + slices |
| State updates | Functions inside the store | Actions dispatched to reducers |
| Reading state | `useGameStore((state) => state.x)` | `useSelector((state) => state.x)` |
| Writing state | Call a function from the store | `useDispatch()` + an action |

The tutorial you are working on uses Redux Toolkit. The concepts are the same — a single store, state that any component can read, actions that describe updates. Redux adds more ceremony, but that structure pays off in larger applications.

When you see `useSelector` in your tutorial, think: *that's the Zustand selector I just wrote.* When you see `dispatch`, think: *that's the function I called from the store.*

> 💡 AI Prompt: "How is Zustand different from Redux Toolkit? When would you choose one over the other?"

---

## Key Concepts

| Concept | Description |
|---|---|
| **Prop drilling** | Passing props through components that don't use them |
| **Global state** | State that lives outside the component tree, accessible anywhere |
| **Store** | The single object that holds all global state |
| **Selector** | A function that reads a specific slice of state from the store |

---

## Further Reading

- [Zustand Docs](https://zustand-demo.pmnd.rs/)
- [Redux Toolkit Quick Start](https://redux-toolkit.js.org/introduction/getting-started)
