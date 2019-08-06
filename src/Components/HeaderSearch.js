import React from "react";
import styled from "styled-components";
import Input from "./Input";
import { SearchIcon } from "./Icons";

const SearchBoxWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 2px solid ${props => props.theme.lightGreyColor};

  svg {
    fill: ${props => props.theme.lightGreyColor};
  }
`;

const SearchInput = styled(Input)`
  background: transparent;
  border: 0 none;
  &:focus {
    outline: none;
  }
`;

export default () => (
  <SearchBoxWrapper>
    <SearchInput placeholder="Search something..." />
    <SearchIcon />
  </SearchBoxWrapper>
);
