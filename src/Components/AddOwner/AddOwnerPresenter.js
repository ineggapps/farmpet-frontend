import React, { useState } from "react";
import styled from "styled-components";
import ButtonRed from "../ButtonRed";
import ButtonWhite from "../ButtonWhite";
import Avatar from "../Avatar";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const Container = styled.div`
  z-index: 4000; /* overlay가 z-index:3000임 */
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Component = styled.div`
  width: 600px;
  height: 450px;
  background-color: white;
  border-radius: 3px;
`;

const Title = styled.header`
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid ${props => props.theme.superLightGreyColor};
  & h2 {
    font-weight: bold;
  }
`;

const ListContainer = styled.div`
  display: flex;
  width: 100%;
  height: 363px;
  flex-direction: row;
  flex-grow: 3;
`;

const Item = styled.div`
  background-color: rgba(255, 255, 0, 0.3);
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  & > div:first-child {
    justify-content: center;
    flex-grow: 1;
  }
  & > div:nth-child(2) {
    flex-grow: 8;
  }
`;

const ListOfUsers = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-grow: 1;

  & ul {
    width: 100%;
  }
`;

const ButtonArea = styled.div`
  padding: 10px;
  min-height: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  & > *:not(:last-child) {
    margin-right: 10px;
  }
`;

const GreenCheckbox = withStyles({
  root: {
    color: "#888",
    "&$checked": {
      color: "#ED4956"
    }
  },
  checked: {}
})(props => <Checkbox color="default" {...props} />);

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

const AddOwnerPresenter = ({ onClose, candidates, toggleCheck, chosenUser }) => {
  //https://codesandbox.io/s/material-demo-1txxt
  const classes = useStyles();
  return (
    <Container>
      <Component>
        <Title>
          <h2>Add Owners</h2>
        </Title>
        <ListContainer>
          <ListOfUsers>
            <ul>
              {candidates &&
                candidates.map(c => (
                  <li key={c.id}>
                    <Item>
                      <div>
                        <Avatar size="md" url={c.avatar} />
                      </div>
                      <div>
                        {c.username}
                        {c.firstName}
                        {c.lastName}
                      </div>
                      <div>
                        <FormControlLabel
                          control={
                            <GreenCheckbox
                              checked={c.isChecked}
                              onClick={() => toggleCheck(c.username)}
                              value=""
                            />
                          }
                          label=""
                        />
                      </div>
                    </Item>
                  </li>
                ))}
            </ul>
          </ListOfUsers>
          <ListOfUsers>
            <ul>
              {chosenUser &&
                chosenUser.map(c => (
                  <li key={c.id}>
                    <Item>
                      <div>
                        <Avatar size="md" url={c.avatar} />
                      </div>
                      <div>
                        {c.username}
                        {c.firstName}
                        {c.lastName}
                      </div>
                      <div>
                        <IconButton
                          className={classes.button}
                          aria-label="delete"
                          onClick={() => toggleCheck(c.username)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </Item>
                  </li>
                ))}
            </ul>
          </ListOfUsers>
        </ListContainer>
        <ButtonArea>
          <ButtonRed text="Qualify" onClick={onClose} />
          <ButtonWhite text="Cancel" onClick={onClose} />
        </ButtonArea>
      </Component>
    </Container>
  );
};

export default AddOwnerPresenter;
