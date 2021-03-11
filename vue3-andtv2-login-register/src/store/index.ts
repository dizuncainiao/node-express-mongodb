import { createStore } from 'vuex'
import { getKeyPath } from '@/utils'

export default createStore({
  state: {
    keyPath: getKeyPath()
  },
  mutations: {
    setKeyPath (state, val) {
      state.keyPath = val
    }
  },
  actions: {},
  modules: {}
})
