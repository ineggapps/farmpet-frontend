import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../Components/Loader";
import Post from "../Components/Post";
import WritingToolBox from "../Components/WritingToolBox";
import { ME } from "../SharedQueries";
import SideProfile from "../Components/SideProfile";

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
  padding-top: 20px;
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
  const { data, loading } = useQuery(FEED_QUERY);
  const { data: meData, loading: meLoading } = useQuery(ME);

  const LoaderContents = <Loader />;
  const RealContents = (
    <>
      <SectionLeft>
        {!meLoading && meData && <WritingToolBox pets={meData.me.pets} />}
        {data &&
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
              commentCount={post.commentCount}
              comments={post.comments}
              createdAt={post.createdAt}
              me={meData.me}
            />
          ))}
      </SectionLeft>
      <SNB>{!meLoading && meData.me && <SideProfile user={meData.me} />}</SNB>
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
