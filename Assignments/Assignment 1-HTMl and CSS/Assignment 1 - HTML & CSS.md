<p align="center">
<strong>Qatar University</strong><br>
College of Engineering - Department of Computer Science and Engineering<br>
<strong>CMPS 350 - Web Development</strong>
</p>

---

# Assignment 1: Building with HTML & CSS

**Graded out of:** 100%
**Deadline:** Saturday, February 20, 2026 - 11:59 PM

---

## How to Get Started

1. Go to the shared lab repo (`Labs-Abdulahi`) and find the assignment under `Assignments/Assignment 1`.
2. Copy the entire `Assignment 1` folder into your own repo under the same path:

```
Your-Repo/
├── Assignments/
│   └── Assignment 1/
│       ├── Assignment 1 - HTML & CSS.md
│       ├── Testing-Grading-Sheet.md
│       └── recipevault/
│           ├── index.html
│           ├── share-recipe.html
│           └── styles.css
```

3. Open the `recipevault` folder in VS Code and start building. You don't need to create new files -just complete the existing ones.

---

## Overview

Implement the **RecipeVault** responsive website as illustrated in the screenshots below (Figures 1–4).

This is a two-page website: a home page (`index.html`) and a recipe sharing form (`share-recipe.html`). Both pages share the same stylesheet (`styles.css`), header, navigation, and footer.

This assignment covers everything from Labs 1–4. You'll need HTML5 semantic tags, tables, forms, CSS variables, Flexbox, Grid, and responsive media queries.

> This project will carry over into future assignments -you'll eventually add JavaScript, React, and a database on top of what you build here. Keep your HTML clean.

---

## Screenshots You Need to Produce

> **Note:** Your design does not need to match the description exactly, but it should be close. Use any colors, fonts, or minor layout tweaks you prefer.

You will need to take the following screenshots and include them in your **Testing-Grading-Sheet.md**. See the testing sheet for exact file names and instructions.

| #  | Screenshot          | Description                                                                         |
| -- | ------------------- | ----------------------------------------------------------------------------------- |
| 1  | Home page - mobile  | Browser < 768px. Nav stacked, cards in 1 column, sidebar below main.                |
| 2  | Home page - tablet  | Browser 768px-1023px. Nav in a row, cards in 2 columns.                             |
| 3  | Home page - desktop | Browser 1024px+. Logo left / nav right, cards in 3 columns, sidebar as side column. |
| 4  | Share Recipe page   | Full `share-recipe.html` page with form, 2 fieldsets, buttons.                    |
| 5  | Navigation          | Two screenshots showing navigation between the two pages.                           |
| 6  | Meal plan table     | Table with caption, thead/tbody/tfoot, zebra striping.                              |
| 7  | Card hover effect   | A recipe card being hovered with lift/shadow.                                       |
| 8  | Form validation     | Submit form without required fields - browser shows validation.                     |
| 9  | Video               | Embedded YouTube video on the home page.                                            |
| 10 | Sidebar             | Cooking tips and resource links section.                                            |

---

## Specific Requirements

Here are the things we're looking for:

### 1. HTML Structure

Use HTML5 semantic tags throughout: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`. Keep a proper heading hierarchy (`h1` > `h2` > `h3`).

**Navigation** -Two links: "Recipes" (goes to `index.html`) and "Share Recipe" (goes to `share-recipe.html`). Same nav on both pages.

### 2. Featured Recipes (index.html)

Three recipe cards in a grid. Each card needs:

- `<article>` wrapping the card
- `<figure>` with `<img>` (include `alt`, `width`, `height`) and `<figcaption>`
- A heading, short description paragraph
- `<ul>` showing prep time, cook time, and servings

Use these images:

| Recipe          | Image URL                                                                                                                                                                         |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Grilled Chicken | `https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Masala_Grilled_Chicken_with_Baby_Potatoes%2C_Salad.JPG/600px-Masala_Grilled_Chicken_with_Baby_Potatoes%2C_Salad.JPG` |
| Creamy Pasta    | `https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Chicken_fettuccine_alfredo.JPG/600px-Chicken_fettuccine_alfredo.JPG`                                                 |
| Caesar Salad    | `https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Caesar_salad_%282%29.jpg/600px-Caesar_salad_%282%29.jpg`                                                             |

### 3. Weekly Meal Plan Table (index.html)

A `<table>` with:

- `<caption>` (use `<small>` inside it)
- `<thead>`, `<tbody>`, `<tfoot>`
- `<th>` with `scope="col"` and `scope="row"`
- At least one `colspan`
- A summary/average row in `<tfoot>`

### 4. Cooking Tutorial (index.html)

Embed this YouTube video using an `<iframe>`, wrapped in a `<figure>` with `<figcaption>`:

```
https://www.youtube.com/embed/mhDJNfV7hjk
```

### 5. Sidebar (index.html)

An `<aside>` containing:

- An ordered list of cooking tips -use `<strong>`, `<em>`, and `<mark>` in the list items
- An unordered list of links: at least one external link (with `target="_blank"` and `rel="noopener noreferrer"`), a `mailto:` link, and a `tel:` link

### 6. Recipe Form (share-recipe.html)

A `<form>` with `action` and `method` attributes. Two fieldsets:

**Fieldset 1 -Recipe Info:**

- Recipe name -`text` input, `required`, `aria-required="true"`, with `placeholder`
- Short description -`text` input, required
- Category -`<select>` with `<optgroup>` groupings
- Cuisine -text input with a `<datalist>` for suggestions
- Prep time, cook time, servings -`number` inputs with `min`, `max`, `step`
- Date -`date` input
- Recipe photo -`file` input

**Fieldset 2 -Details:**

- Difficulty -radio buttons (easy/medium/hard)
- Dietary tags -checkboxes (vegetarian, vegan, gluten-free, etc.)
- Ingredients -`<textarea>`, required, with `aria-describedby` pointing to a help text element

End the form with a submit button and a reset button.

> **Note:** The form fields map directly to the recipe cards. Name, description, image, and prep/cook/servings are what show up on each card. The other fields (category, cuisine, difficulty, tags, ingredients) would go on a recipe detail page in a future assignment.

### 7. Footer (both pages)

Copyright line (use `&copy;`), a fun message using `<del>` and `<strong>`, and navigation links. Same footer on both pages.

### 8. CSS Styling

Write all styles in a single `styles.css` file shared by both pages. You need to demonstrate:

- **CSS Variables** -define custom properties in `:root` for colors, spacing, shadows, border-radius
- **Selectors** -element, class, and descendant selectors
- **Box model** -`margin`, `padding`, `border`, `border-radius`, `box-sizing: border-box`
- **Typography** -`font-family` with fallbacks, `font-size` in rem, `font-weight`, `line-height`
- **Colors** -use at least two formats (hex, rgb/rgba, or named)
- **Backgrounds** -`background-color` on sections, `linear-gradient` on the header
- **Hover/focus states** -`:hover`, `:focus`, `:active` with `transition`. Card hover with `transform: translateY()`. Table zebra striping with `:nth-child`
- **Shadows** -`box-shadow` on cards, tables, and/or the form
- **Flexbox** -for the nav, form buttons, radio/checkbox groups
- **CSS Grid** -for the recipe card grid and the overall page layout (main + sidebar) with `grid-template-columns` or `grid-template-areas`

### 9. Responsive Design

Use a **mobile-first** approach with `min-width` media queries:

| Breakpoint                 | What changes                                                                                                       |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Default (mobile)           | Nav links stacked vertically. Cards in 1 column. Sidebar below main content. Table scrolls horizontally.           |
| **768px** (tablet)   | Nav links in a row. Cards in 2 columns. Form number fields side-by-side.                                           |
| **1024px** (desktop) | Header splits: logo left, nav right. Cards in 3 columns. Sidebar becomes a side column next to main (Grid layout). |

---

## Grading Rubric

| Criteria                                                                                                            | Points        |
| ------------------------------------------------------------------------------------------------------------------- | ------------- |
| HTML Structure & Semantics -semantic elements, heading hierarchy, lists, links, images with figures                 | 25            |
| Tables -caption, thead/tbody/tfoot, th scope, colspan                                                               | 10            |
| Forms & Accessibility -input types, fieldsets/legends, labels, validation, ARIA attributes, multimedia              | 20            |
| CSS Styling -variables, selectors, box model, typography, colors, backgrounds, pseudo-classes, shadows, transitions | 25            |
| Responsive Layout -mobile-first media queries, Flexbox, Grid, responsive nav/cards/table                            | 20            |
| **Total**                                                                                                     | **100** |

---

## Deliverables

1. Complete the implementation in the `recipevault` folder (`index.html`, `share-recipe.html`, `styles.css`).
2. Fill in the **Testing-Grading-Sheet.md** with screenshots of your completed website. Save your screenshots inside a `screenshots/` folder. Not submitting the testing sheet will incur a **10% deduction**.
3. Push everything to **your own repo** under `Assignments/Assignment 1` before **Saturday, February 28, 2026 at 11:59 PM**. **No late submissions will be accepted.**

Your `Assignments/Assignment 1` folder should look like this when you're done:

```
Assignment 1/
├── Assignment 1 - HTML & CSS.md
├── Testing-Grading-Sheet.md
├── screenshots/
│   ├── q1-home-mobile.png
│   ├── q2-home-tablet.png
│   ├── q3-home-desktop.png
│   └── ... (all screenshots from the testing sheet)
└── recipevault/
    ├── index.html
    ├── share-recipe.html
    └── styles.css
```

Build everything yourself -no templates or frameworks.
