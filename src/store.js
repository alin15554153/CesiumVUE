import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pathNavigationPageName : 'first',
    baseLayerGroupPageName :'first'
  },
  mutations: {
    setPathNavigationPageName(state,name){
      state.pathNavigationPageName = name;
    },
    setBaseLayerGroupPageName(state,name){
       state.baseLayerGroupPageName = name;
    }
  },
  actions: {
    // setPathNavigationPageName(context,name){
    //   context.commit('setPathNavigationPageName',name)
    // }
  }
})
