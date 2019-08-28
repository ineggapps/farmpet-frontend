import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.button`
  user-select: none;
  width: auto;
  height: 30px;
  cursor: pointer;
  background-color: ${props => props.color};
  border: 1px solid ${props => props.color};
  border-radius: 4px;
  color: #fff;
  &:active {
    opacity: 0.7;
  }
  &:focus {
    outline: none;
  }
`;

const Button = ({ text, onClick, color = "#3897f0" }) => {
  return (
    <Container
      color={color}
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
    >
      {text}
    </Container>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default Button;
