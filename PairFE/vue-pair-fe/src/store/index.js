import Vue from 'vue'
import Vuex from 'vuex'


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
      state.user = payload
      state.isLogin = true
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
