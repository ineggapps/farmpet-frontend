import React, { useQuery, useState, useEffect } from "react";
import PropTypes from "prop-types";
import AddOwnerPresenter from "./AddOwnerPresenter";
import { ME } from "../../SharedQueries";
import MainLoader from "../MainLoader";

const AddOwnerContainer = ({ onQualify, onClose, candidates }) => {
  const [candidatesS, setCandidatesS] = useState([]);
  const [chosenUser, setChosenUser] = useState([]);

  const toggleCheck = username => {
    const result = candidates.map(c => {
      if (c.username === username) {
        c.isChecked = !c.isChecked;
      }
      return c;
    });
    setCandidatesS(result);
    setChosenUser(result.filter(r => r.isChecked));
  };

  useEffect(() => {
    setCandidatesS(
      candidates.map(c => {
        c.isChecked = false;
        return c;
      })
    );
  }, []);

  return (
    <AddOwnerPresenter
      onClose={onClose}
      candidates={candidatesS}
      toggleCheck={toggleCheck}
      chosenUser={chosenUser}
    />
  );
};

AddOwnerContainer.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default AddOwnerContainer;
