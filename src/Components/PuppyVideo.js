import React from "react";
import styled from "styled-components";

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index:20;
    width: 100%;
    height: 100%;
    background: url("http://farmpet.inegg.com/images/overlay_screen.png") repeat;
    opacity: 0.8;
}
`;

const Video = styled.video`
  z-index: 10;
  position: absolute;
  bottom: 0;
  right: 0;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
`;

const VideoComponent = () => (
  <>
    <Container />
    <Video muted autoPlay loop>
      <source src="http://farmpet.inegg.com/images/main.mp4" type="video/mp4" />
      <source src="http://farmpet.inegg.com/images/main.webm" type="video/webm" />
      <p class="vjs-no-js">
        To view this video please enable JavaScript, and consider upgrading to a web browser that{" "}
        <a href="http://videojs.com/html5-video-support/" target="_blank">
          supports HTML5 video
        </a>
      </p>
    </Video>
  </>
);

export default VideoComponent;
