import Document, { Head, Html, Main, NextScript, DocumentContext } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const sheet = new ServerStyleSheet()

        const page = ctx.renderPage((App) => (props) =>
            sheet.collectStyles(<App {...props} />)
        )

        const styleTags = sheet.getStyleElement()
        return { ...page, styleTags }
    }

    render () {
        return (
            <Html lang="en-US">
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
