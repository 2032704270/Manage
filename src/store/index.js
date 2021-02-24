import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 安装创建
Vue.use(Vuex)

const state = {
  token: '',
  uName: '',
  activePath: ''
}

const store = new Vuex.Store({
  // mutations,actions,getters,都抽离出去了哦
  state,
  mutations,
  actions,
  getters
})



export default store