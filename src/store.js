import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pathNavPageName: 'first',
    baseLayerGroupPageName: 'first',
    pointSetDraw: [],
    layerTreeData: []
  },
  getters: {},
  mutations: {
    PATH_NAV_PAGE_NAME (state, name) {
      state.pathNavPageName = name
    },
    BASE_LAYER_GROUP_PAGE_NAME (state, name) {
      state.baseLayerGroupPageName = name
    }
  },
  actions: {
    setdlgPathNavPageName (context, name) {
      context.commit('PATH_NAV_PAGE_NAME', name)
    },
    setBbaseLayerGroupPageName (context, name) {
      context.commit('BASE_LAYER_GROUP_PAGE_NAME', name)
    }
  }
})
