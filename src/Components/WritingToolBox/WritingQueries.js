import { gql } from "apollo-boost";

export const UPLOAD_POST = gql`
  mutation uploadPost($files: [String], $caption: String!, $permission: String!, $pets: [String]) {
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
        avatar
        name
      }
      user {
        id
        avatar
        username
      }
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
