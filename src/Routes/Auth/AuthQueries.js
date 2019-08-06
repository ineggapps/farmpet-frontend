import { gql } from "apollo-boost";

export const LOG_IN = gql`
  mutation confirmAccount($email: String!, $password: String!) {
    confirmAccount(email: $email, password: $password)
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $email: String!
    $password: String!
    $username: String!
    $firstName: String!
    $lastName: String!
  ) {
    createAccount(
      email: $email
      password: $password
      username: $username
      firstName: $firstName
      lastName: $lastName
    )
  }
`;
