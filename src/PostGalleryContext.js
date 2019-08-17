import React, { useState, useContext } from "react";
import HashMap from "hashmap";

export const PostGalleryContext = React.createContext();

export const OPTION_START_INDEX = "startIndex";

const options = new HashMap();
const PostGalleryContextProvider = ({ children }) => {
  const [viewerContent, setViewerContent] = useState(null);
  return (
    <PostGalleryContext.Provider value={{ viewerContent, setViewerContent, options }}>
      {children}
    </PostGalleryContext.Provider>
  );
};

export const usePostGallery = () => {
  const { viewerContent, setViewerContent, options } = useContext(PostGalleryContext);
  return { viewerContent, setViewerContent, options };
};

export default PostGalleryContextProvider;
