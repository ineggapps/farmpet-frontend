import { gql } from "apollo-boost";

export const LOG_IN = gql`
  mutation confirmAccount($email: String!, $password: String!) {
    confirmAccount(email: $email, password: $password)
  }
`;
