import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import Logo from "./Logo";
import HeaderGNB from "./HeaderGNB";
import HeaderSearch from "./HeaderSearch";

const Header = styled.header`
  position: fixed;
  width: 100%;
  height: ${props => props.theme.headerHeight};
  border-bottom: 1px solid ${props => props.theme.headerBorderBottomColor};
  z-index: 2000;
  h1 {
    display: flex;
    font-size: 32px;
    color: ${props => props.theme.titleColor};
    svg {
      fill: ${props => props.theme.titleColor};
      margin-right: 10px;
    }
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  padding: 0 2%;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export default withRouter(({ history }) => {
  return (
    <Header>
      <HeaderWrapper>
        <Link to="/">
          <h1>
            <Logo />
            Farmpet
          </h1>
        </Link>
        <HeaderSearch />
        <HeaderGNB />
      </HeaderWrapper>
    </Header>
  );
});
