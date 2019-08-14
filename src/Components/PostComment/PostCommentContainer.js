import React, { useState } from "react";
import PropTypes from "prop-types";
import PostCommentPresenter from "./PostCommentPresenter";
import { DELETE_COMMENT } from "./PostCommentQueries";
import { useMutation } from "react-apollo-hooks";

const PostCommentContainer = ({ id, user, comment, onCommentDeleted, me }) => {
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT);
  const deleteComment = async commentId => {
    console.log(commentId, "삭제 요청하기");
    const result = await deleteCommentMutation({ variables: { commentId } });
    if (result) {
      //지우기에 성공하면
      console.log("댓글 지우기 성공");
      onCommentDeleted(commentId);
    } else {
      console.log("댓글 지우기 실패");
    }
  };

  return (
    <PostCommentPresenter
      me={me}
      id={id}
      user={user}
      comment={comment}
      deleteComment={deleteComment}
    />
  );
};

PostCommentContainer.propTypes = {
  id: PropTypes.string.isRequired, // ID of Post
  user: PropTypes.shape({
    // 작성자
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired
  }).isRequired,
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string,
      avatar: PropTypes.string,
      username: PropTypes.string
    }).isRequired,
    updatedAt: PropTypes.string.isRequired
  })
};

export default PostCommentContainer;
