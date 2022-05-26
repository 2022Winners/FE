import Vue from 'vue'
import Vuex from 'vuex' 
import router from '@/router'
import axios from 'axios'
import createPersistedState from "vuex-persistedstate"


Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    user: {id:0},
    image: {},
    posts: [],
    post: {},
    likeposts: [],
    followinglist: [],
    followerlist: [],
  },
  getters: {
    isLogin: (state) => { 
      if(state.user.id != 0)
        return true
      return false
    }
  },
  mutations: {
    USER_LOGIN(state, payload) {
      state.user = payload.user
      if(payload.image != null){
        state.image = payload.image
      }
    },
    USER_LOGOUT(state) {
      state.user = {id:0}
      state.image = {}
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
    GET_FOLLOWINGS(state, payload){
      state.followinglist = payload
    },
    GET_FOLLOWERS(state, payload){
      state.followerlist = payload
    },
    UN_FOLLOW(state, payload){
      for(let i = 0; i < state.followinglist.length; i++) {
        if(state.followinglist[i] === payload)  {
          state.followinglist.splice(i, 1);
          i--;
        }
      }
    },
    PLUS_FOLLOW(state, payload){
       state.followinglist.push(payload)
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

    },unFollow({commit}, payload){
      const API_URL = `http://localhost:9999/api/relation`
      axios({
        url: API_URL,
        method: 'DELETE',
        params: payload.unfollow
      }).then(() => {
        commit('UN_FOLLOW', payload.follow)
      }).catch((err) => {
        console.log(err)
      })
    },
    Follow({commit}, payload){
      const API_URL = `http://localhost:9999/api/relation`
      axios({
        url: API_URL,
        method: 'POST',
        params: payload.follow
      }).then(() => {
        commit('PLUS_FOLLOW', payload.follower)
      }).catch((err) => {
        console.log(err)
      })
    },
    

  },
  modules: {
  }
})