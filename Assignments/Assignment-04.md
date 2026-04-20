# Assignment 4 – Custom React App

## Overview

This is your capstone project. You will design and build a single-page application of your own choosing, applying the tools and patterns covered in the course.

The goal is to demonstrate that you can make architectural decisions — not just follow instructions. You will choose your state management library, choose your API, and choose what to build.

---

## Requirements

Your project must:

- Be a **single-page application built with React and Vite**
- Use **a global store** for application state — either **Zustand** or **Redux Toolkit** (your choice)
- Fetch data from **at least one external API**
- Use **controlled components** for any form inputs
- Handle **loading, error, and empty states**
- Be structured with **modular, well-named components**

Additionally, include **at least one** of the following:

- Styling with **Tailwind CSS**
- UI animation with **Framer Motion**
- Server state management with **React Query**

---

## Choosing Your State Management Library

Both Zustand and Redux Toolkit are acceptable. Your README must include a short justification for your choice.

**Choose Zustand if:**
- Your app has a small number of shared state values
- You want a minimal setup with less boilerplate
- You are confident you can structure the store cleanly without enforced conventions

**Choose Redux Toolkit if:**
- Your app has complex state with multiple domains (e.g., a cart, a user, a product list)
- You want the structure and conventions RTK provides
- You are using `createAsyncThunk` for API fetching through the store

Either choice is valid. The justification matters more than which one you pick.

> 💡 AI Prompt: "Given this app idea, would Zustand or Redux Toolkit be a better fit and why?"

---

## Project Ideas

If you are not sure what to build, here are some starting points:

- A movie or book search app using a public API
- A personal finance tracker with category totals
- A recipe finder with saved favourites
- A weather dashboard for multiple cities
- A quiz or trivia game with score tracking
- A habit tracker with daily check-ins

Choose something you would want to use or show to someone else.

---

## Milestones

Use these checkpoints to pace your work. You do not submit anything until Class 13, but you should hit each milestone on time.

| By | Milestone |
|---|---|
| Class 11 (Apr 27) | Project idea decided, API chosen, Vite project created, global store set up with at least one piece of state |
| Class 12 (Apr 29) | Core features working — data fetching, state reads and writes, basic UI in place |
| Class 13 (May 4) | App complete, README written, submitted to GradeScope |

If you are not at a milestone by the target class, talk to the instructor.

---

## Responsible Use of AI

You are encouraged to use AI for:

- Debugging error messages
- Getting feedback on your component structure or store design
- Looking up syntax or API documentation
- Reviewing your code for quality

You should not use AI to:

- Generate your entire app from a single prompt
- Submit code you cannot explain
- Replace your own design decisions

### Reflection Requirement

Your README must include an **AI Reflection** section with:

- 2–3 specific prompts you used during development
- A brief description of what AI helped with (debugging, design, etc.)
- One decision you made yourself that AI did not make for you

This is not optional. A missing or vague AI reflection will affect your grade.

---

## Submission

1. Push your finished project to GitHub
2. Submit the repository link on GradeScope
3. Confirm your README includes:
   - Project description
   - Instructions to run the app locally
   - Your state management choice and justification
   - AI Reflection section

**Due: Class 13 — May 4**

---

## Rubric

| Category | Does Not Meet | Meets Expectations | Exceeds Expectations |
|---|---|---|---|
| **Completion** | Core features missing or non-functional | All required features work | Required features plus at least one stretch feature |
| **Global Store** | No store, or useState used for shared state | Zustand or RTK store used correctly | Store is well-structured; state shape is intentional and justified |
| **API Integration** | No external data loaded | Data fetched and displayed | Includes loading, error, and empty state handling |
| **Component Structure** | Logic mixed into one or two large components | App broken into focused, well-named components | Components are reusable and easy to navigate |
| **Code Quality** | Inconsistent formatting, unclear names | Readable, consistently formatted | Self-documenting — names and structure make intent clear |
| **AI Reflection** | Missing or one generic sentence | Specific prompts listed, explains how AI was used | Reflects on what AI helped with and what required independent thinking |
