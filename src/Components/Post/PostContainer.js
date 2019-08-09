import React, { useState } from "react";
import PropTypes from "prop-types";
import PostPresenter from "./PostPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { TOGGLE_LIKE, CREATE_COMMENT } from "./PostQueries";

const PostContainer = ({
  id,
  user,
  files,
  likeCount,
  caption,
  isLiked,
  commentCount,
  createdAt
}) => {
  const [isLikedS, setIsLiked] = useState(isLiked);
  const [likeCountS, setLikeCount] = useState(likeCount);
  const comment = useInput("");
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, { variables: { id } });
  const [createCommentMutation] = useMutation(CREATE_COMMENT, {
    variables: { postId: id, text: comment.value }
  });

  const onKeyPress = async e => {
    const { which } = e;
    if (which === 13) {
      e.preventDefault();
      comment.setValue("");
    }
  };

  const toggleLike = async () => {
    if (isLikedS === true) {
      setIsLiked(false);
    } else {
      setIsLiked(true);
    }
    //reflect to database
    try {
      await toggleLikeMutation();
    } catch (error) {
      setIsLiked(isLiked);
      console.log(error);
    }
  };

  return (
    <PostPresenter
      id={id}
      user={user}
      files={files}
      caption={caption}
      likeCount={likeCountS}
      isLiked={isLikedS}
      commentCount={commentCount}
      createdAt={createdAt}
      newComment={comment}
      toggleLike={toggleLike}
      setIsLiked={setIsLiked}
      setLikeCount={setLikeCount}
      onKeyPress={onKeyPress}
    />
  );
};

PostContainer.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired
  }).isRequired,
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

export default PostContainer;
