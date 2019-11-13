const cookieparser = process.server ? require('cookieparser') : undefined;

export const state = () => {
  return {
    token: null,
    user: ""
  }
};
export const mutations = {
  setToken(state, token) {
    state.token = token
  },
  setUser(state, user) {
    state.user = user
  }
};
export const actions = {
  nuxtServerInit({commit}, {req}) {
    let token = null;
    let user = null;
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie);
      token = parsed.token;
      commit('setToken', token);
      user = parsed.user;
      commit('setUser', user)
    }
  }
};
