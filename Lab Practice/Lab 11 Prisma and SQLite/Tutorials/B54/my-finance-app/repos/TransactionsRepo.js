import { promises as fs } from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()

const dataPath = path.join(process.cwd(), "data", "transactions.json");

class TransactionsRepo {
    async getAll() {
        // const data = await fs.readFile(dataPath, "utf-8");
        // return JSON.parse(data);
        return await prisma.transaction.findMany({
            orderBy: { date: 'desc' }
        })
    }

    async save(items) {
        await fs.writeFile(dataPath, JSON.stringify(items, null, 4));
    }

    async getById(id) {
        return await prisma.transaction.findUnique({ where: { id: Number(id) } })
    }

    async create(data) {
        // return await prisma.transaction.create({ data: data })
        return await prisma.transaction.create({ data })
    }

    async update(id, data) {
        return await prisma.transaction.update({ data, where: { id: Number(id) } })
    }

    async delete(id) {
        return await prisma.transaction.delete({ where: { id: Number(id) } })
    }

    async search(query) {
        const all = await this.getAll();
        const q = query.toLowerCase();
        return all.filter(t =>
            t.description.toLowerCase().includes(q) ||
            t.category.toLowerCase().includes(q)
        );
    }

    async getTotalByType(type) {
        const all = await this.getAll();
        return all.filter(t => t.type === type).reduce((sum, t) => sum + t.amount, 0);
    }

    async getBalance() {
        const income = await this.getTotalByType("income");
        const expense = await this.getTotalByType("expense");
        return income - expense;
    }
}

export default new TransactionsRepo();
