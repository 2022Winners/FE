<template>
  <div>
    <h2>유저 로그인</h2>
    <fieldset>
      <legend>로그인 폼</legend>
      <label for="loginId">아이디</label><br>
      <input type="text" id="loginId" v-model.trim="loginId" placeholder="아이디를 입력하세요."  /> <br />
      <label for="loginPw">비밀번호</label><br>
      <input type="password" id="loginPw" v-model.trim="loginPw" placeholder="비밀번호를 입력하세요."  /> <br />
      <div>{{errMsg}}</div>
      <v-btn color="blue accent-4" style="color:white" @click="login">로그인</v-btn>
      <v-btn color="blue-grey lighten-5" style="color:white"><router-link :to="`/user/userJoin`">회원가입</router-link></v-btn>
    </fieldset>
  </div>
</template>

<script>
import {login} from "@/api/user";
export default {
  name: "userLogin",
  data(){
    return {
      loginId: "",
      loginPw: "",
      errMsg: "",
    }
  },
  methods: {
   async login() {
     try{
        const user = await login(this.loginId, this.loginPw)
        this.$store.commit('USER_LOGIN', user.data)
        sessionStorage.setItem("userId", user.data.id)
        await this.$router.push(`/`)
      }catch(err){
        this.errMsg = err.response.data.message
      }
    },
  }
};
</script>

<style>
</style>