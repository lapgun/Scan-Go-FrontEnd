const cookieparser = process.server ? require('cookieparser') : undefined;
export const state = () => {
  return {
    token: null,
    user: "",
    products: [],
    cart: []
  }
};
export const getters = {
  products: state => state.products,
  cart: state => state.cart
};
export const mutations = {
  setToken(state, token) {
    state.token = token;
  },
  setUser(state, user) {
    state.user = user;
  },
  ADD_TO_CART(state, id) {
    state.cart.push(id);
  },
  setProducts(state, products){
    state.products = products
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
  },
  addToCart(context, id) {
    let products = null;
    context.commit('ADD_TO_CART', id);
    context.commit('setProducts', products);
  }
};

