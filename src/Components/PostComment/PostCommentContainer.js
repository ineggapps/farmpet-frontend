import React from "react";
import PropTypes from "prop-types";
import PostCommentPresenter from "./PostCommentPresenter";

const PostCommentContainer = ({ id, user, comment }) => {
  return <PostCommentPresenter id={id} user={user} comment={comment} />;
};

PostCommentContainer.propTypes = {
  id: PropTypes.string.isRequired, // ID of Post
  user: PropTypes.shape({
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
