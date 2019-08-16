import React, { useState, useContext } from "react";

export const PostGalleryContext = React.createContext();

const PostGalleryContextProvider = ({ children }) => {
  const [viewerContent, setViewerContent] = useState(null);
  return (
    <PostGalleryContext.Provider value={{ viewerContent, setViewerContent }}>
      {children}
    </PostGalleryContext.Provider>
  );
};

export const usePostGallery = () => {
  const { viewerContent, setViewerContent } = useContext(PostGalleryContext);
  return { viewerContent, setViewerContent };
};

export default PostGalleryContextProvider;
