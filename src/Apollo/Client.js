import ApolloClient from "apollo-boost";
import { defaults, resolvers, TOKEN } from "./LocalState";

export default new ApolloClient({
  uri: "http://farmpet-backend.inegg.com:500",
  clientState: {
    defaults,
    resolvers
  },
  headers: {
    Authorization: `Bearer ${localStorage.getItem(TOKEN)}`
  }
});
