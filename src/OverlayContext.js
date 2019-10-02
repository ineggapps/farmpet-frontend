import React, { useContext, useState } from "react";

export const OverlayContext = React.createContext();

const OverlayContextProvider = ({ children }) => {
  const [isShow, setIsShow] = useState(false);
  return (
    <OverlayContext.Provider value={{ isShow, setIsShow }}>{children}</OverlayContext.Provider>
  );
};

export const useOverlay = () => {
  const { isShow, setIsShow } = useContext(OverlayContext);
  return { isShow, setIsShow };
};

export default OverlayContextProvider;
