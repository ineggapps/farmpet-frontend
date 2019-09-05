import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import MainLoader from "../../Components/MainLoader";
import Avatar from "../../Components/Avatar";
import FatText from "../../Components/FatText";
import Button from "../../Components/Button";

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
  min-height: 800px;
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
    border-left: 2px solid transparent;
    &:hover {
      border-left: 2px solid ${props => props.theme.borderGreyColor};
      font-weight: bold;
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
  &:last-child > * {
    margin-left: 107px;
  }
`;

const AccountPresenter = ({
  meData,
  meLoading,
  pathname,
  username,
  firstName,
  lastName,
  bio,
  avatar,
  setAvatar,
  onSubmit
}) => {
  const RealContents = (
    <Container>
      <Menu>
        <li>Edit Profile</li>
        <li>Edit Pet</li>
      </Menu>
      <FormDiv>
        <form>
          {meData && meData.me && (
            <>
              <Row>
                <ColumnTitle style={{ width: 85, display: "flex", justifyContent: "flex-end" }}>
                  <Avatar url={meData.me.avatar} size={"lg"} />
                </ColumnTitle>
                <FatText text={username.value} />
              </Row>
              <Row>
                <ColumnTitle>
                  <FatText text={"username"} />
                </ColumnTitle>
                <input type="text" {...username} placeholder={meData.me.username} />
              </Row>
              <Row>
                <ColumnTitle>
                  <FatText text={"firstName"} />
                </ColumnTitle>
                <input type="text" {...firstName} placeholder={meData.me.firstName} />
              </Row>
              <Row>
                <ColumnTitle>
                  <FatText text={"lastName"} />
                </ColumnTitle>
                <input type="text" {...lastName} placeholder={meData.me.lastName} />
              </Row>
              <Row>
                <ColumnTitle>
                  <FatText text={"bio"} />
                </ColumnTitle>
                <input type="text" {...bio} placeholder={meData.me.bio} />
              </Row>
              <Row>
                <Button
                  text={"Submit"}
                  onClick={() => {
                    console.log("회원정보 변경 전송");
                    onSubmit();
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
      <Contents>{!meLoading && meData && meData.me ? RealContents : LoaderContents}</Contents>
    </Wrapper>
  );
};

export default AccountPresenter;
