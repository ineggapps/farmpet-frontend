import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import ProfilePresenter from "./ProfilePresenter";
import { useQuery, useMutation } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import Loader from "../../Components/Loader";
import MainLoader from "../../Components/MainLoader";
import { ME, UPLOAD_API_AVATAR_NAME } from "../../SharedQueries";
import { TOKEN } from "../../Apollo/LocalState";
import { getAddress } from "../../GlobalVariables";
import axios from "axios";
import uuidv4 from "uuid/v4";

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

const UPDATE_ACCOUNT = gql`
  mutation updateAccount(
    $avatar: String
    $username: String
    $firstName: String
    $lastName: String
    $bio: String
  ) {
    updateAccount(
      avatar: $avatar
      username: $username
      firstName: $firstName
      lastName: $lastName
      bio: $bio
    )
  }
`;

export default withRouter(
  ({
    match: {
      params: { username }
    },
    history
  }) => {
    const { data: feedData, loading: feedLoading } = useQuery(SEE_USER_FEED, {
      variables: { username }
    });
    const { data: userData, loading: userLoading } = useQuery(SEE_USER, {
      variables: { username }
    });
    const { data: meData, loading: meLoading } = useQuery(ME);
    const [updateUserMutation] = useMutation(UPDATE_ACCOUNT);

    //user avatar
    const fileInput = useRef(null);
    const onFileChange = () => {
      handleSubmit();
    };
    const handleSubmit = async () => {
      console.log("파일 전송 시작");
      const image = fileInput.current.files[0];
      if (image !== undefined) {
        console.log(image, "이미지");
        const formData = new FormData();
        formData.append(UPLOAD_API_AVATAR_NAME, image);
        const options = {
          method: "POST",
          url: getAddress("api/upload/user"),
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem(TOKEN)}`
          },
          data: formData
        };
        const { data } = await axios(options);
        console.log("axios 수신", data);
        if (data.url !== undefined && data.url !== null) {
          const result = await updateUserMutation({
            variables: {
              avatar: data.url
            }
          });
          console.log("result 데이터 수신", result.data.updateAccount);
          if (result.data.updateAccount) {
            setUserAvatarUrl(`${data.url}?tid=${uuidv4()}`);
          } else {
            console.log("Avatar Image wasn't able to be reflected.");
          }
          //쿼리 갱신
        }
      }
    };
    const [userAvatarUrl, setUserAvatarUrl] = useState(null);

    useEffect(() => {
      if (userAvatarUrl === null && userData && userData.seeUser && userData.seeUser.avatar) {
        setUserAvatarUrl(userData.seeUser.avatar);
      }
    });

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
      !meLoading &&
      feedData &&
      feedData.seeUserFeed &&
      userData &&
      userData.seeUser &&
      meData &&
      meData.me
    ) {
      console.log(userData.seeUser, feedData.seeUserFeed);
      return (
        <ProfilePresenter
          feed={feedData.seeUserFeed}
          user={userData.seeUser}
          me={meData.me}
          updateUserMutation={updateUserMutation}
          fileInput={fileInput}
          onFileChange={onFileChange}
          userAvatarUrl={userAvatarUrl}
          setUserAvatarUrl={setUserAvatarUrl}
          //팔로 설정 관련
          followingCount={followingCount}
          setFollowingCount={setFollowingCount}
          followersCount={followersCount}
          setFollowersCount={setFollowersCount}
          isFollowing={isFollowing}
          onFollowClick={onFollowClick}
          history={history}
        />
      );
    } else {
      return <MainLoader />;
    }
  }
);
