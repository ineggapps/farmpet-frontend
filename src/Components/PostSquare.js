import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  width: 300px;
  height: 300px;
  background-image: url(${props => props.background});
  background-size: cover;
  background-position: center;
`;

const Overlay = styled.div`
  color: ${props => props.theme.lightGreyColor};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    opacity: 1;
  }
  opacity: 0;
  transition: opacity linear 0.3s;
  background: rgba(0, 0, 0, 0.7);
`;

//포스트스퀘어에서 전용 뷰어를 열기 위해 일단 post객체를 통째로 받아오도록 설계

const PostSquare = ({ post }) => {
  const background =
    post && post.files && post.files.length > 0 ? post.files[0].thumbnail_large : null;
  return (
    <Container background={background}>
      <Overlay>
        {post.id}/{post.user.username}/{post.caption}
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
