import React from 'react'
import { Page } from '../components/Page'

interface IAppProps {
    Component: React.ComponentType
    pageProps: React.ComponentProps<any>
}

export default function App({ Component, pageProps }: IAppProps) {
    return (
        <Page>
            <Component {...pageProps} />
        </Page>
    )
}