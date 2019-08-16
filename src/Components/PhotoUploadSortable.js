import React, { useState } from "react";
import Sortable from "react-sortablejs";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div``;

const SortableUl = styled(Sortable)`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
  height: auto;
`;

const List = styled.li`
  cursor: move;
  margin: 10px 0 10px 0;
  min-width: 70px;
  max-width: 70px;
  height: 70px;
  border: 1px solid ${props => props.theme.greyColor};
`;

const SortableTest = () => {
  const [items, setItems] = useState([
    "Apple",
    "Banana",
    "Cherry",
    "Guava",
    "Peach",
    "Strawberry",
    "KAKAO",
    "WaterMelon"
  ]);

  return (
    <div>
      <SortableUl
        tag="ul" // Defaults to "div"
      >
        {items.map(val => (
          <List key={`random${Math.random()}`} data-id={val}>
            {val}
          </List>
        ))}
      </SortableUl>
    </div>
  );
};

const onFileLoad = (e, file) => console.log(e.target.result, file.name);

const Upload = () => {
  return (
    <Container>
      <SortableTest />
      <Upload label="Add" onFileLoad={this.onFileLoad} />
    </Container>
  );
};

Upload.propTypes = {};

export default Upload;
