import { NextResponse } from 'next/server'
import React from 'react'
import path from 'path'
import { promises as fs } from 'fs'

const accountsPath = path.join(process.cwd(), "data", "accounts.json")

async function getAccounts() {
    const data = await fs.readFile(accountsPath)
    return JSON.parse(data)
}

async function writeAccounts(accounts) {
    await fs.writeFile(accountsPath, JSON.stringify(accounts, null, 4))
}

export async function GET(request, { params }) {
    const accounts = await getAccounts()
    return NextResponse.json({
        accounts
    })
}

// adding a new resource [account]
export async function POST(request, { params }) {
    try {
        const account = await request.json()

        // make a validations
        if (account.type.length < 3)
            return NextResponse.json({ message: "account type can not be null", e })

        const accounts = await getAccounts()
        accounts.push(account)
        writeAccounts(accounts)

        return NextResponse.json({ message: "successfully added the account" })
    } catch (e) {
        return NextResponse.json({ message: "unable to add account", e })
    }
}
