import React from "react";
import styled from "styled-components";

const GNBWrapper = styled.div``;
const GNB = styled.ul`
  display: flex;
`;
const GNBList = styled.li`
  &:not(:last-child) {
    padding-right: 5px;
  }
`;

export default () => {
  return (
    <GNBWrapper>
      <GNB>
        <GNBList>Writing</GNBList>
        <GNBList>Notification</GNBList>
      </GNB>
    </GNBWrapper>
  );
};
