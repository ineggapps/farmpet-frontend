import React from "react";
import styled, { keyframes } from "styled-components";
import { LeftArrowIcon, RightArrowIcon, SpeechBubbleIcon } from "../Icons";

const FadeInAnimation = keyframes`
  0%{
    opacity:0
  }
  100%{
    opacity:1
  }
`;

const Wrapper = styled.div`
  animation: ${FadeInAnimation} 0.1s linear 1;
  z-index: 3000;
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BackgroundWrapper = styled.div`
  background-color: #000;
  opacity: 0.8;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
`;

const Caption = styled.div`
  display: none;
  font-size: 0.9em;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
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

const Viewer = styled.div`
  /* &:before {
    content: "";
    display: block;
    flex-basis: ${props => props.theme.headerHeight};
  } */
  & {
    top:0;
    position: relative;
    max-width: 1000px;
    min-height:500px;
  }
  & ${Caption}{
    display: flex;
    align-items: flex-end;
    user-select:none;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0,
      rgba(0, 0, 0, 0.75) 82%,
      rgba(0, 0, 0, 0.85) 100%
    );
  }

  }
  &:hover ${Caption} {
    display:none;
`;

const SideButton = styled.div`
  width: 10%;
  height: 100%;
  position: fixed;
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

const Images = styled.div`
  user-select: none;
  & img {
    max-width: 100%;
    max-height: 100%;
  }
`;

const PostGalleryPresenter = ({
  post,
  onBackgroundClick,
  currentIndex,
  onPrev,
  onNext,
  filesLength
}) => {
  if (
    post === null ||
    post === undefined ||
    post.files === undefined ||
    post.files === null ||
    post.files[currentIndex] === undefined ||
    post.files[currentIndex] === null
  ) {
    return null;
  }
  return (
    <Wrapper>
      <BackgroundWrapper onClick={onBackgroundClick} />
      <Viewer>
        <Images>
          <img src={post.files[currentIndex].url} alt={post.files[currentIndex].id} />
        </Images>
        {post.files[currentIndex].caption && (
          <Caption currentIndex={currentIndex}>
            <p>
              <SpeechBubbleIcon /> {post.files[currentIndex].caption}
            </p>
          </Caption>
        )}
      </Viewer>
      {filesLength > 1 && (
        <>
          <LeftButton onClick={onPrev}>
            <LeftArrowIcon />
          </LeftButton>
          <RightButton onClick={onNext}>
            <RightArrowIcon />
          </RightButton>
        </>
      )}
    </Wrapper>
  );
};

export default PostGalleryPresenter;
