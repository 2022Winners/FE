import Vue from 'vue'
import Vuex from 'vuex'
import {api} from '@/api/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {"id" : 1, "gender" : 1, "age" : 20, role : true},
    posts: [],
    post: {},
    isLogin: false,
  },
  getters: {
  },
  mutations: {
    USER_LOGIN(state, payload) {
      state.user = payload.user
      state.isLogin = true
      sessionStorage.setItem("userId", payload.user.id)
      sessionStorage.setItem("access-token", payload["access-token"])
      sessionStorage.setItem("refresh-token", payload["refresh-token"])
      api.defaults.headers.common['token'] = `Bearer ${payload["access-token"]}`
    },
    GET_POSTS(state, payload) {
      state.posts = payload
    },
    GET_DETAILPOST(state, payload){
      state.post = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
