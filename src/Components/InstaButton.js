import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo-hooks";

//Presenter
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  cursor: pointer;
  border-radius: 3px;
`;

const InstaButtonTransparent = styled(Container)`
  border: 1px solid ${props => props.theme.lightGreyColor};
`;

const InstaButton = ({ children, onClick }) => {
  return <InstaButtonTransparent onClick={() => onClick}>{children}</InstaButtonTransparent>;
};

InstaButton.propTypes = {
  isFollowing: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired
};

export default InstaButton;
