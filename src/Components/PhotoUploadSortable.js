import React, { useState } from "react";
import Sortable from "react-sortablejs";
import PropTypes from "prop-types";
import axios from "axios";
import styled from "styled-components";
import ImagesUploader from "react-images-uploader";
import "react-images-uploader/styles.css";
import "react-images-uploader/font.css";
import ProgressButton from "react-progress-button";

const Container = styled.div``;

const SortableUl = styled(Sortable)`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
  height: auto;
`;

const List = styled.li`
  cursor: move;
  margin: 10px 0 10px 0;
  min-width: 70px;
  max-width: 70px;
  height: 70px;
  border: 1px solid ${props => props.theme.greyColor};
`;

const SortableTest = () => {
  const [items, setItems] = useState([
    "Apple",
    "Banana",
    "Cherry",
    "Guava",
    "Peach",
    "Strawberry",
    "KAKAO",
    "WaterMelon"
  ]);

  const handleSubmit = async () => {
    const formData = new FormData();
    const photo = "[사진파일]"; //?
    formData.append("file", photo);
    axios.post("http://localhost:4000/api/upload", formData, {
      "content-type": "multipart/form-data"
    });
  };

  return (
    <div>
      <SortableUl
        tag="ul" // Defaults to "div"
      >
        {items.map(val => (
          <List key={`random${Math.random()}`} data-id={val}>
            {val}
          </List>
        ))}
      </SortableUl>
      <button onClick={() => handleSubmit()}>업로드</button>
    </div>
  );
};

//https://github.com/aleksei0807/react-images-uploader
const Upload = () => {
  return (
    <Container>
      {/* <SortableTest /> */}
      <ImagesUploader
        url="http://localhost:4000/photos"
        optimisticPreviews
        onLoadEnd={err => {
          if (err) {
            console.error(err);
          }
        }}
        label="Upload multiple images"
      />
    </Container>
  );
};

Upload.propTypes = {};

export default Upload;
