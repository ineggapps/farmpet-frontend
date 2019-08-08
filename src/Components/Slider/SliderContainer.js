import React, { useState } from "react";
import PropTypes from "prop-types";
import SliderPresenter from "./SliderPresenter";

const SliderContainer = ({ files }) => {
  const [cursor, setCursor] = useState(0);

  return <SliderPresenter files={files} />;
};

SliderContainer.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  )
};

export default SliderContainer;
