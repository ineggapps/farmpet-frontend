import { gql } from "apollo-boost";

export const TOGGLE_LIKE = gql`
  mutation toggleLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;

export const CREATE_COMMENT = gql`
  mutation createComment($postId: String!, $text: String!) {
    createComment(postId: $postId, text: $text) {
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

export const DELETE_COMMENT = gql`
  mutation deleteComment($commentId: String!) {
    deleteComment(commentId: $commentId)
  }
`;
