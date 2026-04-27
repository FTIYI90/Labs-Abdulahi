import { promises as fs } from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const dataPath = path.join(process.cwd(), "data", "transactions.json");

class TransactionsRepo {
    async getAll() {
        return await prisma.transaction.findMany({ orderBy: { amount: 'asc' } })
    }

    async save(items) {
        await fs.writeFile(dataPath, JSON.stringify(items, null, 4));
    }

    async getById(id) {
        return await prisma.transaction.find({ where: { id: Number(id) } })
    }

    async create(data) {
        const newItem = {
            description: data.description,
            amount: Number(data.amount),
            type: data.type,
            category: data.category,
            date: data.date || new Date().toISOString().split("T")[0]
        };


        return await prisma.transaction.create({ data: newItem })
    }

    async update(id, data) {
        return await prisma.transaction.update({ data: data, where: { id: Number(id) } })
    }

    async delete(id) {
        return await prisma.transaction.delete({ where: { id: Number(id) } })
    }

    async search(query) {
        // const all = await this.getAll();
        // const q = query.toLowerCase();
        // return all.filter(t =>
        //     t.description.toLowerCase().includes(q) ||
        //     t.category.toLowerCase().includes(q)
        // );

        return await prisma.transaction.findMany({
            where: {
                OR: [
                    { description: { contains: query } },
                    { category: { contains: query } },
                ]
            }
        })
    }

    async getTotalByType(type) {
        const result = await prisma.transaction.aggregate({
            where: { type: type },
            _sum: { amount: true },
            _count: { id: true },
            _avg: { amount: true }
        })

        return result._sum.amount
    }

    async getBalance() {
        const income = await this.getTotalByType("income");
        const expense = await this.getTotalByType("expense");
        return income - expense;
    }
}

export default new TransactionsRepo();
