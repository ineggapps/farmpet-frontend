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
import { PAGE_USER, PAGE_PET } from "../Components/Routes";
import InstantEditText from "../Components/InstantEditText";
import useInput from "../Hooks/useInput";
import { ME, CATEGORY_CAT, CATEGORY_DOG } from "../SharedQueries";
//Material Caledar
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

const CREATE_PET = gql`
  mutation createPet(
    $category: PetCategory!
    $name: String!
    $nickname: String
    $bornAt: String
    $gender: String
  ) {
    createPet(
      category: $category
      name: $name
      nickname: $nickname
      bornAt: $bornAt
      gender: $gender
    )
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

const CustomButton = styled.button`
  border-radius: 3px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  height: 30px;
`;

const RedButton = styled(CustomButton)`
  ${props => props.theme.redButton}
`;

const Pets = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const PetCategory = styled.li`
  ${props => (props.selected === "selected" ? "opacity:1;" : "opacity:.4;")}
  &:hover {
    opacity: 0.8;
  }
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const Container = styled.div``;

const PetCreate = withRouter(({ match: { params: { name: paramName } }, history }) => {
  const [createPetMutation] = useMutation(CREATE_PET);
  //펫 네임을 기반으로 pet프로필 조사
  const { data: meData, loading: meLoading } = useQuery(ME);

  const [petCategory, setPetCategory] = useState(CATEGORY_DOG);
  const petCategories = [CATEGORY_DOG, CATEGORY_CAT];
  const [selectedDate, setSelectedDate] = useState(new Date());

  const name = useInput("");
  const nickname = useInput("");

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const onCreate = async () => {
    console.log("만들기 클릭");
    try {
      const result = await createPetMutation({
        variables: {
          category: petCategory,
          name: name.value,
          nickname: nickname.value,
          bornAt: selectedDate
        }
      });
      if (result) {
        history.replace(PAGE_PET(name.value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const RealContents = meData && meData.me && (
    <Container>
      <Content>
        <ProfilePicArea>
          <Pets>
            {petCategories.map((category, idx) => (
              <PetCategory
                key={idx}
                selected={petCategory === category ? "selected" : ""}
                onClick={() => setPetCategory(category)}
              >
                <PetAvatar size={"xlg"} category={category} url={null} />
              </PetCategory>
            ))}
          </Pets>
        </ProfilePicArea>
        <ProfileContent>
          <PetInfo>
            <h2>
              <InstantEditText
                maxLength={15}
                isEditMode={true}
                placeholder={"Input your new pet name!"}
                onChange={name.onChange}
                value={name.value}
                type={"text"}
                onEditClick={null}
                onCancelClick={null}
                onSaveClick={null}
              />
            </h2>{" "}
          </PetInfo>
          <PetInfo>
            <>
              <h2>
                <InstantEditText
                  maxLength={15}
                  isEditMode={true}
                  placeholder={"Input nickname of your pet"}
                  onChange={nickname.onChange}
                  value={nickname.value}
                  type={"text"}
                  onEditClick={null}
                  onCancelClick={null}
                  onSaveClick={null}
                />
              </h2>
            </>
          </PetInfo>
          <PetInfo>
            <h3>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="The birthday of your pet"
                  format="MM/dd/yyyy"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
              </MuiPickersUtilsProvider>
            </h3>
          </PetInfo>
        </ProfileContent>
      </Content>
      <Content>
        <RedButton onClick={() => onCreate()}>Create</RedButton>
      </Content>
    </Container>
  );

  if (meData && !meLoading) {
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

export default PetCreate;
