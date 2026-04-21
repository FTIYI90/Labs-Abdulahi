import React from 'react'

function TransactionRow({ t }) {
    const amountClass = t.type === "income" ? "text-success" : "text-danger";

    return (
        <tr>
            <td>{t.description}</td>
            <td>{t.category}</td>
            <td><span class={"badge badge--" + t.type}>{t.type}</span></td>
            <td className={amountClass}>{t.amount}</td>
            <td>{t.date}</td>
            <td>
                <button class="btn btn--small btn--danger">Delete</button>
            </td>
        </tr>
    )

}

export default TransactionRow