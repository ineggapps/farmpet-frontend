import React from "react";
import styled from "styled-components";
import { GNBWriteIcon, GNBNotificationIcon } from "./Icons";

const GNBWrapper = styled.div``;
const GNB = styled.ul`
  display: flex;
`;
const GNBList = styled.li`
  &:not(:last-child) {
    padding-right: 15px;
  }
  svg {
    fill: ${props => props.theme.lightGreyColor};
    &:hover {
      fill: ${props => props.theme.darkGreyColor};
    }
    transition: fill 0.1s linear;
    cursor: pointer;
  }
`;

export default () => {
  return (
    <GNBWrapper>
      <GNB>
        <GNBList>
          <GNBWriteIcon />
        </GNBList>
        <GNBList>
          <GNBNotificationIcon />
        </GNBList>
      </GNB>
    </GNBWrapper>
  );
};
