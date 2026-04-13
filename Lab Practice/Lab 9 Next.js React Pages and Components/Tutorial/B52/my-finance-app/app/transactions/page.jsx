'use client'
import React, { useEffect, useState } from 'react'
import TransactionRow from '@/app/components/TransactionRow'

function Transactions() {

    const [transactions, setTransactions] = useState([])
    const [type, setType] = useState('all')

    // http://localhost:3000/api/transactions?type=income
    async function getTransactions(type) {
        const url = type == 'all' ? '/api/transactions' : `/api/transactions?type=${type}`
        const res = await fetch(url)
        const data = await res.json()
        setTransactions(data)
    }

    // is a react hook that runs after the component is rendered
    useEffect(() => {
        getTransactions(type)
    }, [type])

    return (
        <div>
            <main className="page">
                <h1>Transactions</h1>

                <div className="filter-bar">
                    <label htmlFor="type-filter">Filter by type:</label>
                    <select id="type-filter" onChange={e => setType(e.target.value)} value={type}>
                        <option value="all">All</option>
                        <option value="income" >Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>

                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Category</th>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(t => <TransactionRow t={t} key={t.id}></TransactionRow>)}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    )
}

export default Transactions