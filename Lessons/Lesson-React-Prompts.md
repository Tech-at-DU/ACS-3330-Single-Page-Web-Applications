AI Prompts for developing your react skills. 

Below are student-facing AI prompts designed to:
	•	test understanding
	•	expose gaps
	•	force explanation
	•	avoid full-solution dumping

You should explicitly tell them: Do not ask for full code solutions. Ask for critique and reasoning.

⸻

1️⃣ State & Modeling Prompts

🔍 “Did I model this correctly?”

Here is my component state and what the UI needs to do.
Based on this, is my state minimal and well-modeled?
What state is redundant? What can be derived?
Do not rewrite my code. Only critique my state design.

This forces them to think about:
	•	derived vs stored state
	•	single source of truth
	•	unnecessary useState

⸻

🔎 “What will break?”

Here is my component.
If I add one more feature (like increasing number of squares), what parts of my code will break and why?
Be specific about assumptions I’ve hard-coded.

This builds:
	•	scalability thinking
	•	spotting magic numbers
	•	brittle logic

⸻

2️⃣ useEffect & Async Prompts

🧠 “Explain my effect to me”

Here is my useEffect.
Explain exactly when it runs and why.
What values does it close over?
Could this cause stale state bugs?
Do not fix it — explain the mental model.

This forces:
	•	dependency understanding
	•	closure awareness
	•	lifecycle reasoning

⸻

⚠️ “How could this cause a bug?”

Here is my async logic inside useEffect.
Give me 3 realistic bugs this could cause in production.
Do not rewrite it. Just explain failure modes.

This builds:
	•	race condition awareness
	•	double-fetch awareness
	•	cleanup understanding

⸻

3️⃣ Rendering & Reconciliation Prompts

🧩 “Are my keys correct?”

Here is my list rendering code.
Is my key choice correct?
When would this break?
Give a concrete scenario.

Most students do not understand reconciliation. This exposes that.

⸻

🪓 “What re-renders here?”

When I click one square, which components re-render and why?
How could I reduce unnecessary re-renders?

Builds:
	•	render mental model
	•	parent vs child state reasoning
	•	memoization awareness

⸻

4️⃣ Debugging Prompts

🕵️ “Find my hidden bug”

There is a subtle bug in this component.
Do not rewrite it.
Walk me through how you would debug it step by step.

This teaches:
	•	structured debugging
	•	console tracing
	•	mental execution

⸻

🧪 “What edge cases am I missing?”

Given this logic, list edge cases I am not handling.
Do not suggest features — only edge cases.

Builds:
	•	defensive programming
	•	thinking beyond “happy path”

⸻

5️⃣ Code Quality & Architecture Prompts

🧱 “Is this scalable?”

If this app grew to 20 components, what architectural problems would this approach create?

Pushes:
	•	lifting state up reasoning
	•	separation of concerns
	•	reducer patterns

⸻

🔄 “Should this be a reducer?”

Here is my state and update logic.
Would useReducer be better? Why or why not?

Teaches:
	•	complexity threshold
	•	event-based thinking

⸻

6️⃣ Accessibility & Professionalism Prompts

♿ “Is this accessible?”

Audit this component for accessibility problems.
Be specific about keyboard and screen reader behavior.

Most students forget this entirely.

⸻

🧑‍💼 “Would this pass an interview?”

Critique this as if you were a senior frontend interviewer.
What would you question me about?

This encourages:
	•	self-evaluation
	•	interview readiness
	•	defensive reasoning

⸻

7️⃣ “No Solutions” Guardrail Prompt

If you want to actively reduce solution dumping, have them prepend:

Do not give me a rewritten solution.
Ask me questions that help me discover the issue.

This transforms AI into a Socratic tutor instead of a code generator.

⸻

8️⃣ Deep Thinking Prompts (For Stronger Students)

🔬 “What assumptions am I making?”

List all assumptions my code relies on that I have not explicitly stated.

🔍 “What state is duplicated?”

Identify duplicated or coupled state in this component and explain why it’s risky.

🧠 “Explain the data flow”

Explain the data flow of this component as if I were a junior dev.

⸻

9️⃣ Reflection Prompts (Most Important)

After completing a challenge:

What React concepts does this solution demonstrate?
Where am I still relying on luck instead of understanding?

and

If this broke in production, where would I look first and why?

These build maturity.

⸻

⚠️ What You Should Avoid Letting Them Do

They should NOT be prompting:
	•	“Write this component for me”
	•	“Fix this completely”
	•	“Give me the correct solution”
	•	“Rewrite this professionally”

If they do that, they’re practicing dependency, not React.

⸻

If You Want to Level This Up

You could require students to submit:
	1.	Their solution
	2.	The AI prompts they used
	3.	A short reflection on what they learned from the AI critique

That forces metacognition instead of code outsourcing.

⸻

If you’d like, I can:
	•	Turn this into a one-page AI usage policy for your React class
	•	Create a structured “AI Lab” worksheet
	•	Or design a rubric for grading AI-assisted submissions

Which direction do you want to push this — discipline, structure, or depth?
# ACS 3330 — React + AI Critique Lab

## Purpose
This lab teaches you how to use AI as a **thinking partner**, not a code generator.

You will use AI to:
- Test your understanding
- Identify weaknesses in your React knowledge
- Find bugs and architectural issues
- Improve reasoning about state, effects, and rendering

You may NOT ask AI to write full solutions.

---

# Part 1 — Rules for This Lab

Before submitting this lab, confirm:

- You did **not** ask for a rewritten solution.
- You did **not** ask AI to "fix everything."
- You did ask for critique, reasoning, or explanation.
- You reflected on what you learned.

If you violate these rules, the lab does not count.

---

# Part 2 — Required Prompts

Use at least **4 prompts** from the categories below.

For each prompt you use, submit:
1. The prompt you gave the AI
2. A short summary of the AI's feedback
3. What you changed (or what you learned)

---

# 1️⃣ State & Modeling

## 🔍 Did I model this correctly?

```
Here is my component state and what the UI needs to do.
Is my state minimal and well-modeled?
What state is redundant? What can be derived?
Do not rewrite my code. Only critique my state design.
```

Focus:
- Derived vs stored state
- Single source of truth
- Unnecessary useState

---

## 🔎 What will break?

```
Here is my component.
If I add one more feature (like increasing number of squares), what parts of my code will break and why?
Be specific about assumptions I’ve hard-coded.
```

Focus:
- Scalability
- Magic numbers
- Brittle logic

---

# 2️⃣ useEffect & Async

## 🧠 Explain my effect to me

```
Here is my useEffect.
Explain exactly when it runs and why.
What values does it close over?
Could this cause stale state bugs?
Do not fix it — explain the mental model.
```

Focus:
- Dependency arrays
- Closures
- Lifecycle reasoning

---

## ⚠️ How could this cause a bug?

```
Here is my async logic inside useEffect.
Give me 3 realistic bugs this could cause in production.
Do not rewrite it. Just explain failure modes.
```

Focus:
- Race conditions
- Double fetch
- Missing cleanup

---

# 3️⃣ Rendering & Reconciliation

## 🧩 Are my keys correct?

```
Here is my list rendering code.
Is my key choice correct?
When would this break?
Give a concrete scenario.
```

Focus:
- Reconciliation
- Stable identity

---

## 🪓 What re-renders here?

```
When I click one square, which components re-render and why?
How could I reduce unnecessary re-renders?
```

Focus:
- Render model
- Parent vs child state
- Memoization

---

# 4️⃣ Debugging

## 🕵️ Find my hidden bug

```
There is a subtle bug in this component.
Do not rewrite it.
Walk me through how you would debug it step by step.
```

Focus:
- Structured debugging
- Console tracing
- Mental execution

---

## 🧪 What edge cases am I missing?

```
Given this logic, list edge cases I am not handling.
Do not suggest features — only edge cases.
```

Focus:
- Defensive programming
- Production thinking

---

# 5️⃣ Architecture & Scale

## 🧱 Is this scalable?

```
If this app grew to 20 components, what architectural problems would this approach create?
```

---

## 🔄 Should this be a reducer?

```
Here is my state and update logic.
Would useReducer be better? Why or why not?
```

---

# 6️⃣ Accessibility & Professionalism

## ♿ Is this accessible?

```
Audit this component for accessibility problems.
Be specific about keyboard and screen reader behavior.
```

---

## 🧑‍💼 Would this pass an interview?

```
Critique this as if you were a senior frontend interviewer.
What would you question me about?
```

---

# 7️⃣ Guardrail Prompt (Optional but Recommended)

If you are tempted to ask for a solution, prepend this:

```
Do not give me a rewritten solution.
Ask me questions that help me discover the issue.
```

---

# Part 3 — Reflection (Required)

Answer these questions in 1–2 paragraphs each:

1. What React concepts did this lab expose that you were weaker on?
2. What surprised you about the AI’s critique?
3. Where are you still guessing instead of understanding?
4. If this component broke in production, where would you look first and why?

---

# Submission Checklist

- Your component code
- At least 4 AI prompts used
- Summary of feedback for each
- Reflection responses

---

# Grading Criteria

You are graded on:
- Depth of thinking
- Quality of prompts
- Evidence of understanding
- Reflection quality

You are NOT graded on:
- Perfect code
- Fancy features

The goal is stronger reasoning, not prettier UI.

---

End of Lab