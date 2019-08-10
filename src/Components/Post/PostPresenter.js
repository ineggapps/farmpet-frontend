import React from "react";
import TextareaAutosize from "react-autosize-textarea";
import styled from "styled-components";
import FatText from "../FatText";
import Avatar from "../Avatar";
import DateText from "../DateText";
import Slider from "../Slider";
import { HeartIcon } from "../Icons";
import HeartButton from "../HeartButton";
import PetAvatar from "../PetAvatar";

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
  word-break: break-word;
  line-height: 1.35;
  margin: 10px 0;
  white-space: pre-line;
`;

const Files = styled.div`
  background-color: skyblue;
`;

const CommentArea = styled.div`
  background-color: #fcfcfc;
`;

const CommentViewer = styled.div`
  padding: 15px 40px 0;
`;

const CommentInfo = styled.div`
  font-size: 12px;
  padding: 10px 0;
  & span {
    margin: 0 3px;
  }
  user-select: none;
  border-bottom: 1px solid ${props => props.theme.superLightGreyColor};
`;

const Comments = styled.ul`
  padding: 10px 0;
  &:last-child {
  }
`;

const CommentList = styled.li`
  margin-bottom: 10px;
`;

const CommentContainer = styled.div`
  padding: 5px 0;
  display: flex;
`;

const CommentContent = styled.div`
  padding-left: 8px;
  font-size: 0.8em;
  & p {
    line-height: 1.35;
  }
`;

const CommentSubTitle = styled.p`
  padding: 5px 0;
  & * {
    margin-right: 5px;
  }
`;

const CommentWriter = styled.div`
  border-top: 1px solid ${props => props.theme.superLightGreyColor};
  padding: 15px 40px 15px;
  display: flex;
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

const ContentFooter = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Buttons = styled.div``;

const Pets = styled.ul`
  display: flex;
`;

const Pet = styled.li`
  position: relative;
  &:not(:last-child) {
    margin-right: 5px;
  }
  & span {
    text-align: center;
    width: 100%;
    position: absolute;
    top: 40px;
    background-color: skyblue;
    display: none;
    font-size: 0.75em;
    letter-spacing: -0.8px;
  }
  &:hover span {
    display: inline-block;
  }
`;

export default ({
  user: { username, avatar },
  pets,
  id,
  files,
  caption,
  likeCount,
  isLiked,
  comments,
  commentCount,
  createdAt,
  newComment,
  toggleLike,
  setIsLiked,
  setLikeCount,
  onKeyPress,
  selfComments
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
        <ContentFooter>
          <Buttons>
            <HeartButton onClick={toggleLike} isLiked={isLiked} />
          </Buttons>
          <Pets>
            {pets &&
              pets.map(pet => (
                <Pet key={pet.id}>
                  <PetAvatar category={pet.category} url={pet.avatar} size="md" />
                  <span>{pet.name}</span>
                </Pet>
              ))}
          </Pets>
        </ContentFooter>
      </Content>
      <CommentArea>
        {likeCount + commentCount > 0 && (
          <CommentViewer>
            <CommentInfo>
              Like{likeCount > 1 ? "s" : ""} <FatText text={`${likeCount}`} /> Comment
              {commentCount > 1 ? "s" : ""} <FatText text={`${commentCount}`} />
            </CommentInfo>
            <Comments>
              {/* 실제 DB에서 불러오는 코멘트 */
              comments.map(comment => (
                <CommentList key={comment.id}>
                  <CommentContainer>
                    <Avatar url={comment.user.avatar} size={"md"} />
                    <CommentContent>
                      <CommentSubTitle>
                        <FatText text={comment.user.username} />
                        <DateText date={comment.createdAt} />
                      </CommentSubTitle>
                      <p>{comment.text}</p>
                    </CommentContent>
                  </CommentContainer>
                </CommentList>
              ))}
              {/* 실제 DB에서 불러오는 코멘트 */
              selfComments.map(comment => (
                <CommentList key={comment.id}>
                  <CommentContainer>
                    <Avatar url={comment.user.avatar} size={"md"} />
                    <CommentContent>
                      <CommentSubTitle>
                        <FatText text={comment.user.username} />
                        <DateText date={comment.createdAt} />
                      </CommentSubTitle>
                      <p>{comment.text}</p>
                    </CommentContent>
                  </CommentContainer>
                </CommentList>
              ))}
            </Comments>
          </CommentViewer>
        )}
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
