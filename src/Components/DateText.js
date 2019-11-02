import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Text = styled.span`
  color: ${props => props.theme.lightGreyColor};
  font-size: 13px;
`;

const convertDateFormat = rawDate => {
  //TODO: 2019-03-19 18:00 형식으로 데이터 변환하여 반환하기
  const written = new Date(rawDate);
  const now = new Date();
  /*
    오늘 작성되었으면 
      1시간 이내 작성되었으면
        %d분 전
      else
        %d시간 전  
  */
  const elapsedMilisecond = now.getTime() - written.getTime();
  const elapsed = {
    milisecond: elapsedMilisecond,
    second: Math.floor(elapsedMilisecond / 1000),
    minute: Math.floor(elapsedMilisecond / (1000 * 60)),
    hour: Math.floor(elapsedMilisecond / (1000 * 60 * 60)),
    day: Math.floor(elapsedMilisecond / (1000 * 60 * 60 * 24))
  };
  const hourPostfix = elapsed.hour === 1 ? "hour" : "hours";
  const minutePostfix = elapsed.minute === 1 ? "minute" : "minutes";
  if (isToday(rawDate)) {
    if (elapsed.minute < 60) {
      if (elapsed.minute === 0) {
        return `just a moment ago`;
      } else {
        return `${elapsed.minute} ${minutePostfix} ago`;
      }
    } else if (elapsed.minute > 60 && elapsed.hour < 24) {
      return `${elapsed.hour} ${hourPostfix} ${elapsed.minute % 60} ${minutePostfix} ago`;
    } else {
      return getDateFormat(rawDate);
    }
  } else {
    return rawDate;
  }
};

const getDateFormat = rawDate => {
  const date = new Date(rawDate);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  // console.log(date.toString());
  return `${months[date.getDay()]} ${
    months[date.getMonth()]
  } ${date.getDate()} ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
};

const isToday = rawDate => {
  const date = new Date(rawDate);
  const now = new Date();
  const interval = now.getMilliseconds() - date.getMilliseconds();
  return interval < 1000 * 60 * 60 * 24 ? true : false;
};

const DateText = ({ date }) => <Text>{convertDateFormat(date)}</Text>;

DateText.propTypes = {
  date: PropTypes.string.isRequired
};

export default DateText;
