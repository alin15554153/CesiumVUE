import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dlgPathNavPageName : 'first',
    baseLayerGroupPageName :'first',
    position:null,
    orientation:null
  },
  mutations: {
    setViewer1(state,viewer1Cam){
      state.position= viewer1Cam.worldPosition;
      state.orientation= viewer1Cam.orientation;
      console.log(state.position)
    },
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
