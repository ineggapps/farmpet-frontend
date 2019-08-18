import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
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
  color: ${props => props.theme.blackColor};
  width: 100%;
  height: 80px;
  border: 0 none;
  resize: none;
  &:focus {
    outline: none;
  }
  padding: 10px;
  margin-bottom: 5px;
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
  const [isTextFocused, setIsTextFocused] = useState(false);
  const caption = useInput("");
  const ref = useRef(null);

  useEffect(() => {
    if (ref !== null) {
      ref.current.focus();
    }
  }, [ref]);

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
      e.preventDefault();
      onWritten();
    }
  };

  return (
    <WritingComponent>
      <Textarea
        maxLength={100}
        value={caption.value}
        onChange={caption.onChange}
        onKeyPress={onKeyPress}
        onFocus={() => setIsTextFocused(true)}
        onBlur={() => {
          if (isTextFocused) {
            onWritten();
            setIsTextFocused(false);
          }
        }}
        ref={ref}
        placeholder={"Input your memorized thinking about this picture!"}
      />
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
