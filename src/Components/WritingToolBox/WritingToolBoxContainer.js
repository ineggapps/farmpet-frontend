import React, { useState } from "react";
import PropTypes from "prop-types";
import WritingToolBoxPresenter from "./WritingToolBoxPresenter";
import { PERMISSION_PUBLIC } from "../../SharedQueries";
import { useMutation } from "react-apollo-hooks";
import { UPLOAD_POST } from "./WritingToolBoxQueries";
import useInput from "../../Hooks/useInput";

const WritingToolBoxContainer = ({ pets }) => {
  const captionWriting = useInput("");
  const [permission, setPermission] = useState(`${PERMISSION_PUBLIC}`);
  const [open, setOpen] = useState(false);
  const [selectedPets, setSelectedPets] = useState(pets);
  const [uploadPostMutation] = useMutation(UPLOAD_POST);

  const getId = ({ pet }) => pet.id;

  const uploadPost = async () => {
    const pets = selectedPets.map(pet => {
      if (pet.selected) {
        return pet.id;
      }
    });
    const result = await uploadPostMutation({
      variables: {
        caption: captionWriting.value,
        permission,
        pets: pets.filter(pet => (pet !== undefined && pet !== null ? true : false))
      }
    });
    console.log(result);
  };

  const onSelected = async targetId => {
    const newPets = selectedPets.map(pet => {
      if (pet.id === targetId) {
        pet.selected = !pet.selected;
      }
      return pet;
    });
    await setSelectedPets(newPets);
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
