import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.input`
  border: 0;
  border: ${props => props.theme.boxBorder};
  background-color: ${props => props.theme.whiteColor};
  height: 40px;
  padding: 0px 15px;
`;

const Input = ({ placeholder, required, value, onChange, type = "text", className }) => (
  <Container
    className={className}
    placeholder={placeholder}
    value={value}
    required={required}
    onChange={onChange}
    type={type}
  />
);

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string
};

export default Input;
