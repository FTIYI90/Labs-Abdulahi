import Link from 'next/link'
import React from 'react'

function NavBar() {
    return (
        <nav class="navbar">
            <span class="brand">MyFinance</span>
            <ul class="nav-links">
                <li><Link href="/">Dashboard</></li>
                <li><Link href="/transactions">Transactions</Link></li>
                <li><Link href="/budgets">Budgets</Link></li>
            </ul>
        </nav>
    )
}

export default NavBar