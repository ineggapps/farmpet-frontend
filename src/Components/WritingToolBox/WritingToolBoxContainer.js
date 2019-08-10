import React from "react";
import PropTypes from "prop-types";
import WritingToolBoxPresenter from "./WritingToolBoxPresenter";

const WritingToolBoxContainer = ({ pets }) => {
  console.log(pets, "WriteToolBox");
  return <WritingToolBoxPresenter pets={pets} />;
};

WritingToolBoxContainer.propTypes = {
  pets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      category: PropTypes.string,
      name: PropTypes.string,
      avatar: PropTypes.string
    })
  )
};

export default WritingToolBoxContainer;
