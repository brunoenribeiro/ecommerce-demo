import { ApolloClient, InMemoryCache } from "@apollo/client";

const hygraph = new ApolloClient({
  uri: "https://api-sa-east-1.hygraph.com/v2/clcy4n6d72s5y01t5gcbohop0/master",
  cache: new InMemoryCache(),
});

export default hygraph;
