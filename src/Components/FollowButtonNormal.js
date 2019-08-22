import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo-hooks";

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
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 30px;
  cursor: pointer;
  border-radius: 3px;
  font-weight: bold;
`;

const FollowingButton = styled(Container)`
  background-color: ${props => props.theme.blueColor};
  color: ${props => props.theme.superLightGreyColor};
`;

const UnFollowingButton = styled(Container)`
  border: 1px solid ${props => props.theme.lightGreyColor};
`;

const FollowButtonNormal = ({ isFollowing, id }) => {
  const [isFollowingS, setIsFollowingS] = useState(isFollowing);
  const [followMutation] = useMutation(FOLLOW);
  const [unFollowMutation] = useMutation(UNFOLLOW);
  const toggleFollow = async () => {
    let result;
    if (isFollowingS) {
      //do unfollow
      result = await unFollowMutation({ variables: { id } });
    } else {
      //do follow
      result = await followMutation({ variables: { id } });
    }
    if (result) {
      //팔로나 언팔로 작업에 성공하면
      setIsFollowingS(!isFollowingS);
    }
  };

  if (isFollowingS) {
    return <UnFollowingButton onClick={() => toggleFollow()}>Following</UnFollowingButton>;
  } else {
    return <FollowingButton onClick={() => toggleFollow()}>Follow</FollowingButton>;
  }
};

FollowButtonNormal.propTypes = {
  isFollowing: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired
};

export default FollowButtonNormal;
