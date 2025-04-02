# 🌦️ ACS 3330 – Assignment: React Weather App with OpenWeatherMap API

## 📝 Description
In this assignment, you’ll build a React app that connects to the **OpenWeatherMap API** and displays real-time weather data for a given zip code. You’ll use the **controlled component pattern** for handling form input, and apply **conditional rendering** to manage asynchronous states (loading, errors, data display).

**Note!** I understand that you may have built this app or a similar app in the past. If that's the case, you can:

- Make an even better weather app! Look at the stretch challenges below. 
- Use one of the other OpenWeatherMap API's, for example:  Hourly Forecast 4 days, 3-hour Forecast 5 days, Forecast 16 days, etc. 
- Chose another alternative API. 

---

## 🎯 Learning Goals
- Understand and apply the **Controlled Component Pattern** in React
- Use **asynchronous fetch calls** to load data from an API
- Apply **conditional rendering patterns** to build dynamic interfaces

---

## 🚀 Getting Started
Create a new "React" project using your favorite starter code: CRA, Vite, etc. 

You also need an account with https://openweathermap.org. Once you have registered your account, find your API Key, you'llneed this later. 

---

## 📦 Video tutorials
Follow along with the videos starting at **Lesson 03** in this playlist:
📽️ https://www.youtube.com/playlist?list=PLoN_ejT35AEhmWcDTI6M--ha_E4lTyAtx

Each challenge below builds on the previous one.

---

## 🔧 Challenges

### 1️⃣ Create a Default React App
- Scaffold a new project with your favorite React starter code (CRA, Vite, etc.)

### 2️⃣ Register with OpenWeatherMap
- Create a free account at https://openweathermap.org/
- Get your API key

### 3️⃣ Create a Weather Component
- Add a `Weather` component and render a simple header
- Replace default `App.js` content with your component

### 4️⃣ Controlled Input Form
- Add a form to enter a **zip code**
- Use state to control the form input (controlled component pattern)
- Display the current zip code below the form for testing

💡 **Stretch Goals**
- Add placeholder text and a `pattern` to restrict input to 5 digits
- Add a dropdown or radio buttons to select temperature units (metric, imperial, standard)

🤖 **AI Research Prompts**
- "What is the controlled component pattern in React?"
- "How do I validate input using HTML pattern attribute?"

### 5️⃣ Fetch Weather Data
- Use `fetch()` to request data based on the entered zip
- To get started, load the weather data from OpenWeatherMap, and display it in the console, or display a value, like temperature, in your page.

💡 **Stretch Goals**
- Use `async/await`
- Handle network errors with `.catch()` or `try/catch`

🤖 **AI Research Prompts**
- "Tell me about JS fetch(), give me a beginner, intermediate, and advanced explanation."
- "Explain JS Promise to me."
- "Tell me about React's useEffect hook, give a beginner, intermediate, and advanced description."
- "How does fetch work with async/await in React?"
- "How do I handle errors when fetching data in React?"

**Important!** After writing your solution to solve this problem, ask the AI to review your code. 

- "Review my code and give me your feedback. <paste your code here>"

### 6️⃣ Display Weather with a Subcomponent
- Move display logic into a `DisplayWeather` component
- Pass weather data as props

💡 **Stretch Goal:** Use `cod === 200` to verify successful response, otherwise show an error message.

🤖 **AI Research Prompts**
- "How do I pass props between components in React?"
- "What does the cod field in OpenWeatherMap API response mean?"
- "What COD codes does OpenWeathermap use? What do these code mean?"

### 7️⃣ Conditional Rendering
- Show different views depending on the app state:
  - No data yet
  - Error from the server
  - Weather data loaded and ready

🧠 [React Conditional Rendering](https://reactjs.org/docs/conditional-rendering.html)

🤖 **AI Research Prompts**
- "What are the different patterns for conditional rendering in React?"
- "How do I show a loading message while waiting for data in React?"

---

## 🎨 Stretch Challenges
Choose any of the challenges below. 

- Display more data: humidity, pressure, wind speed
- Style the app with CSS or a CSS framework. Do your best to make your weather app look amazing! 
  - Style the page and elements based on the weatherdata, for example: show change the background color to gray when it's raining, or dark blue at night. Get creative! 
- Show a weather icon (e.g. `data.weather[0].icon`)
- Add a button for **geolocation-based weather**
  - Use `navigator.geolocation.getCurrentPosition()`
  - Fetch data using OpenWeatherMap’s geolocation API
- Use one of the other APIs supplied by OpenWeatherMap to display: 
  - Hourly Forecast 4 days
  - 3-hour Forecast 5 days
  - Forecast 16 days

🔐 Note: For geolocation to work, in a React app you need to run in HTTPS mode:
```bash
HTTPS=true npm start
```
Check the docs of your starter code to see how to handle HTTPS. 

💡 **Additional Stretch Challenge Ideas**
- Allow users to search by city name or coordinates (lat/lon)
- Display weather forecast for multiple days
- Add loading animation while data is being fetched
- Support saving a list of favorite zip codes and toggling between them
- Use local storage to persist the last searched zip code

---

## 🧰 Assessment Rubric
| Category              | Does Not Meet             | Meets Expectations                                       | Exceeds Expectations                                                                 |
|-----------------------|---------------------------|----------------------------------------------------------|--------------------------------------------------------------------------------------|
| **Completed**         | Did not complete          | Completed challenges 1–3                                | Completed challenges 4+                                                             |
| **Functionality**     | Not functional            | Displays weather and handles errors                     | Shows temp, description, and atmospheric conditions with CSS styling                |
| **Code Quality**      | Inconsistent formatting   | Clean, readable code with consistent formatting         | Well-commented with expressive variable and function names                          |
| **Architecture**      | All code in App.js        | 3 components used                                        | 5+ specialized components handling props and formatting                             |
| **Work Ethic**        | No commit history         | Initial and mid-point commits                           | 3+ hours of thoughtful commits, documenting decisions and progress                  |

---

🎉 Good luck and have fun building your weather app!

