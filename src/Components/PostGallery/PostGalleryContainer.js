import React from "react";
import PropTypes from "prop-types";
import PostGalleryPresenter from "./PostGalleryPresenter";

const PostGalleryContainer = ({ post, onBackgroundClick }) => {
  return <PostGalleryPresenter post={post} onBackgroundClick={onBackgroundClick} />;
};

PostGalleryContainer.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired
  }).isRequired,
  pets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      category: PropTypes.string,
      name: PropTypes.string,
      avatar: PropTypes.string
    })
  ),
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      file: PropTypes.string
    })
  ),
  caption: PropTypes.string.isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  commentCount: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string,
        avatar: PropTypes.string,
        username: PropTypes.string
      }).isRequired,
      updatedAt: PropTypes.string.isRequired
    })
  ),
  createdAt: PropTypes.string.isRequired
};

export default PostGalleryContainer;
