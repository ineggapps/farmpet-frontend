export const TOKEN = "token";
export const defaults = {
  isLoggedIn: Boolean(localStorage.getItem(TOKEN)) || false
};

export const resolvers = {
  Mutation: {
    logUserIn: (_, { token }, { cache }) => {
      localStorage.setItem(TOKEN, token);
      cache.writeData({
        data: {
          isLoggedIn: true
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
