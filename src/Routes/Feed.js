import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../Components/Loader";
import Post from "../Components/Post";

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

export default () => {
  const { data, loading } = useQuery(FEED_QUERY);

  console.log(data, loading);

  return (
    <Wrapper>
      {loading && <Loader />}
      {!loading &&
        data &&
        data.seeFeed &&
        data.seeFeed.map(post => (
          <Post
            key={post.id}
            id={post.id}
            user={post.user}
            files={post.files}
            likeCount={post.likeCount}
            isLiked={post.isLiked}
            commentCount={post.commentCount}
            createdAt={post.createdAt}
          />
        ))}
    </Wrapper>
  );
};
