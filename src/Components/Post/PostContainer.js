import React, { useState } from "react";
import PropTypes from "prop-types";
import PostPresenter from "./PostPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { TOGGLE_LIKE, CREATE_COMMENT, DELETE_COMMENT, UPDATE_PERMISSION } from "./PostQueries";
import { PERMISSION_PRIVATE, PERMISSION_FRIENDS } from "../../SharedQueries";

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
  permission,
  me
}) => {
  const [isLikedS, setIsLiked] = useState(isLiked);
  const [likeCountS, setLikeCount] = useState(likeCount);
  const [commentCountS, setCommentCount] = useState(commentCount);
  const [commentsS, setComments] = useState(comments);
  const [openPermission, setOpenPermission] = useState(false);
  const [permissionS, setPermissionS] = useState(permission);
  const [selfComments, setSelfComments] = useState([]);
  const comment = useInput("");
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, { variables: { postId: id } });
  const [createCommentMutation] = useMutation(CREATE_COMMENT, {
    variables: { postId: id, text: comment.value }
  });
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT);
  const [updatePermissionMutation] = useMutation(UPDATE_PERMISSION);

  const onKeyPress = async e => {
    const { which } = e;
    if (which === 13) {
      e.preventDefault();

      try {
        const {
          data: { createComment: result }
        } = await createCommentMutation();
        setCommentCount(commentCountS + 1);
        if (result) {
          console.log(result);
          setSelfComments([
            ...selfComments,
            {
              id: result.id,
              text: comment.value,
              user: { avatar: me.avatar, id: me.id, username: me.username },
              createdAt: new Date() + "",
              updatedAt: new Date() + ""
            }
          ]);
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

  const deleteComment = async (commentId, isSelfComment = false) => {
    console.log(commentId, "삭제 요청하기");
    const result = await deleteCommentMutation({ variables: { commentId } });
    if (result) {
      //지우기에 성공하면
      console.log("댓글 지우기 성공");
      setCommentCount(commentCountS - 1);
      if (isSelfComment) {
        setSelfComments(selfComments.filter(c => c.id !== commentId));
      } else {
        setComments(commentsS.filter(c => c.id !== commentId));
      }
    } else {
      console.log("댓글 지우기 실패");
    }
  };

  const setPermission = async (postId, newPermission) => {
    console.log(postId, newPermission, "changed");
    setPermissionS(newPermission);

    const {
      data: { updatePermission: result }
    } = await updatePermissionMutation({
      variables: { postId, permission: newPermission }
    });
    if (!result) {
      setPermissionS(permission);
      console.log(result, "권한변경 실패해야 하는데");
    }
  };

  const deletePost = () => {
    console.log(id, "포스트를 삭제 시도");
  };

  return (
    <PostPresenter
      id={id}
      user={user}
      pets={pets}
      files={files}
      caption={caption}
      likeCount={likeCountS}
      isLiked={isLikedS}
      permission={permissionS}
      commentCount={commentCountS}
      comments={commentsS}
      createdAt={createdAt}
      newComment={comment}
      toggleLike={toggleLike}
      setIsLiked={setIsLiked}
      setLikeCount={setLikeCount}
      onKeyPress={onKeyPress}
      selfComments={selfComments}
      deleteComment={deleteComment}
      me={me}
      openPermission={openPermission}
      setOpenPermission={setOpenPermission}
      setPermission={setPermission}
      deletePost={deletePost}
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
