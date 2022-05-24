import Vue from 'vue'
import Vuex from 'vuex' 
import router from '@/router'
import axios from 'axios'


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
      console.log(payload)
    },
    UPDATE_POST(state, payload){
      state.post = payload
      console.log(payload)
      // router.push({ name: 'postDetail', params: { postId: payload.id } })
    }
  },
  actions: {
    updatePost({ commit }, postResponse) {
      const API_URL = `http://localhost:9999/api/post`
      axios({
        url: API_URL,
        method: 'PUT',
        params: postResponse
      }).then(() => {
        commit('UPDATE_POST', postResponse)
        router.push({ name: 'postDetail', params: { postId: postResponse.id } })
      }).catch((err) => {
        console.log(err)
      })
    },
    createPost({ commit }, newPost){
      commit
      const API_URL = `http://localhost:9999/api/post`
      axios({
        url: API_URL,
        method: 'POST',
        params: newPost
      }).then(() => {
        router.push({ name: 'postList'})
      }).catch((err) => {
        console.log(err)
      })


    }
  },
  modules: {
  }
})
