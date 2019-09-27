import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { CATEGORY_DOG, CATEGORY_CAT } from "../SharedQueries";
import { DogWaitingIcon, CatIcon } from "./Icons";

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
  else if (size === "xlg") number = 77;
  else if (size === "xxlg") number = 150;
  return number;
};

const getCSS = size => {
  const number = getSize(size);
  return `width:${number}px;
  min-width:${number}px;
  height:${number}px;
    max-height:${number}px`;
};

const Container = styled.div`
  ${props => getCSS(props.size)};
  background-image: url(${props => props.url});
  background-size: cover;
  background-color: ${props => props.theme.darkGreyColor};
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HasAvatarContainer = ({ size, url }) => <Container size={size} url={url} />;
const HasNotAvatarContainer = ({ category, size }) => (
  <Container size={size}>
    {category === CATEGORY_DOG ? (
      <DogWaitingIcon size={getSize(size / 2)} fill={"#FFF"} />
    ) : (
      <CatIcon size={getSize(size / 2)} fill={"#FFF"} />
    )}
  </Container>
);

const PetAvatar = ({ category, size = "sm", url }) => {
  return url === "" || url === null ? (
    <HasNotAvatarContainer category={category} size={size} url={url} />
  ) : (
    <HasAvatarContainer size={size} url={url} />
  );
};

PetAvatar.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg", "xlg", "xxlg"]),
  url: PropTypes.string
};

export default PetAvatar;
