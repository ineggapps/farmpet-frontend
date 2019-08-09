import { gql } from "apollo-boost";

export const CATEGORY_DOG = "DOG";
export const CATEGORY_CAT = "CAT";

export const ME = gql`
  {
    me {
      id
      avatar
      username
    }
  }
`;
