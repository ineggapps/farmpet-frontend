import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { HeartIcon } from "./Icons";

const ButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => (props.isLiked ? props.theme.redColor : "#FFF")};
  border: 1px solid ${props => (props.isLiked ? props.theme.redColor : props.theme.lightGreyColor)};
  border-radius: 100%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

const HeartButton = ({ onClick, isLiked = false }) => {
  return (
    <ButtonContainer isLiked={isLiked} onClick={onClick}>
      {isLiked ? <HeartIcon fill={"#FFF"} /> : <HeartIcon fill={"#ADADAD"} />}
    </ButtonContainer>
  );
};

HeartButton.propTypes = {
  onClick: PropTypes.func,
  isLiked: PropTypes.bool
};

export default HeartButton;
