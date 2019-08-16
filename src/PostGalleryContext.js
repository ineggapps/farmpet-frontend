import React, { useState } from "react";

export const PostGalleryContext = React.createContext();

const PostGalleryContextProvider = ({ children = {} }) => {
  const [viewerContent, setViewerContent] = useState({});
  return (
    <PostGalleryContext.Provider value={{ viewerContent, setViewerContent }}>
      {children}
    </PostGalleryContext.Provider>
  );
};

export default PostGalleryContextProvider;
