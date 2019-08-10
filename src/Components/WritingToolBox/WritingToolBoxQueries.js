import { gql } from "apollo-boost";

export const UPLOAD_POST = gql`
  mutation uploadPost(
    $files: [String]
    $caption: String!
    $permission: PostPermission!
    $pets: [String]
  ) {
    uploadPost(files: $files, caption: $caption, permission: $permission, pets: $pets) {
      id
      files {
        id
        url
      }
      caption
      permission
      pets {
        id
        category
        avatar
        name
      }
      user {
        id
        avatar
        username
      }
      createdAt
      updatedAt
    }
  }
`;

/*
updatePost(
id: String!
caption: String!
petsId: [String]
permission: PostPermission!
): Post!
*/
