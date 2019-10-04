import React from "react";
import styled from "styled-components";
import ButtonRed from "../ButtonRed";
import ButtonWhite from "../ButtonWhite";

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

const AddOwnerPresenter = ({ onClose, candidates }) => {
  console.log(candidates);
  return (
    <Container>
      <Component>
        <Title>
          <h2>Add Owners</h2>
        </Title>
        <ListContainer>
          <ListOfMyFriends>
            Container컴포넌트에서 추가할 수 있는 user의 대상을 받아온다. 그것을 전달받아서
            Presenter에 뿌려 주기
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
