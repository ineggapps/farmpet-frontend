import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Text = styled.span`
  color: ${props => props.theme.lightGreyColor};
  font-size: 13px;
`;

const convertDateFormat = date => {
  //TODO: 2019-03-19 18:00 형식으로 데이터 변환하여 반환하기
  return date;
};

const DateText = ({ date }) => <Text>{convertDateFormat(date)}</Text>;

DateText.propTypes = {
  date: PropTypes.string.isRequired
};

export default DateText;
