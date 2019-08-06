import ApolloClient from "apollo-boost";
import { defaults, resolvers, TOKEN } from "./LocalState";

export default new ApolloClient({
  uri: "http://localhost:4000",
  clientState: {
    defaults,
    resolvers
  },
  headers: {
    Authorization: `Bearer ${localStorage.getItem(TOKEN)}`
  }
});
