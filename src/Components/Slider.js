import React from "react";
import styled from "styled-components";
import { Slide } from "react-slideshow-image";

const Image = styled.div`
  background-image: url(${props => props.src});
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 500px;
  border-radius: 5px;
  & span {
    visibility: hidden;
  }
`;

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: false,
  onChange: (oldIndex, newIndex) => {
    // console.log(`slide transition from ${oldIndex} to ${newIndex}`);
  }
};

const Slideshow = ({ files }) => {
  const slideImages = files.map(file => file.url);
  return (
    <div className="slide-container">
      <Slide {...properties}>
        {files.map(file => (
          <div key={file.id} className="each-slide">
            <Image src={file.url}>
              <span>{file.id}</span>
            </Image>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default Slideshow;
