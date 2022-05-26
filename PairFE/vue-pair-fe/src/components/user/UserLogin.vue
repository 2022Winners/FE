<template>
     <div class="container loginform">
      <b-form-group label="아이디" label-for="loginId">
        <b-form-input id="loginId" v-model.trim="loginId" placeholder="아이디를 입력하세요."></b-form-input>
      </b-form-group>
      <b-form-group label="비밀번호" label-for="loginPw">
        <b-form-input id="loginPw" type="password" v-model.trim="loginPw" placeholder="비밀번호를 입력하세요."></b-form-input>
      </b-form-group>
       <div>{{errMsg}}</div>
       <v-btn color= "accent" @click="login">로그인</v-btn> &nbsp;&nbsp;&nbsp;
      <v-btn color="primary" style="text-decoration:none"><router-link :to="`/user/join`"><span style="color:white">회원가입</span></router-link></v-btn>
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
        this.$router.push({name: 'main'})
      }catch(err){
        this.errMsg = err.response.data.errMsg
      }
    },
  }
};
</script>
<style>
.loginform{
  line-height: 30px;
  padding: 100px 100px;
}
</style>>