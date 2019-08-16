import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ImagesUploader from "react-images-uploader";
import "react-images-uploader/styles.css";
import "react-images-uploader/font.css";

const Container = styled.div``;

const List = styled.li`
  cursor: move;
  margin: 10px 0 10px 0;
  min-width: 70px;
  max-width: 70px;
  height: 70px;
  border: 1px solid ${props => props.theme.greyColor};
`;

//https://github.com/aleksei0807/react-images-uploader
const PhotoUploader = ({ onImageUploaded }) => {
  return (
    <Container>
      <ImagesUploader
        url="http://localhost:4000/photos"
        optimisticPreviews
        onLoadEnd={(err, res) => {
          if (err) {
            console.error(err);
          } else {
            onImageUploaded(res);
          }
        }}
      />
    </Container>
  );
};

PhotoUploader.propTypes = {
  onImageUploaded: PropTypes.func.isRequired
};

export default PhotoUploader;
