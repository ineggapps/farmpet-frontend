import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import ProfilePresenter from "./ProfilePresenter";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import Loader from "../../Components/Loader";
import MainLoader from "../../Components/MainLoader";

const SEE_USER_FEED = gql`
  query seeUserFeed($username: String!) {
    seeUserFeed(username: $username) {
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
      }
    }
  }
`;

const SEE_USER = gql`
  query seeUser($username: String!) {
    seeUser(username: $username) {
      id
      username
      avatar
      firstName
      lastName
      postCount
    }
  }
`;

export default withRouter(({ match: { params: { username } } }) => {
  const { data: feedData, loading: feedLoading } = useQuery(SEE_USER_FEED, {
    variables: { username }
  });
  const { data: userData, loading: userLoading } = useQuery(SEE_USER, { variables: { username } });
  console.log(feedData, "feed정보");
  console.log(userData, "user정보");

  if (
    !feedLoading &&
    !userLoading &&
    feedData &&
    feedData.seeUserFeed &&
    userData &&
    userData.seeUser
  ) {
    return <ProfilePresenter feed={feedData.seeUserFeed} user={userData.seeUser} />;
  } else {
    return <MainLoader />;
  }
});
