# ACS 3330 - Assignment 1: React Product List

## Overview
This assignment introduces **React components**, **functional programming with `map`, `filter`, and `reduce`**, and **state management**. You will create a product listing app that displays categories and products dynamically. As you progress, you will modularize your code, handle interactions, and practice writing reusable components.

---

## Learning Objectives

- Use `map`, `filter`, and `reduce` for data transformations.
- Render collections of React components dynamically.
- Pass and manage props to create reusable components.
- Manage state to create interactive UI.
- Use `import` and `export` to manage modules.

---

## Setup: Creating Your React Project
1. **Ensure you have Node.js installed.** If not, download it from [nodejs.org](https://nodejs.org/).
2. **Create your React app:**
   ```sh
   npx create-react-app react-product-list
   cd react-product-list
   npm start
   ```
3. **Copy the [`data.json`](./data.json) file into your `src` directory.**
4. **Create a new module named `data.js`** in `src`. This will be used to process and export your product data.
5. **Import the JSON data into your module:**
   ```js
   import data from './data.json';
   export default data;
   ```

This file `data.js` will provide data to rest of your react app. Import `data.json` and extract and transform the data it supplies, and then export the results. 

---

## Part 1: Understanding Functional Programming with Arrays

Here is an [awesome Tweet](https://twitter.com/steveluscher/status/741089564329054208?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E741089564329054208&ref_url=https%3A%2F%2Fwww.freecodecamp.org%2Fnews%2Fjavascript-map-reduce-and-filter-explained-with-examples%2F) that sums up Map, Filter, and Reduce
 
 > map/filter/reduce in a tweet:
 >
 > `[🌽, 🐮, 🐔].map(cook)` ➡ `[🍿, 🍔, 🍳]`
 >
 > `[🍿, 🍔, 🍳].filter(isVegetarian)` ➡ `[🍿, 🍳]`
 >
 > `[🍿, 🍳].reduce(eat)` ➡ `💩`

 To put that into words: 
 - `map`: transforms an array of one type into an array of another type. 
 - `filter`: filters an array, returning an array of some, all, or none of the original elements. 
 - `reduce`: combines all of the elements of an array into a single value. 

### 1.1 Using `map` to Extract Categories
Transform the product data into an array of category names. You should have an array that looks something like this: 

```js
[
   "Movies", 
   "Grocery", 
   "Baby", 
   "Movies",
   ... 
 ]
 ```

🔹 **Check your work with an AI Review Prompt:** *"Does my **`map`** function efficiently extract categories? Are there any better approaches?"*

### 1.2 Filtering Unique Categories
Ensure each category appears only once. Start with the array of category names you want to remove all duplicate names. One method you might try is a [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set). A `Set` is like an array but all values are unique. 

You should get an array something like: 

```js
[
   "Movies", 
   "Grocery", 
   "Baby", 
   ... 
]
```

There should be no duplicate names! 

🔹 **Check your work with an AI Review Prompt:** *"Is using **`Set`** the best way to filter unique values? What other methods could I use?"*

### 1.3 Counting Products per Category with **`reduce`**
Create an object that maps each category to the number of products in it. The output should look something like this: 

```JS
{ 
  Movies: 6, 
  Grocery: 4, 
  Baby: 7, ...
  ...
}
```

This an object, each key is one of the category names, and the value is the number of times that category appears in the data. 

🔹 **AI Review Prompt:** *"Is my **`reduce`** function well-structured? Can it be optimized?"*

### 1.4 Create a list of objects with name and count. 
Similar to the previous challenge but, with a different output. The output here should look like this: 

```JS
 [
   {name: "Movies", count: 6}, 
   {name: "Grocery", count: 4}, 
   {name: "Baby", count: 7},
   ...
 ]
 ```

Note, this time output is an array of objects. Each object has properties of `name` and `count`.

🔹 **AI Review Prompt:** *"Review my code. Does it follow best practices?"*

### 1.5 Export your data
Export all of the data you collected from `data.js` so it can be used in the app you will be creating in the next steps. 

### 💡 Stretch Challenges

#### 🔹 Stretch Challenge 1: Use `map` to Create a Price List
Create an array that contains the names of all products along with their prices formatted as `'$XX.XX'`.

✅ **Goal:** Display a formatted price list.
🔹 **AI Review Prompt:** *"Is my formatting correct? How could I make it more readable?"*

#### 🔹 Stretch Challenge 2: Use `filter` to Find Expensive Products
Create a new array containing only products that cost more than \$50.

✅ **Goal:** List all expensive products in the console.
🔹 **AI Review Prompt:** *"Does my filter condition capture all expensive products? How can I improve it?"*

#### 🔹 Stretch Challenge 3: Use `reduce` to Calculate Total Inventory Value
Find the total value of all products by multiplying each product's price by its available units and summing the results.

✅ **Goal:** Display the total inventory value.
🔹 **AI Review Prompt:** *"Is my reduce function handling all edge cases? How can I optimize performance?"*

#### 🔹 Stretch Challenge 4: Find the total price of products in each category
Find the total price of all products in each catefory. 

✅ **Goal:** Log the list to the console. 
🔹 **AI Review Prompt:** *"Evaluate my code and give me feed back on this solution."*

---

## Part 2: Creating React Components
These next challenges will build the user interface of your application. Imagine this is a store or a tool for trackng inventory. When you are finished your app will display a list of buttons one for each category, and a button to display all categories.

Import the list if unique categories from `data.js`.

Below the category buttons you will display all of the products, showing their name, price, category, rating, etc. 

Style your button component. 

### 2.1 Create a `CategoryButton` Component
Each category should be displayed as a button. Create a component for the category button, and pass the name of the category as a prop. 

### 2.2 Create a `ProductCard` Component
Each product should display its **name, category, price, rating, description, and units.**.

Style your ProductCard component. 

### Code Review with AI
Use AI to give yourself a code review, spot errors, and suggest improvements. 

🔹 **AI Review Prompt:** *"Evaluate this React Component, give me a code review and suggest improvements."*

---

## Part 3: Managing State and Interactivity
The goal of this section is to use the category buttons to display only products that match the selected category. 

You should use another button, or alternative mechanism, to display all products in all categories. For example, a button labeled "Show All". 

### 3.1 Store the Selected Category in State
Create a state variable to track the selected category. This variable will hold the name of the currently selected category.

### 3.2 Filter Products Based on Selected Category
Use the state variable to filter the list of products so that only the products matching the currently selected category are displayed. 

🔹 **AI Review Prompt:** *"Evaluate this React Component, give me a code review and suggest improvements."*

---

## Part 4: Enhancing User Experience

### 4.1 Highlight the Active Category
Style the currently selected category button so users can tell which category is selected. 

### 4.2 Show Total Product Count
Display the total number of products and categories.

#### 🔹 Stretch Challenge 1: Display the total number of units
Add the total number of units for all products and display that at the top or bottom of the page. 

#### 🔹 Stretch Challenge 2: Display the total price if inventory
Find the cost of your total inventory. For each product multiply the number of units by the price, total this for all products. 

#### 🔹 Stretch Challenge 3: Dynamic totals
Modify your code so the total units and total price changes with products displayed for the currently selected category.  

**Give yourself an AI code review!**

---

## Submission

Post your project to Github and submit your  work to GradeScope.

---

## Final Thoughts

By completing this assignment, you will gain hands-on experience with **React, state management, functional programming, and modular code organization**. Utilize AI prompts to refine your work and enhance your problem-solving skills. 🚀



