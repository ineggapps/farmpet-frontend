import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.button`
  user-select: none;
  width: ${props => `${props.widthSize}px`};
  height: ${props => `${props.heightSize}px`};
  cursor: pointer;
  background-color: #f26a41;
  border: 1px solid #f26a41;
  border-radius: 4px;
  color: #fff;
  &:hover {
    background-color: #d95f3a;
  }
  &:focus {
    outline: none;
  }
`;

const ButtonRed = ({ widthSize = 80, heightSize = 30, text, onClick }) => {
  return (
    <Container
      widthSize={widthSize}
      heightSize={heightSize}
      onClick={e => {
        e.preventDefault();
        if (onClick !== undefined && onClick !== null) {
          onClick();
        }
      }}
    >
      {text}
    </Container>
  );
};

ButtonRed.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  widthSize: PropTypes.number,
  heightSize: PropTypes.number
};

export default ButtonRed;
