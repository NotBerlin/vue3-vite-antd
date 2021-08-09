const state = {
  tags: [
    {
      fullPath: '/home',
      meta: {
        title: '首页'
      }
    }
  ],
  currentTag: {
    fullPath: '/home',
    meta: {
      title: '首页'
    }
  }
}

const mutations = {
  SET_TAGS: (state, tag) => {
    if (tag.fullPath === '') return false
    if (tag.fullPath !== '/home') {
      let index = state.tags.findIndex((item) => item.fullPath === tag.fullPath)
      index === -1 ? state.tags.push(tag) : ''
    } else {
      if (!state.tags[0]) {
        state.tags.push(tag)
      }
    }
  },
  CLEAR_TAGS: (state) => {
    state.tags = []
  },
  REMOVE_TAG: (state, tag) => {
    let index = false
    state.tags.forEach((item, currentIndex) => {
      if (item.fullPath === tag.fullPath) {
        index = currentIndex
      }
    })
    if (index) {
      state.tags.splice(index, 1)
    }
  },
  SET_CURRENT_TAG: (state, tag) => {
    if (tag.fullPath === '') {
      state.currentTag = ''
      return false
    }
    state.currentTag = tag
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
