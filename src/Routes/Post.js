import React, { useEffect } from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Post from "../Components/Post";
import WritingToolBox from "../Components/WritingToolBox";
import { ME } from "../SharedQueries";
import SideProfile from "../Components/SideProfile";
import SideUsers from "../Components/SideUsers";
import SidePets from "../Components/SidePets";
import { usePostGallery } from "../PostGalleryContext";
import { withRouter } from "react-router-dom";
import MainLoader from "../Components/MainLoader";

const SEE_POST = gql`
  query seePost($postId: String!) {
    seePost(postId: $postId) {
      id
      user {
        id
        avatar
        username
      }
      files {
        id
        url
        thumbnail
        caption
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
      permission
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

export default withRouter(({ match: { params: { postId } }, history }) => {
  const { data, loading } = useQuery(SEE_POST, {
    variables: { postId },
    fetchPolicy: "cache-and-network"
  });
  const { data: meData, loading: meLoading } = useQuery(ME, { fetchPolicy: "cache-and-network" });

  const LoaderContents = <MainLoader />;

  const RealContents = (
    <>
      <SectionLeft>
        {!meLoading && meData && meData.me && data && data.seePost && (
          <Post
            key={data.seePost.id}
            id={data.seePost.id}
            user={data.seePost.user}
            pets={data.seePost.pets}
            files={data.seePost.files}
            caption={data.seePost.caption}
            likeCount={data.seePost.likeCount}
            isLiked={data.seePost.isLiked}
            permission={data.seePost.permission}
            commentCount={data.seePost.commentCount}
            comments={data.seePost.comments}
            createdAt={data.seePost.createdAt}
            me={meData.me}
          />
        )}
      </SectionLeft>
      <SNB>
        {!meLoading && meData && meData.me && (
          <>
            <SideProfile user={meData.me} />
            <SidePets title={`${meData.me.username}'s Pets`} pets={meData.me.pets} />
            <SideUsers title={"Following"} users={meData.me.following} />
            <SideUsers title={"Followers"} users={meData.me.followers} />
          </>
        )}
      </SNB>
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
});
