import React, { useState } from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../Components/Loader";
import Post from "../Components/Post";
import WritingToolBox from "../Components/WritingToolBox";
import { ME } from "../SharedQueries";
import SideProfile from "../Components/SideProfile";
import SideUsers from "../Components/SideUsers";
import SidePets from "../Components/SidePets";
import PostGallery from "../Components/PostGallery";
import SortableTest from "../Components/SortableTest";

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

const FeedLoader = styled.div`
  margin-top: 20px;
`;

export default () => {
  const { data, loading } = useQuery(FEED_QUERY);
  const { data: meData, loading: meLoading } = useQuery(ME);

  const [viewerContent, setViewerContent] = useState({});
  const onPostClick = postId => {
    console.log("post clicked");
    if (data && data.seeFeed) {
      console.log("post 갤러리를 엽니다.");
      if (viewerContent.id === undefined || viewerContent.id === null) {
        const post = data.seeFeed.filter(p => p.id === postId)[0];
        console.log("post갤러리가 설정되어 있지 않아서 새로 불러올 거예요.", postId, post);
        setViewerContent(post);
      }
    }
  };
  const onBackgroundClick = () => {
    console.log("백그라운드를 클릭하면 창을 다시 닫자");
    setViewerContent({});
  };

  console.log(meData);
  const LoaderContents = (
    <FeedLoader>
      <Loader />
    </FeedLoader>
  );
  const RealContents = (
    <>
      <SectionLeft>
        {!meLoading && meData && meData.me && meData.me.pets && (
          <WritingToolBox pets={meData.me.pets ? meData.me.pets : null} />
        )}
        {data &&
          data.seeFeed &&
          data.seeFeed.map(post => (
            <Post
              key={post.id}
              id={post.id}
              user={post.user}
              pets={post.pets}
              files={post.files}
              caption={post.caption}
              likeCount={post.likeCount}
              isLiked={post.isLiked}
              permission={post.permission}
              commentCount={post.commentCount}
              comments={post.comments}
              createdAt={post.createdAt}
              me={meData.me}
              onPostClick={onPostClick}
            />
          ))}
      </SectionLeft>
      <SNB>
        {!meLoading && meData.me && (
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

  console.log(viewerContent.id, "<= viewerContent.id");
  return (
    <Wrapper>
      <Helmet>
        <title>Feed | Farmpet</title>
      </Helmet>
      <Contents>{loading || meLoading ? LoaderContents : RealContents}</Contents>
      {viewerContent.id !== undefined && viewerContent.id !== null && (
        <PostGallery post={viewerContent} onBackgroundClick={onBackgroundClick} />
      )}
    </Wrapper>
  );
};
