import React, { useEffect } from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Post from "../Components/Post";
import WritingToolBox from "../Components/WritingToolBox";
import { ME } from "../SharedQueries";
import SideProfile from "../Components/SideProfile";
import SideUsers from "../Components/SideUsers";
import SidePets from "../Components/SidePets";
import { usePostGallery } from "../PostGalleryContext";
import MainLoader from "../Components/MainLoader";

const FEED_QUERY = gql`
  {
    seeFeed {
      id
      user {
        id
        avatar
        username
      }
      files {
        id
        url
        thumbnail
        caption
      }
      caption
      pets {
        id
        category
        name
        avatar
      }
      comments {
        id
        text
        user {
          id
          avatar
          username
        }
        createdAt
        updatedAt
      }
      createdAt
      isLiked
      likeCount
      permission
      likes {
        id
        user {
          id
          username
          avatar
        }
      }
      commentCount
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: row;
`;
const SectionLeft = styled.section`
  margin-right: 20px;
`;
const SNB = styled.section``;

export default () => {
  const { data, loading } = useQuery(FEED_QUERY, { fetchPolicy: "cache-and-network" });
  const { data: meData, loading: meLoading } = useQuery(ME, { fetchPolicy: "cache-and-network" });

  const LoaderContents = <MainLoader />;

  const RealContents = (
    <>
      <SectionLeft>
        {!meLoading && meData && meData.me && meData.me.pets && (
          <WritingToolBox pets={meData.me.pets ? meData.me.pets : null} />
        )}
        {!meLoading &&
          meData &&
          meData.me &&
          data &&
          data.seeFeed &&
          data.seeFeed.map(post => (
            <Post
              key={post.id}
              id={post.id}
              user={post.user}
              pets={post.pets}
              files={post.files}
              caption={post.caption}
              likeCount={post.likeCount}
              isLiked={post.isLiked}
              permission={post.permission}
              commentCount={post.commentCount}
              comments={post.comments}
              createdAt={post.createdAt}
              me={meData.me}
            />
          ))}
      </SectionLeft>
      <SNB>
        {!meLoading && meData && meData.me && (
          <>
            <SideProfile user={meData.me} />
            <SidePets title={`${meData.me.username}'s Pets`} pets={meData.me.pets} />
            <SideUsers title={"Following"} users={meData.me.following} />
            <SideUsers title={"Followers"} users={meData.me.followers} />
          </>
        )}
      </SNB>
    </>
  );

  return (
    <Wrapper>
      <Helmet>
        <title>Feed | Farmpet</title>
      </Helmet>
      <Contents>{loading || meLoading ? LoaderContents : RealContents}</Contents>
    </Wrapper>
  );
};
