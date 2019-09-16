import React, { useState } from "react";
import Helmet from "react-helmet";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import MainLoader from "../Components/MainLoader";
import PetAvatar from "../Components/PetAvatar";
import FatText from "../Components/FatText";
import EllipsisText from "react-ellipsis-text";
import PostSquare from "../Components/PostSquare";
import Avatar from "../Components/Avatar";
import { Link } from "react-router-dom";
import { PAGE_USER } from "../Components/Routes";
import { WriteIcon } from "../Components/Icons";

const PET_PROFILE = gql`
  query seePet($name: String!) {
    seePet(name: $name) {
      id
      category
      name
      nickname
      avatar
      postsCount
      owners {
        id
        username
        avatar
      }
      bornAt
    }
  }
`;

const SEE_PET_FEED = gql`
  query seePetFeed($name: String!) {
    seePetFeed(name: $name) {
      id
      user {
        id
        username
        avatar
      }
      caption
      files {
        id
        url
        thumbnail
        thumbnail_large
      }
      commentCount
      likeCount
    }
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

const Wrapper = styled.div`
  margin: 70px auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 44px;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: row;
`;

const ControlComponent = styled.div`
  & button {
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

const PetInfo = styled.div`
  display: flex;
  align-items: center;
  & *:not(:last-child) {
    margin-right: 20px;
  }
`;

const PetStatisticsList = styled.ul`
  display: flex;
  margin-top: 20px;
  & li:not(:last-child) {
    margin-right: 30px;
  }
`;

const OwnerList = styled.ul`
  display: grid;
  grid-template-columns: repeat(10, 3fr);
  grid-gap: 10px;
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
const Username = styled(EllipsisText)`
  margin-top: 10px;
  font-size: 0.95em;
  user-select: none !important;
`;

const PostList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 3fr);
  grid-gap: 45px;
  & li {
    width: 300px;
    height: 300px;
  }
`;

const Container = styled.div``;

const Pet = withRouter(({ match: { params: { name } } }) => {
  //펫 네임을 기반으로 pet프로필 조사
  const { data: petData, loading: petLoading } = useQuery(PET_PROFILE, { variables: { name } });
  const { data: feedData, loading: feedLoading } = useQuery(SEE_PET_FEED, { variables: { name } });
  console.log(petData, "petData");

  const [isNameEdit, setIsNameEdit] = useState(false);
  const [isNicknameEdit, setIsNicknameEdit] = useState(false);

  const editName = () => {
    setIsNameEdit(!isNameEdit);
    console.log(isNameEdit, "로 상태 변경");
  };

  const RealContents = petData && petData.seePet && feedData && feedData.seePetFeed && (
    <Container>
      <Content>
        <ProfilePicArea>
          <PetAvatar
            size="xxlg"
            category={petData.seePet.category}
            url={petData.seePet.avatar}
            isBorder={true}
          />
        </ProfilePicArea>
        <ProfileContent>
          <PetInfo>
            <h2>{petData.seePet.name}</h2>
            <ControlComponent>
              <button onClick={() => editName()}>
                <span>수정</span>
                <WriteIcon size="12" />
              </button>
            </ControlComponent>
            <h3>{petData.seePet.bornAt}</h3>
          </PetInfo>
          <PetInfo>{petData.seePet.nickname && <h2>{petData.seePet.nickname}</h2>}</PetInfo>
          <PetStatisticsList>
            <li>
              Posts <FatText text={petData.seePet.postsCount + ""} />
            </li>
          </PetStatisticsList>
        </ProfileContent>
      </Content>
      <Content>
        <OwnerList>
          {petData &&
            petData.seePet &&
            petData.seePet.owners &&
            petData.seePet.owners.length > 0 &&
            petData.seePet.owners.map(owner => (
              <li key={owner.id}>
                <div key={owner.id}>
                  <Link to={`${PAGE_USER(owner.username)}`}>
                    <Avatar category={owner.category} size="lg" url={owner.avatar} />
                    <Username text={owner.username + ""} length={10} />
                  </Link>
                </div>
              </li>
            ))}
        </OwnerList>
      </Content>
      <Content>
        <PostList>
          {feedData &&
            feedData.seePetFeed &&
            feedData.seePetFeed.length > 0 &&
            feedData.seePetFeed.map(post => (
              <li key={post.id}>
                <PostSquare post={post} />
              </li>
            ))}
        </PostList>
      </Content>
    </Container>
  );

  if (petData && !petLoading) {
    return (
      <Wrapper>
        <Helmet>
          <title>Pet Profile | Farmpet</title>
        </Helmet>
        <Contents>{RealContents}</Contents>
      </Wrapper>
    );
  } else {
    return <MainLoader />;
  }
});

export default Pet;
