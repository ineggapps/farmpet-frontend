import React from "react";
import styled from "styled-components";
import Avatar from "../Avatar";
import DateText from "../DateText";
import FatText from "../FatText";
import { RemoveIcon } from "../Icons";

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
  &:hover button {
    visibility: visible;
  }
`;

const CommentText = styled.div``;

const CommentSubTitle = styled.div`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  padding: 5px 0;
  & * {
    margin-right: 5px;
  }
`;

const ControlComponents = styled.ul`
  display: flex;
  justify-content: center;
  & li:first-child {
    margin-right: 5px;
  }
`;

const CommentWriter = styled.div`
  border-top: 1px solid ${props => props.theme.superLightGreyColor};
  padding: 15px 40px 15px;
  display: flex;
`;

const ControlComponent = styled.li`
  & button {
    visibility: hidden;
    cursor: pointer;
    span {
      display: none;
    }
    padding: 0;
    margin: 0;
    border: 0 none;
    background: 0 none;
    &:focus {
      outline: none;
    }
  }
  & svg {
    fill: ${props => props.theme.lightGreyColor};
  }
`;

const PostCommentPresenter = ({
  id,
  comment,
  user: { id: userId, avatar, username },
  deleteComment
}) => {
  return (
    <CommentList key={comment.id}>
      <CommentContainer>
        <Avatar url={comment.user.avatar} size={"md"} />
        <CommentContent>
          <CommentSubTitle>
            <div>
              <FatText text={comment.user.username} />
              <DateText date={comment.createdAt} />
            </div>
            {comment.user.id === userId && (
              <ControlComponents>
                <ControlComponent>
                  <button onClick={() => deleteComment(comment.id)}>
                    <span>삭제</span>
                    <RemoveIcon size="12" />
                  </button>
                </ControlComponent>
              </ControlComponents>
            )}
          </CommentSubTitle>
          <CommentText>
            <p>{comment.text}</p>
          </CommentText>
        </CommentContent>
      </CommentContainer>
    </CommentList>
  );
};

export default PostCommentPresenter;