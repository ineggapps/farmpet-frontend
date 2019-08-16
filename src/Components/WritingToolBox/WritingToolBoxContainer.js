import React, { useState } from "react";
import PropTypes from "prop-types";
import WritingToolBoxPresenter from "./WritingToolBoxPresenter";
import { PERMISSION_PUBLIC, NEW_LINE } from "../../SharedQueries";
import { useMutation } from "react-apollo-hooks";
import { UPLOAD_POST } from "./WritingToolBoxQueries";
import useInput from "../../Hooks/useInput";

const WritingToolBoxContainer = ({ pets, user }) => {
  const captionWriting = useInput("");
  const [selfPosts, setSelfPosts] = useState([]);
  const [files, setFiles] = useState([]);
  const [permission, setPermission] = useState(`${PERMISSION_PUBLIC}`);
  const [open, setOpen] = useState(false);
  const [selectedPets, setSelectedPets] = useState(pets);
  const [uploadPostMutation] = useMutation(UPLOAD_POST);

  /* 확장 슬라이드 영역 */
  const [viewerContent, setViewerContent] = useState({});
  const onPostClick = postId => {
    console.log("selfpost에서 클릭하면 슬라이드 쇼를 열어야 함.");
  };
  const onBackgroundClick = () => {
    console.log("백그라운드를 클릭하면 창을 다시 닫자");
    setViewerContent({});
  };
  /* 확장 슬라이드 영역 끝*/

  const resetWritingComponent = () => {
    captionWriting.setValue("");
    setSelectedPets(
      pets.map(pet => {
        pet.selected = false;
        return pet;
      })
    );
  };

  const onImageUploaded = imageUrls => {
    setFiles([...files, ...imageUrls]);
    console.log("onImageUploaded 메서드 호출");
  };

  const uploadPost = async () => {
    const pets = selectedPets.map(pet => {
      if (pet.selected) {
        return pet.id;
      }
    });
    // str = str.replace(/(?:\r\n|\r|\n)/g, '<br>');
    const caption = captionWriting.value.replace(/(?:\r\n|\r|\n)/g, NEW_LINE);
    if (caption.length <= 0) {
      return;
    }
    //글 서버에 올리기
    const {
      data: { uploadPost: result }
    } = await uploadPostMutation({
      variables: {
        caption,
        permission,
        files,
        pets: pets.filter(pet => (pet !== undefined && pet !== null ? true : false))
      }
    });
    console.log(result);

    //서버에 올린 글 피드 밑에 반영하기
    //console.log(result);
    setSelfPosts([
      {
        id: result.id,
        user: result.user,
        pets: result.pets,
        files: result.files,
        caption: result.caption,
        likeCount: 0,
        isLiked: false,
        permission: result.permission,
        commentCount: 0,
        comments: [],
        createdAt: result.createdAt,
        me: result.user
      },
      ...selfPosts
    ]);
    resetWritingComponent();
  };

  const onSelected = targetId => {
    const newPets = selectedPets.map(pet => {
      if (pet.id === targetId) {
        pet.selected = !pet.selected;
      }
      return pet;
    });

    setSelectedPets(newPets);

    // console.log("onSelected 이벤트 발생", newPets);
  };

  return (
    <WritingToolBoxPresenter
      pets={pets}
      permission={permission}
      setPermission={setPermission}
      open={open}
      setOpen={setOpen}
      selectedPets={selectedPets}
      setSelectedPets={setSelectedPets}
      onSelected={onSelected}
      uploadPostMutation={uploadPostMutation}
      captionWriting={captionWriting}
      uploadPost={uploadPost}
      selfPosts={selfPosts}
      onImageUploaded={onImageUploaded}
    />
  );
};

WritingToolBoxContainer.propTypes = {
  pets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      category: PropTypes.string,
      name: PropTypes.string,
      avatar: PropTypes.string
    })
  )
};

export default WritingToolBoxContainer;
