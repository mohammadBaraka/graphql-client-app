"use client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createUploadLink({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
  }),
});

export function Provider({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
