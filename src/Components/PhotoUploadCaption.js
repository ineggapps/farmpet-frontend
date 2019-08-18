import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { SpeechBubbleIcon } from "./Icons";
import TextareaAutosize from "react-autosize-textarea/lib";
import useInput from "../Hooks/useInput";

/* 설명 추가 버튼 */
const PureButton = styled.button`
  background-color: transparent;
  color: ${props => props.theme.darkGreyColor};
  &:focus {
    outline: none;
  }
  border: 0 none;
  margin: 0;
  padding: 0;
`;

const CaptionButton = styled(PureButton)`
  background-color: white;
  width: 100%;
  height: 30px;
  & svg {
    fill: ${props => props.theme.darkGreyColor};
    position: relative;
    top: 2px;
    margin-right: 4px;
  }
`;

/////////////////////////////////////////////////////////////////

const WritingComponent = styled.div`
  z-index: 1000;
  position: absolute;
  left: -100px;
  width: 300px;
  height: 120px;
  background-color: ${props => props.theme.bgColor};
  border: 1px solid ${props => props.theme.lightGreyColor};
  border-radius: 2px;
`;

const Textarea = styled(TextareaAutosize)`
  font-family: ${props => props.theme.fontFamily};
  width: 100%;
  height: 80px;
  border: 0 none;
  resize: none;
  &:focus {
    outline: none;
  }
`;

const ButtonComponent = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 5px;
`;

const WriteButton = styled(PureButton)`
  cursor: pointer;
  background-color: white;
  border: 1px solid ${props => props.theme.redColor};
  color: ${props => props.theme.redColor};
  font-weight: bold;
  font-size: 0.9em;
  width: 60px;
  height: 30px;
`;

const PhotoUploadCaption = ({ onCaptionWrittenListener }) => {
  const caption = useInput("");

  const onWritten = () => {
    if (onCaptionWrittenListener) {
      onCaptionWrittenListener({ caption: caption.value });
    } else {
      console.log("onCaptionWrittenListener 리스너가 부착되지 않았습니다.");
      throw Error("onCaptionWrittenListener 리스너가 부착되지 않았습니다.");
    }
  };

  const onKeyPress = e => {
    const { which } = e;
    if (which === 13) {
      onWritten();
    }
  };

  return (
    <WritingComponent>
      <Textarea maxLength={100} value={caption.value} onChange={caption.onChange} />
      <ButtonComponent>
        <WriteButton onClick={() => onWritten()}>Write</WriteButton>
      </ButtonComponent>
    </WritingComponent>
  );
};

PhotoUploadCaption.propTypes = {
  onCaptionWrittenListener: PropTypes.func.isRequired
};

export default PhotoUploadCaption;
