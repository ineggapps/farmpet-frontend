import React from "react";
import styled from "styled-components";

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

const AddOwnerPresenter = ({ onClose }) => {
  return (
    <Container>
      <Component>
        <button onClick={onClose}>닫기</button>
      </Component>
    </Container>
  );
};

export default AddOwnerPresenter;
