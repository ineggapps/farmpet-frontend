import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { SpeechBubbleIcon, HeartIcon } from "./Icons";

const Container = styled.div`
  cursor: pointer;
  position: relative;
  width: 300px;
  height: 300px;
  background-image: url(${props => props.background});
  background-size: cover;
  background-position: center;
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    opacity: 1;
  }
  opacity: 0;
  transition: opacity linear 0.2s;
  background: rgba(0, 0, 0, 0.8);
`;

const ToolTip = styled.div`
  user-select: none;
  &:first-child {
    margin-right: 30px;
  }
  svg {
    margin-right: 5px;
  }
  display: block;
  font-weight: bold;
  color: ${props => props.theme.lightGreyColor};
`;

//포스트스퀘어에서 전용 뷰어를 열기 위해 일단 post객체를 통째로 받아오도록 설계

const PostSquare = ({ post }) => {
  const background =
    post && post.files && post.files.length > 0 ? post.files[0].thumbnail_large : null;
  return (
    <Container background={background}>
      <Overlay>
        <ToolTip>
          <HeartIcon fill="white" size="20" /> {post.likeCount}
        </ToolTip>
        <ToolTip>
          <SpeechBubbleIcon fill="white" size="20" />
          {post.commentCount}
        </ToolTip>
      </Overlay>
    </Container>
  );
};

PostSquare.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      username: PropTypes.string.isRequired
    }).isRequired,
    pets: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        category: PropTypes.string,
        name: PropTypes.string,
        avatar: PropTypes.string
      })
    ),
    files: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        url: PropTypes.string,
        thumbnail_large: PropTypes.string,
        caption: PropTypes.string
      })
    ),
    caption: PropTypes.string.isRequired,
    likeCount: PropTypes.number.isRequired,
    commentCount: PropTypes.number.isRequired
  })
};

export default PostSquare;
