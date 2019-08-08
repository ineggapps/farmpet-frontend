import React from "react";
import styled from "styled-components";

const PostImage = styled.img`
  width: 100%;
`;

export default ({ files }) => {
  return files.map(file => <PostImage key={file.id} src={file.url} />);
};
