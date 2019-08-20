import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: row;
`;

const UserContents = styled.header`
  width: 100%;
  height: 400px;
  background-color: ${props => props.theme.superGreyColor};
  display: flex;
`;

const ProfilePicArea = styled.div`
  flex-grow: 1;
`;

const ProfileContent = styled.section`
  flex-grow: 4;
  background-color: red;
`;

const ProfilePresenter = ({ feed, user }) => {
  const RealContents = (
    <>
      <UserContents>
        <ProfilePicArea>
          <img src={user.avatar} />
        </ProfilePicArea>
        <ProfileContent>
          <div>
            <h2>유저이름</h2>
            <span>팔로우</span>
          </div>
          <ul>
            <li>게시물: 999</li>
            <li>팔로워: 999</li>
            <li>팔로잉: 999</li>
          </ul>
        </ProfileContent>
      </UserContents>
    </>
  );

  console.log(user, "수고했다 넌 어떻게 왔니?");

  return (
    <Wrapper>
      <Helmet>
        <title>Feed | Farmpet</title>
      </Helmet>
      <Contents>{RealContents}</Contents>
    </Wrapper>
  );
};

export default ProfilePresenter;
