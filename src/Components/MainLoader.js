import React from "react";
import styled from "styled-components";
import Loader from "../Components/Loader";

const LoaderWrapper = styled.div`
  text-align: center;
  width: 100%;
  margin-top: 20px;
`;

const MainLoader = () => (
  <LoaderWrapper>
    <Loader />
  </LoaderWrapper>
);

export default MainLoader;
