import dotenv from "dotenv";
dotenv.config();
import "@/styles/globals.css";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import { useEffect } from "react";
import jwt from "jsonwebtoken";
import { NavBarLayout } from "@/layouts/NavBarLayout";
import { LoginContextProvider } from "@/context/login";

import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { WebSocket } from 'ws';

const httpLink = createHttpLink({
  uri: "http://127.0.0.1:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("session");
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
      "apollo-require-preflight": true,
    },
  };
});

const wsLink = new GraphQLWsLink(createClient({
  webSocketImpl: WebSocket,
  url: 'ws://localhost:4000/graphql'
}))

const client = new ApolloClient({
  link: authLink.concat(
    createUploadLink({
      uri: "http://127.0.0.1:4000/graphql",
    })
  ),
  cache: new InMemoryCache(),
});
client.setLink(wsLink)
export default function App({ Component, pageProps }) {
  useEffect(() => {
    const tokenSession = localStorage.getItem("session");
    const decodedToken = jwt.decode(tokenSession);
    const fecha = new Date(decodedToken?.exp * 1000);
    if (fecha < new Date()) {
      localStorage.removeItem("session");
    }
  }, []);

  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <LoginContextProvider>
        <NavBarLayout/>
          <Component {...pageProps} />
        </LoginContextProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
}
