import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.button`
  user-select: none;
  width: ${props => `${props.widthSize}px`};
  height: ${props => `${props.heightSize}px`};
  cursor: pointer;
  background-color: white;
  border: 1px solid #999;
  border-radius: 4px;
  color: #646464;
  &:hover {
    border-color: #666;
  }
  &:focus {
    outline: none;
  }
`;

const ButtonWhite = ({ widthSize = 80, heightSize = 30, text, onClick }) => {
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

ButtonWhite.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  widthSize: PropTypes.number,
  heightSize: PropTypes.number
};

export default ButtonWhite;
