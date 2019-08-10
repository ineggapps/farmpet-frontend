import { gql } from "apollo-boost";

export const CATEGORY_DOG = "DOG";
export const CATEGORY_CAT = "CAT";

export const PERMISSION_PUBLIC = "PUBLIC";
export const PERMISSION_FRIENDS = "FRIENDS";
export const PERMISSION_PRIVATE = "PRIVATE";

export const NEW_LINE = "\r\n";

export const ME = gql`
  {
    me {
      id
      avatar
      username
      pets {
        id
        category
        name
        avatar
      }
    }
  }
`;
