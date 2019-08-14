import { gql } from "apollo-boost";

export const DELETE_COMMENT = gql`
  mutation deleteComment($commentId: String!) {
    deleteComment(commentId: $commentId)
  }
`;

export const UPDATE_COMMENT = gql`
  mutation updateComment($id: String!, $text: String!) {
    updateComment(id: $id, text: $text)
  }
`;
