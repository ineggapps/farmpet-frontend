import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  z-index: 3000;
  position: fixed;
  top: -${props => props.theme.headerHeight};
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
  width: 100%;
  height: 120%;
`;

const Viewer = styled.div`
  position: relative;
  top: ${props => props.theme.headerHeightSize / 2}px;
  width: 600px;
  height: 600px;
  background-color: red;
`;

const PostGalleryPresenter = ({ post }) => {
  return (
    <Wrapper>
      <BackgroundWrapper />
      <Viewer>content{post.id}</Viewer>
    </Wrapper>
  );
};

export default PostGalleryPresenter;
