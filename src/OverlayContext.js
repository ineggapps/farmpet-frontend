import React, { useContext, useState } from "react";

export const OverlayContext = React.createContext();

const OverlayContextProvider = ({ children }) => {
  const [isShow, setIsShow] = useState(false);
  const [opacity, setOpacity] = useState(0.4);
  return (
    <OverlayContext.Provider value={{ isShow, setIsShow, opacity, setOpacity }}>
      {children}
    </OverlayContext.Provider>
};

export const useOverlay = () => {
  const { isShow, setIsShow, opacity, setOpacity } = useContext(OverlayContext);
  return { isShow, setIsShow, opacity, setOpacity };
};

export default OverlayContextProvider;
