import React, { useState } from "react";
import Sortable from "react-sortablejs";
import PropTypes from "prop-types";
import styled from "styled-components";
import ImagesUploader from "react-images-uploader";
import "react-images-uploader/styles.css";
import "react-images-uploader/font.css";

const Container = styled.div``;

const SortableUl = styled(Sortable)`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
  height: auto;
`;

const List = styled.li`
  cursor: move;
  margin: 10px 0 10px 0;
  min-width: 70px;
  max-width: 70px;
  height: 70px;
  border: 1px solid ${props => props.theme.greyColor};
`;

//https://github.com/aleksei0807/react-images-uploader
const Upload = () => {
  return (
    <Container>
      {/* <SortableTest /> */}
      <ImagesUploader
        url="http://localhost:4000/photos"
        optimisticPreviews
        onLoadEnd={err => {
          if (err) {
            console.error(err);
          }
        }}
      />
    </Container>
  );
};

Upload.propTypes = {};

export default Upload;
