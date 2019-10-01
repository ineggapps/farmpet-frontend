import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LinesEllipsis from "react-lines-ellipsis";
import FatText from "./FatText";
import PetAvatar from "./PetAvatar";
import { PAGE_PET, PAGE_PET_CREATE } from "./Routes";

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
const PetName = styled(LinesEllipsis)`
  width: auto;
  font-size: 0.95em;
`;
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
`;
const FollowButton = styled.div``;
const CustomButton = styled.button`
  border-radius: 3px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  height: 30px;
`;
const GreenButton = styled(CustomButton)`
  ${props => props.theme.greenButton}
`;

const SidePets = ({ title, pets }) => {
  return (
    <Container>
      <Title>
        <FatText text={title} />
        <Link to={PAGE_PET_CREATE}>
          <GreenButton>Add Pet</GreenButton>
        </Link>
      </Title>
      <Pets>
        {pets &&
          pets.map(pet => (
            <Pet key={pet.id}>
              <Profile>
                <Link to={`${PAGE_PET(pet.name)}`}>
                  <PetAvatar category={pet.category} size={"md"} url={pet.avatar} />
                </Link>
                <Link to={`${PAGE_PET(pet.name)}`}>
                  <PetName text={pet.name} maxLine="2" ellipsis="..." trimRight basedOn="letters" />
                </Link>
              </Profile>
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
