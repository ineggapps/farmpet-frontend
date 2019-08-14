import React, { useState } from "react";
import PropTypes from "prop-types";
import PostCommentPresenter from "./PostCommentPresenter";
import { DELETE_COMMENT, UPDATE_COMMENT } from "./PostCommentQueries";
import { useMutation } from "react-apollo-hooks";
import useInput from "../../Hooks/useInput";

const PostCommentContainer = ({ id, user, comment, onCommentDeleted, me }) => {
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT);
  const [editCommentMutation] = useMutation(UPDATE_COMMENT);
  const [commentTextS, setCommentTextS] = useState(comment.text);
  const [isEditState, setIsEditState] = useState(false);
  const editCommentInput = useInput(comment.text);

  const onKeyPress = async e => {
    const { which } = e;
    if (which === 13) {
      //덧글 수정 란에서 엔터를 누른다면?
      e.preventDefault();
      editComment();
    }
  };

  const editComment = async () => {
    if (isEditState) {
      if (editCommentInput.value !== comment.text && editCommentInput.value !== "") {
        //덧글이 수정된 경우에만 서버에 전송 요청하기.
        const {
          data: { updateComment: result }
        } = await editCommentMutation({
          variables: { id: comment.id, text: editCommentInput.value }
        });
        if (result) {
          setCommentTextS(editCommentInput.value);
          setIsEditState(false);
        }
      }
    } else {
      //수정 버튼을 처음 누르면
      setIsEditState(true);
    }
  };

  const deleteComment = async () => {
    console.log(comment.id, "삭제 요청하기");
    const result = await deleteCommentMutation({ variables: { commentId: comment.id } });
    if (result) {
      //지우기에 성공하면
      console.log("댓글 지우기 성공");
      onCommentDeleted(comment.id);
    } else {
      console.log("댓글 지우기 실패");
    }
  };

  return (
    <PostCommentPresenter
      me={me}
      id={id}
      user={user}
      comment={(comment = { ...comment, text: commentTextS })}
      deleteComment={deleteComment}
      editComment={editComment}
      editCommentInput={editCommentInput}
      isEditState={isEditState}
      onKeyPress={onKeyPress}
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
