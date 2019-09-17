import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import MainLoader from "../../Components/MainLoader";
import Avatar from "../../Components/Avatar";
import FatText from "../../Components/FatText";
import Button from "../../Components/Button";
import { PAGE_USER } from "../../Components/Routes";
import SidePets from "../../Components/SidePets";

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
  width: 935px;
`;

const Card = styled.div`
  background-color: white;
  border: 1px solid ${props => props.theme.greyColor};
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
      <form>
        {meData && meData.me && (
          <>
            <Row>
              <ColumnTitle style={{ width: 85, display: "flex", justifyContent: "flex-end" }}>
                <Link to={PAGE_USER(meData.me.username)}>
                  <Avatar url={meData.me.avatar} size={"xlg"} />
                </Link>
              </ColumnTitle>
              <FatText text={username.value} />
            </Row>
            <Card>
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
            </Card>
          </>
        )}
      </form>
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
