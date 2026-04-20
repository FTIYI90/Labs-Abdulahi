"use server";

import budgetsRepo from "@/repos/BudgetsRepo";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBudgetAction(prevState, formData) {
    // TODO 5a: const data = Object.fromEntries(formData)
    // TODO 5b: Coerce data.budgeted, data.spent, data.year to Number
    // TODO 5c: Validate — category not empty, budgeted > 0, month not empty, year >= 2020
    //   Return errors if any fail
    // TODO 5d: await budgetsRepo.create(data)
    // TODO 5e: revalidatePath("/") then redirect("/budgets")
    const budget = Object.fromEntries(formData)
    budget.budgeted = Number(budget.budgeted);
    budget.spent = Number(budget.spent);
    budget.year = Number(budget.year);

    // handle errors
    const error = {};
    if (!budget.category) error.category = "Category is required";
    if (!budget.budgeted || budget.budgeted <= 0) error.budgeted = "Budgeted amount must be greater than 0";
    if (!budget.month) error.month = "Month is required";
    if (budget.year < 2020) error.year = "Year must be 2020 or later";

    if (Object.keys(error).length > 0) { return error; }

    await budgetsRepo.create(budget)

    revalidatePath("/") //only works for server side components
    redirect("/budgets")
}

export async function updateBudgetAction(prevState, formData) {
    // TODO 6a: const { id, ...fields } = Object.fromEntries(formData)
    // TODO 6b: Coerce fields.budgeted, fields.spent, fields.year to Number
    // TODO 6c: Validate (same rules as create). Return errors if any fail.
    // TODO 6d: await budgetsRepo.update(id, fields)
    // TODO 6e: revalidatePath("/") then redirect("/budgets")
    const { id, ...fields } = Object.fromEntries(formData)
    fields.budgeted = Number(fields.budgeted);
    fields.spent = Number(fields.spent);
    fields.year = Number(fields.year);

    // handle errors
    const error = {};
    if (!fields.category) error.category = "Category is required";
    if (!fields.budgeted || fields.budgeted <= 0) error.budgeted = "Budgeted amount must be greater than 0";
    if (!fields.month) error.month = "Month is required";
    if (fields.year < 2020) error.year = "Year must be 2020 or later";

    if (Object.keys(error).length > 0) { return error; }

    await budgetsRepo.update(id, fields)

    revalidatePath("/") //only works for server side components
    redirect("/budgets")
}

export async function deleteBudgetAction(id) {
    // TODO 7a: await budgetsRepo.delete(id)
    // TODO 7b: revalidatePath("/")
    await budgetsRepo.delete(id)
    revalidatePath("/")
}
