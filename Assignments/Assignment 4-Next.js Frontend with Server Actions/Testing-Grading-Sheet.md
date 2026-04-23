<p align="center">
<strong>Qatar University</strong><br>
College of Engineering - Department of Computer Science and Engineering<br>
<strong>CMPS 350 - Web Development</strong>
</p>

---

# Assignment 4 - Testing & Grading Sheet

**Student Name:** ____________________
**Student ID:** ____________________
**Date:** ____________________

> **Instructions:** For each item below, take a screenshot and save it inside a `screenshots/` folder using the exact file name shown. The image will render automatically in this document. All tests run in the browser at `http://localhost:3000/`.
>
> ⚠️ **Submission policy:** Submitting this sheet does **not** add points to your grade. **Failing to submit it deducts 10 points** from your final assignment grade.

---

## 1. Dashboard - `/` shows stats from the repo

Open `http://localhost:3000/`. Screenshot the dashboard showing total recipes, average prep time, and average cook time, plus quick links.

**Expected:** Three stat cards with real numbers from your data, "Browse Recipes" and "Add Recipe" links visible.

Save your screenshot as `screenshots/q1-dashboard.png`

![Dashboard](screenshots/q1-dashboard.png)

---

## 2. NavBar - rendered on every page

Open the browser to `/`, then `/recipes`, then `/recipes/form`. Screenshot any one of these pages with the NavBar visible at the top showing the brand and links.

**Expected:** Same NavBar (brand + Recipes + Add Recipe links) on every page; clicking a link uses Next.js client-side navigation (no full page reload).

Save your screenshot as `screenshots/q2-navbar.png`

![NavBar](screenshots/q2-navbar.png)

---

## 3. Recipes list - grid loaded

Open `/recipes`. Screenshot the grid showing all recipe cards with image, name, description, prep/cook/servings, and difficulty badge.

**Expected:** Cards rendered using your `RecipeCard` component, styled with the provided CSS classes.

Save your screenshot as `screenshots/q3-recipes-grid.png`

![Recipes grid](screenshots/q3-recipes-grid.png)

---

## 4. Recipes list - category filter

On `/recipes`, choose a value from the category dropdown. Open DevTools Network tab and screenshot the request URL containing `?category=...` AND the filtered grid below.

**Expected:** Fetch fires with the query param; grid updates to only show that category.

Save your screenshot as `screenshots/q4-filter-category.png`

![Category filter](screenshots/q4-filter-category.png)

---

## 5. Recipes list - search filter

Type in the search input. Screenshot DevTools Network tab showing the request URL with `?search=...` and the filtered grid.

**Expected:** Fetch fires per change; grid updates in real time.

Save your screenshot as `screenshots/q5-filter-search.png`

![Search filter](screenshots/q5-filter-search.png)

---

## 6. Add Recipe - empty form

Navigate to `/recipes/form` (no query params). Screenshot the empty form with the title "Add Recipe" (or similar) and a submit button.

**Expected:** All fields blank, submit button reads "Add Recipe", no Cancel button.

Save your screenshot as `screenshots/q6-form-add.png`

![Add form empty](screenshots/q6-form-add.png)

---

## 7. Add Recipe - validation error displayed

Try to submit the Add form with at least one required field empty. Screenshot the form showing the validation error message under the relevant field.

**Expected:** Server action returns errors; they render under the offending fields. Submit button stays interactive.

Save your screenshot as `screenshots/q7-form-validation.png`

![Validation errors](screenshots/q7-form-validation.png)

---

## 8. Add Recipe - submit success

Fill in the form correctly and submit. Screenshot the `/recipes` page (after redirect) showing your new recipe in the grid.

**Expected:** Form submits, redirects to `/recipes`, new card appears.

Save your screenshot as `screenshots/q8-form-add-success.png`

![Add success](screenshots/q8-form-add-success.png)

---

## 9. Edit Recipe - URL carries recipe data

From the recipes grid, click Edit on any card. Screenshot the browser address bar showing `/recipes/form?id=...&name=...` (with the recipe's data as query params).

**Expected:** URL includes the recipe id and at least the name as query params.

Save your screenshot as `screenshots/q9-edit-url.png`

![Edit URL](screenshots/q9-edit-url.png)

---

## 10. Edit Recipe - form pre-filled

On the edit page (from step 9), screenshot the form with all fields pre-filled with the recipe's existing values. The title should reflect "Edit" mode and a Cancel link should be visible.

**Expected:** Every field populated with the recipe's current value; submit button reads "Update Recipe"; Cancel link present.

Save your screenshot as `screenshots/q10-edit-prefill.png`

![Edit pre-fill](screenshots/q10-edit-prefill.png)

---

## 11. Edit Recipe - update success

Change one field in the edit form and submit. Screenshot the `/recipes` page (after redirect) showing the card with the updated value.

**Expected:** Form submits, redirects to `/recipes`, the card shows the updated data.

Save your screenshot as `screenshots/q11-edit-success.png`

![Edit success](screenshots/q11-edit-success.png)

---

## 12. Delete - confirmation dialog

Click Delete on any recipe card. Screenshot the confirmation dialog overlay (NOT the browser `confirm()` popup — your custom dialog with Delete and Cancel buttons).

**Expected:** A styled modal appears with "Are you sure?" message and two buttons.

Save your screenshot as `screenshots/q12-delete-dialog.png`

![Delete dialog](screenshots/q12-delete-dialog.png)

---

## 13. Delete - success

Confirm the deletion. Screenshot the recipes grid showing the recipe removed.

**Expected:** Modal closes, grid refreshes without the deleted recipe.

Save your screenshot as `screenshots/q13-delete-success.png`

![Delete success](screenshots/q13-delete-success.png)

---

## 14. Persistence - `recipes.json` updated

After performing the Add (step 8) and the Delete (step 13), open `data/recipes.json` in VS Code and screenshot it showing the updated contents.

**Expected:** The new recipe appears in the file; the deleted one is gone.

Save your screenshot as `screenshots/q14-persistence.png`

![Persistence](screenshots/q14-persistence.png)

---

## 15. Folder structure - routes you created

In VS Code, screenshot the file explorer showing your `app/` folder expanded so the following are visible: `actions/recipeActions.js`, `components/NavBar.jsx`, `components/RecipeCard.jsx`, `components/RecipeForm.jsx`, `recipes/page.jsx`, `recipes/form/page.jsx`.

**Expected:** All six files present in the correct locations (file-based routing).

Save your screenshot as `screenshots/q15-folder-structure.png`

![Folder structure](screenshots/q15-folder-structure.png)
