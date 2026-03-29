import { NextResponse } from "next/server";

import { promises as fs } from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "accounts.json");

// create the reading and writing functions

async function readAccounts() {
    const data = await fs.readFile(dataPath, "utf-8");
    return JSON.parse(data);
}


async function writeAccounts(data) {
    fs.writeFile(dataPath, JSON.stringify(data, null, 4))
}


export async function GET(request) {

    // type = savings & status=active
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const status = searchParams.get("status");

    const accounts = await readAccounts()

    if (!type && !status) {
        return NextResponse.json(accounts, { status: 200 })
    }

    const filteredAccounts = accounts.filter(a => a.type == type && a.status == status)
    return NextResponse.json(filteredAccounts, { status: 200 })
}

export async function POST(request) {
    // read what they gave
    const account = await request.json()
    const accounts = await readAccounts()

    accounts.push(account)

    await writeAccounts(accounts);

    return NextResponse.json("Successfully added the new account", { status: 201 })
}