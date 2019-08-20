import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import Loader from "../../Components/Loader";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: row;
`;

const LoaderWrapper = styled.div`
  margin-top: 20px;
`;

const ProfilePresenter = ({ data, loading }) => {
  const LoaderContents = (
    <LoaderWrapper>
      <Loader />
    </LoaderWrapper>
  );
  const RealContents = (
    <>
      <div>hello world</div>
    </>
  );

  return (
    <Wrapper>
      <Helmet>
        <title>Feed | Farmpet</title>
      </Helmet>
      <Contents>{loading ? LoaderContents : RealContents}</Contents>
    </Wrapper>
  );
};

export default ProfilePresenter;
