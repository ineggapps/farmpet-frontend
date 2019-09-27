import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { withRouter, Redirect } from "react-router-dom";
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

const Container = styled.div``;

const PetCreate = withRouter(({ match: { params: { name } }, history }) => {
  //펫 네임을 기반으로 pet프로필 조사
  const { data: meData, loading: meLoading } = useQuery(ME);

  const RealContents = meData && meData.me && (
    <Container>
      <Content>
        <ProfilePicArea>
          <PetAvatar size={"xlg"} category={CATEGORY_DOG} url={null} />
          <PetAvatar size={"xlg"} category={CATEGORY_CAT} url={null} />
        </ProfilePicArea>
        <ProfileContent>
          <PetInfo>
            <h2>
              <InstantEditText
                maxLength={15}
                isEditMode={true}
                placeholder={"input your new pet name!"}
                onChange={null}
                value={""}
                type={"text"}
                onEditClick={null}
                onCancelClick={null}
                onSaveClick={null}
              />
            </h2>{" "}
            <h3>Birthday component</h3>
          </PetInfo>
          <PetInfo>
            <>
              <h2>
                <InstantEditText
                  maxLength={15}
                  isEditMode={true}
                  placeholder={"Input new nickname of your pet!"}
                  onChange={null}
                  value={""}
                  type={"text"}
                  onEditClick={null}
                  onCancelClick={null}
                  onSaveClick={null}
                />
              </h2>
            </>
          </PetInfo>
        </ProfileContent>
      </Content>
      <Content>만들기 버튼</Content>
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
