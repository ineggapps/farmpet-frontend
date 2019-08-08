import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../Components/Loader";

const FEED_QUERY = gql`
  {
    seeFeed {
      id
      user {
        id
        username
        avatar
      }
      files {
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
      updatedAt
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

  return <Wrapper>{loading && <Loader />}</Wrapper>;
};
