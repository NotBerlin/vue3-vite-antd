const state = {
  routes: []
}

const mutations = {
  // 获取routes
  GET_ROUTES: (state) => {
    return state.routes
  },
  // 设置routes
  SET_ROUTES: (state, routes) => {
    state.routes = routes
  }
}

const actions = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
