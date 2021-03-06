import React from "react";
import { gql } from "apollo-boost";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import Logo from "./Logo";
import { WriteIcon, GNBNotificationIcon, SearchIcon, ProfileIcon, LogoutIcon } from "./Icons";
import Input from "./Input";
import useInput from "../Hooks/useInput";
import { PAGE_ACCOUNT } from "./Routes";
import { useQuery, useMutation } from "react-apollo-hooks";
import { ME } from "../SharedQueries";
// import { gql } from "apollo-boost";
// import { useQuery } from "react-apollo-hooks";

const Header = styled.header`
  background-color: white;
  position: fixed;
  width: 100%;
  height: ${props => props.theme.headerHeight};
  border-bottom: 1px solid ${props => props.theme.headerBorderBottomColor};
  z-index: 2000;
  h1 {
    display: flex;
    font-size: 32px;
    color: ${props => props.theme.titleColor};
    svg {
      fill: ${props => props.theme.titleColor};
      margin-right: 10px;
    }
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  padding: 0 2%;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

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

const SearchButton = styled.div`
  cursor: pointer;
`;

// const ME = gql`
//   {
//     me {
//       username
//     }
//   }
// `;

export const LOCAL_LOG_OUT = gql`
  mutation logUserOut($cache: String) {
    logUserOut(cache: $cache) @client
  }
`;
export default withRouter(({ history }) => {
  const [localLogOutMutation] = useMutation(LOCAL_LOG_OUT, {});
  const search = useInput("");
  const { data: meData, loading: meLoading } = useQuery(ME);

  const onClick = async e => {
    e.preventDefault();
    await localLogOutMutation();
  };

  const onSearchSubmit = e => {
    e.preventDefault();
    history.push(`/search/${search.value}`);
  };

  return (
    <Header>
      <HeaderWrapper>
        <Link to="/">
          <h1>
            <Logo />
            Farmpet
          </h1>
        </Link>
        <SearchBoxWrapper>
          <form onSubmit={onSearchSubmit}>
            <SearchInput placeholder="Search something..." {...search} />
          </form>
          <SearchButton onClick={onSearchSubmit}>
            <SearchIcon />
          </SearchButton>
        </SearchBoxWrapper>
        <GNBWrapper>
          <GNB>
            <GNBList>
              <GNBNotificationIcon />
            </GNBList>
            <GNBList>
              {!meLoading && meData && meData.me ? (
                <Link to={PAGE_ACCOUNT(meData.me.username)}>
                  <ProfileIcon />
                </Link>
              ) : (
                <ProfileIcon />
              )}
            </GNBList>
            <GNBList>
              <a href="#" onClick={e => onClick(e)}>
                <LogoutIcon />
              </a>
            </GNBList>
          </GNB>
        </GNBWrapper>
      </HeaderWrapper>
    </Header>
  );
});
