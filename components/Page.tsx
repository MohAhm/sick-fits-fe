import React from 'react'
import { Header } from './Header'

interface IPageProps {}

export const Page: React.FC<IPageProps> = ({ children }) => {
    return (
        <div>
            <Header />
            <h2>Page Component</h2>
            {children}
        </div>
    )
}