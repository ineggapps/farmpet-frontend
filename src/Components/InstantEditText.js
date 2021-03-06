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
  /* width: 100%; */
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
  margin-left: 10px;
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

const CustomButton = styled.button`
  border-radius: 3px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  height: 30px;
`;

const CancelButton = styled(CustomButton)`
  background-color: white;
  border: 1px solid ${props => props.theme.darkGreyColor};
  &:hover {
    border-color: #333;
  }
`;

const SaveButton = styled(CustomButton)`
  ${props => props.theme.redButton}
`;

const InstantEditText = ({
  isEditMode = false,
  placeholder,
  onChange,
  maxLength,
  type,
  value,
  onEditClick,
  onCancelClick,
  onSaveClick
}) => {
  const EditMode = (
    <Container>
      <InputText
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        type={type}
        maxLength={maxLength}
        onKeyPress={e => {
          if (e.which === 27) {
            if (onCancelClick !== undefined && onCancelClick !== null) {
              //ESC
              e.preventDefault();
              onCancelClick();
            }
          } else if (e.which === 13) {
            if (onSaveClick !== undefined && onCancelClick !== null) {
              //ENTER
              e.preventDefault();
              onSaveClick();
            }
          }
        }}
      />
      {onCancelClick !== undefined && onCancelClick !== null && (
        <CancelButton
          color={`${props => props.theme.lightGreyColor}`}
          onClick={() => onCancelClick()}
        >
          <span>Cancel</span>
        </CancelButton>
      )}
      {onSaveClick !== undefined && onCancelClick !== null && (
        <SaveButton onClick={() => onSaveClick()}>
          <span>Save</span>
        </SaveButton>
      )}
    </Container>
  );

  const ViewMode = (
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

  return isEditMode ? EditMode : ViewMode;
};

InstantEditText.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
  onEditClick: PropTypes.func,
  onCancelClick: PropTypes.func,
  onSaveClick: PropTypes.func
};

export default InstantEditText;
