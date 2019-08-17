import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import axios from "axios";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import { UPLOAD_API_NAME } from "../SharedQueries";
import uuidv4 from "uuid/v4";

const Container = styled.div``;
const SortableUl = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 0.1fr);
  grid-row-gap: 10px;
  user-select: none;
`;

const List = styled.li`
  cursor: move;
  margin-right: 10px;
  width: 75px;
  height: 75px;
  border-radius: 15px;
  border: 1px solid ${props => props.theme.lightGreyColor};
  background-image: url(${props => (props.info.thumbnail ? props.info.thumbnail : "")});
  background-size: cover;
  background-position: center;
`;

const SortableItem = SortableElement(({ value, info }) => {
  console.log(info, "가 보이나 보자");
  return <List info={info}>{value}</List>;
});

const SortableList = SortableContainer(({ items, info }) => {
  return (
    <SortableUl>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} info={info[index]} />
      ))}
    </SortableUl>
  );
});

const PhotoUploadSortable = ({ onUploadStart, onUploadEnd, onImageUploaded }) => {
  const [fileList, setFileList] = useState([]);
  const [fileInfo, setFileInfo] = useState([]);
  const [result, setResult] = useState([]);
  const useForceUpdate = () => useState()[1];
  const fileInput = useRef(null);
  const forceUpdate = useForceUpdate();
  const sampleFile = {
    id: `${Math.random()}-image-sample`,
    url: "https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_960_720.jpg",
    caption: "사진별 캡션 기능도 추가될 예정입니다."
  };

  useEffect(() => {
    console.log("호출되었음");
    if (result) {
      // console.log(result, "result 내용이 존재함. ");
      const info = fileInfo;
      // console.log("info", info, info === fileInfo);
      for (let i = 0; i < info.length; i++) {
        const target = info[i];
        if (target.name !== target.id) continue;
        for (let j = 0; j < result.length; j++) {
          info[i] = result[j];
        }
      }
      setFileInfo(info);
    }
  }, [result]);

  // useEffect(() => {
  //   //강제 변화주기
  //   // forceUpdate();
  //   setFileList([...fileList]);
  // }, [fileInfo]);

  //https://codesandbox.io/s/7m66w7xn90
  const handleSubmit = async () => {
    const formData = new FormData();
    const newFiles = fileInput.current.files;
    console.log(newFiles);
    let newFileList = [],
      newFileInfo = [];
    for (let i = 0; i < newFiles.length; i++) {
      const name = newFiles[i].name;
      newFileInfo.push({ id: name, name, url: "", thumbnail: "" });
      newFileList.push(name);
      formData.append(UPLOAD_API_NAME, newFiles[i]);
    }
    setFileList([...fileList, ...newFileList]);
    setFileInfo([...fileInfo, ...newFileInfo]);

    const { data } = await axios.post("http://localhost:4000/api/upload", formData, {
      "content-type": "multipart/form-data"
    });

    setResult(data);
  };

  const onFileChange = async () => {
    handleSubmit();
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setFileList(arrayMove(fileList, oldIndex, newIndex));
  };
  return (
    <Container>
      <input type="file" ref={fileInput} multiple onChange={onFileChange} />
      {fileList && (
        <SortableList axis={"xy"} items={fileList} info={fileInfo} onSortEnd={onSortEnd} />
      )}
    </Container>
  );
};

PhotoUploadSortable.propTypes = {
  onUploadStart: PropTypes.func,
  onUploadEnd: PropTypes.func,
  onImageUploaded: PropTypes.func
};

export default PhotoUploadSortable;
