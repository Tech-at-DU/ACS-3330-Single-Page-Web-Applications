# Tailwind

Tailwind is a CSS compiler framework. It is very popular and has a lot to recommend it. It may not be a fit for every project. 

You should all give it a try and test it out. You may grow to like it! 

Tailwind works on the atomic or utility classes. These classes describe CSS styles in a sort of shorthand. Tailwind uses a process that scans your HTML for class names and creates a stylesheet from what it finds. 

Pros and cons of Tailwind: 

- Uses class names that bloat your HTML
- Write less code than you might write in standard CSS
- You don't have to make up class names and keep track of these
- CSS is generated so there is no unused CSS
- Takes a little bit of setup

## Getting started 

Create a folder to work. This example will create a simple HTML file that uses Tailwind. 

Check out the docs here: https://tailwindcss.com/docs/installation

Install Tailwind:

```
npm install -D tailwindcss
npx tailwindcss init
```

Open `tailwind.config.js` and edit `content` to match:

```JS
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js}"],
	theme: {
		extend: {},
	},
	plugins: [],
}
```

Add a new file: `src/input.css`

Add the following to input CSS: 

```CSS
@tailwind base;
@tailwind components;
@tailwind utilities;
```

These lines import the base styles from Tailwind. 

Add an HTML file with the boilerplate HTML: `dist/index.html`. Add this line to load your CSS in the head of the document: 

```HTML
<link href="output.css" rel="stylesheet">
```

Run:

```
npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
```
Notice this line is reading `src/input.css` and outputting `dist/output.css`. 

The `--watch` flag compiles and rewrites the output.css every time you save your other files. 

If you are using Liveserver in VS Code you go to the liveserver settings and and check the box: Full Reload. Live server doesn't refresh CSS when reloading this will force it to also reload CSS, so that you see changes from Tailwind. 

Install the Tailwind extension for VS Code. Search for it in extensions. This will give you code hints and make it a lot faster and easier to work with. 

Style the body tag. Tailwind works via class names. Each class represents one or more CSS styles. The name also includes the value. 


Try this: 

```HTML
<body class="bg-slate-400 text-slate-200">
```

- `bg-slate-700` sets the background color to slate gray. The number sets the value. Low numbers are lighter and high numbers are darker. Try bg-slate-100 and bg-slate-900
- `text-slate-200` sets the color of the text. 

If you have the VS code extension installed you will see a color preview with the code hints. 

Check out the colors here: https://tailwindcss.com/docs/customizing-colors#default-color-palette

Add this: 

```HTML
<h1 class="text-3xl font-thin">
	Hello, world!
</h1>
```

- `text-3kl` sets the font size to 3xl large
- `font-thin` sets the font weight to thin

Looks these up here: https://tailwindcss.com/docs/font-size#setting-the-font-size

https://tailwindcss.com/docs/font-weight#setting-the-font-weight

That was pretty easy so far! Notice that you are describing what you want in a general way while the framework applies a consistent style to everything. 

Put the text in the middle of the page. To do this you need to apply styles that do the following: 

- make the body tag 100vh
- set body display grid
- put the content in the center of the grid cell

Add the following classes to the body tag: 

```HTML
<body class="bg-slate-700 text-slate-200 grid place-content-center min-h-screen">
```

- `grid` sets display grid
- `place-content-center` places content in the center of a grid cell
- `min-h-screen` sets min-height to the height of the screen

That was pretty easy and code is self-documenting when you understand the language it is using. Many of the class names are the same or relate to the CSS styles that are generated. 

Look these styles up in the docs: https://tailwindcss.com/docs/installation

Find the search bar and search for styles you might use: 

- margin
- padding
- background-color

Make a card. Add the following html: 

```HTML
<div class="bg-white rounded-xl shadow-lg">
	<div>
	<div class="">ChitChat</div>
		<p class="">You have a new message!</p>
	</div>
</div>
```

Add a background, some rounded corners, and a shadow.

```HTML
<div class="bg-white rounded-xl shadow-lg p-6">
	<div>
	<div class="">ChitChat</div>
		<p class="">You have a new message!</p>
	</div>
</div>
```

Add some padding `p-6`. Padding 6 units. You can use `p-?` with any value.

Style the text. 

```HTML
<div class="bg-white rounded-xl shadow-lg p-6">
	<div>
	<div class="text-xl font-medium text-black">ChitChat</div>
		<p class="">You have a new message!</p>
	</div>
</div>
```

- `text-xl` font size xl 
- `font-medium` font-weight medium
- `text-black` color black

Color the paragraph: `text-slate-500`

Create a rounded div. 

```HTML
<div class="bg-white rounded-xl shadow-lg p-6">
	<div class="w-20 h-20 bg-teal-400"></div>
	<div>
	<div class="text-xl font-medium text-black">ChitChat</div>
		<p class="">You have a new message!</p>
	</div>
</div>
```

This creates a div with a width and height of 20 and a background color of teal. 

w = width and h = height, p = padding and m = margin. 

I noticed I could not use any value for width and height, but many values worked. Check this: https://tailwindcss.com/docs/width

Round the corners by adding: `rounded-full`

Let's use flex to arrange the two child divs. 

```HTML
<div class="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4">
	...
</div>
```

- `flex` this is now a flex container
- `items-center` like align-items center (applies to the cross axis!)
- `space-x-4` adds space on the x-axis the number (4) is the units

Those units are a little mysterious. Check the docs to see the scale: https://tailwindcss.com/docs/customizing-spacing

- '1': '8px',
- '2': '12px',
- '3': '16px',
- '4': '24px',
- '5': '32px',
- '6': '48px',

Add another div inside the teal div. 

```HTML
...
<div class="w-20 h-20 bg-teal-400 rounded-full">
	<div class=""></div>
</div>
...
```

Add the following to the inner div: 

- `w-10` width of 10 units (half the width of the parent)
- `h-10` height of 10 units (half the height of the parent)
- `bg-red-400` background color red 400 value
- `rounded-full` border-radius 50%

Put the red circle in the center with: 

```HTML
...
<div class="w-20 h-20 bg-teal-400 rounded-full flex items-center justify-center">
	<div class="w-10 h-10 bg-red-400 rounded-full"></div>
</div>
...
```

- `flex` display: flex
- `justify-center` justify-content: center
- `items-center` align-items: center

The tags are getting pretty long but the amount of code we write is shorter than what would have been written in CSS. The code reads pretty well. 

## Try Tailwind with React

Check out the docs: https://tailwindcss.com/docs/guides/create-react-app

Open a React project, or create a new project. 

```
npm install -D tailwindcss
npx tailwindcss init
```

Edit the `tailwind.config.js`

```JS
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {},
	},
	plugins: [],
}
```

Edit `src/index.css`. Delete everything and replace with: 

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

You should delete your other stylesheets or move them out of the src directory temporarily. 

```
npm start
```

Now do all of the things you did earlier but this time in your react components. For example: 

```JS
<h1 className="text-3xl font-bold underline">
	Hello, world!
</h1>
```

Use the code hints and the docs to help you out!

## Tailwind Cheatsheet

Getting started with Tailwind requires an undewrstanding of their naming conventions. 

## bg-color-value 

Sets the background color. There are a built in list of colors each with a range of values. For example: 

```
bg-red-200 // Light red/pink
bg-red-600 // Dark full red
```

Colors are: slate, gray, zinc, neutral, stone, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, 

Values range from 50 to 950. 

Put these together like this: 

```
bg-grey-200
bg-blue-600
bg-teal-500
```

https://tailwindcss.com/docs/background-color#basic-usage

This color scheme applies to anything that uses a color! 

## text

Use text to set many of the font properties. 

```
text-sm   // font-size 14px
text-base // font-size 16px
text-lg   // font-size 18px
text-xl   // font-size 20px
...
text-7xl  // font-size 72px

```

https://tailwindcss.com/docs/font-size

## text color

Use any of the colors listed above. 

```
text-slate-200
text-red-700
```
https://tailwindcss.com/docs/text-color

## font 

Use font for many of the other font styles like weight. 

```
font-light
font-bold
font-extrabold 
```

https://tailwindcss.com/docs/font-weight

## Borders 

### rounded 

Set border-radius with: 

```
rounded
rounded-sm // 4px
rounded-lg // 8px
...
rounded-3xml // 24px
...
rounded-full // 999px
```

### border width 

```
... 
border-2 // 2px 
border-4 // 4px
...
border-x-2 // left and right 2px 
...
border-y-4 // top and bottom 4px
...
border-t-2 // border top 2px
...
```

https://tailwindcss.com/docs/border-width

### border color 

```
...
border-orange-900
...
border-purple-400
...
```

https://tailwindcss.com/docs/border-color

## flex 

```
flex         // display: flex
flex-row     // flex-direction: row
justify-end  // justify-content: flex-end
items-center // align-items: center
```
https://tailwindcss.com/docs/flex
https://tailwindcss.com/docs/justify-content
https://tailwindcss.com/docs/align-items


## Margin and padding 

```
p-2    // padding: 8px
px-2.5 // padding left and right 10px
py-3   // padding top and bottom 12px 

m-2    // margin: 8px
mx-2.5 // margin left and right 10px
my-3   // margin top and bottom 12px 
```

https://tailwindcss.com/docs/padding
https://tailwindcss.com/docs/margin

Check out this full cheatsheet. 

https://nerdcave.com/tailwind-cheat-sheet

Consider using TailwindCSS in your final project! 
