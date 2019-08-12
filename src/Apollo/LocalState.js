export const TOKEN = "token";
export const defaults = {
  isLoggedIn: Boolean(localStorage.getItem(TOKEN) !== null) || false
};

export const resolvers = {
  Mutation: {
    logUserIn: (_, { token }, { cache }) => {
      //시작 페이지 고침 없으려면 redux를 써야 할 듯. bug.
      window.location = "/";
      localStorage.setItem(TOKEN, token);
      cache.writeData({
        data: {
          isLoggedIn: true,
          getToken: token
        }
      });
      return null;
    },
    logUserOut: (_, __, { cache }) => {
      localStorage.removeItem(TOKEN);
      window.location = "/";
      return null;
    }
  }
};
