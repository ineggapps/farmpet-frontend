import React, { useEffect } from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { ME } from "../SharedQueries";
import MainLoader from "../Components/MainLoader";
import Avatar from "../Components/Avatar";
import FatText from "../Components/FatText";
import useInput from "../Hooks/useInput";
import Button from "../Components/Button";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: row;
`;
const Container = styled.div`
  display: flex;
  margin-top: 55px;
  background-color: white;
  width: 935px;
  border: 1px solid ${props => props.theme.borderGreyColor};
`;

const Menu = styled.ul`
  width: 225px;
  height: 100%;
  & li {
    display: flex;
    font-size: 1.2em;
    align-items: center;
    height: 60px;
    padding-left: 20px;
    border-left: 3px solid transparent;
    &:hover {
      border-left: 3px solid ${props => props.theme.borderGreyColor};
    }
  }
  border-right: 1px solid ${props => props.theme.borderGreyColor};
  margin-right: 10px;
`;

const FormDiv = styled.div`
  padding: 20px 20px 20px 80px;
`;

const ColumnTitle = styled.div`
  text-align: right;
  width: 130px;
`;

const Row = styled.div`
  display: flex;
  font-size: 1.1em;
  align-items: center;
  & ${ColumnTitle} {
    margin-right: 20px;
  }
  &:not(:last-child) {
    margin-bottom: 20px;
  }
  & input {
    width: 100%;
    border: 1px solid ${props => props.theme.superLightGreyColor};
    height: 32px;
  }
`;

const Account = () => {
  const { data, loading } = useQuery(ME);
  const username = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const bio = useInput("");

  useEffect(() => {
    if (data && data.me) {
      username.setValue(data.me.username);
      firstName.setValue(data.me.firstName);
      lastName.setValue(data.me.lastName);
      bio.setValue(data.me.bio);
    }
  }, [data]);

  const RealContents = (
    <Container>
      <Menu>
        <li>Edit Profile</li>
      </Menu>
      <FormDiv>
        <form>
          {data && data.me && (
            <>
              <Row>
                <ColumnTitle style={{ width: 85, display: "flex", justifyContent: "flex-end" }}>
                  <Avatar url={data.me.avatar} size={"lg"} />
                </ColumnTitle>
                <FatText text={data.me.username} />
              </Row>
              <Row>
                <ColumnTitle>
                  <FatText text={"username"} />
                </ColumnTitle>
                <input type="text" {...username} placeholder={data.me.username} />
              </Row>
              <Row>
                <ColumnTitle>
                  <FatText text={"firstName"} />
                </ColumnTitle>
                <input type="text" {...firstName} placeholder={data.me.firstName} />
              </Row>
              <Row>
                <ColumnTitle>
                  <FatText text={"lastName"} />
                </ColumnTitle>
                <input type="text" {...lastName} placeholder={data.me.lastName} />
              </Row>
              <Row>
                <ColumnTitle>
                  <FatText text={"bio"} />
                </ColumnTitle>
                <input type="text" {...bio} placeholder={data.me.bio} />
              </Row>
              <Row>
                <Button
                  text={"Submit"}
                  onClick={() => {
                    console.log("lkj;ljlj");
                  }}
                ></Button>
                <Button
                  color={"#ED4956"}
                  text={"Submit"}
                  onClick={() => {
                    console.log("lkj;ljlj");
                  }}
                ></Button>
              </Row>
            </>
          )}
        </form>
      </FormDiv>
    </Container>
  );

  const LoaderContents = <MainLoader />;
  return (
    <Wrapper>
      <Helmet>
        <title>Edit My Profile | Farmpet</title>
      </Helmet>
      <Contents>{!loading && data && data.me ? RealContents : LoaderContents}</Contents>
    </Wrapper>
  );
};

Account.propTypes = {};

export default Account;
