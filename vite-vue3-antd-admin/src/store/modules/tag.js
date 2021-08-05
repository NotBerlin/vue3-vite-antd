const state = {
  tags: []
}

const mutations = {
  // 设置tags
  SET_TAGS: (state, tags) => {
    state.tags = tags
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
