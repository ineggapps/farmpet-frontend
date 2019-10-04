import React, { useState } from "react";
import styled from "styled-components";
import ButtonRed from "../ButtonRed";
import ButtonWhite from "../ButtonWhite";
import Avatar from "../Avatar";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

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
  justify-content: center;
  align-items: center;
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

const ListOfMyFriends = styled.div`
  width: 100%;
  height: 100%;
  flex-grow: 1;
`;

const ListOfSelectedFriends = styled.div`
  width: 100%;
  height: 100%;
  flex-grow: 1;
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

const AddOwnerPresenter = ({ onClose, candidates }) => {
  //https://codesandbox.io/s/material-demo-1txxt
  const [isCheck, setIsCheck] = useState(false);
  const handleChange = name => event => {
    setIsCheck(!isCheck);
  };

  console.log(candidates);
  return (
    <Container>
      <Component>
        <Title>
          <h2>Add Owners</h2>
        </Title>
        <ListContainer>
          <ListOfMyFriends>
            <ul>
              {candidates &&
                candidates.map(c => (
                  <li>
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
                            <GreenCheckbox checked={isCheck} onChange={handleChange()} value="" />
                          }
                          label=""
                        />
                      </div>
                    </Item>
                  </li>
                ))}
            </ul>
          </ListOfMyFriends>
          <ListOfSelectedFriends>0000</ListOfSelectedFriends>
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
