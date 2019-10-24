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
  border-bottom: 1px solid ${props => props.theme.darkGreyColor};
  & h2 {
    font-weight: bold;
  }
`;

const ListContainer = styled.div`
  width: 100%;
  height: 363px;
  display: flex;
  flex-direction: row;
  & > div {
    width: 50%;
    h3 {
      margin: 5px auto;
      font-weight: bold;
      color: ${props => props.theme.redColor};
      width: 95%;
      padding-bottom: 5px;
      border-bottom: 1px solid ${props => props.theme.borderGreyColor};
    }
  }
`;

const Item = styled.div`
  /* background-color: rgba(255, 255, 0, 0.3); */
  width: 100%;
  height: 44px;
  display: flex;
  flex-direction: row;
  cursor: pointer;

  & > div {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  & > div:first-child {
    /* background-color: red; */
  }
  & > div:nth-child(2) {
    /* background-color: yellow; */
    align-items: flex-start;
    flex-grow: 1;
    padding-left: 10px;
    strong {
      font-weight: bold;
    }
  }
  & > div:last-child {
    /* background-color: green; */
    label.MuiFormControlLabel-root {
      margin: 0;
    }
  }

  &:hover {
    background-color: ${props => props.theme.superLightGreyColor};
  }
`;

const ListOfUsers = styled.div`
  width: 95%;
  margin: 0 auto;
  & ul {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
    margin: "0",
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

const AddOwnerPresenter = ({ onQualify, onClose, candidates, toggleCheck, chosenUser }) => {
  //https://codesandbox.io/s/material-demo-1txxt
  const classes = useStyles();
  return (
    <Container>
      <Component>
        <Title>
          <h2>Add Owners</h2>
        </Title>
        <ListContainer>
          <div>
            <h3>List of my friends</h3>
            <ListOfUsers>
              <ul>
                {candidates &&
                  candidates.map(c => (
                    <li key={c.id}>
                      <Item onClick={() => toggleCheck(c.username)}>
                        <div>
                          <Avatar size="md" url={c.avatar} />
                        </div>
                        <div>
                          <p>
                            <strong>{c.username}</strong>
                          </p>
                          <p>
                            {c.firstName}&nbsp;{c.lastName}
                          </p>
                        </div>
                        <div>
                          <FormControlLabel
                            control={<GreenCheckbox checked={c.isChecked} value="" />}
                            label=""
                          />
                        </div>
                      </Item>
                    </li>
                  ))}
              </ul>
            </ListOfUsers>
          </div>
          <div>
            <h3>Selected ones of my friends</h3>
            <ListOfUsers>
              <ul>
                {chosenUser &&
                  chosenUser.map(c => (
                    <li key={c.id}>
                      <Item onClick={() => toggleCheck(c.username)}>
                        <div>
                          <Avatar size="md" url={c.avatar} />
                        </div>
                        <div>
                          <p>
                            <strong>{c.username}</strong>
                          </p>
                          <p>
                            {c.firstName}&nbsp;{c.lastName}
                          </p>
                        </div>
                        <div>
                          <IconButton className={classes.button} aria-label="delete">
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </Item>
                    </li>
                  ))}
              </ul>
            </ListOfUsers>
          </div>
        </ListContainer>
        <ButtonArea>
          <ButtonRed text="Qualify" onClick={() => onQualify(chosenUser)} />
          <ButtonWhite text="Cancel" onClick={onClose} />
        </ButtonArea>
      </Component>
    </Container>
  );
};

export default AddOwnerPresenter;
