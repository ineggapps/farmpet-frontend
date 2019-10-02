import React from "react";
import PropTypes from "prop-types";
import AddOwnerPresenter from "./AddOwnerPresenter";

const AddOwnerContainer = ({ onClose }) => {
  return <AddOwnerPresenter onClose={onClose} />;
};

AddOwnerContainer.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default AddOwnerContainer;
