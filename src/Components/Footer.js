import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Footer = styled.footer`
  width: 300px;
`;

const List = styled.ul`
  display: flex;
  justify-content: space-evenly;
`;

const ListItem = styled.li`
  &:not(:last-child) {
    margin-right: 20px;
  }
`;

const Link = styled.a`
  color: ${props => props.theme.darkBlueColor};
  text-transform: uppercase;
  font-size: 13px;
`;

const Copyright = styled.span`
  color: ${props => props.theme.darkGreyColor};
  font-size: 13px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export default () => (
  <FooterWrapper>
    <Footer>
      <List>
        <ListItem>
          <Link href="#">about us</Link>
        </ListItem>
        <ListItem>
          <Link href="#">jobs</Link>
        </ListItem>
        <ListItem>
          <Link href="#">terms</Link>
        </ListItem>
        <ListItem>
          <Link href="#">privacy</Link>
        </ListItem>
      </List>
      <Copyright>Instaclone {new Date().getFullYear()} &copy;</Copyright>
    </Footer>
  </FooterWrapper>
);
