import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import HeaderGNB from "./HeaderGNB";

const Header = styled.header`
  background-color: red;
  position: fixed;
  width: 100%;
  height: ${props => props.theme.headerHeight};
  z-index: 2000;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  h1 {
    display: block;
  }
`;

export default () => (
  <Header>
    <HeaderWrapper>
      <div>
        <h1>
          <Logo />
        </h1>
      </div>
      <HeaderGNB />
    </HeaderWrapper>
  </Header>
);
