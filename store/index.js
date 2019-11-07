const cookieparser = process.server ? require('cookieparser') : undefined
export const state = () => {
  return {
    globalText: 'No thing',
    token: '',
    user : {}
  }
};
export const mutations = {
  setToken(state, token) {
    state.token = token
  },
  setUser(state,user){
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
      commit('setToken',token)
    }
    if (req.headers.cookie){
      const parsed =cookieparser.parse(req.headers.cookie);
      user = parsed.user;
      commit('setUser', user)
    }

  }
};
