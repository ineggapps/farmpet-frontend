import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import Avatar from "../../Components/Avatar";
import FollowButtonNormal from "../../Components/FollowButtonNormal";
import FatText from "../../Components/FatText";
import PetAvatar from "../../Components/PetAvatar";
import EllipsisText from "react-ellipsis-text";
import PostSquare from "../../Components/PostSquare";
import { userInfo } from "os";

const Wrapper = styled.div`
  width: 975px;
  margin: 70px auto 0;
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
  & > * {
    margin-bottom: 44px;
  }
`;

const ProfilePicArea = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
  margin-right: 30px;
  & > div {
    border: 1px solid ${props => props.theme.superLightGreyColor};
  }
`;

const ProfileContent = styled.section`
  display: flex;
  padding-top: 10px;
  flex-direction: column;
  flex-grow: 2;

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
  & *:not(:last-child) {
    margin-right: 20px;
  }
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
  margin-top: 10px;
  font-size: 0.95em;
  user-select: none;
`;

const PostList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 3fr);
  grid-gap: 37.5px;
  & li {
    width: 300px;
    height: 300px;
  }
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
            {user.isSelf ? (
              <span>프로필 편집</span>
            ) : (
              <FollowButtonNormal isFollowing={user.isFollowing} id={user.id} />
            )}
          </UserInfo>
          <UserStatisticsList>
            <li>
              Posts <FatText text={user.postsCount + ""} />
            </li>
            <li>
              Followers <FatText text={followersCount + ""} />
            </li>
            <li>
              Followings <FatText text={followingCount + ""} />
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
              <li key={pet.id}>
                <div key={pet.id}>
                  <PetAvatar category={pet.category} size="xlg" url={pet.avatar} />
                  <PetName text={pet.name + ""} length={10} />
                </div>
              </li>
            ))}
        </PetList>
      </Content>
      <Content>
        <PostList>
          {feed &&
            feed.length > 0 &&
            feed.map(post => (
              <li key={post.id}>
                <PostSquare post={post} />
              </li>
            ))}
        </PostList>
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
