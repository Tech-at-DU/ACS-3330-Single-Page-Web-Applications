# 🔄 React + Server with React Query

## 📝 Overview
In this lesson, you’ll connect a React frontend to a custom backend server built with Express or Flask. You’ll use **React Query** to handle data fetching, caching, and synchronization between client and server.

React Query simplifies the process of loading data into a React application. Instead of managing loading/error/data states manually, React Query handles this for you with just a few hooks.

You’ll start with a working server and build a small frontend that fetches data from your custom API.

---

## 🚀 Why React Needs a Backend
While React is great at managing components and state, it does not provide a way to store data. That’s where a backend server comes in. Whether it’s built with **Express (Node.js)** or **Flask (Python)**, your backend serves data and performs logic React can’t handle alone.

Your React app makes HTTP requests ( `GET`, `POST`, `PUT`, `DELETE`) to interact with this backend. For example:
```bash
GET /sfpopos → [{ title: "Union Square" }, { title: "Yerba Buena Gardens" }]
```

---

## 📦 What is React Query?
React Query is a powerful data-fetching library for React. It manages:
- Loading and error states
- Caching and re-fetching
- Background updates

Use React Query to replace `fetch` and `useEffect`. 

### Install it:
```bash
npm install @tanstack/react-query
```

---

## 🧠 Setting Up React Query
Wrap your app in a `QueryClientProvider` so you can use hooks like `useQuery`.

```jsx
// index.js
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
)
```

---

## 🔍 Using `useQuery` to Load Data
React Query’s main hook is `useQuery`. It takes a **query key** and a **fetching function**:

```jsx
const { isLoading, error, data } = useQuery({
  queryKey: ['sfpopos'],
  queryFn: () => fetch('/sfpopos').then(res => res.json())
})

if (isLoading) return <p>Loading...</p>
if (error) return <p>Error loading data: {error.message}</p>

return (
  <div>
    {data.map(item => <p key={item.title}>{item.title}</p>)}
  </div>
)
```

---

## 💡 Understanding Query Keys and Caching
React Query uses the `queryKey` to cache and manage requests.
- If the key doesn’t change, React Query returns cached data
- If the key changes, it re-fetches the data

This pattern makes your UI responsive and efficient.

---

## 🧪 Using react Query in your Custom Project
If you decide to create a custom project that uses a server or fetches data from a web API, I recommend you use React Query.

### 🔧 Backend Setup
The following link is a GitHub repo that contains projects that implement a Express, Flash, and MongoDB servers. There is also an example React Client that loads data from the example servers.

https://github.com/Tech-at-DU/React-Express-Tutorial

---

## 📚 Resources
- [React Query Docs](https://tanstack.com/query/latest/docs/framework/react/overview)
- [Express API Example Repo](https://github.com/Tech-at-DU/express-api-example)
- [Flask API Example Repo](https://github.com/Tech-at-DU/flask-api-example)

---

🎉 Now go build something awesome! Let your frontend talk to your backend!
