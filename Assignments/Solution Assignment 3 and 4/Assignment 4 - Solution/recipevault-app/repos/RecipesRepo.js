import { promises as fs } from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "recipes.json");

class RecipesRepo {
    async getAll() {
        const data = await fs.readFile(dataPath, "utf-8");
        return JSON.parse(data);
    }

    async save(items) {
        await fs.writeFile(dataPath, JSON.stringify(items, null, 4));
    }

    async getById(id) {
        const all = await this.getAll();
        return all.find(r => r.id === Number(id));
    }

    async search({ category, search } = {}) {
        let recipes = await this.getAll();
        if (category) {
            recipes = recipes.filter(r => r.category === category);
        }
        if (search) {
            const term = search.toLowerCase();
            recipes = recipes.filter(r => r.name.toLowerCase().includes(term));
        }
        return recipes;
    }

    async create(data) {
        const all = await this.getAll();
        const newItem = {
            id: Math.max(...all.map(r => r.id), 0) + 1,
            name: data.name,
            description: data.description,
            image: data.image,
            prepTime: Number(data.prepTime),
            cookTime: Number(data.cookTime),
            servings: Number(data.servings),
            category: data.category,
            cuisine: data.cuisine,
            difficulty: data.difficulty,
            ingredients: data.ingredients
        };
        all.push(newItem);
        await this.save(all);
        return newItem;
    }

    async update(id, data) {
        const all = await this.getAll();
        const index = all.findIndex(r => r.id === Number(id));
        if (index === -1) return null;
        const updated = { ...all[index], ...data, id: Number(id) };
        if (data.prepTime !== undefined) updated.prepTime = Number(data.prepTime);
        if (data.cookTime !== undefined) updated.cookTime = Number(data.cookTime);
        if (data.servings !== undefined) updated.servings = Number(data.servings);
        all[index] = updated;
        await this.save(all);
        return updated;
    }

    async delete(id) {
        const all = await this.getAll();
        const index = all.findIndex(r => r.id === Number(id));
        if (index === -1) return false;
        all.splice(index, 1);
        await this.save(all);
        return true;
    }

    async getStats() {
        const recipes = await this.getAll();
        const total = recipes.length;

        const sumPrep = recipes.reduce((s, r) => s + r.prepTime, 0);
        const sumCook = recipes.reduce((s, r) => s + r.cookTime, 0);
        const avgPrepTime = total === 0 ? 0 : Math.round((sumPrep / total) * 10) / 10;
        const avgCookTime = total === 0 ? 0 : Math.round((sumCook / total) * 10) / 10;

        const byCategory = {};
        const byDifficulty = {};
        for (const r of recipes) {
            byCategory[r.category] = (byCategory[r.category] || 0) + 1;
            byDifficulty[r.difficulty] = (byDifficulty[r.difficulty] || 0) + 1;
        }

        return { total, avgPrepTime, avgCookTime, byCategory, byDifficulty };
    }
}

export default new RecipesRepo();
