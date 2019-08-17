import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Sortable from "react-sortablejs";
import axios from "axios";

const Container = styled.div``;
const SortableUl = styled(Sortable)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 0.1fr);
  grid-row-gap: 10px;
  user-select: none;
`;

const List = styled.li`
  cursor: move;
  margin-right: 10px;
  ${props => props.theme.photoUploadGrid};
  width: 75px;
  height: 75px;
  border-radius: 15px;
  border: 1px solid ${props => props.theme.lightGreyColor};
`;

const AddButton = styled.button`
  &:focus {
    outline: none;
  }
  border: 0;
`;

const File = styled.input``;

const PhotoUploadSortable = ({ onUploadStart, onUploadEnd, onImageUploaded }) => {
  const [files, setFiles] = useState([]);
  const [newFiles, setNewFiles] = useState(null);
  const useForceUpdate = () => useState()[1];
  const fileInput = useRef(null);
  const forceUpdate = useForceUpdate();
  const sampleFile = {
    id: `${Math.random()}-image-sample`,
    url: "https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_960_720.jpg",
    caption: "사진별 캡션 기능도 추가될 예정입니다."
  };
  const [items, setItems] = useState([
    "Apple",
    "Banana",
    "Cherry",
    "Guava",
    "Peach",
    "Strawberry",
    "Watermelon",
    "Grapes",
    "Tomato",
    "Vegetables",
    "Cheeze",
    "Pizza",
    "Chicken",
    "Rice cake",
    "Fish cake"
  ]);

  //https://codesandbox.io/s/7m66w7xn90
  const handleSubmit = async () => {
    console.log("제출 시도");
    const formData = new FormData();
    console.log(newFiles, newFiles.length);

    for (let i = 0; i < newFiles.length; i++) {
      formData.append("file", newFiles[i]);
    }

    axios.post("http://localhost:4000/api/upload", formData, {
      "content-type": "multipart/form-data"
    });
  };

  const onFileChange = async () => {
    setNewFiles(fileInput.current.files);
  };

  return (
    <Container>
      <form>
        <input type="file" ref={fileInput} multiple onChange={onFileChange} />
        <input type="button" onClick={() => handleSubmit()} value="제출" />
      </form>
      <SortableUl
        tag="ul" // Defaults to "div"
      >
        {files.map(file => (
          <List key={`random${Math.random()}`} data-id={file.id}>
            {file.caption}
          </List>
        ))}
      </SortableUl>
    </Container>
  );
};

PhotoUploadSortable.propTypes = {
  onUploadStart: PropTypes.func,
  onUploadEnd: PropTypes.func,
  onImageUploaded: PropTypes.func
};

export default PhotoUploadSortable;
