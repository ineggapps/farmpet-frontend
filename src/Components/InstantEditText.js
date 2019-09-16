import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { WriteIcon } from "./Icons";
import Button from "./Button";

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const Text = styled.span`
  width: 100%;
`;

const InputText = styled.input`
  width: 100%;
  border: 0;
  border: ${props => props.theme.boxBorder};
  background-color: ${props => props.theme.whiteColor};
  height: 30px;
  padding: 0px 15px;
  &:focus {
    outline: 0 none;
  }
`;

const ControlComponent = styled.div`
  display: flex;
  flex-direction: row;
  & button {
    cursor: pointer;
    span {
      display: none;
    }
    padding: 0;
    margin: 0;
    border: 0 none;
    background: 0 none;
    &:focus {
      outline: none;
    }
  }

  & svg {
    fill: ${props => props.theme.lightGreyColor};
  }
`;

const InstantEditText = ({
  isEditMode = false,
  placeholder,
  onChange,
  type,
  value,
  onEditClick,
  onCancelClick,
  onSaveClick
}) => {
  const EditMode = () => (
    <Container>
      <InputText onChange={onChange} value={value} placeholder={placeholder} type={type} />
      <Button color={`${props => props.theme.lightGreyColor}`} text="Cancel" />
      <button>
        <span>Save</span>
      </button>
    </Container>
  );

  const ViewMode = () => (
    <Container>
      <Text>{value}</Text>
      <ControlComponent>
        <button onClick={() => onEditClick()}>
          <span>Modify</span>
          <WriteIcon size="12" />
        </button>
      </ControlComponent>
    </Container>
  );

  return isEditMode ? <EditMode /> : <ViewMode />;
};

InstantEditText.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
  onEditClick: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  onSaveClick: PropTypes.func.isRequired
};

export default InstantEditText;
