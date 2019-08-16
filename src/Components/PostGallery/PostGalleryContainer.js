import React, { useState } from "react";
import PropTypes from "prop-types";
import PostGalleryPresenter from "./PostGalleryPresenter";
import { usePostGallery } from "../../PostGalleryContext";

const PostGalleryContainer = () => {
  const { viewerContent } = usePostGallery();
  const filesLength =
    viewerContent !== undefined && viewerContent !== null ? viewerContent.files.length : -1;
  const [currentIndex, setCurrentIndex] = useState(0);
  const { setViewerContent } = usePostGallery();

  const onBackgroundClick = () => {
    setViewerContent(null);
  };

  const getPrevImage = () => {
    console.log("currentIndex===filesLength", currentIndex, filesLength - 1);
    if (currentIndex === 0) {
      setCurrentIndex(filesLength - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const getNextImage = () => {
    console.log("currentIndex===filesLength", currentIndex, filesLength - 1);
    if (currentIndex === filesLength - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const onPrev = () => {
    console.log("이전 버튼 클릭", filesLength);
    getPrevImage();
  };

  const onNext = () => {
    console.log("다음 버튼 클릭");
    getNextImage();
  };

  if (viewerContent === undefined) {
    return null;
  }

  return (
    <PostGalleryPresenter
      post={viewerContent}
      filesLength={filesLength}
      currentIndex={currentIndex}
      onPrev={onPrev}
      onNext={onNext}
      onBackgroundClick={onBackgroundClick}
    />
  );
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
