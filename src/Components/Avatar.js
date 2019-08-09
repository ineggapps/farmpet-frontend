import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/*
    sm=28
    md=36
    lg=56
*/
const getSize = size => {
  let number;
  if (size === "sm") number = 28;
  else if (size === "md") number = 36;
  else if (size === "lg") number = 56;
  return `
  width:${number}px;
  min-width:${number}px;
  height:${number}px;
    max-height:${number}px`;
};

const Container = styled.div`
  ${props => getSize(props.size)};
  background-image: ${props => props.url};
  background-size: cover;
  background-color: blue;
  border-radius: 50%;
  cursor: pointer;
`;

const Avatar = ({ size = "sm", url }) => <Container size={size} url={url} />;

Avatar.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  url: PropTypes.string
};

export default Avatar;
