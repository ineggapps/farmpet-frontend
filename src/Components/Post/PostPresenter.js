import React from "react";
import TextareaAutosize from "react-autosize-textarea";
import styled from "styled-components";
import FatText from "../FatText";
import Avatar from "../Avatar";
import DateText from "../DateText";
import Slider from "../Slider";
import { HeartIcon } from "../Icons";
import HeartButton from "../HeartButton";

const Post = styled.div`
  ${props => props.theme.postBox};
`;

const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 40px 40px 0;
`;
const UserColumn = styled.div`
  padding-left: 15px;
`;

const Content = styled.div`
  padding: 10px 40px 20px;
  border-bottom: 1px solid #f4f4f4;
`;

const Caption = styled.p`
  margin: 10px 0;
`;

const Files = styled.div`
  background-color: skyblue;
`;

const CommentArea = styled.div`
  background-color: #fcfcfc;
`;

const CommentViewer = styled.div`
  padding: 0 40px 15px;
`;

const CommentInfo = styled.div`
  font-size: 12px;
  padding: 10px 0;
  border-bottom: 1px solid ${props => props.theme.superLightGreyColor};
`;

const CommentWriter = styled.div`
  padding: 0 40px 15px;
  display: flex;
`;

const InputBox = styled.div`
  width: 90%;
  padding: 3px 5px;
  background-color: #fff;
  border: 1px solid;
  border-color: #f4f4f4;
`;

const Textarea = styled(TextareaAutosize)`
  width: 100%;
  border: 0 none;
  resize: none;
  font-family: ${props => props.theme.fontFamily};
  background: transparent;
  &:focus {
    outline: none;
  }
`;

const Buttons = styled.div`
  width: 100%;
`;

export default ({
  user: { username, avatar },
  caption,
  files,
  isLiked,
  createdAt,
  newComment,
  toggleLike,
  onKeyPress
}) => {
  return (
    <Post>
      <Header>
        <Avatar size="lg" url={avatar} />
        <UserColumn>
          <p>
            <FatText text={username} />
          </p>
          <p>
            <DateText date={createdAt} />
          </p>
        </UserColumn>
      </Header>
      <Content>
        <Caption>{caption}</Caption>
        <Slider files={files} />
        <Buttons>
          <HeartButton onClick={toggleLike} isLiked={isLiked} />
        </Buttons>
      </Content>
      <CommentArea>
        <CommentViewer>
          <CommentInfo>
            Likes <FatText text="몇" /> Comments <FatText text="몇" />
          </CommentInfo>
        </CommentViewer>
        <CommentWriter>
          <Textarea
            placeholder={"Add a comment."}
            value={newComment.value}
            onChange={newComment.onChange}
            onKeyPress={onKeyPress}
          />
        </CommentWriter>
      </CommentArea>
    </Post>
  );
};
