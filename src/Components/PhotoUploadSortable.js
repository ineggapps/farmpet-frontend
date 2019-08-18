import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import axios from "axios";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import { UPLOAD_API_NAME } from "../SharedQueries";
import uuidv4 from "uuid/v4";
import HashMap from "hashmap";
import { RemoveIcon, SpeechBubbleIcon } from "./Icons";

const Container = styled.div``;
const SortableUl = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 0.1fr);
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  user-select: none;
`;

const SortableComponent = styled.li`
  position: relative;
`;

const Slice = styled.div`
  cursor: move;
  width: 95px;
  height: 95px;
  border-radius: 2px;
  border: 1px solid ${props => props.theme.lightGreyColor};
  background-image: url(${props =>
    props.file && props.file.thumbnail
      ? props.file.thumbnail
      : "http://localhost:4000/upload/loading.gif"});
  background-size: cover;
  background-position: center;
`;

const DeleteButton = styled.button`
  background-color: #333;
  width: 15px;
  height: 15px;
  border: 0 none;
  display: block;
  opacity: 0.7;
  &:focus {
    outline: none;
    opacity: 1;
  }
  background-image: url("data:image/svg+xml;base64,PHN2ZyBmaWxsPSJ3aGl0ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTIzLjk1NCAyMS4wM2wtOS4xODQtOS4wOTUgOS4wOTItOS4xNzQtMi44MzItMi44MDctOS4wOSA5LjE3OS05LjE3Ni05LjA4OC0yLjgxIDIuODEgOS4xODYgOS4xMDUtOS4wOTUgOS4xODQgMi44MSAyLjgxIDkuMTEyLTkuMTkyIDkuMTggOS4xeiIvPjwvc3ZnPg==");
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  right: 3px;
  top: 3px;
  position: absolute;
  padding: 2px 4px;
`;

const CaptionButton = styled.button`
  background-color: transparent;
  width: 100%;
  height: 20px;
  border: 0 none;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  & svg {
    fill: ${props => props.theme.darkGreyColor};
    position: relative;
    top: 2px;
    margin-right: 4px;
  }
`;

const fileMap = new HashMap();
const SortableItem = SortableElement(({ value, deleteItem, triggerImageUpload }) => {
  // console.log(value, "가 보이나 보자");
  // console.log(fileMap.get(value), "해시 함수에서 꺼내보니");
  const onDelete = value => {
    deleteItem(value);
  };
  const onAddCaption = value => {};
  return (
    <div>
      <Slice file={fileMap.get(value)} />
      <DeleteButton
        onClick={e => {
          e.preventDefault();
          onDelete(value);
        }}
      />
      <div>
        <CaptionButton
          onClick={e => {
            e.preventDefault();
            fileMap.set(value, { ...fileMap.get(value), caption: "설명을 추가해보세요 ^^" });
            console.log(
              { ...fileMap.get(value), caption: "설명을 추가해보세요 ^^" },
              "이벤트 발생해서 데이터 삽입하였음."
            );
            triggerImageUpload();
          }}
        >
          <SpeechBubbleIcon />
          설명 추가
        </CaptionButton>
        {/* <button
          onClick={e => {
            e.preventDefault();
            fileMap.set(value, { ...fileMap.get(value), caption: "설명을 추가해보세요 ^^" });
            console.log(
              { ...fileMap.get(value), caption: "설명을 추가해보세요 ^^" },
              "이벤트 발생해서 데이터 삽입하였음."
            );
            triggerImageUpload();
          }}
        >
          추가 매크로{" "}
        </button> */}
      </div>
    </div>
  );
});

const SortableList = SortableContainer(({ items, deleteItem, triggerImageUpload }) => (
  <SortableUl>
    {items &&
      items.map((value, index) => (
        <SortableComponent key={`item-${index}`}>
          <SortableItem
            index={index}
            value={value}
            deleteItem={deleteItem}
            triggerImageUpload={triggerImageUpload}
          />
        </SortableComponent>
      ))}
  </SortableUl>
));

const PhotoUploadSortable = ({ onUploadStart, onUploadEnd, onImageUploaded }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [files, setFiles] = useState([]);
  const [result, setResult] = useState([]);
  const [resultId, setResultId] = useState([]);
  const fileInput = useRef(null);

  const deleteItem = key => {
    console.log("아이템 삭제 요청", key);
    if (fileMap.has(key)) {
      fileMap.remove(key);
      console.log("아이템 해시맵에서 삭제하였음.", fileMap.get(key));
    }
    setFiles(files.filter(f => f !== key));
  };

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
    // console.log("결괏값을 받아서 호출되었음");
    if (result) {
      // console.log("result가 내용이 있어서 저장 중");
      for (let i = 0; i < result.length; i++) {
        // console.log(resultId[i], "를 키값으로 하여", result[i], "저장");
        // result[i].caption = "캡션 시범 저장" + Math.random();
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
      // 단일 url만 전송할 경우
      // onImageUploaded(files.map(f => fileMap.get(f).url));
      onImageUploaded(files.map(f => fileMap.get(f)));
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
    if (files.length === 20) {
      throw Error(
        "파일 첨부 개수 20개로 제한. 20개 이상 업로드 시 오류 뜨게끔 설계. 나중에 메시지로 대체할 것!"
      );
    }
    setIsUploading(true);
    const formData = new FormData();
    const attaches = fileInput.current.files;

    const newFiles = [];
    const uuids = [];
    for (let i = 0; i < (attaches.length <= 20 ? attaches.length : 20); i++) {
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
      {files && (
        <SortableList
          axis={"xy"}
          items={files}
          onSortEnd={onSortEnd}
          deleteItem={deleteItem}
          triggerImageUpload={triggerImageUpload}
        />
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
