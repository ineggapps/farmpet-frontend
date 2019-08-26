import React from "react";
import Helmet from "react-helmet";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import MainLoader from "../Components/MainLoader";

const PET_PROFILE = gql`
  query seePet($name: String!) {
    seePet(name: $name) {
      id
      name
      nickname
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

const Container = styled.div``;

const Pet = withRouter(({ match: { params: { name } } }) => {
  //펫 네임을 기반으로 pet프로필 조사
  const { data: petData, loading: petLoading } = useQuery(PET_PROFILE, { variables: { name } });

  console.log(petData, "petData");

  const RealContents = petData && petData.seePet && <Container>{petData.seePet.name}</Container>;
  const LoaderContents = <MainLoader />;
  return (
    <Wrapper>
      <Helmet>
        <title>Feed | Farmpet</title>
      </Helmet>
      <Contents>{!petData || petLoading ? LoaderContents : RealContents}</Contents>
    </Wrapper>
  );
});

export default Pet;
