import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Avatar from "./Avatar";
import FatText from "./FatText";

const Container = styled.div`
  width: ${props => props.theme.sideBoxSize};
  padding: 20px;
  display: flex;
  flex-direction: row;
`;

const UserInfo = styled.div`
  padding: 9px;
  display: flex;
  flex-direction: column;
`;

const SideProfile = ({ user }) => {
  return (
    <Container>
      <Avatar size="lg" url={user.avatar} />
      <UserInfo>
        <div>
          <FatText text={user.username} />
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
