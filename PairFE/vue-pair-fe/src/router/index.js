import Vue from 'vue'
import VueRouter from 'vue-router'
import MainView from '../views/MainView.vue'
import PostView from '@/views/post/PostView.vue'
import UserView from '@/views/user/UserView.vue'

import PostList from '@/components/post/PostList.vue'
import PostCreate from '@/components/post/PostCreate.vue'
import PostDetail from '@/components/post/PostDetail.vue'
import PostUpdate from '@/components/post/PostUpdate.vue'

import UserComment from '@/components/user/UserComment.vue'
import UserDetail from '@/components/user/UserDetail.vue'
import UserFind from '@/components/user/UserFind.vue'
import UserFollow from '@/components/user/UserFollow.vue'
import UserJoin from '@/components/user/UserJoin.vue'
import UserLikeList from '@/components/user/UserLikeList.vue'
import UserLogin from '@/components/user/UserLogin.vue'
import UserUpdate from '@/components/user/UserUpdate.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainView,
  },
  {
    path: '/post',
    component: PostView,
    children: [
      {
        path: "",
        name: "postList",
        component: PostList
      },
      {
        path: "create",
        name: "postCreate",
        component: PostCreate
      },
      {
        path: "detail/:postId",
        name: "postDetail",
        component: PostDetail
      },
      {
        path: "update",
        name: "postUpdate",
        component: PostUpdate
      },
    ]
  },
  {
    path: '/user',
    name: 'user', 
    component: UserView,
    children: [
      {
        path: "login",
        name: "userLogin",
        component: UserLogin
      },
      {
        path: "join",
        name: "userJoin",
        component: UserJoin
      },
      {
        path: ":userId/detail",
        name: "userDetail",
        component: UserDetail
      },
      {
        path: ":userId/update",
        name: "userUpdate",
        component: UserUpdate
      },
      {
        path: ":userId",
        name: "userLikeList",
        component: UserLikeList
      },
      {
        path: ":userId/comment",
        name: "userComment",
        component: UserComment
      },
      {
        path: ":userId/follow",
        name: "userFollow",
        component: UserFollow
      },
      {
        path: "find",
        name: "userFind",
        component: UserFind
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//네비게이션 가드
router.beforeEach( async(to, from, next) => { //여기서 모든 라우팅 대기
  if (to.name !== 'userLogin' && to.name !== 'main' && to.name !== 'userJoin' && sessionStorage.getItem("userId") === null) next({name: 'userLogin'});

  else next();
})

export default router
