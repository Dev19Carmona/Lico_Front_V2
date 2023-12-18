import "@/styles/LoginFormStyle.css";
import "@/styles/RocketLoaderStyle.css";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  split,
} from "@apollo/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
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
import { useRouter } from "next/router";

// const httpLink = createHttpLink({
//   uri: "http://127.0.0.1:4000/graphql",
// });
//"https://crm-back-x2m9.onrender.com/graphql"
//"https://mas-copas-lounge-backend.onrender.com/graphql"

const theme = extendTheme({
  fonts: {
    heading: `"League Spartan", sans-serif`,
    body: `"League Spartan", sans-serif`,
  },
})

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
    uri: "http://localhost:4123/graphql",
  })
);
//hola
const wsLink = new GraphQLWsLink(
  createClient({
    webSocketImpl: WebSocket,
    url: "ws://localhost:4123/graphql",
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
  const router = useRouter()
  useEffect(() => {
    const tokenSession = localStorage.getItem("session");
    const decodedToken = jwt.decode(tokenSession);
    const fecha = new Date(decodedToken?.exp * 1000);
    if (fecha < new Date()) {
      localStorage.removeItem("session");
      router.reload()
    }
  }, [router]);

  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <LoginContextProvider>
            <NavBarLayout />
            <Component {...pageProps} />
        </LoginContextProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
}
