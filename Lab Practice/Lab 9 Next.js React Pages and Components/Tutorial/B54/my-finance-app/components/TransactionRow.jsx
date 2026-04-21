import React from 'react'

function TransactionRow({ transaction }) {
    const t = transaction
    return (
        <tr key={t.id}>
            <td>{t.description}</td>
            <td>{t.category}</td>
            <td><span className={`badge badge--${t.type}`}>{t.type}</span></td>
            <td className={t.type === "income" ? "text-success" : "text-danger"}>
                {t.type === "income" ? "+" : "-"}{t.amount.toLocaleString()} QAR
            </td>
            <td>{t.date}</td>
        </tr>

    )
}

export default TransactionRow