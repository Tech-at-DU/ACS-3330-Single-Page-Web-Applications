# Lesson 10: React Query

## Overview

In this lesson you will use React Query to fetch data from a public API. You will:

- Understand when to use React Query versus `useEffect` or `createAsyncThunk`
- Set up a `QueryClientProvider`
- Use `useQuery` to fetch, cache, and display data
- Handle loading, error, and empty states
- Connect this to your Assignment 4 API choice

---

## Milestone 1 is due Monday

Assignment 4 Milestone 1 requires: project idea decided, API chosen, Vite project created, global store set up.

Use today's class to get ahead of that. If you experiment with your actual Assignment 4 API during the lab, you will leave class with Milestone 1 nearly complete.

---

## Part 1 — How Should You Fetch Data? (15 min)

You have three options for async data fetching in a React app. They are not interchangeable.

| Approach | Best for | Data lives in |
|---|---|---|
| `useEffect` + `fetch` | Simple one-off fetches, small apps | Component state |
| `createAsyncThunk` | API data that belongs in your Redux store, shared across many components | Redux store |
| `useQuery` (React Query) | Any API data — handles caching, re-fetching, loading/error states automatically | React Query cache |

**The key distinction:** React Query manages **server state** — data that lives on a server and needs to stay in sync. Redux and Zustand manage **client state** — data your app creates and owns.

These can coexist. A common pattern for Assignment 4:
- Zustand or RTK for your app's own state (filters, cart, UI)
- React Query for data fetched from an external API

**Zustand async** is also worth knowing. If you are using Zustand and want to keep all your logic in one place, you can fetch inside a store action directly:

```js
const useStore = create((set) => ({
  data: null,
  fetchData: async () => {
    const res = await fetch('https://api.example.com/data')
    const data = await res.json()
    set({ data })
  }
}))
```

No middleware or special setup needed. Simple, but gives you none of React Query's caching or automatic re-fetching.

> 💡 AI Prompt: "What is the difference between server state and client state in React?"

> 💡 AI Prompt: "When should I use React Query instead of useEffect to fetch data?"

---

## Part 2 — Setup (15 min)

Install React Query:

```bash
npm install @tanstack/react-query
```

Wrap your app in a `QueryClientProvider` in `main.jsx`:

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.jsx'
import './index.css'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
)
```

The `QueryClientProvider` works the same way as Redux's `Provider` — it makes React Query available to every component in the tree.

> 💡 AI Prompt: "What does QueryClient do in React Query?"

---

## Part 3 — Demo: useQuery (20 min)

`useQuery` is React Query's core hook. It takes a query key and a fetch function, and returns the current state of the request.

```jsx
import { useQuery } from '@tanstack/react-query'

function CharacterList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['characters'],
    queryFn: () =>
      fetch('https://rickandmortyapi.com/api/character')
        .then(res => res.json())
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  if (!data) return <p>No data found.</p>

  return (
    <ul>
      {data.results.map(character => (
        <li key={character.id}>
          <img src={character.image} alt={character.name} width={50} />
          {character.name} — {character.status}
        </li>
      ))}
    </ul>
  )
}
```

### What each return value means

| Value | Type | Description |
|---|---|---|
| `data` | any | The resolved value from your fetch function |
| `isLoading` | boolean | True while the first fetch is in progress |
| `error` | Error or null | Set if the fetch function throws |
| `isFetching` | boolean | True any time a fetch is in progress, including re-fetches |

### Query Keys

The `queryKey` is how React Query identifies and caches a request. If two components use the same key, they share one request — no duplicate fetches.

```js
queryKey: ['characters']        // fetch once, cache it
queryKey: ['character', id]     // re-fetch whenever id changes
queryKey: ['characters', page]  // re-fetch whenever page changes
```

When the key changes, React Query automatically re-runs the fetch. This is how you implement search or pagination without managing the fetch lifecycle yourself.

> 💡 AI Prompt: "How do React Query query keys work and why are they important?"

---

## Break (15 min)

---

## Part 4 — Lab: Fetch from a Public API (60 min)

Pick one of the APIs below — or use the API you are planning for Assignment 4.

Build a small React app that:

1. Fetches a list of items from the API using `useQuery`
2. Displays the results — include at least a name or title and one other field
3. Handles all three states: loading, error, and empty

**Suggested APIs — no authentication required:**

| API | Endpoint | Notes |
|---|---|---|
| Rick and Morty | `https://rickandmortyapi.com/api/character` | Results in `data.results`, includes image URLs |
| PokeAPI | `https://pokeapi.co/api/v2/pokemon?limit=20` | Results in `data.results`, name and detail URL per item |
| REST Countries | `https://restcountries.com/v3.1/region/europe?fields=name,capital,population` | Array at top level, name is `item.name.common` |
| Open Library | `https://openlibrary.org/search.json?subject=javascript&limit=10` | Results in `data.docs`, change subject to match your interest |

If you are using your own Assignment 4 API: find a public endpoint that returns a list and go.

### Tips

- Start with `console.log(data)` to see the shape of the response before trying to render it
- API responses are often nested — `data.results`, `data.docs`, `data[0].name.common`
- Deliberately break your URL to confirm your error state works
- Check your loading state by adding a `staleTime: 0` option and refreshing

### Stretch

- Add a search input that changes the query key and re-fetches with the new term
- Use `isFetching` to show a subtle indicator during re-fetches without hiding existing results
- Display how many total results exist using metadata from the response

> 💡 AI Prompt: "How do I add search to a React Query useQuery hook?"

---

## Part 5 — Share Out (20 min)

Show the group what you built. Cover:

- Which API you used and what it returns
- How you handled the loading and error states
- Anything that surprised you about the response shape

---

## Connecting to Assignment 4 (10 min)

If you used your Assignment 4 API today, you have a working proof of concept. For Milestone 1 on Monday you need:

- [ ] Project idea decided
- [ ] API chosen and confirmed working
- [ ] Vite project created
- [ ] Global store set up with at least one piece of state

The API is done. The remaining piece is the store — wire in Zustand or RTK before Monday.

If you are still deciding on an API, the question to ask is: does this API return data I can do something interesting with? Filtering, searching, combining with user state — if yes, it is probably a good fit.

---

## Key Concepts

| Concept | Description |
|---|---|
| `useQuery` | Fetches data, manages loading/error/cache automatically |
| `queryKey` | Identifies the request — changing it triggers a re-fetch |
| `queryFn` | The function that does the actual fetching |
| `isLoading` | True during the initial fetch |
| `error` | Set when the fetch function throws |
| Server state | Data owned by a server, fetched and kept in sync |
| Client state | Data owned by your app — Redux/Zustand territory |

---

## Further Reading

- [React Query Docs](https://tanstack.com/query/latest/docs/framework/react/overview)
- [Practical React Query](https://tkdodo.eu/blog/practical-react-query) — the best guide beyond the official docs
- [Backend starter repos](https://github.com/Tech-at-DU/React-Express-Tutorial) — Express, Flask, and MongoDB examples if you want a custom backend for Assignment 4
