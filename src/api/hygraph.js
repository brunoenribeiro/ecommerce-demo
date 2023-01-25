import { ApolloClient, InMemoryCache } from "@apollo/client";

const hygraph = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_HYGRAPH_API_URL,
  cache: new InMemoryCache(),
});

export default hygraph;
