import ApolloClient from "apollo-boost";
import { defaults, resolvers, TOKEN } from "./LocalState";
import { getAddress } from "../GlobalVariables";

export default new ApolloClient({
  uri: getAddress(),
  clientState: {
    defaults,
    resolvers
  },
  headers: {
    Authorization: `Bearer ${localStorage.getItem(TOKEN)}`
  }
});
