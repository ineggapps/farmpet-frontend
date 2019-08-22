import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import Avatar from "../../Components/Avatar";
import FollowButtonNormal from "../../Components/FollowButtonNormal";
import FatText from "../../Components/FatText";
import PetAvatar from "../../Components/PetAvatar";
import EllipsisText from "react-ellipsis-text";

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
    margin-bottom: 44px;
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

const PetList = styled.ul`
  display: grid;
  grid-template-columns: repeat(8, 3fr);
  grid-gap: 37.5px;
  & li {
    & > div {
      flex-direction: column;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
    & span {
      min-width: 100%;
    }
    width: 90px;
    max-width: 90px;
  }
`;
const PetName = styled(EllipsisText)`
  font-size: 0.95em;
`;

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
  console.log(user, "프로필 출력");
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
              게시물 <FatText text={user.postsCount + ""} />
            </li>
            <li>
              팔로워 <FatText text={followersCount + ""} />
            </li>
            <li>
              팔로잉 <FatText text={followingCount + ""} />
            </li>
          </UserStatisticsList>
          <span>{user.bio}</span>
        </ProfileContent>
      </Content>
      <Content>
        <PetList>
          {user.pets &&
            user.pets.length > 0 &&
            user.pets.map(pet => (
              <li>
                <div key={pet.id}>
                  <PetAvatar size="xlg" url={pet.avatar} />
                  <PetName text={pet.name} length={"10"} />
                </div>
              </li>
            ))}
        </PetList>
      </Content>
      <Content>
        <ul>
          {feed &&
            feed.length > 0 &&
            feed.map(post => (
              <li>
                <div>
                  {post.id}/{post.caption}
                </div>
              </li>
            ))}
        </ul>
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
