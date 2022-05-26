<template>
<div>
  <v-tabs v-if="checkLogin">
    <v-tab><router-link :to="`/user/detail/${userId}`">회원 정보</router-link></v-tab>
    <v-tab><router-link :to="`/user/comment/${userId}`">운동 기록</router-link></v-tab>
    <v-tab><router-link :to="`/user/follow/${userId}`">팔로잉/팔로워</router-link></v-tab>
  </v-tabs>
    <router-view></router-view>
</div>
</template>

<script>
export default {
  name: "UserView",
  computed: {
    checkLogin() {
      return this.$store.getters.isLogin;
    }, 
    userId() {
      const pathName = new URL(document.location).pathname.split("/");
      return pathName[pathName.length-1]
    },
  },
}
</script>

<style>

</style>
