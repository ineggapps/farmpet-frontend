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

const Container = styled.div``;

const Pet = withRouter(({ match: { params: { query } }, history }) => {
  const { data: meData, loading: meLoading } = useQuery(ME, { fetchPolicy: "cache-and-network" });

  const RealContents = meData && meData.me && (
    <Container>
      <Content>
        <ProfilePicArea>
          <PetAvatar
            size="xxlg"
            url={""} /*petData.seePet.avatar*/
            isBorder={true}
            onClick={e => {
              console.log("PetAvatar Clicked");
            }}
          />
        </ProfilePicArea>
        <ProfileContent>
          <PetInfo>
            <h2>#{query}</h2>
          </PetInfo>
          <PetStatisticsList>
            <li>Recent Posts</li>
          </PetStatisticsList>
        </ProfileContent>
      </Content>
      <Content>
        <PostList>
          <li key={"post.id"}>
            {/* <Link to={`${PAGE_POST(post.id)}`}> */}
            {/* <PostSquare post={post} /> */}
            {/* </Link> */}
            postSquare
          </li>
        </PostList>
      </Content>
    </Container>
  );

  if (meData) {
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
