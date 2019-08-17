import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { LeftArrowIcon, RightArrowIcon } from "./Icons";

const Container = styled.div`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  overflow: hidden;
  position: relative;
  user-select: none;
`;

const Images = styled.ul`
  display: inline-flex;
  transform: translate(-${props => props.currentIndex * props.size}px, 0px);
  transition: transform 0.2s;
`;

const Slice = styled.li`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background-image: url(${props => props.background});
  background-size: cover;
  background-position: center;
`;

const SideButton = styled.div`
  width: 10%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  & svg {
    fill: white;
    opacity: 0.3;
  }
  &:hover svg {
    opacity: 1;
  }
`;

const LeftButton = styled(SideButton)`
  left: 0;
  top: 0;
`;

const RightButton = styled(SideButton)`
  right: 0;
  top: 0;
`;

const PostSlider = ({ size = 520, files, onPostClick }) => {
  const fileLength = files ? files.length : -1;
  const [currentIndex, setCurrentIndex] = useState(0);

  const onPrev = () => {
    console.log("onPrev 버튼 눌림", currentIndex);
    if (currentIndex === 0) {
      setCurrentIndex(fileLength - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const onNext = () => {
    console.log("onNext 버튼 눌림", currentIndex);
    if (currentIndex === fileLength - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <Container size={size}>
      <Images currentIndex={currentIndex} size={size}>
        {files.map(file => (
          <Slice size={size} background={file.url} onClick={() => onPostClick()}>
            {file.id}
          </Slice>
        ))}
      </Images>
      <LeftButton onMouseDown={() => onPrev()}>
        <LeftArrowIcon />
      </LeftButton>
      <RightButton onMouseDown={() => onNext()}>
        <RightArrowIcon />
      </RightButton>
    </Container>
  );
};

PostSlider.propTypes = {
  size: PropTypes.number,
  onPostClick: PropTypes.func
};

export default PostSlider;
