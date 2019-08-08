import React from "react";
import styled from "styled-components";
import FatText from "../FatText";
import Avatar from "../Avatar";
import DateText from "../DateText";
import Slider from "../Slider";

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
  padding: 40px 40px 0;
  border-bottom: 1px solid #f4f4f4;
`;

const Caption = styled.p`
  margin: 10px 0;
`;

const Files = styled.div`
  background-color: skyblue;
`;

const CommentArea = styled.div`
  background-color: #f4f4f4;
`;

const CommentViewer = styled.div`
  padding: 0 40px 15px;
`;

const CommentInfo = styled.div`
  font-size: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #eeeeee;
`;

const CommentWriter = styled.div`
  padding: 0 40px 15px;
`;

export default ({ user: { username, avatar }, caption, files, createdAt }) => {
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
      </Content>
      <CommentArea>
        <CommentViewer>
          <CommentInfo>
            좋아요 <FatText text="몇" /> 댓글 <FatText text="몇" />
          </CommentInfo>
        </CommentViewer>
        <CommentWriter>Writing Area</CommentWriter>
      </CommentArea>
    </Post>
  );
};
