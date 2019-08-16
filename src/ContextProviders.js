import React from "react";
import { ThemeProvider } from "styled-components";
import Theme from "./Styles/Theme";
import PostGalleryContextProvider from "./PostGalleryContext";

const ContextProviders = ({ children }) => (
  <ThemeProvider theme={Theme}>
    <PostGalleryContextProvider>{children}</PostGalleryContextProvider>
  </ThemeProvider>
);

export default ContextProviders;
