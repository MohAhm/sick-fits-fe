import React from 'react'
import Link from 'next/link'

interface INavProps {}

export const Nav: React.FC<INavProps> = () => {
    return (
        <nav>
            <Link href='/products'>Products</Link>
            <Link href='/sell'>Sell</Link>
            <Link href='/orders'>Orders</Link>
            <Link href='/account'>Account</Link>
        </nav>
    )
}