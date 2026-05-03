import { promises as fs } from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const dataPath = path.join(process.cwd(), "data", "transactions.json");

class TransactionsRepo {
    async getAll() {
        return await prisma.transaction.findMany({ orderBy: { category: "desc" } });
    }

    async save(items) {
        await fs.writeFile(dataPath, JSON.stringify(items, null, 4));
    }

    async getById(id) {
        return await prisma.transaction.findUnique({ where: { id: Number(id) } });
    }

    async create(transaction) {
        const newTransaction = {
            description: transaction.description,
            amount: Number(transaction.amount),
            type: transaction.type,
            category: transaction.category,
            date: transaction.date || new Date().toISOString().split("T")[0]
        };

        return await prisma.transaction.create({ data: newTransaction })
    }

    async update(id, transaction) {
        const updatedTransaction = {
            description: transaction.description,
            amount: Number(transaction.amount),
            type: transaction.type,
            category: transaction.category,
            date: transaction.date || new Date().toISOString().split("T")[0]
        };

        return await prisma.transaction.update({ data: updatedTransaction, where: { id: Number(id) } })
    }

    async delete(id) {
        return await prisma.transaction.delete({ where: { id: Number(id) } })
    }

    async search(query) {
        return await prisma.transaction.findMany(
            {
                orderBy: { category: "desc" },
                where: {
                    OR: [
                        { description: { contains: query } },
                        { category: { contains: query } }
                    ]

                }

            });


        // return await prisma.transaction.findMany(
        //     {
        //         orderBy: { category: "desc" },
        //         where: {
        //             OR: [
        //                 { description: { contains: query, mode: "insensitive" } },
        //                 { category: { contains: query, mode: "insensitive" } }
        //             ]
        //         }
        //     });
    }

    async getTotalByType(type) {
        const result = await prisma.transaction.aggregate({
            where: { type: type },
            _sum: { amount: true }
        });
        return result._sum.amount || 0;
    }

    async getBalance() {
        const income = await this.getTotalByType("income");
        const expense = await this.getTotalByType("expense");
        return income - expense;
    }
}

export default new TransactionsRepo();
