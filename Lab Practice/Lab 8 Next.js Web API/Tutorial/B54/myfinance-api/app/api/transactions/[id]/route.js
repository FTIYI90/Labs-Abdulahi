import { NextResponse } from "next/server";

import { promises as fs } from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "transactions.json");

// create the reading and writing functions

async function readTransactions() {
    const data = await fs.readFile(dataPath, "utf-8");
    return JSON.parse(data);
}


async function writeTransactions(data) {
    fs.writeFile(dataPath, JSON.stringify(data, null, 4))
}


export async function GET(request, { params }) {
    const transactions = await readTransactions()
    const { id } = await params

    const trans = transactions.find(t => t.id == id)

    if (!trans)
        return NextResponse.json("Transaction not found", { status: 404 })

    return NextResponse.json(trans, { status: 200 })
}