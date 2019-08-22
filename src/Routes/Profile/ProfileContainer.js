import React, { useState } from "react";
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
        thumbnail_large
      }
      commentCount
      likeCount
    }
  }
`;

const SEE_USER = gql`
  query seeUser($username: String!) {
    seeUser(username: $username) {
      id
      username
      bio
      avatar
      firstName
      lastName
      pets {
        id
        category
        name
        avatar
        bornAt
      }
      postsCount
      followersCount
      followingCount
      isFollowing
      isSelf
    }
  }
`;

export default withRouter(({ match: { params: { username } } }) => {
  const { data: feedData, loading: feedLoading } = useQuery(SEE_USER_FEED, {
    variables: { username }
  });
  const { data: userData, loading: userLoading } = useQuery(SEE_USER, { variables: { username } });

  //팔로 시 fake 산정을 위한 useState값 전달 (널체크가 너무 길다)
  const [followingCount, setFollowingCount] = useState(
    userData && userData.seeUser && userData.seeUser.followingCount
      ? userData.seeUser.followingCount
      : 0
  );
  const [followersCount, setFollowersCount] = useState(
    userData && userData.seeUser && userData.seeUser.followersCount
      ? userData.seeUser.followersCount
      : 0
  );
  const [isFollowing, setIsFollowing] = useState(
    userData && userData.seeUser && userData.seeUser.isFollowing
      ? userData.seeUser.isFollowing
      : false
  );

  const onFollowClick = () => {
    //팔로 언팔로 토글 이벤트
    setIsFollowing(!isFollowing);
  };

  if (
    !feedLoading &&
    !userLoading &&
    feedData &&
    feedData.seeUserFeed &&
    userData &&
    userData.seeUser
  ) {
    console.log(userData.seeUser, feedData.seeUserFeed);
    return (
      <ProfilePresenter
        feed={feedData.seeUserFeed}
        user={userData.seeUser}
        //팔로 설정 관련
        followingCount={followingCount}
        setFollowingCount={setFollowingCount}
        followersCount={followersCount}
        setFollowersCount={setFollowersCount}
        isFollowing={isFollowing}
        onFollowClick={onFollowClick}
      />
    );
  } else {
    return <MainLoader />;
  }
});
