import dotenv from "dotenv";
dotenv.config();
import "@/styles/globals.css";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  split,
} from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import { useEffect } from "react";
import jwt from "jsonwebtoken";
import { NavBarLayout } from "@/layouts/NavBarLayout";
import { LoginContextProvider } from "@/context/login";

import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { WebSocket } from "ws";
import { getMainDefinition } from "@apollo/client/utilities";

// const httpLink = createHttpLink({
//   uri: "http://127.0.0.1:4000/graphql",
// });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("session");
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
      "apollo-require-preflight": true,
    },
  };
}).concat(
  createUploadLink({
    uri: "https://mas-copas-lounge-backend.onrender.com/graphql",
  })
);
//hola
const wsLink = new GraphQLWsLink(
  createClient({
    webSocketImpl: WebSocket,
    url: "ws://mas-copas-lounge-backend.onrender.com/graphql",
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

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
            <NavBarLayout />
            <Component {...pageProps} />
        </LoginContextProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
}
