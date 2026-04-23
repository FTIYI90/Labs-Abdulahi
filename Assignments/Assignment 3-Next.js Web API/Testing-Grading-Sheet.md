<p align="center">
<strong>Qatar University</strong><br>
College of Engineering - Department of Computer Science and Engineering<br>
<strong>CMPS 350 - Web Development</strong>
</p>

---

# Assignment 3 - Testing & Grading Sheet

**Student Name:** ____________________
**Student ID:** ____________________
**Date:** ____________________

> **Instructions:** For each item below, take a screenshot and save it inside a `screenshots/` folder using the exact file name shown. The image will render automatically in this document. Use Postman for API tests and the browser (`http://localhost:3000/client/`) for client tests.

---

## 1. `GET /api/recipes` - List all recipes

Send a GET request in Postman to `http://localhost:3000/api/recipes` and screenshot the response showing your seeded recipes.

**Expected:** JSON array with all recipes, 200 OK.

Save your screenshot as `screenshots/q1-get-all.png`

![Get all recipes](screenshots/q1-get-all.png)

---

## 2. `GET /api/recipes?category=Dessert` - Filter by category

Screenshot the response showing only recipes in the `Dessert` category.

**Expected:** JSON array filtered to matching category, 200 OK.

Save your screenshot as `screenshots/q2-get-category.png`

![Filter by category](screenshots/q2-get-category.png)

---

## 3. `GET /api/recipes?search=chicken` - Search by name

Screenshot the response showing only recipes whose name contains `chicken` (case-insensitive).

**Expected:** JSON array filtered to name matches, 200 OK.

Save your screenshot as `screenshots/q3-get-search.png`

![Search by name](screenshots/q3-get-search.png)

---

## 4. `POST /api/recipes` - Create a recipe

Send a POST request with a complete JSON body. Screenshot the **201 Created** response with the new recipe (including auto-assigned id).

**Expected:** 201 status, response body contains the new recipe with a fresh id.

Save your screenshot as `screenshots/q4-post-success.png`

![POST success](screenshots/q4-post-success.png)

---

## 5. `POST /api/recipes` - Missing required fields

Send a POST request with some required fields missing. Screenshot the **400 Bad Request** response with an error message.

**Expected:** 400 status, error message in body.

Save your screenshot as `screenshots/q5-post-400.png`

![POST 400](screenshots/q5-post-400.png)

---

## 6. `GET /api/recipes/999` - 404 for missing recipe

Screenshot the **404 Not Found** response when fetching a non-existent id.

**Expected:** 404 status, error message.

Save your screenshot as `screenshots/q6-get-404.png`

![GET 404](screenshots/q6-get-404.png)

---

## 7. `PUT /api/recipes/{id}` - Update a recipe

Screenshot Postman showing a successful PUT to an existing recipe, with the updated fields in the response.

**Expected:** 200 status, response body contains the updated recipe.

Save your screenshot as `screenshots/q7-put-success.png`

![PUT success](screenshots/q7-put-success.png)

---

## 8. `DELETE /api/recipes/{id}` - Delete a recipe

Screenshot a successful DELETE response.

**Expected:** 200 status, `{ "message": "Recipe deleted" }`.

Save your screenshot as `screenshots/q8-delete-success.png`

![DELETE success](screenshots/q8-delete-success.png)

---

## 9a. `GET /api/recipes/stats` - Aggregate stats

Screenshot the JSON response showing `total`, `avgPrepTime`, `avgCookTime`, `byCategory`, and `byDifficulty`.

**Expected:** 200 OK with an object like `{ "total": 11, "avgPrepTime": 18.6, "avgCookTime": 40.4, "byCategory": {...}, "byDifficulty": {...} }`.

Save your screenshot as `screenshots/q9a-stats.png`

![Stats](screenshots/q9a-stats.png)

---

## 9. Data persistence - `recipes.json` after mutations

After performing a POST and a DELETE, screenshot the contents of `data/recipes.json` in VS Code showing the file updated on disk.

**Expected:** File reflects your changes.

Save your screenshot as `screenshots/q9-persistence.png`

![Persistence](screenshots/q9-persistence.png)

---

## 10. Client - Recipes grid loaded

Open `http://localhost:3000/client/` in the browser. Screenshot the recipes grid showing cards loaded from your API.

**Expected:** Cards render with image, name, description, meta, difficulty badge, edit/delete buttons.

Save your screenshot as `screenshots/q10-client-grid.png`

![Client grid](screenshots/q10-client-grid.png)

---

## 11. Client - Category filter active

Select a category from the filter dropdown. Open DevTools Network tab and screenshot the request URL showing `?category=...`.

**Expected:** Network request fires with the query param, grid updates.

Save your screenshot as `screenshots/q11-client-category.png`

![Client category filter](screenshots/q11-client-category.png)

---

## 12. Client - Search active

Type in the search box. Screenshot DevTools Network tab showing the request URL with `?search=...` and the filtered grid.

**Expected:** Network request with search param, grid updates in real time.

Save your screenshot as `screenshots/q12-client-search.png`

![Client search](screenshots/q12-client-search.png)

---

## 13. Client - Add recipe succeeds

Fill in the Add Recipe form and submit. Screenshot the updated recipes grid showing your new recipe.

**Expected:** After submit, navigation returns to recipes grid with the new card visible.

Save your screenshot as `screenshots/q13-client-add.png`

![Client add](screenshots/q13-client-add.png)

---

## 14. Client - Edit recipe works

Click Edit on an existing recipe. Screenshot the form pre-filled with that recipe's data, then a second screenshot after Update Recipe saves.

**Expected:** Fields populate correctly; after update, card reflects the new data.

Save your screenshot as `screenshots/q14-client-edit.png`

![Client edit](screenshots/q14-client-edit.png)

---

## 15. Client - Delete recipe works

Click Delete on a recipe and confirm. Screenshot the grid after deletion showing the recipe is gone.

**Expected:** Confirm dialog appears; after confirm, recipe disappears and `data/recipes.json` reflects the removal.

Save your screenshot as `screenshots/q15-client-delete.png`

![Client delete](screenshots/q15-client-delete.png)
