import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import Avatar from "./Avatar";
import FatText from "./FatText";

const Container = styled.div`
  width: ${props => props.theme.sideBoxSize};
  padding: 20px 0 0;
  display: flex;
  flex-direction: row;
  a {
    text-decoration: inherit;
    color: inherit;
  }
`;

const UserInfo = styled.div`
  padding: 9px;
  display: flex;
  flex-direction: column;
`;

const SideProfile = ({ user }) => {
  return (
    <Container>
      <Link to={`${user.username}`}>
        <Avatar size="lg" url={user.avatar} />
      </Link>
      <UserInfo>
        <div>
          <Link to={`${user.username}`}>
            <FatText text={user.username} />
          </Link>
        </div>
        <div>
          {user.firstName} {user.lastName}
        </div>
      </UserInfo>
    </Container>
  );
};

SideProfile.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired
  }).isRequired
};

export default SideProfile;
// following: PropTypes.arrayOf(
//   PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     avatar: PropTypes.string,
//     username: PropTypes.string.isRequired
//   })
// ),
// followers: PropTypes.arrayOf(
//   PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     avatar: PropTypes.string,
//     username: PropTypes.string.isRequired
//   }))
