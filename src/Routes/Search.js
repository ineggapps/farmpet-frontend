import React from "react";
import Helmet from "react-helmet";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import MainLoader from "../Components/MainLoader";
import PetAvatar from "../Components/PetAvatar";
import PostSquare from "../Components/PostSquare";
import { Link } from "react-router-dom";
import { ME } from "../SharedQueries";
import { PAGE_POST } from "../Components/Routes";

const SEARCH_POST = gql`
  query searchPost($query: String!) {
    searchPost(query: $query) {
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
  &.narrowMargin {
    margin-bottom: 22px;
  }
`;

const Contents = styled.div`
  display: flex;
  flex-direction: row;
`;

const SubTitle = styled.h3`
  font-weight: bold;
  color: ${props => props.theme.darkGreyColor};
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

const Pet = withRouter(({ match: { params: { query } }, history }) => {
  const { data: searchData, loading: searchLoading } = useQuery(SEARCH_POST, {
    variables: { query },
    fetchPolicy: "cache-and-network"
  });
  const { data: meData, loading: meLoading } = useQuery(ME, { fetchPolicy: "cache-and-network" });

  const RealContents = meData && meData.me && searchData && searchData.searchPost && (
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
          <PetInfo>
            <h2>
              {searchData && searchData.searchPost && searchData.searchPost.length === 1
                ? `${searchData.searchPost.length} post`
                : `${searchData.searchPost.length} posts`}
            </h2>
          </PetInfo>
        </ProfileContent>
      </Content>
      <Content className="narrowMargin">
        <SubTitle>Recent Posts</SubTitle>
      </Content>
      <Content>
        <PostList>
          {searchData.searchPost.map(post => (
            <li key={post.id}>
              <Link to={`${PAGE_POST(post.id)}`}>
                <PostSquare post={post} />
              </Link>
            </li>
          ))}
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
