import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { LeftArrowIcon, RightArrowIcon, SpeechBubbleIcon } from "./Icons";

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

const Caption = styled.div`
  display: none;
  font-size: 0.9em;
  position: absolute;
  bottom: 0;
  left: 0;
  width: ${props => props.size}px;
  height: 200px;
  /* padding-top: 100px; */
  & p {
    color: #fff;
    width: 100%;
    padding: 10px 15px 20px;
    line-height: 18px;
  }
  & svg {
    position: relative;
    top: 2px;
    fill: ${props => props.theme.lightGreyColor};
    margin-right: 8px;
  }
`;

const Slice = styled.li`
  position: relative;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background-image: url(${props => props.background});
  background-size: cover;
  background-position: center;
  &:hover ${Caption} {
    display: flex;
    align-items: flex-end;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0,
      rgba(0, 0, 0, 0.75) 82%,
      rgba(0, 0, 0, 0.85) 100%
    );
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

  //오토슬라이드 소스가 들어갈 자리

  return (
    <>
      <Container size={size}>
        <Images currentIndex={currentIndex} size={size}>
          {files.map(file => (
            <Slice
              key={file.url}
              size={size}
              background={file.url}
              onClick={() => onPostClick(currentIndex)}
            >
              {file.caption && (
                <Caption size={size} currentIndex={currentIndex}>
                  <p>
                    <SpeechBubbleIcon /> {file.caption}
                  </p>
                </Caption>
              )}
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
