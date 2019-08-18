import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import axios from "axios";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import { UPLOAD_API_NAME } from "../SharedQueries";
import uuidv4 from "uuid/v4";
import HashMap from "hashmap";

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
  background-image: url(${props =>
    props.info && props.info.thumbnail
      ? props.info.thumbnail
      : "http://localhost:4000/upload/loading.gif"});
  background-size: cover;
  background-position: center;
`;

const SortableItem = SortableElement(({ value }) => {
  // console.log(info, "가 보이나 보자");
  // console.log(fileMap.get(info), "해시 함수에서 꺼내보니");
  return <List info={fileMap.get(value)} />;
});

const SortableList = SortableContainer(({ items }) => (
  <SortableUl>
    {items &&
      items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
  </SortableUl>
));

const fileMap = new HashMap();
const PhotoUploadSortable = ({ onUploadStart, onUploadEnd, onImageUploaded }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [files, setFiles] = useState([]);
  const [result, setResult] = useState([]);
  const [resultId, setResultId] = useState([]);
  const fileInput = useRef(null);

  //업로드 중인지 여부
  useEffect(() => {
    if (isUploading && onUploadStart) {
      onUploadStart();
    } else if (onUploadEnd) {
      onUploadEnd();
    }
  }, [isUploading]);

  //결괏값을 받아왔을 때 트리거
  useEffect(() => {
    console.log("결괏값을 받아서 호출되었음");
    if (result) {
      console.log("result가 내용이 있어서 저장 중");
      for (let i = 0; i < result.length; i++) {
        console.log(resultId[i], "를 키값으로 하여", result[i], "저장");
        fileMap.set(resultId[i], result[i]);
      }
      setResultId([]);
      setIsUploading(false);
      triggerImageUpload();
    }
  }, [result]);

  //files배열이 변경될 때 순서 전송
  useEffect(() => {
    if (!isUploading && resultId.length === 0) {
      //업로드가 완료되었을 때만 전송한다.
      triggerImageUpload();
    }
  }, [files]);

  const triggerImageUpload = () => {
    if (onImageUploaded) {
      onImageUploaded(files.map(f => fileMap.get(f).url));
    } else {
      throw Error("onImageUploaded 핸들러 부착 안 됐음");
    }
  };

  /*
  ID가 없는 빈 객체로 만들어 뒀다가,
  모두 삭제하고 일괄적으로 다시 삽입?
  */

  //https://codesandbox.io/s/7m66w7xn90
  const handleSubmit = async () => {
    if (isUploading) {
      console.log("지금 업로드 중이라 막았음.");
      return;
      //이미 업로드 중이라면 메서드 진행을 막는다.
    }
    setIsUploading(true);
    const formData = new FormData();
    const attaches = fileInput.current.files;

    const newFiles = [];
    const uuids = [];
    for (let i = 0; i < attaches.length; i++) {
      const uuid = uuidv4();
      formData.append(UPLOAD_API_NAME, attaches[i]);
      newFiles.push(uuid);
      uuids.push(uuid);
    }
    setFiles([...files, ...newFiles]);
    setResultId(uuids);

    const { data } = await axios.post("http://localhost:4000/api/upload", formData, {
      "content-type": "multipart/form-data"
    });
    setResult(data);
  };

  const onFileChange = async () => {
    handleSubmit();
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setFiles(arrayMove(files, oldIndex, newIndex));
  };
  return (
    <Container>
      <input type="file" ref={fileInput} multiple onChange={onFileChange} />
      {files && <SortableList axis={"xy"} items={files} onSortEnd={onSortEnd} />}
    </Container>
  );
};

PhotoUploadSortable.propTypes = {
  onUploadStart: PropTypes.func,
  onUploadEnd: PropTypes.func,
  onImageUploaded: PropTypes.func
};

export default PhotoUploadSortable;
