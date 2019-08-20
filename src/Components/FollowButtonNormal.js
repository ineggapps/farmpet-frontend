import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { gql } from "apollo-boost";

///쿼리

export const FOLLOW = gql`
  mutation follow($id: String!) {
    follow(id: $id)
  }
`;

export const UNFOLLOW = gql`
  mutation unfollow($id: String!) {
    unfollow(id: $id)
  }
`;

//Presenter
const Container = styled.div``;
const FollowButtonPresenter = () => {
  return <Container>팔로 버튼</Container>;
};

//Container
const FollowButtonNormal = () => {
  return <FollowButtonPresenter />;
};
export default FollowButtonNormal;
