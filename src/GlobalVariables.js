export const isDebugging = false;
export const localhostServer = "http://localhost:5000/";
export const ineggFrontend = "http://farmpet2.inegg.com/";
export const ineggBackend = "http://farmpet2.inegg.com:5000/";

export const getAddress = (uri = "") => (isDebugging ? localhostServer + uri : ineggBackend + uri);
