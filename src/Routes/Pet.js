import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "react-apollo-hooks";
import MainLoader from "../Components/MainLoader";
import PetAvatar from "../Components/PetAvatar";
import FatText from "../Components/FatText";
import EllipsisText from "react-ellipsis-text";
import PostSquare from "../Components/PostSquare";
import Avatar from "../Components/Avatar";
import { Link } from "react-router-dom";
import { PAGE_USER } from "../Components/Routes";
import InstantEditText from "../Components/InstantEditText";
import useInput from "../Hooks/useInput";

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
const UPDATE_PET = gql`
  mutation updatePet(
    $id: String!
    $name: String
    $nickname: String
    $avatar: String
    $bornAt: String
  ) {
    updatePet(id: $id, name: $name, nickname: $nickname, avatar: $avatar, bornAt: $bornAt)
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

  const [updatePetMutation] = useMutation(UPDATE_PET);
  //pet name
  const [isNameEdit, setIsNameEdit] = useState(false);
  const nameInput = useInput(name);
  //pet nickname
  const [isNicknameEdit, setIsNicknameEdit] = useState(false);
  const nicknameInput = useInput();

  const editNameEdit = () => {
    setIsNameEdit(true);
  };

  const editNameSave = async () => {
    try {
      if (petData && petData.seePet) {
        const result = await updatePetMutation({
          variables: {
            id: petData.seePet.id,
            name: nameInput.value
          }
        });
        if (!result.updatePet) {
          throw Error("returned false");
        }
      }
    } catch (error) {
      console.log(error);
      if (petData && petData.seePet) {
        nameInput.setValue(petData.seePet.name);
      }
    } finally {
      setIsNameEdit(false);
    }
  };

  const editNameCancel = () => {
    nameInput.setValue(name);
    setIsNameEdit(false);
  };

  const editNicknameEdit = () => {
    setIsNicknameEdit(true);
  };

  const editNicknameSave = async () => {
    try {
      if (petData && petData.seePet) {
        const result = await updatePetMutation({
          variables: {
            id: petData.seePet.id,
            nickname: nicknameInput.value
          }
        });
        if (!result.updatePet) {
          throw Error("returned false");
        }
      }
    } catch (error) {
      console.log(error);
      nicknameInput.setValue(petData.seePet.nickname);
    } finally {
      setIsNicknameEdit(false);
    }
    setIsNicknameEdit(false);
  };

  const editNicknameCancel = () => {
    if (petData && petData.seePet) {
      nicknameInput.setValue(petData.seePet.nickname);
    }
    setIsNicknameEdit(false);
  };

  useEffect(() => {
    if (petData && petData.seePet && !isNicknameEdit && nicknameInput.value === undefined) {
      nicknameInput.setValue(petData.seePet.nickname);
    }
  });

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
            <h2>
              <InstantEditText
                isEditMode={isNameEdit}
                placeholder={petData.seePet.name}
                onChange={nameInput.onChange}
                value={nameInput.value}
                type={"text"}
                onEditClick={editNameEdit}
                onCancelClick={editNameCancel}
                onSaveClick={editNameSave}
              />
            </h2>{" "}
            <h3>{petData.seePet.bornAt}</h3>
          </PetInfo>
          <PetInfo>
            {petData.seePet.nickname && (
              <>
                <h2>
                  <InstantEditText
                    isEditMode={isNicknameEdit}
                    placeholder={petData.seePet.nickname}
                    onChange={nicknameInput.onChange}
                    value={nicknameInput.value}
                    type={"text"}
                    onEditClick={editNicknameEdit}
                    onCancelClick={editNicknameCancel}
                    onSaveClick={editNicknameSave}
                  />
                </h2>
              </>
            )}
          </PetInfo>
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
