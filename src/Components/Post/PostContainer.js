import React, { useState } from "react";
import PropTypes from "prop-types";
import PostPresenter from "./PostPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { TOGGLE_LIKE, CREATE_COMMENT, DELETE_COMMENT } from "./PostQueries";

const PostContainer = ({
  id,
  user,
  pets,
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
  const [commentCountS, setCommentCount] = useState(commentCount);
  const [selfComments, setSelfComments] = useState([]);
  const comment = useInput("");
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, { variables: { postId: id } });
  const [createCommentMutation] = useMutation(CREATE_COMMENT, {
    variables: { postId: id, text: comment.value }
  });
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT);

  const onKeyPress = async e => {
    const { which } = e;
    if (which === 13) {
      e.preventDefault();
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
      try {
        const result = await createCommentMutation();
        setCommentCount(commentCountS + 1);
        if (result) {
          comment.setValue("");
        } else {
          setSelfComments(...selfComments.slice(0, selfComments.length - 1));
          setCommentCount(commentCountS - 1);
        }
      } catch (error) {
        setSelfComments(...selfComments.slice(0, selfComments.length - 1));
        setCommentCount(commentCountS - 1);
        console.log(error);
      }
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

  const deleteComment = async commentId => {
    console.log(commentId, "삭제 요청하기");
    const result = await deleteCommentMutation({ variables: { commentId } });
    if (result) {
      //지우기에 성공하면
      console.log("댓글 지우기 성공");
    } else {
      console.log("댓글 지우기 실패");
    }
  };

  // console.log("postid is", id);

  return (
    <PostPresenter
      id={id}
      user={user}
      pets={pets}
      files={files}
      caption={caption}
      likeCount={likeCountS}
      isLiked={isLikedS}
      commentCount={commentCountS}
      comments={comments}
      createdAt={createdAt}
      newComment={comment}
      toggleLike={toggleLike}
      setIsLiked={setIsLiked}
      setLikeCount={setLikeCount}
      onKeyPress={onKeyPress}
      selfComments={selfComments}
      deleteComment={deleteComment}
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
  createdAt: PropTypes.string.isRequired,
  me: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
    pets: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        category: PropTypes.string,
        name: PropTypes.string,
        avatar: PropTypes.string
      })
    )
  }).isRequired
};

export default PostContainer;
