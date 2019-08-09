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
  caption,
  likeCount,
  isLiked,
  commentCount,
  comments,
  createdAt,
  me
}) => {
  const [isLikedS, setIsLiked] = useState(isLiked);
  const [likeCountS, setLikeCount] = useState(likeCount);
  const [selfComments, setSelfComments] = useState([]);
  const comment = useInput("");
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, { variables: { id } });
  const [createCommentMutation] = useMutation(CREATE_COMMENT, {
    variables: { postId: id, text: comment.value }
  });

  const onKeyPress = async e => {
    const { which } = e;
    if (which === 13) {
      if (comment.value.length < 10) {
        //10자 이상 입력하지 않으면 무시
        return;
      }
      e.preventDefault();
      console.log(comment.value.length + "길이");
      setSelfComments([
        ...selfComments,
        {
          id: `self${Math.random()}`,
          text: comment.value,
          user: { avatar: me.avatar, id: me.id, username: me.username },
          createdAt: new Date() + "",
          updatedAt: new Date() + ""
        }
      ]);
      comment.setValue("");
    }
  };

  const toggleLike = async () => {
    if (isLikedS === true) {
      setIsLiked(false);
      setLikeCount(likeCountS - 1);
    } else {
      setIsLiked(true);
      setLikeCount(likeCountS + 1);
    }
    //reflect to database
    try {
      const result = await toggleLikeMutation();
      if (!result) {
        throw Error("The attempt failed.");
      }
    } catch (error) {
      setIsLiked(isLiked);
      setLikeCount(likeCount);
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
      comments={comments}
      createdAt={createdAt}
      newComment={comment}
      toggleLike={toggleLike}
      setIsLiked={setIsLiked}
      setLikeCount={setLikeCount}
      onKeyPress={onKeyPress}
      selfComments={selfComments}
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
  createdAt: PropTypes.string.isRequired,
  me: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired
  }).isRequired
};

export default PostContainer;
