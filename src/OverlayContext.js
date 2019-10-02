import React, { useContext, useState } from "react";

export const OverlayContext = React.createContext();

const OverlayContextProvider = ({ children }) => {
  const [isShow, setIsShow] = useState(false);
<<<<<<< HEAD
  const [opacity, setOpacity] = useState(0.4);
  return (
    <OverlayContext.Provider value={{ isShow, setIsShow, opacity, setOpacity }}>
      {children}
    </OverlayContext.Provider>
=======
  return (
    <OverlayContext.Provider value={{ isShow, setIsShow }}>{children}</OverlayContext.Provider>
>>>>>>> c05653c9ef3efba140c1c1e8bf8bf8fcb76cbd2c
  );
};

export const useOverlay = () => {
<<<<<<< HEAD
  const { isShow, setIsShow, opacity, setOpacity } = useContext(OverlayContext);
  return { isShow, setIsShow, opacity, setOpacity };
=======
  const { isShow, setIsShow } = useContext(OverlayContext);
  return { isShow, setIsShow };
>>>>>>> c05653c9ef3efba140c1c1e8bf8bf8fcb76cbd2c
};

export default OverlayContextProvider;
