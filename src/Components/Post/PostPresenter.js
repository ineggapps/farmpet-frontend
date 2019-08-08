import React from "react";
import styled from "styled-components";
import FatText from "../FatText";
import Avatar from "../Avatar";
import DateText from "../DateText";

const Post = styled.div`
  ${props => props.theme.postBox};
`;

const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const UserColumn = styled.div`
  padding-left: 15px;
`;

export default ({ user: { username, avatar }, createdAt }) => {
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
    </Post>
  );
};
