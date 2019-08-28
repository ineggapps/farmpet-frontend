import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.button`
  width: 100%;
  border: 0;
  border-radius: ${props => props.theme.borderRadius};
  color: ${props => props.theme.blackColor};
  font-weight: 600;
  background-color: ${props => props.theme.yellowColor};
  text-align: center;
  padding: 13px 0;
  font-size: 14px;
  cursor: pointer;
`;

const Button = ({ text, onClick }) => <Container onClick={onClick}>{text}</Container>;

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default Button;
