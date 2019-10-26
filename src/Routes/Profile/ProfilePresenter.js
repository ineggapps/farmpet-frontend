import React, { useState } from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import Avatar from "../../Components/Avatar";
import FollowButtonNormal from "../../Components/FollowButtonNormal";
import FatText from "../../Components/FatText";
import PetAvatar from "../../Components/PetAvatar";
import EllipsisText from "react-ellipsis-text";
import PostSquare from "../../Components/PostSquare";
import { Link } from "react-router-dom";
import { PAGE_PET, PAGE_ACCOUNT, PAGE_USER, PAGE_POST } from "../../Components/Routes";
import InstantEditText from "../../Components/InstantEditText";
import useInput from "../../Hooks/useInput";

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
  align-items: baseline;
  & > *:not(:last-child) {
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
  grid-template-columns: repeat(10, 1fr);
  grid-gap: 19.6px;
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
    width: 80px;
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

const NonDisplayFileInput = styled.input`
  display: none;
`;

const ProfilePresenter = ({
  feed,
  user,
  me,
  updateUserMutation,
  fileInput,
  onFileChange,
  userAvatarUrl,
  setUserAvatarUrl,
  //팔로잉 관련된 변수
  followingCount,
  setFollowingCount,
  followersCount,
  setFollowersCount,
  isFollowing,
  onFollowClick,
  //withRouter
  history
}) => {
  /*
    원래 이 코드들은 Container 부에 들어가는 것이 맞지만
    데이터가 로딩되고 나서 기존 데이터를 fake로 수정해주는 역할 또한 필요하기 때문에 
    Presenter에 배치하게 되었음.
    ex)
    username을 수정하면 가져온 데이터에서도 username을 수정해둬야 한다.
    => A유저가 또 username을 B로 수정을 시도했을 때 Cancel버튼을 누르면 바뀐 username인 B가 들어가야 함.
  */

  //username 변경
  const [isUsernameEdit, setIsUsernameEdit] = useState(false);
  const usernameInput = useInput(me.username);
  const usernameEdit = () => {
    setIsUsernameEdit(true);
  };
  const usernameSave = async () => {
    try {
      const result = await updateUserMutation({
        variables: {
          username: usernameInput.value
        }
      });
      if (!result.data.updateAccount) {
        throw Error();
      }
      me.username = usernameInput.value;
      history.replace(PAGE_USER(usernameInput.value.toLowerCase()));
    } catch (error) {
      usernameInput.setValue(me.username);
    } finally {
      setIsUsernameEdit(false);
    }
  };
  const usernameCancel = () => {
    usernameInput.setValue(me.username);
    setIsUsernameEdit(false);
  };

  //firstName 변경
  const [isFirstNameEdit, setIsFirstNameEdit] = useState(false);
  const firstNameInput = useInput(me.firstName);
  const firstNameEdit = () => {
    setIsFirstNameEdit(true);
  };
  const firstNameSave = async () => {
    try {
      const result = await updateUserMutation({
        variables: {
          firstName: firstNameInput.value
        }
      });
      if (!result.updateAccount) {
        throw Error();
      }
      me.firstName = firstNameInput.value;
    } catch (error) {
      firstNameInput.setValue(me.firstName);
    } finally {
      setIsFirstNameEdit(false);
    }
  };
  const firstNameCancel = () => {
    firstNameInput.setValue(me.firstName);
    setIsFirstNameEdit(false);
  };

  //lastName 변경
  const [isLastNameEdit, setIsLastNameEdit] = useState(false);
  const lastNameInput = useInput(me.lastName);
  const lastNameEdit = () => {
    setIsLastNameEdit(true);
  };
  const lastNameSave = async () => {
    try {
      const result = await updateUserMutation({
        variables: {
          lastName: lastNameInput.value
        }
      });
      if (!result.updateAccount) {
        throw Error();
      }
      me.lastName = lastNameInput.value;
    } catch (error) {
      lastNameInput.setValue(me.lastName);
    } finally {
      setIsLastNameEdit(false);
    }
  };
  const lastNameCancel = () => {
    lastNameInput.setValue(me.lastName);
    setIsLastNameEdit(false);
  };

  //bio 변경
  const [isBioEdit, setIsBioEdit] = useState(false);
  const bioInput = useInput(me.bio);
  const bioEdit = () => {
    setIsBioEdit(true);
  };
  const bioSave = async () => {
    try {
      const result = await updateUserMutation({
        variables: {
          bio: bioInput.value
        }
      });
      if (!result.updateAccount) {
        throw Error();
      }
      me.bio = bioInput.value;
    } catch (error) {
      console.log(error);
    } finally {
      setIsBioEdit(false);
    }
  };
  const bioCancel = () => {
    bioInput.setValue(me.bio);
    setIsBioEdit(false);
  };

  console.log(user, "프로필 출력");
  console.log(me, "내 정보");
  const RealContents = (
    <>
      <Content>
        <ProfilePicArea>
          <NonDisplayFileInput
            type="file"
            accept="image/*"
            ref={fileInput}
            onChange={onFileChange}
          />
          <Avatar
            size="xxlg"
            url={userAvatarUrl}
            isBorder={true}
            onClick={() => {
              if (user.isSelf) {
                fileInput.current.click();
                console.log("나임");
              } else {
                console.log("타 사용자");
              }
            }}
          />
        </ProfilePicArea>
        <ProfileContent>
          <UserInfo>
            <h2>
              {user.isSelf ? (
                <InstantEditText
                  isEditMode={isUsernameEdit}
                  placeholder={usernameInput.value}
                  onChange={usernameInput.onChange}
                  value={usernameInput.value}
                  type={"text"}
                  onEditClick={usernameEdit}
                  onSaveClick={usernameSave}
                  onCancelClick={usernameCancel}
                />
              ) : (
                user.username
              )}
            </h2>
            {!user.isSelf && <FollowButtonNormal isFollowing={user.isFollowing} id={user.id} />}
            {/* {user.isSelf ? (
              <span>
                <Link to={PAGE_ACCOUNT}>프로필 편집</Link>
              </span>
            ) : (
              <FollowButtonNormal isFollowing={user.isFollowing} id={user.id} />
            )} */}
            <h3>
              {user.isSelf ? (
                <InstantEditText
                  isEditMode={isFirstNameEdit}
                  placeholder={firstNameInput.value}
                  onChange={firstNameInput.onChange}
                  value={firstNameInput.value}
                  type={"text"}
                  onEditClick={firstNameEdit}
                  onSaveClick={firstNameSave}
                  onCancelClick={firstNameCancel}
                />
              ) : (
                user.firstName
              )}
            </h3>
            <h3>
              {user.isSelf ? (
                <InstantEditText
                  isEditMode={isLastNameEdit}
                  placeholder={lastNameInput.value}
                  onChange={lastNameInput.onChange}
                  value={lastNameInput.value}
                  type={"text"}
                  onEditClick={lastNameEdit}
                  onSaveClick={lastNameSave}
                  onCancelClick={lastNameCancel}
                />
              ) : (
                user.lastName
              )}
            </h3>
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
          <span>
            {user.isSelf ? (
              <InstantEditText
                isEditMode={isBioEdit}
                placeholder={bioInput.value}
                onChange={bioInput.onChange}
                value={bioInput.value}
                type={"text"}
                onEditClick={bioEdit}
                onSaveClick={bioSave}
                onCancelClick={bioCancel}
              />
            ) : (
              user.bio
            )}
          </span>
        </ProfileContent>
      </Content>
      <Content>
        <PetList>
          {user.pets &&
            user.pets.length > 0 &&
            user.pets.map(pet => (
              <li key={pet.id}>
                <div key={pet.id}>
                  <Link to={`${PAGE_PET(pet.name)}`}>
                    <PetAvatar category={pet.category} size="xlg" url={pet.avatar} />
                    <PetName text={pet.name + ""} length={10} />
                  </Link>
                </div>
              </li>
            ))}
        </PetList>
      </Content>
      {/* <Content>프로필 편집 Area</Content> */}
      <Content>
        <PostList>
          {feed &&
            feed.length > 0 &&
            feed.map(post => (
              <li key={post.id}>
                <Link to={`${PAGE_POST(post.id)}`}>
                  <PostSquare post={post} />
                </Link>
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
