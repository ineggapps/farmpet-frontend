import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  ${props => props.theme.postBoxSide};
`;

const SideFollowing = () => {
  return <Container>Following</Container>;
};

export default SideFollowing;
