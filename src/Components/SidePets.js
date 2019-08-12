import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import LinesEllipsis from "react-lines-ellipsis";
import FatText from "./FatText";
import PetAvatar from "./PetAvatar";

const Container = styled.div`
  ${props => props.theme.postBoxSide};
`;

const Title = styled.h3`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const Pets = styled.ul``;
const Pet = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;
const Profile = styled.div`
  display: flex;
  align-items: center;

  & > *:first-child {
    margin-right: 8px;
  }

  & > p {
    width: auto;
  }
`;
const FollowButton = styled.div``;

const SidePets = ({ title, pets }) => {
  return (
    <Container>
      <Title>
        <FatText text={title} />
        <FatText text="Add pet" />
      </Title>
      <Pets>
        {pets &&
          pets.map(pet => (
            <Pet key={pet.id}>
              <Profile>
                <PetAvatar category={pet.category} size={"md"} url={pet.avatar} />
                <LinesEllipsis
                  text={pet.name}
                  maxLine="1"
                  ellipsis="..."
                  trimRight
                  basedOn="letters"
                />
              </Profile>
              <FollowButton>Follow</FollowButton>
            </Pet>
          ))}
      </Pets>
    </Container>
  );
};

SidePets.propTypes = {
  title: PropTypes.string.isRequired,
  pets: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string,
      id: PropTypes.string,
      avatar: PropTypes.string,
      name: PropTypes.string.isRequired
    }).isRequired
  )
};

export default SidePets;
