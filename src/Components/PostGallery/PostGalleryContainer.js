import React from "react";
import PropTypes from "prop-types";
import PostGalleryPresenter from "./PostGalleryPresenter";

const PostGalleryContainer = ({ post }) => {
  return <PostGalleryPresenter post={post} />;
};

PostGalleryContainer.propTypes = {};

export default PostGalleryContainer;
