# React Lab 3 

The goal of this lab is to create an order page for a Pizza. Take a look at the picture below and the animated Gif to get an idea of what the app should look like and how it should work. 

![lab 3 image](images/lab-3.png)

You will create a form with an input and some check boxes. As you enter information and select the check boxes the page should display a summary of the order on the right side. 

![lab 3 gif](images/lab-3.gif)

## Get started 

- Create a new React App with `npx create-react-app`
- start your app with `npm start`

## Setting up the form

Don't over think this problem! Start by creating the form elements. There is an input, four check boxes, and a button. 

The check boxes should be arranged with a label like this: 

```HTML
<label>
	<input type="checkbox">
	Peperoni
</label>
```

## Using state

Each form element should have a state variable that tracks it's value. 

Start by importing `useState`:

`import { useState } from 'react'`

Then define state for each element. Name will be a string and the checkboxes will be booleans. Define state at the top of your component. 

```JS
const [name, setName] = useState("")
const [peperoni, setPeperoni] = useState(false)
...
```

Connect your components to your state variables. For the checkboxes your state variable will be applied to the `checked property` like this:

```JS
<label>
  <input
    type="checkbox"
    checked={peperoni}
    onChange={() => setPeperoni(!peperoni)}
  />
  Peperoni
</label>
```

Notice the value `peperoni` is assigned to the `checked` property. Noitce that `onChange` calls the setter function `setPeperoni` with the value `!peperoni` which flips the value from true to false or from false to true. 

## Use conditional rendering

Use conditional rendering to display state of the form on the left in the summary area. 

For the name you can display the string. For the ingredient values these are booleans you'll need to use one of the conditional rendering patterns. Here is a snippet of code: 

```JS
{peperoni && <div>Pepperoni</div>}
```

Here the `&&` is the and operator. It says the expression is true only if both the left and right side are both true. In this case the left is a boolean and the right side is a component. In JavaScript only certain values are false and all other values are true! So the component on the right is alsways considered true. 

In this arrangement if the value on the left is true then React will display the value on the right. If the value on the left is false React doesn't display anything. Weird, but that's how it works! 

But why does the component get displayed? In JS if both sides of the `&&` are truthy, JS returns the right hand operator! I know it sounds crazy, but that's how it works! Try this: 

```JS
console.log(1 && 2) // logs: 2
console.log(0 && 3) // logs: 0
console.log(1 && 2 && 0 && 3) // logs: 0
```
If both operands are truthy `&&` returns the last operand. If one of the operands is falsy `&&` returns the first falsy operand it encounters! 

Read more: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND

That begs the question what is truthy and what is falsy? 

truthy: https://developer.mozilla.org/en-US/docs/Glossary/Truthy
false: https://developer.mozilla.org/en-US/docs/Glossary/Falsy

