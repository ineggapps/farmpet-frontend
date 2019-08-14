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

export const UPDATE_PERMISSION = gql`
  mutation updatePermission($postId: String!, $permission: PostPermission!) {
    updatePermission(postId: $postId, permission: $permission)
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($id: String!) {
    deletePost(id: $id)
  }
`;

export const UPDATE_POST = gql`
  mutation updatePost($id: String!, $caption: String!) {
    updatePost(id: $id, caption: $caption)
  }
`;
