import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import Router from "./Router";
import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";

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
    <ThemeProvider theme={Theme}>
      <Wrapper>
        <GlobalStyles />
        <Header />
        <Container>
          <Router isLoggedIn={isLoggedIn} />
        </Container>
        <Footer />
        <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
      </Wrapper>
    </ThemeProvider>
  );
};
