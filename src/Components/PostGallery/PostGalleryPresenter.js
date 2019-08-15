import React from "react";
import styled from "styled-components";
import { LeftArrowIcon, RightArrowIcon } from "../Icons";

const Wrapper = styled.div`
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
  top: -${props => props.theme.headerHeight};
  width: 100%;
  height: 100%;
`;

const Viewer = styled.div`
  /* &:before {
    content: "";
    display: block;
    flex-basis: ${props => props.theme.headerHeight};
  } */
  & {
    top: -${props => props.theme.headerHeight};
    position: relative;
    max-width: 1000px;
    height: 80%;
    min-height:500px;
    overflow: scroll;
    background-color: red;
  }
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
  width: 100%;
  height: 100%;
`;

const ImageList = styled.li``;

const PostGalleryPresenter = ({ post, onBackgroundClick, currentIndex, onPrev, onNext }) => {
  return (
    <Wrapper>
      <BackgroundWrapper onClick={onBackgroundClick} />
      <Viewer>
        <Images>
          <img src={post.files[currentIndex].url} alt={post.files[currentIndex].id} />
        </Images>
      </Viewer>
      <LeftButton onClick={onPrev}>
        <LeftArrowIcon />
      </LeftButton>
      <RightButton onClick={onNext}>
        <RightArrowIcon />
      </RightButton>
    </Wrapper>
  );
};

export default PostGalleryPresenter;
