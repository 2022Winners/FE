import Vue from 'vue'
import Vuex from 'vuex' 
import router from '@/router'
import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {id:0},
    posts: [],
    post: {},
    likeposts: [],
  },
  getters: {
  },
  mutations: {
    USER_LOGIN(state, payload) {
      state.user = payload.user
      console.log(payload)
      sessionStorage.setItem("userId", payload.user.id)
      sessionStorage.setItem("userNickname", payload.user.nickname)
      if(payload.image != null){
        sessionStorage.setItem("userImageUri", payload.image.uri)
        sessionStorage.setItem("userImageName", payload.image.name)
      }
    },
    GET_POSTS(state, payload) {
      state.posts = payload
    },
    GET_DETAILPOST(state, payload){
      state.post = payload
    },
    UPDATE_POST(state, payload){
      state.post = payload
    },
    GET_LIKEPOSTS(state, payload){
      state.likeposts = payload
    },

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
    },
    createLike({commit}, newLike){
      commit
      const API_URL = `http://localhost:9999/api/like`
      axios({
        url: API_URL,
        method: 'POST',
        params: newLike
      }).then(() => {
        
      }).catch((err) => {
        console.log(err)
      })

    }
  },
  modules: {
  }
})