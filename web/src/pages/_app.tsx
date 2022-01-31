import "../styles/globals.css";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import { NEXT_PUBLIC_SERVER_URL } from "@constants";

import type { AppProps } from "next/app";
import Script from "next/script";

const client = new ApolloClient({
  uri: NEXT_PUBLIC_SERVER_URL as string,
  cache: new InMemoryCache(),
  credentials: "include",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
      <script
        async
        src="https://sdk.mercadopago.com/js/v2"
        // @ts-ignore
        view="item"
      ></script>
    </ApolloProvider>
  );
}

export default MyApp;
