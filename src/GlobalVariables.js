export const isDebugging = true;
export const localhostServer = "http://localhost:5000/";
export const ineggFrontend = "http://farmpet2.inegg.com/";
export const ineggBackend = "http://farmpet2-backend.inegg.com/";

export const getAddress = (uri = "") => (isDebugging ? localhostServer + uri : ineggBackend + uri);
