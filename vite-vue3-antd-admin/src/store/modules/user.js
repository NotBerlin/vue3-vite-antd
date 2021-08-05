const state = {
  /**
   * xxxxx: {}
   */
}

const mutations = {
  /**
   * // xxxxxxx
   * XXX_XXXX: (state, xxx) => {
   *  state.xxxxx = xxx
   * }
   */
}

const actions = {
  logout({ commit, dispatch }) {
    commit('SET_LOGOUT')
    router.push('/login')
    return dispatch('tagsView/delAllViews', null, { root: true })
  }
  /**
   * // xxxxxxx
   * XXXXX: ({commit, dispatch}) => {
   *  xxxx
   * }
   */
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
