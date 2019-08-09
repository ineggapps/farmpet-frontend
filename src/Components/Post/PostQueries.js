import { gql } from "apollo-boost";

export const TOGGLE_LIKE = gql`
  mutation toggleLike($id: String!) {
    toggleLike(id: $id)
  }
`;

export const CREATE_COMMENT = gql`
  mutation createComment($id: String!, $text: String!) {
    createComment(id: $id, text: $text) {
      id
      text
      user {
        id
        avatar
        username
      }
      createdAt
    }
  }
`;
