import React from "react";
import styled from "styled-components";

const Container = styled.div`
  z-index: 1000;
  position: absolute;
  left: 10px;
  top: 10px;
`;

const Logo = () => <Container>Farmpet</Container>;

export default Logo;
