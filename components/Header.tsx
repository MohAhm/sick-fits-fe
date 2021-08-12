import React from 'react'
import Link from 'next/link'

import { Nav } from './Nav'

interface IHeaderProps {}

export const Header: React.FC<IHeaderProps> = () => {
    return (
        <header>
            <div className="bar">
                <Link href='/'>Sick fits</Link>
            </div>
            <div className="sub-bar">
                <p>search</p>
            </div>
            <Nav />
        </header>
    )
}