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
  border-radius: 15px;
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
  & span {
    visibility: hidden;
  }
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

const Navigator = styled.div`
margin-top:10px
  width: 100%;
  text-align: center;
  & span{
      color:${props => props.theme.darkGreyColor};
      font-size:0.95em;
  }
`;

const PostSlider = ({ size = 520, files, onPostClick, interval = 10000 }) => {
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

  /////오토 슬라이드
  // 너무 많은 사진들이 동시에 움직이면 저사양 PC에서는 버벅일 수 있을 듯.
  // 그러한 이유에서 카카오스토리나 인스타에서 자동으로 넘기는 함수를 굳이 만들지 않은 듯.
  //   useInterval(() => {
  //     // Your custom logic here
  //     if (interval > 0) {
  //       onNext();
  //     }
  //   }, interval);

  //   function useInterval(callback, delay) {
  //     const savedCallback = useRef();

  //     // Remember the latest callback.
  //     useEffect(() => {
  //       savedCallback.current = callback;
  //     }, [callback]);

  //     // Set up the interval.
  //     useEffect(() => {
  //       function tick() {
  //         savedCallback.current();
  //       }
  //       if (delay !== null) {
  //         let id = setInterval(tick, delay);
  //         return () => clearInterval(id);
  //       }
  //     }, [delay]);
  //   }

  return (
    <>
      <Container size={size}>
        <Images currentIndex={currentIndex} size={size}>
          {files.map(file => (
            <Slice size={size} background={file.url} onClick={() => onPostClick()}>
              <span>{file.url}</span>
            </Slice>
          ))}
        </Images>
        {fileLength > 1 && (
          <>
            <LeftButton onMouseDown={() => onPrev()}>
              <LeftArrowIcon />
            </LeftButton>
            <RightButton onMouseDown={() => onNext()}>
              <RightArrowIcon />
            </RightButton>
          </>
        )}
      </Container>
      {fileLength > 0 && (
        <Navigator>
          <span>
            {currentIndex + 1}/{fileLength}
          </span>
        </Navigator>
      )}
    </>
  );
};

PostSlider.propTypes = {
  size: PropTypes.number,
  onPostClick: PropTypes.func
};

export default PostSlider;
