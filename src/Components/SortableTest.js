import React, { useState } from "react";
import Sortable from "react-sortablejs";
import styled from "styled-components";

const SortableUl = styled(Sortable)`
  display: flex;
  width: 100%;
`;

const List = styled.li`
  cursor: move;
  margin-right: 10px;
  width: 50px;
  height: 50px;
  border: 1px solid ${props => props.theme.greyColor};
`;

const SortableTest = () => {
  const [items, setItems] = useState(["Apple", "Banana", "Cherry", "Guava", "Peach", "Strawberry"]);

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

export default SortableTest;
