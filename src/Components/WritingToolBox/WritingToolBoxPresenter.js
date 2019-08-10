import React, { useState } from "react";
import styled from "styled-components";
import TextareaAutosize from "react-autosize-textarea/lib";
//Material UI
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Select, MenuItem } from "@material-ui/core";
import { PERMISSION_PUBLIC, PERMISSION_FRIENDS, PERMISSION_PRIVATE } from "../../SharedQueries";
import PetAvatar from "../PetAvatar";

//Material Styles
const useStyles = makeStyles(theme => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

const ButtonTest = styled(Button)`
  background-color: blue;
`;

//styled
const Container = styled.div`
  ${props => props.theme.postBox};
  padding: 40px;
`;

const TextArea = styled(TextareaAutosize)`
  width: 100%;
  border: 0 none;
  resize: none;
  font-family: ${props => props.theme.fontFamily};
  font-size: 1em;
  background: transparent;
  &:focus {
    outline: none;
  }
`;

const Photos = styled.div`
  color: ${props => props.theme.darkGreyColor};
`;

const Pets = styled.ul`
  display: flex;
  flex-direction: row-reverse;
`;

const Pet = styled.li`
  position: relative;
  ${props => (props.selected === "selected" ? "opacity:1;" : "opacity:.4")}
  &:hover {
    opacity: 0.8;
  }
  &:not(:last-child) {
    margin-left: 5px;
  }
  & span {
    text-align: center;
    width: 100%;
    position: absolute;
    top: 40px;
    background-color: skyblue;
    display: none;
    font-size: 0.75em;
    letter-spacing: -0.8px;
  }
  &:hover span {
    display: inline-block;
  }
`;

const ControlPanel = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default ({ pets }) => {
  const classes = useStyles();
  const [permission, setPermission] = useState(`${PERMISSION_PUBLIC}`);
  const [open, setOpen] = useState(false);
  const [selectedPets, setSelectedPets] = useState(pets);
  const onSelected = async targetId => {
    const newPets = selectedPets.map(pet => {
      if (pet.id === targetId) {
        pet.selected = !pet.selected;
      }
      return pet;
    });
    await setSelectedPets(newPets);
    console.log("onSelected 이벤트 발생", newPets);
  };

  return (
    <Container>
      <form autoComplete="off" className={classes.formControl}>
        <TextArea placeholder={`Tell me your story.`} />
        <Photos>포토프리뷰</Photos>
        <Pets>
          {pets &&
            pets.map(pet => (
              <Pet
                key={pet.id}
                onClick={() => onSelected(pet.id)}
                selected={pet.selected ? "selected" : ""}
              >
                <PetAvatar category={pet.category} url={pet.avatar} size="md" />
                <span>{pet.name}</span>
              </Pet>
            ))}
        </Pets>
        <ControlPanel>
          <Select
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            value={permission}
            onChange={({ target: { value } }) => setPermission(value)}
            inputProps={{
              name: "permission",
              id: "demo-controlled-open-select"
            }}
          >
            <MenuItem value={`${PERMISSION_PUBLIC}`}>Public</MenuItem>
            <MenuItem value={`${PERMISSION_FRIENDS}`}>Friends</MenuItem>
            <MenuItem value={`${PERMISSION_PRIVATE}`}>Private</MenuItem>
          </Select>
          <ButtonTest variant="contained" color="secondary">
            Upload
          </ButtonTest>
        </ControlPanel>
      </form>
    </Container>
  );
};

//https://material-ui.com/components/buttons/
