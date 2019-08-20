import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import ProfilePresenter from "./ProfilePresenter";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";

const SEE_USER = gql`
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

export default withRouter(({ match: { params: { username } } }) => {
  const { data, loading } = useQuery(SEE_USER, { variables: { username } });
  if (data) {
    console.log("Profile 컨테이너", data);
  }
  return <ProfilePresenter data={data} loading={loading} />;
});
