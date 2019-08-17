import React, { useState } from "react";
import PropTypes from "prop-types";
import PostPresenter from "./PostPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import {
  TOGGLE_LIKE,
  CREATE_COMMENT,
  UPDATE_PERMISSION,
  DELETE_POST,
  UPDATE_POST
} from "./PostQueries";
import { usePostGallery } from "../../PostGalleryContext";

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
  const [captionS, setCaptionS] = useState(caption);
  const [isEditMode, setIsEditMode] = useState(false); //현재 포스트를 수정하고 있는지
  const editCaptionInput = useInput(caption);
  const [isDeletedPost, setIsDeletedPost] = useState(false); //현재 포스트가 삭제되면 표시하지 않는다.
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
  const [updatePermissionMutation] = useMutation(UPDATE_PERMISSION);
  const [deletePostMutation] = useMutation(DELETE_POST);
  const [updatePostMutation] = useMutation(UPDATE_POST);

  const { setViewerContent } = usePostGallery();
  const onPostClick = () => {
    console.log("PostContainer에서 자체적으로 PostGallery를 열어도 되겠다!");
    const post = {
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
    };
    setViewerContent(post);
  };

  const onCommentDeleted = commentId => {
    //덧글이 삭제되면 삭제된 컴포넌트에서 이 이벤트를 호출함.
    setCommentCount(commentCountS - 1);
    console.log("덧글 정리", commentsS.filter(c => c.id !== commentId));
    setComments(commentsS.filter(c => c.id !== commentId));
    console.log("덧글 정리", selfComments.filter(c => c.id !== commentId));
    setSelfComments(selfComments.filter(c => c.id !== commentId));

    console.log(selfComments.length, commentsS.length, "길이", commentCountS);
    console.log("삭제 이벤트가 발생해서 내가 호출되었습니다.");
  };

  const onCommentKeyPress = async e => {
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

  const deletePost = async () => {
    //id값은 컨테이너가 가지고 있으므로 별도로 인수로 받을 필요 없음.
    console.log(id, "포스트를 삭제 시도");
    const {
      data: { deletePost: result }
    } = await deletePostMutation({
      variables: { id }
    });
    if (result) {
      setIsDeletedPost(true);
      console.log("삭제 성공");
    } else {
      console.log("삭제 시도 실패");
    }
  };

  const editPost = async (isCancel = false) => {
    console.log(id, "수정 요청", isCancel);
    if (isCancel) {
      setIsEditMode(false);
      return;
    }
    if (isEditMode === true) {
      //이미 수정모드이므로 작성이 완료되었으면 수정사항을 전송한다.
      if (!(editCaptionInput.value === caption)) {
        console.log("글이 바뀌었네.");
        //글을 수정한 경우에만 서버로 전송한다.
        const {
          data: { updatePost: result }
        } = await updatePostMutation({
          variables: { id, caption: editCaptionInput.value }
        });
        if (result) {
          console.log(result, "글 수정 결과");
          setCaptionS(editCaptionInput.value);
          setIsEditMode(false);
        }
      } else {
        //값이 같은 경우에는 바로 수정모드에서 보기 모드로 전환한다. (서버로 전송X)
        console.log("글이 바뀌지 않았잖아.");
        setIsEditMode(false);
      }
    } else {
      //수정하기 전이라면 에딧 모드로 바꿔준다.
      editCaptionInput.setValue(captionS);
      setIsEditMode(true);
    }
  };

  return (
    <PostPresenter
      id={id}
      user={user}
      pets={pets}
      files={files}
      caption={captionS}
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
      onCommentKeyPress={onCommentKeyPress}
      selfComments={selfComments}
      me={me}
      openPermission={openPermission}
      setOpenPermission={setOpenPermission}
      setPermission={setPermission}
      deletePost={deletePost}
      isDeletedPost={isDeletedPost}
      isEditMode={isEditMode}
      editPost={editPost}
      editCaptionInput={editCaptionInput}
      onCommentDeleted={onCommentDeleted}
      onPostClick={onPostClick}
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
