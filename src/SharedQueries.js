import { gql } from "apollo-boost";

export const UPLOAD_API_NAME = "photos";

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
      firstName
      lastName
      following {
        id
        username
        avatar
        isFollowing
      }
      followers {
        id
        username
        avatar
        isFollowing
      }
    }
  }
`;
