import React, { useState } from "react";
import PropTypes from "prop-types";
import FollowButtonPresenter from "./FollowButtonMaterialPresenter";
import { FOLLOW, UNFOLLOW } from "./FollowButtonMaterialQueries";
import { useMutation } from "react-apollo-hooks";

const FollowButtonMaterialContainer = ({ isFollowing, id }) => {
  // console.log(isFollowing, id);
  const [isFollowingS, setIsFollowingS] = useState(isFollowing);
  const [followMutation] = useMutation(FOLLOW);
  const [unFollowMutation] = useMutation(UNFOLLOW);

  const onClick = async () => {
    let result;
    if (isFollowingS) {
      //unfollow
      result = await unFollowMutation({ variables: { id } });
    } else {
      //follow
      result = await followMutation({ variables: { id } });
    }
    if (result) {
      //팔로나 언팔로 작업에 성공하면?
      setIsFollowingS(!isFollowingS);
    }
  };
  return <FollowButtonPresenter isFollowing={isFollowingS} onClick={onClick} />;
};

FollowButtonMaterialContainer.propTypes = {
  isFollowing: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired
};

export default FollowButtonMaterialContainer;
