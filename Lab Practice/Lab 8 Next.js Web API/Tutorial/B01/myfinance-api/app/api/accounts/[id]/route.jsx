import { NextResponse } from "next/server"

export async function GET(request, { params }) {
    const { id } = await params
    const accounts = []
    const account = accounts.find(a => a.id == id)
    return NextResponse.json({ message: `You want account with id = ${id}` })
}

export async function DELETE(request, { params }) {
    const { id } = await params

    const accounts = []

    const accountsWIthoutTheDeleted = accounts.filter(a => a.id == id)

    // write back this accounts
    return NextResponse.json(account)
}


