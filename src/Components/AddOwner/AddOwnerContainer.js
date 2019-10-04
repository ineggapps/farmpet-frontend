import React, { useQuery } from "react";
import PropTypes from "prop-types";
import AddOwnerPresenter from "./AddOwnerPresenter";
import { ME } from "../../SharedQueries";
import MainLoader from "../MainLoader";

const AddOwnerContainer = ({ onClose, candidates }) => {
  return <AddOwnerPresenter onClose={onClose} candidates={candidates} />;
};

AddOwnerContainer.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default AddOwnerContainer;
