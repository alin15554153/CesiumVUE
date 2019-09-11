import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dlgPathNavPageName : 'first',
    baseLayerGroupPageName :'first'
  },
  mutations: {
    setdlgPathNavPageName(state,name){
      state.dlgPathNavPageName = name;
    },
    setBaseLayerGroupPageName(state,name){
       state.baseLayerGroupPageName = name;
    }
  },
  actions: {
    // setdlgPathNavPageName(context,name){
    //   context.commit('setdlgPathNavPageName',name)
    // }
  }
})
