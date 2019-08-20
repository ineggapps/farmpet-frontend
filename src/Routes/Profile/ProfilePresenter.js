import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import Avatar from "../../Components/Avatar";
import FollowButtonNormal from "../../Components/FollowButtonNormal";
import FatText from "../../Components/FatText";

const Wrapper = styled.div`
  width: 975px;
  margin: 50px auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
`;

const Contents = styled(Content)`
  flex-direction: column;
  & > *:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const ProfilePicArea = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
  margin-right: 30px;
`;

const ProfileContent = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  background-color: skyblue;

  h2 {
    font-size: 1.8em;
  }

  & *:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserStatisticsList = styled.ul`
  display: flex;
  & li:not(:last-child) {
    margin-right: 30px;
  }
`;

const PetContents = styled.div``;

const ProfilePresenter = ({
  feed,
  user,
  //팔로잉 관련된 변수
  followingCount,
  setFollowingCount,
  followersCount,
  setFollowersCount,
  isFollowing,
  onFollowClick
}) => {
  const RealContents = (
    <>
      <Content>
        <ProfilePicArea>
          <Avatar size="xxlg" url={user.avatar} isBorder={true} />
        </ProfilePicArea>
        <ProfileContent>
          <UserInfo>
            <h2>{user.username}</h2>
            {user.isSelf ? <span>프로필 편집</span> : <FollowButtonNormal />}
          </UserInfo>
          <UserStatisticsList>
            <li>
              게시물 <FatText text={user.postsCount} />
            </li>
            <li>
              팔로워 <FatText text={followersCount} />
            </li>
            <li>
              팔로잉 <FatText text={followingCount} />
            </li>
          </UserStatisticsList>
          <span>{user.bio}</span>
        </ProfileContent>
      </Content>
      <Content>내가 키우는 펫 영역이 들어갈 자리</Content>
      <Content>
        포스트 그리드 정렬 (content 태그 안에 별도의 div태그 만들어서 그리드로 정렬하기)
      </Content>
    </>
  );

  return (
    <Wrapper>
      <Helmet>
        <title>@{user.username} | Farmpet</title>
      </Helmet>
      <Contents>{RealContents}</Contents>
    </Wrapper>
  );
};

export default ProfilePresenter;
