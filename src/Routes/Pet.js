import React, { useState, useEffect, useRef } from "react";
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
import { PAGE_USER, PAGE_PET, PAGE_POST } from "../Components/Routes";
import InstantEditText from "../Components/InstantEditText";
import useInput from "../Hooks/useInput";
import { ME, UPLOAD_API_AVATAR_NAME } from "../SharedQueries";
import { PlusButtonIcon } from "../Components/Icons";
import AddOwner from "../Components/AddOwner";
import { useOverlay } from "../OverlayContext";
import { getAddress } from "../GlobalVariables";
import { TOKEN } from "../Apollo/LocalState";
import axios from "axios";
import uuidv4 from "uuid/v4";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";

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

const SEE_CANDIDATE = gql`
  query seeCandidate($petname: String!) {
    seeCandidate(petname: $petname) {
      id
      avatar
      username
      firstName
      lastName
    }
  }
`;

const ADD_OWNERS = gql`
  mutation addOwners($petname: String!, $owners: [String!]!) {
    addOwners(petname: $petname, owners: $owners)
  }
`;

const DELETE_OWNER = gql`
  mutation deleteOwner($petname: String!, $username: String!) {
    deleteOwner(petname: $petname, username: $username)
  }
`;

const ProfilePicArea = styled.div`
  width: 300px;
  display: flex;
  justify-content: center;
  /* flex-grow: 1; */
  margin-right: 30px;
  & > div {
    border: 1px solid ${props => props.theme.superLightGreyColor};
  }
`;

const ProfileContent = styled.section`
  display: flex;
  padding-top: 10px;
  flex-direction: column;
  /* flex-grow: 2; */

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
  & > *:not(:last-child) {
    margin-right: 20px;
  }
  & h2 {
    height: 40px;
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

const Owner = styled.div`
  position: relative;
  & > *:nth-child(2) {
  }
`;

const AddOwnerButton = styled.div`
  & svg {
    fill: #999999;
  }
  &:hover svg {
    fill: #777777;
  }
  cursor: pointer;
`;

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

const Container = styled.div``;

const Pet = withRouter(({ match: { params: { name } }, history }) => {
  const classes = useStyles();

  //펫 네임을 기반으로 pet프로필 조사
  const { data: meData, loading: meLoading } = useQuery(ME);
  const { data: petData, loading: petLoading } = useQuery(PET_PROFILE, {
    variables: { name },
    fetchPolicy: "cache-and-network"
  });
  const { data: candidateData, loading: candidateLoading } = useQuery(SEE_CANDIDATE, {
    variables: { petname: name },
    fetchPolicy: "cache-and-network"
  });
  const { data: feedData, loading: feedLoading } = useQuery(SEE_PET_FEED, {
    variables: { name },
    fetchPolicy: "cache-and-network"
  });
  // console.log(petData, "petData");
  const [updatePetMutation] = useMutation(UPDATE_PET);
  //pet name
  const [isNameEdit, setIsNameEdit] = useState(false);
  const nameInput = useInput(name);
  //pet avatar
  const [petAvatarUrl, setPetAvatarUrl] = useState(null);

  //pet nickname
  const [isNicknameEdit, setIsNicknameEdit] = useState(false);
  const nicknameInput = useInput();

  //add pet owner r
  const [addOwnersMutation] = useMutation(ADD_OWNERS);
  const [deleteOwnerMutation] = useMutation(DELETE_OWNER);
  const [petOwners, setPetOwners] = useState();
  const [isAddOwnerMode, setIsAddOwnerMode] = useState(false);
  const { isShow, setIsShow } = useOverlay();

  const onQualify = async chosenUser => {
    console.log("onQualify clicked", chosenUser);
    const result = await addOwnersMutation({
      variables: { petname: name, owners: chosenUser.map(c => c.username) }
    });
    //소유자 추가 요청 쿼리문
    if (result.data.addOwners) {
      // console.log(result.data.addOwners);
      setPetOwners([...petOwners, ...chosenUser]);
    }
    //소유자 목록 후보에서 제거
    // if (candidateData && candidateData.seeCandidate) {
    chosenUser.forEach(u => {
      candidateData.seeCandidate = candidateData.seeCandidate.filter(
        c => c.username !== u.username
      );
    });
    // }
    toggleOwnerMode();
  };

  const onDelete = async username => {
    //연습용 코드 setPetOwners(petOwners.filter(p => p.id !== ownerId));
    const result = await deleteOwnerMutation({
      variables: { petname: name, username }
    });
    //소유자 추가 요청 쿼리문
    if (result.data.deleteOwner) {
      // console.log(result.data.addOwners);
      candidateData.seeCandidate = petOwners.filter(p => p.username === username);
      setPetOwners(petOwners.filter(p => p.username !== username));
    }
  };

  const onClose = async () => {
    console.log("onClose clicked");
    toggleOwnerMode();
  };

  const toggleOwnerMode = async () => {
    setIsAddOwnerMode(!isAddOwnerMode);
    setIsShow(!isShow);
  };

  const editNameEdit = () => {
    setIsNameEdit(true);
  };

  const editNameSave = async () => {
    try {
      if (petData && petData.seePet) {
        nameInput.setValue(nameInput.value.toLowerCase());
        const result = await updatePetMutation({
          variables: {
            id: petData.seePet.id,
            name: nameInput.value
          }
        });
        if (!result.data.updatePet) {
          throw Error("returned false");
        }
        petData.seePet.name = nameInput.value;
        history.replace(PAGE_PET(nameInput.value));
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
        if (!result.data.updatePet) {
          throw Error("returned false");
        }
        petData.seePet.nickname = nicknameInput.value;
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
    //petAvatar 초기화
    if (
      (petAvatarUrl === undefined || petAvatarUrl === null) &&
      petData &&
      petData.seePet &&
      petData.seePet.avatar
    ) {
      setPetAvatarUrl(petData.seePet.avatar);
    }
    //pet owner 초기화
    if (petOwners === undefined && petData && petData.seePet && petData.seePet.owners) {
      setPetOwners(petData.seePet.owners.map(owner => owner));
      console.log(petData.seePet.owners, "음음", petOwners);
    }
    //nickname 설정하기
    if (petData && petData.seePet && !isNicknameEdit && nicknameInput.value === undefined) {
      if (petData.seePet.nickname === null || petData.seePet.nickname === undefined) {
        petData.seePet.nickname = "...";
      }
      nicknameInput.setValue(petData.seePet.nickname);
    }
  });

  const NonDisplayFileInput = styled.input`
    display: none;
  `;
  const fileInput = useRef(null);
  const onFileChange = () => {
    handleSubmit();
  };
  const handleSubmit = async () => {
    const image = fileInput.current.files[0];
    if (image !== undefined) {
      //이미지를 첨부한 경우
      console.log(image, "이미지");
      const formData = new FormData();
      formData.append(UPLOAD_API_AVATAR_NAME, image);
      const options = {
        method: "POST",
        url: getAddress("api/upload/pet"),
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem(TOKEN)}`
        },
        data: formData
      };
      const { data } = await axios(options);
      console.log(data);
      if (data.url !== undefined && data.url !== null) {
        //mutation 전송 시도
        //굳이 url을 받고 다시 서버측으로 전송하려는 이유?
        //나중에 raw파일을 업로드하고 크롭한 부분을 다시 서버에 보내서 이미지를 크롭하여 리사이징하기 위함.
        const result = await updatePetMutation({
          variables: {
            id: petData.seePet.id,
            avatar: data.url
          }
        });
        if (result.data.updatePet) {
          setPetAvatarUrl(`${data.url}?tid=${uuidv4()}`);
        } else {
          console.log("아바타 업데이트 실패");
        }
      }
    } else {
      // console.log("첨부된 이미지 없음 (사용자가 파일 첨부 창에서 취소를 눌렀을 때)");
    }
  };

  const RealContents = meData &&
    meData.me &&
    petData &&
    petData.seePet &&
    feedData &&
    feedData.seePetFeed && (
      <Container>
        <Content>
          <ProfilePicArea>
            <NonDisplayFileInput
              type="file"
              accept="image/*"
              ref={fileInput}
              onChange={onFileChange}
            />
            <PetAvatar
              size="xxlg"
              category={petData.seePet.category}
              url={petAvatarUrl} /*petData.seePet.avatar*/
              isBorder={true}
              onClick={e => {
                e.preventDefault();
                // console.log("클릭됨");
                if (petData.seePet.owners.filter(o => o.id === meData.me.id).length > 0) {
                  //소유자만 프로필사진을 변경할 수 있음.
                  fileInput.current.click();
                }
              }}
            />
          </ProfilePicArea>
          <ProfileContent>
            <PetInfo>
              <h2>
                {meData &&
                  meData.me &&
                  meData.me.id &&
                  petData &&
                  petData.seePet &&
                  petData.seePet.owners &&
                  petData.seePet.name &&
                  petData.seePet.owners.length > 0 &&
                  (petData.seePet.owners[0].id === meData.me.id ? (
                    <InstantEditText
                      maxLength={15}
                      isEditMode={isNameEdit}
                      placeholder={petData.seePet.name}
                      onChange={nameInput.onChange}
                      value={nameInput.value}
                      type={"text"}
                      onEditClick={editNameEdit}
                      onCancelClick={editNameCancel}
                      onSaveClick={editNameSave}
                    />
                  ) : (
                    nameInput.value
                  ))}
              </h2>{" "}
              <h3>{petData.seePet.bornAt}</h3>
            </PetInfo>
            <PetInfo>
              <>
                <h2>
                  {meData &&
                    meData.me &&
                    meData.me.id &&
                    petData &&
                    petData.seePet &&
                    petData.seePet.owners &&
                    petData.seePet.nickname &&
                    petData.seePet.owners.length > 0 &&
                    (petData.seePet.owners.filter(owner => owner.id === meData.me.id).length > 0 ? (
                      <InstantEditText
                        maxLength={15}
                        isEditMode={isNicknameEdit}
                        placeholder={petData.seePet.nickname}
                        onChange={nicknameInput.onChange}
                        value={nicknameInput.value}
                        type={"text"}
                        onEditClick={editNicknameEdit}
                        onCancelClick={editNicknameCancel}
                        onSaveClick={editNicknameSave}
                      />
                    ) : (
                      nicknameInput.value
                    ))}
                </h2>
              </>
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
            {meData &&
              meData.me &&
              meData.me.id &&
              petOwners &&
              petOwners.length > 0 &&
              petOwners.map((owner, idx) => (
                <li key={owner.id}>
                  <Owner key={owner.id}>
                    <Link to={`${PAGE_USER(owner.username)}`}>
                      <Avatar category={owner.category} size="lg" url={owner.avatar} />
                      <Username text={owner.username + ""} length={10} />
                    </Link>
                    {petOwners[0].id === meData.me.id && idx > 0 && (
                      <IconButton
                        className={classes.button}
                        aria-label="delete"
                        onClick={() => onDelete(owner.username)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Owner>
                </li>
              ))}
            {meData &&
              meData.me &&
              meData.me.id &&
              petData &&
              petData.seePet &&
              petData.seePet.owners &&
              petData.seePet.owners.length > 0 &&
              petData.seePet.owners[0].id === meData.me.id &&
              candidateData &&
              candidateData.seeCandidate &&
              candidateData.seeCandidate.length > 0 && (
                /*
              petData.seePet.owners.filter(owner => owner.id === meData.me.id) &&*/ <li>
                  <AddOwnerButton
                    onClick={() => {
                      toggleOwnerMode();
                      console.log(
                        "The button is for floating component to designate an owner about this pet",
                        candidateData
                      );
                    }}
                  >
                    <PlusButtonIcon size={"56"} />
                  </AddOwnerButton>
                </li>
              )}
          </OwnerList>
        </Content>
        <Content>
          <PostList>
            {feedData &&
              feedData.seePetFeed &&
              feedData.seePetFeed.length > 0 &&
              feedData.seePetFeed.map(post => (
                <li key={post.id}>
                  <Link to={`${PAGE_POST(post.id)}`}>
                    <PostSquare post={post} />
                  </Link>
                </li>
              ))}
          </PostList>
        </Content>
        {isAddOwnerMode && candidateData && candidateData.seeCandidate && (
          <AddOwner
            onQualify={onQualify}
            onClose={onClose}
            candidates={candidateData.seeCandidate}
          />
        )}
      </Container>
    );

  if (meData && feedData && petData && !petLoading) {
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
