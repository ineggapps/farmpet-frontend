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
  background-image: url(${props => props.url});
  background-size: cover;
  background-color: blue;
  border-radius: 50%;
  cursor: pointer;
`;

const defaultUrl =
  "https://scontent-yyz1-1.cdninstagram.com/vp/4acedf76fe4828b4d63ba8005945d182/5DCB27F1/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=scontent-yyz1-1.cdninstagram.com";

const Avatar = ({ size = "sm", url = defaultUrl }) => {
  url = url === "" || url === null ? defaultUrl : url;
  return <Container size={size} url={url} />;
};

Avatar.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  url: PropTypes.string
};

export default Avatar;
