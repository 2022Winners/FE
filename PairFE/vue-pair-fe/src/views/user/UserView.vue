<template>
<div>
  <v-tabs v-if="checkLogin">
    <v-tab><router-link :to="`/user/detail/${user.id}`">내 정보</router-link></v-tab>
    <v-tab><router-link :to="`/user/comment/${user.id}`">내 리뷰</router-link></v-tab>
    <v-tab><router-link :to="`/user/follow/${user.id}`">팔로잉/팔로워</router-link></v-tab>
  </v-tabs>
    <router-view></router-view>
</div>

  
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "UserView",
  computed: {
    checkLogin() {
      return this.$store.getters.isLogin;
    }, 
    ...mapState([
      "user"
    ]),
  },
}
</script>

<style>

</style>
