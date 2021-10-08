import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { AppProps } from "next/app";
import Router from "next/router";
import NProgress from "nprogress";

import { endpoint } from "../config";
import { Page } from "../components/Page";
import withData from "../lib/withData";
import "../components/styles/nprogress.css";
import { CartStateProvider } from "../lib/CartStateProvider";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

// Initialize ApolloClient
const link = createHttpLink({
  uri: endpoint,
  credentials: "include",
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <CartStateProvider>
        <Page>
          <Component {...pageProps} />
        </Page>
      </CartStateProvider>
    </ApolloProvider>
  );
}

App.getInitialProps = async function ({ Component, ctx }: any) {
  let pageProps: any = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(App);
