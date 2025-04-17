# 🧠 ACS 3330 – Lesson 8: Introduction to Redux

## 📝 Overview
Redux is a pattern and library for managing and updating **application state**. It helps with predictable state management across components — especially when you have deeply nested components or shared global state.

In this lesson, you’ll:
- Learn the difference between **component state** and **application state**
- Create a **Redux store** and a **reducer**
- Use `useDispatch()` to send actions
- Use `useSelector()` to read from state
- Build a working shopping cart using Redux

---

## 📦 Component State vs. Application State
In React, you’ve used `useState()` to manage **component-level state**. This is great when state is only used by one component.

But when multiple components need access to the same data — like a shopping cart, theme, or user authentication — passing props up/down the chain becomes awkward.

Redux solves this by providing a **single source of truth** (the store) and a **predictable way to update state** (actions & reducers).

> 💡 AI Prompt: "What is a single source of truth?"

---

## 🔄 How Redux Works (Flux Pattern)
Redux is inspired by Flux architecture:

1. A **user triggers an action** (clicks a button)
2. The component **dispatches** an action with `useDispatch()`
3. The action goes to the **reducer**, which returns new state
4. The Redux **store** holds this state
5. Components **read from the store** with `useSelector()`

📌 Data flow is **unidirectional**. Think of it as a cycle:
```
UI → dispatch → reducer → store → UI
```

> 💡 AI Prompt: "In the context Redux, what is an action?"

> 💡 AI Prompt: "In the context Redux, what is a reducer?"

> 💡 AI Prompt: "In the context Redux, what is the store?"

---

## 🛒 Example: Redux Shopping Cart
Let’s make a product page and add Redux to manage the cart.

### 📁 Folder Setup
```
src/
  components/
    ProductList.js
    ShoppingCart.js
  redux/
    actions.js
    reducer.js
    store.js
  App.js
```

---

### ⚙️ Step 1: Install Redux and React Redux
```bash
npm install @reduxjs/toolkit react-redux
```

---

### 🧠 Step 2: Create the Store
Create `redux/store.js`:
```js
import { configureStore } from '@reduxjs/toolkit'
import shoppingCartReducer from './reducer'

export const store = configureStore({
  reducer: {
    cart: shoppingCartReducer
  }
})
```

> 💡 AI Prompt: "When using Redux Toolkit, is the store made up of reducers?"

> 💡 AI Prompt: "When using Redux Toolkit, how is the store structured and how does that structure relate to the reducers?"

---

### 🧠 Step 3: Define the Reducer
Create `redux/reducer.js`:
```js
const initialState = []

export default function shoppingCartReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return [...state, action.payload] // return new state!
    default:
      return state 
  }
}
```

📌 Important: Reducers must return **new state**, not mutate the existing one!

> 💡 AI Prompt: "When using Redux, why do I need to return new state from a reducer?"

---

### 🧠 Step 4: Provide the Store to the App
Wrap your app with the Redux provider in `index.js`:
```js
import { Provider } from 'react-redux'
import { store } from './redux/store'

<Provider store={store}>
  <App />
</Provider>
```

The provider enables the `useSelector()` and `useDisptach()` hooks for all components in App. 

---

### 🧠 Step 5: Dispatch from a Component
In `ProductList.js`:
```js
import { useDispatch } from 'react-redux'

const dispatch = useDispatch()

function addToCart(item) {
  // Dispatch an action
  dispatch({ type: 'ADD_ITEM', payload: item })
}
```

> 💡 AI Prompt: "How do I structure Redux in a React app with multiple reducers?"

---

### 🧠 Step 6: Read State with `useSelector()`
In `ShoppingCart.js`:
```js
import { useSelector } from 'react-redux'

// Access state inside of a component
const cartItems = useSelector(state => state.cart)

return (
  <ul>
    {cartItems.map((item, i) => (
      <li key={i}>{item.name}</li>
    ))}
  </ul>
)
```

> 💡 AI Prompt: "Why isn't my Redux store updating when I dispatch an action?"

---

## 🧪 Challenge Prompts

### Challenge 1
Add an item to the cart when a button is clicked.

### Challenge 2
Display all items in the cart using `useSelector()`.

### Challenge 3
Avoid duplicate items. If an item exists, increase the quantity.

### Challenge 4
Calculate and display the total price using `reduce()`.

### Challenge 5
Use a reducer to group cart items by ID and track quantity:
```js
case 'ADD_ITEM':
  const found = state.find(item => item.id === action.payload.id)
  if (found) {
    return state.map(item => item.id === action.payload.id
      ? { ...item, quantity: item.quantity + 1 }
      : item)
  }
  return [...state, { ...action.payload, quantity: 1 }]
```

> 💡 AI Prompt: "How do I update quantity in a Redux reducer?"

---

## 🧠 Recap: Key Redux Concepts
| Concept     | Description |
|-------------|-------------|
| **Action**  | A plain object with a `type` and optional `payload` |
| **Reducer** | A pure function that returns new state |
| **Store**   | The single global state container |
| **Dispatch**| Sends an action to the reducer |
| **Selector**| Reads from the store |

---

## 📚 Further Reading
- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [React Redux Quick Start](https://react-redux.js.org/introduction/quick-start)
