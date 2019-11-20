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
  setCart(state, cart){
    state.cart = cart
  },
  ADD_TO_CART(state, product) {
    state.cart.push(product);
  },
  REMOVE_FROM_CART(state, index) {
    state.cart.splice(index, 1)
  },
  increment(state, id) {
    for (let i = 0; i < state.cart.length; i++) {
      if (state.cart[i].id === id)
        state.cart[i].order_time++
    }
  },
  decrement(state, id) {
    for (let i = 0; i < state.cart.length; i++) {
      if (state.cart[i].id === id)
        state.cart[i].order_time--
    }
  }
};
export const actions = {
  nuxtServerInit({commit}, {req}) {
    let token = null;
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie);
      token = parsed.token;
      commit('setToken', token);
    }
  },
  addToCart(context, product) {
    context.commit('ADD_TO_CART', product);
  },
  removeItem(context, index) {
    context.commit('REMOVE_FROM_CART', index)
  },
  increment(context, id) {
    context.commit('increment', id)
  },
  decrement(context, id) {
    context.commit('decrement', id)
  },
  setCart(context, cart) {
    context.commit('setCart', cart)
  }
};

