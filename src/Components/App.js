import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import GlobalStyles from "../Styles/GlobalStyles";
import { HashRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";
import PostGallery from "../Components/PostGallery";
import ContextProviders from "../ContextProviders";
import Overlay from "./Overlay";

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

const Wrapper = styled.div`
  position: relative;
  min-width: 920px;
  min-height: 600px;
  height: 100%;
`;

const Container = styled.div`
  padding-top: ${props => props.theme.headerHeight};
`;

export default () => {
  const {
    data: { isLoggedIn }
  } = useQuery(QUERY);

  return (
    <ContextProviders>
      <Overlay />
      <PostGallery />
      <Wrapper>
        <GlobalStyles />
        <Router>
          {isLoggedIn && <Header />}
          <Container>
            <Routes isLoggedIn={isLoggedIn} />
          </Container>
          {!isLoggedIn && <Footer />}
          <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
        </Router>
      </Wrapper>
    </ContextProviders>
  );
};
