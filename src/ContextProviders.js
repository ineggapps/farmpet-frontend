import React from "react";
import { ThemeProvider } from "styled-components";
import Theme from "./Styles/Theme";
import PostGalleryContextProvider from "./PostGalleryContext";
import OverlayContextProvider from "./OverlayContext";

const ContextProviders = ({ children }) => (
  <ThemeProvider theme={Theme}>
    <OverlayContextProvider>
      <PostGalleryContextProvider>{children}</PostGalleryContextProvider>
    </OverlayContextProvider>
  </ThemeProvider>
);

export default ContextProviders;
