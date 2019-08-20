import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import LinesEllipsis from "react-lines-ellipsis";
import FatText from "./FatText";
import Avatar from "./Avatar";
import FollowButtonMaterial from "./FollowButtonMaterial";

const Container = styled.div`
  ${props => props.theme.postBoxSide};
`;

const Title = styled.h3`
  margin-bottom: 15px;
`;

const Friends = styled.ul``;
const Friend = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;
const Profile = styled.div`
  display: flex;
  align-items: center;

  & *:first-child {
    margin-right: 8px;
  }
`;

const SideUsers = ({ title, users }) => {
  return (
    <Container>
      <Title>
        <FatText text={title} />
      </Title>
      <Friends>
        {users &&
          users.map(f => (
            <Friend key={f.id}>
              <Profile>
                <Avatar size={"md"} url={f.avatar} />
                <LinesEllipsis
                  text={f.username}
                  maxLine="1"
                  ellipsis="..."
                  trimRight
                  basedOn="letters"
                />
              </Profile>
              <FollowButtonMaterial isFollowing={f.isFollowing} id={f.id} />
            </Friend>
          ))}
      </Friends>
    </Container>
  );
};

SideUsers.propTypes = {
  title: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      avatar: PropTypes.string,
      username: PropTypes.string.isRequired
    }).isRequired
  )
};

export default SideUsers;
