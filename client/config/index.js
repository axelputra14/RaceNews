import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://axelputra14.site",
  cache: new InMemoryCache(),
});

export default client;
