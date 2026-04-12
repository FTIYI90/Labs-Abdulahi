<p align="center">
<strong>Qatar University</strong><br>
College of Engineering - Department of Computer Science and Engineering<br>
<strong>CMPS 350 - Web Development</strong>
</p>

---

# Assignment 3: Next.js Web API

**Graded out of:** 100%
**Deadline:** Monday, April 20 2026 - 11:59 PM

---

## How to Get Started

1. Go to the shared lab repo (`Labs-Abdulahi`) and find the assignment under `Assignments/Assignment 3`.
2. Copy the entire `Assignment 3` folder into your own repo under the same path:

```
Your-Repo/
├── Assignments/
│   └── Assignment 3/
│       ├── Assignment 3 - Next.js Web API.md
│       ├── Testing-Grading-Sheet.md
│       └── recipevault-api/
│           ├── app/                  (Next.js shell - you add api/ routes here)
│           ├── repos/
│           │   └── RecipesRepo.js    (empty class - you fill it in)
│           ├── data/
│           │   └── recipes.json      (seed data - provided, same recipes as Assignment 2)
│           ├── public/client/        (provided client - do NOT modify)
│           └── package.json, next.config.mjs, jsconfig.json
```

3. Open the `recipevault-api` folder in VS Code.
4. Install dependencies and start the dev server:

```bash
cd recipevault-api
npm install
npm run dev
```

5. Open `http://localhost:3000/client/` in your browser. **Right now it shows "Loading..." and stays empty** because none of the API endpoints exist yet. Your job is to build them until the client works end-to-end.

---

## Overview

In Assignment 2, we gave you a deployed RecipeVault API and you wrote the client JavaScript that talked to it. **This time you flip the script**: you build the Next.js backend, and we give you the finished client app in `public/client/`.

The same client app you wrote last time is now living inside your Next.js project. It calls same-origin URLs like `/api/recipes` and `/api/recipes/5`. None of those routes exist — they're your assignment.

Everything you need was covered in Lab 8 (Next.js App Router, file-based API routes, dynamic `[id]` segments, reading/writing JSON files through a repo class, request validation, query-param filtering with `searchParams`, and HTTP status codes). **No React — just the backend.**

> **Important:** The provided client in `public/client/` is locked. You do not modify `index.html`, `pages/`, `css/`, or `js/app.js`. Your only job is to make the backend exist so the client starts working.

---

## What You Need to Build

### 1. The data file — `data/recipes.json` (provided)

`data/recipes.json` is already in the Startup code — the same recipes from Assignment 2. Your repo class will read and write this file. Do not delete it; you're free to add more recipes through your POST endpoint once it works.

### 2. The repo class — `repos/RecipesRepo.js`

A file already exists with an empty class. You must implement these async methods inside it, backed by `data/recipes.json` (use `fs/promises` — exact same pattern as Lab 8's `TransactionsRepo`):

| Method               | Behavior                                                                                                                                             |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `getAll()`         | Read and return the full recipes array.                                                                                                              |
| `getById(id)`      | Return the recipe with that `id`, or `undefined`.                                                                                                |
| `create(data)`     | Auto-generate the next `id`, coerce `prepTime`/`cookTime`/`servings` to Number, push into the array, persist to disk, return the new recipe. |
| `update(id, data)` | Merge fields into the existing recipe, coerce numeric fields, persist, return the updated recipe — or `null` if not found.                        |
| `delete(id)`       | Remove the recipe, persist, return `true` — or `false` if not found.                                                                            |

Export a singleton: `export default new RecipesRepo();`

### 3. The API routes

Create the following routes in the `app/api/` folder. The folder names matter — Next.js uses them for routing. Use `const { id } = await params;` for dynamic routes (Next.js 15 pattern you saw in Lab 8).

| Method     | Path&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | What it should do                                                                                                                                                                                                                     |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/recipes`                                                                                                                                                                                                                                                                                                             | Return all recipes. Support optional `?category=Dessert` (exact match) and `?search=chicken` (case-insensitive substring on `name`). Both combinable. Read them with `new URL(request.url).searchParams`.                     |
| `POST`   | `/api/recipes`                                                                                                                                                                                                                                                                                                             | Create a recipe. Validate that all required fields are present in the body (respond `400` if any are missing); coerce `prepTime`/`cookTime`/`servings` to numbers; auto-assign `id`; respond `201`.                       |
| `GET`    | `/api/recipes/[id]`                                                                                                                                                                                                                                                                                                        | Return one recipe by id, or `404` if not found.                                                                                                                                                                                     |
| `PUT`    | `/api/recipes/[id]`                                                                                                                                                                                                                                                                                                        | Update the recipe with the request body; persist to disk.`404` if not found.                                                                                                                                                        |
| `DELETE` | `/api/recipes/[id]`                                                                                                                                                                                                                                                                                                        | Delete the recipe. Return `{ message: "Recipe deleted" }`, or `404` if not found.                                                                                                                                                 |
| `GET`    | `/api/recipes/stats`                                                                                                                                                                                                                                                                                                       | Return `{ total, avgPrepTime, avgCookTime, byCategory, byDifficulty }`. `byCategory` and `byDifficulty` are objects mapping each value to its count (e.g. `{ "Easy": 3, "Medium": 2 }`). Averages rounded to 1 decimal place. |

> Note: because `stats` is a static segment, Next.js matches `/api/recipes/stats` **before** the dynamic `[id]` route — no conflict.

Look at `data/recipes.json` to see the exact fields every recipe has; your POST validation should require all of them (except `id`, which you auto-assign).

---

## Data Persistence

Every mutation (POST/PUT/DELETE) must **write the updated array back to `data/recipes.json`** using `fs.writeFile`. If you only mutate in memory, your data disappears on server restart and you lose persistence points. Restart your dev server after adding a few recipes through the client — they should still be there.

---

## Tips

- **Test each endpoint in Postman before trying the client.** Get `GET /api/recipes` working first (returns `[]` before you seed), then add a `POST`, then the `[id]` routes.
- **Do not modify `public/client/`.** The client is how you prove end-to-end behavior on the Testing-Grading-Sheet. Any changes will invalidate your grade for that section.
- **Coerce numbers.** HTML forms submit everything as strings. `prepTime`, `cookTime`, and `servings` must be stored as numbers so math on them works.
- **Use the `@/` alias.** `import recipesRepo from "@/repos/RecipesRepo";` works because `jsconfig.json` maps it for you.
- **Lab 8 Part B solution** (`my-finance-app/app/api/transactions/*`, `repos/TransactionsRepo.js`) is your reference implementation. The shape is identical — swap the resource name and fields.

---

## Grading Rubric

| #  | Criteria                                                                                                                                                                                              | Points        |
| -- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| 1  | **`RecipesRepo.js`** - class with `getAll`/`getById`/`create`/`update`/`delete`, reads/writes `data/recipes.json` via `fs/promises`, auto-increments id, coerces numeric fields | **16**  |
| 2  | `GET /api/recipes` - returns full list                                                                                                                                                              | 5             |
| 3  | `GET /api/recipes` with `?category=` and `?search=` - filters correctly, both combinable                                                                                                        | 10            |
| 4  | `POST /api/recipes` - creates recipe, 201 on success, 400 when required fields missing                                                                                                              | 13            |
| 5  | `GET /api/recipes/[id]` - returns one recipe, 404 if not found                                                                                                                                      | 10            |
| 6  | `PUT /api/recipes/[id]` - updates recipe, 404 if not found                                                                                                                                          | 13            |
| 7  | `DELETE /api/recipes/[id]` - deletes recipe, 404 if not found                                                                                                                                       | 9             |
| 8  | Data persists to `recipes.json` across server restarts                                                                                                                                              | 5             |
| 9  | `GET /api/recipes/stats` - totals, averages, and counts by category/difficulty                                                                                                                      | 8             |
| 10 | Client app at `/client/` works end-to-end (list, filter, search, add, edit, delete)                                                                                                                 | 11            |
|    | **Total**                                                                                                                                                                                       | **100** |

---

## Deliverables

1. Complete the `recipevault-api` project with all routes, the repo class, and seeded data. Do not modify `public/client/`, the Next.js shell files, or `package.json`.
2. Fill in **Testing-Grading-Sheet.md** with screenshots of your working API and client. Save screenshots inside a `screenshots/` folder. Not submitting the testing sheet will incur a **10% deduction**.
3. Push everything to **your own repo** under `Assignments/Assignment 3` before **Saturday, April 25, 2026 at 11:59 PM**. **No late submissions.**

Your `Assignments/Assignment 3` folder should look like this when you're done:

```
Assignment 3/
├── Assignment 3 - Next.js Web API.md
├── Testing-Grading-Sheet.md
├── screenshots/
│   ├── q1-get-all.png
│   ├── q2-get-category.png
│   └── ... (all screenshots from the testing sheet)
└── recipevault-api/
    ├── app/
    │   ├── api/
    │   │   ├── recipes/route.js
    │   │   ├── recipes/[id]/route.js
    │   │   └── recipes/stats/route.js
    │   ├── layout.js, page.js
    ├── repos/RecipesRepo.js
    ├── data/recipes.json
    ├── public/client/  (unchanged)
    ├── package.json, next.config.mjs, jsconfig.json
```

Build everything yourself - no AI tools or code generators.
