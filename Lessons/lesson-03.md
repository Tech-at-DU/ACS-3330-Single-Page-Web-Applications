# Lesson 3 — Shopping Cart State with `useReducer` (2:45 Session)

## Overview

In the last lesson you built a product list page in React.

In this lesson, the main problem is no longer rendering products. The real problem is deciding how to **represent and manage shopping cart state**.

You will work in pairs to design a cart, build it, and discuss the trade-offs in different solutions.

This lesson also revisits hooks. A shopping cart is a good example of when `useReducer()` can be a better fit than `useState()` because the cart has a clear set of actions:

- add an item
- remove an item
- increment quantity
- decrement quantity
- clear the cart

---

## Learning Goals

By the end of this lesson you should be able to:

- explain why state shape matters in a React application
- use `useReducer()` to manage shopping cart state
- describe cart updates as actions
- update arrays and objects in state without mutation
- distinguish stored state from derived values
- calculate totals from cart data using `reduce()`

---

## Essential Question

**How should we represent and manage cart state in a React app?**

Keep this question in mind throughout the class.

---

## Before You Start

You should already have:

- a product list page from the previous assignment
- products rendering from an array
- a product card or product row component
- basic familiarity with hooks
- previous experience using a reducer from the ShopKeeper assignment

---

## Today’s Build Plan

By the end of class, your app should be able to:

1. render a product list
2. add products to a cart
3. store cart data with `useReducer()`
4. display cart items with quantities
5. calculate derived values like total items and total cost
6. explain why your cart state is shaped the way it is

---

# Part 1 — Opening Question and Design Setup (15 min)

## Short Discussion

Today’s lesson is about **state design**.

Before you write code, answer these questions with a partner:

1. Where should `shoppingCart` state live?
2. What should one cart item look like?
3. What should happen when the same product is added twice?

Write down your answers before you begin coding.

---

## Two Possible Cart Shapes

### Option A — Repeated Products

```js
[
  { id: 1, name: 'Zoolab', price: 12.07 },
  { id: 1, name: 'Zoolab', price: 12.07 },
  { id: 2, name: 'Opela', price: 29.83 }
]
```

### Option B — Grouped Cart Items with Quantity

```js
[
  { id: 1, name: 'Zoolab', price: 12.07, qty: 2 },
  { id: 2, name: 'Opela', price: 29.83, qty: 1 }
]
```

## Quick Write (Pairs)

Discuss:

- Which shape seems easier to render?
- Which shape seems easier to update?
- Which shape will you use today, and why?

For this lesson, **Option B is recommended** because it makes quantity and totals easier to manage.

---

# Part 2 — Why `useReducer()` Fits This Problem (15 min)

## Review

A shopping cart is not just a single value.

It has **rules** and **actions**.

Examples:

- add a product
- remove a product
- increase quantity
- decrease quantity
- clear the cart

When state changes follow named actions, `useReducer()` is often clearer than several `useState()` updates scattered across components.

---

## The Idea

With `useReducer()`, instead of writing:

```js
setShoppingCart(...)
```

You describe what happened:

```js
dispatch({ type: 'add', product })
```

That means:

- the UI dispatches actions
- the reducer decides how state changes
- the update logic stays in one place

---

## Reducer Shape

A reducer receives:

- the current state
- an action object

and returns:

- the next state

```js
function cartReducer(cart, action) {
  switch (action.type) {
    case 'add':
      // return updated cart
    default:
      return cart
  }
}
```

---

# Part 3 — Core Challenge: Build the Cart Reducer (30 min)

## Your Task

Use `useReducer()` to manage `shoppingCart`.

Start with this setup:

```js
import { useReducer } from 'react'
```

```js
const [shoppingCart, dispatch] = useReducer(cartReducer, [])
```

---

## Recommended Cart Item Shape

```js
{
  id: 1,
  name: 'Zoolab',
  price: 12.07,
  qty: 2
}
```

---

## Start with These Actions

At minimum, your reducer should support:

- `add`
- `remove`

If your group finishes early, add:

- `increment`
- `decrement`
- `clear`

---

## Example Reducer

Use this example to understand the pattern. Do not just copy it without reading it.

```js
function cartReducer(cart, action) {
  switch (action.type) {
    case 'add': {
      const product = action.product
      const existingItem = cart.find(item => item.id === product.id)

      if (existingItem) {
        return cart.map(item =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      }

      return [...cart, { ...product, qty: 1 }]
    }

    case 'remove':
      return cart.filter(item => item.id !== action.id)

    case 'increment':
      return cart.map(item =>
        item.id === action.id
          ? { ...item, qty: item.qty + 1 }
          : item
      )

    case 'decrement':
      return cart
        .map(item =>
          item.id === action.id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter(item => item.qty > 0)

    case 'clear':
      return []

    default:
      return cart
  }
}
```

---

## Checkpoint 1

By the end of this section, you should have:

- a `cartReducer()` function
- `useReducer()` set up in your component
- an `Add to Cart` button that dispatches an action

---

# Part 4 — Connect the Product List to the Cart (25 min)

## Add to Cart Button

Each product should render:

- name
- price
- button

Example:

```js
<button onClick={() => dispatch({ type: 'add', product })}>
  Add to Cart
</button>
```

---

## Build Block

Work in pairs.

Make your product list dispatch `add` actions to the reducer.

Your goal is simple:

- click a button
- update the cart
- render the result

Do not worry about styling yet.

---

## Checkpoint 2

You should now be able to:

- click **Add to Cart**
- see an item appear in the cart
- add the same item more than once
- confirm that quantity updates correctly

---

# Part 5 — Render the Cart (20 min)

## Cart Component

Create a `Cart` component and pass in:

- `shoppingCart`
- `dispatch`

A basic cart row might display:

```text
Zoolab $12.07 qty: 2
Opela $29.83 qty: 1
```

---

## Required Output

Display at least:

- item name
- item price
- item quantity

---

## Good Extension

Add buttons for:

- remove
- increment
- decrement

Examples:

```js
<button onClick={() => dispatch({ type: 'increment', id: item.id })}>+</button>
<button onClick={() => dispatch({ type: 'decrement', id: item.id })}>-</button>
<button onClick={() => dispatch({ type: 'remove', id: item.id })}>Remove</button>
```

---

# Part 6 — Derived State: Totals and Counts (20 min)

## Key Idea

Not every value belongs in state.

These values can usually be **calculated from the cart**:

- total number of items
- total cost
- row total for each item

That means you often do **not** need state like:

```js
const [totalCost, setTotalCost] = useState(0)
```

Instead, calculate totals from `shoppingCart`.

---

## Example

```js
const totalItems = shoppingCart.reduce((acc, item) => acc + item.qty, 0)

const totalCost = shoppingCart.reduce(
  (acc, item) => acc + item.price * item.qty,
  0
)
```

---

## Your Task

Add:

- total item count
- total cart cost

Stretch:

- row totals for each product

Example:

```text
Zoolab $12.07 qty: 2 total: $24.14
Opela $29.83 qty: 3 total: $89.49

Total items: 5
Total cost: $113.63
```

---

## Checkpoint 3

You should now have:

- cart items rendering
- quantities visible
- total items calculated
- total cost calculated

---

# Part 7 — Common Mistakes to Watch For (10 min)

## Mistake 1 — Mutating State

Bad:

```js
shoppingCart.push(product)
return shoppingCart
```

Why this is a problem:

- it mutates existing state
- React expects a new value to be returned

---

## Mistake 2 — Storing Derived Values in State

Bad idea unless there is a strong reason:

```js
const [totalCost, setTotalCost] = useState(0)
```

If `totalCost` can be calculated from `shoppingCart`, calculate it instead.

---

## Mistake 3 — Reducer Logic Spread Across Components

If your update rules are in 3 different components, the code becomes harder to follow.

Try to keep cart update logic inside the reducer.

---

## Mistake 4 — Weak State Shape

If each cart item does not have a `qty`, then grouped cart output becomes harder.

State shape affects everything that comes after it.

---

# Part 8 — Work Time and Discussion Prep (20 min)

## Final Build Time

Use this time to:

- clean up your reducer
- improve cart rendering
- add missing actions
- make sure totals are correct
- prepare to explain your design

---

## Prepare to Discuss

Before the end of class, be ready to answer:

1. What does one cart item look like in your app?
2. Which actions did your reducer support?
3. What values did you store in state?
4. What values did you calculate from state?
5. What part of your solution became harder than expected?

---

# Part 9 — End-of-Class Discussion (10 min)

We will compare solutions as a class.

Focus on:

- state shape
- reducer design
- action names
- trade-offs
- bugs and fixes

The goal is not to find one perfect answer.

The goal is to understand how your state design affected the rest of the app.

---

## Definition of Done

You are in good shape if your app:

- uses `useReducer()` for cart state
- adds items to the cart
- updates quantity when an item is added again
- renders cart items clearly
- calculates total items and total cost
- is ready to explain your state design

---

## Optional Stretch Challenges

If you finish early, try one of these:

### Stretch 1 — Clear Cart

Add a button:

```js
dispatch({ type: 'clear' })
```

---

### Stretch 2 — Decrement Quantity

When quantity reaches 0, remove the item.

---

### Stretch 3 — Inventory Updates

When a product is added to the cart, reduce the number of available units in inventory.

This is harder because now you have **two related pieces of state**:

- inventory
- shopping cart

Do not attempt this until your cart works.

---

## Reflection

Write a short answer to these questions:

1. Why is `useReducer()` a good fit for a shopping cart?
2. What is the difference between stored state and derived state?
3. What did your cart state look like, and why?
4. What bug or design problem did you run into?

---

## Reminder

A reducer is just a function.

The important question is not:

> “Did I use a hook?”

The important question is:

> “Did I choose a state shape and update pattern that makes the app easier to understand?”
