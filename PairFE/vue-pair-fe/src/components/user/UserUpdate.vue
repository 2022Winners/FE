<template>
  <div class="container">
      <v-container style="text-align:center">
        <div  v-if="user.imageId!= null && user.imageId!= 0"> 
            <v-avatar size="350"><v-img style="display: block; margin: auto;" :src="`${image.uri}`">
              </v-img></v-avatar> 
            </div>
          <div  v-else> 
            <v-avatar size="350">
             <v-img style="display: block; margin: auto; max-width: 350px;" src="https://2022winners.s3.ap-northeast-2.amazonaws.com/ex.png">
             </v-img>
             </v-avatar>
          </div>
          </v-container>
          <class class="m-4"> <v-row>
              <v-col cols="3">아이디</v-col>
              <v-col cols="9">{{user.loginId}}</v-col>
            </v-row>
            <v-row>
              <v-col cols="3">이메일</v-col>
              <v-col cols="9">{{user.email}}</v-col>
            </v-row>
            <v-row>
              <v-col cols="3">가입일자</v-col>
              <v-col cols="9">{{user.createdAt}}</v-col>
            </v-row></class>
    <class class="m-4">
      <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      >
      <v-text-field
        v-model.trim="loginPw"
        :counter="15"
        :rules="loginPwRules"
        label="비밀번호"
        type="password"
        required
      ></v-text-field>
         <v-text-field
        v-model.trim="checkLoginPw"
        :rules="checkLoginPwRules"
        label="비밀번호확인"
        type="password"
        required
      ></v-text-field>
      <v-text-field
        v-model.trim="nickname"
        :counter="10"
        :rules="nicknameRules"
        label="닉네임"
        required
      ></v-text-field>

      <div style="font-size:20px">더 정확한 영상을 추천을 위해 알려주세요(선택)</div>
    <v-radio-group v-model="gender" row>
      <v-radio
        label="남"
        value=1
      ></v-radio>
      <v-radio
        label="여"
        value=2
      ></v-radio>
       <v-radio
        label="선택 안 함"
        value=0
      ></v-radio>
    </v-radio-group>
    <v-select
      :items="ages"
      label="연령대"
      v-model="age"
      item-text="name"
      item-value="value"
      solo>
    </v-select>
    <v-btn
      :disabled="!valid"
      color="primary"
      class="mr-4"
      @click="update"
    >
      수정
    </v-btn>
      <v-btn
      color="error"
      class="mr-4"
      @click="cancel"
    >
      취소
    </v-btn>
  </v-form>
</class>
</div>
</template>

<script>

import {mapState} from 'vuex'

export default {
  name: "UserUpdate",
   data: () => ({
      valid: true,
      loginPw: "",
      loginPwRules: [
        v => !!v.trim() || '비밀번호는 필수 기입 항목입니다.',
        v => (v.trim() && v.trim().length <= 16 &&  v.trim().length >= 8) || '8자~16자 이내로 기입해주세요.',
      ],
      checkLoginPw: "",
      nickname: "",
      nicknameRules: [
        v => !!v.trim() || '닉네임은 필수 기입 항목입니다.',
        v => (v.trim() && v.trim().length <= 10) || '10자 이내로 기입해주세요.',
      ],
      gender: 0,
      age: 0,
      ages: [
        { name: '선택 안 함', value: '0'},
        { name: '10대', value: '10'},
        { name: '20대', value: '20'},
        { name: '30대', value: '30'},
        { name: '40대', value: '40'},
        { name: '50대', value: '50'},
        { name: '60대', value: '60'},
      ],
      
      userList: [],
    }),
    
    computed: {
      checkLoginPwRules () {
        const rules = []
        const rule = v => (v.trim() === this.loginPw) || '비밀번호가 일치하지 않습니다.'
        rules.push(rule)
        return rules
      },
      ...mapState(['user']),
      ...mapState(['image']),
    },
  created() {
    this.nickname = this.user.nickname
    this.gender = this.user.gender
    this.age = this.user.age
   },

  methods: { 
    update() { 
      console.log(this.user)
      const validate = this.$refs.form.validate();
      if(validate){
        let newUser = {
          id: this.user.id,
          imageId : this.user.imageId,
          loginId: this.user.loginId,
          loginPw: this.loginPw,
          nickname: this.nickname,
          email: this.user.email,
          gender: this.gender,
          age: this.age,
          role: this.user.role,
          createdAt: this.user.createdAt,
      };
        this.$store.dispatch('updateUser', newUser)
    }
  },
  cancel(){
    this.$router.push({name: 'userDetail', params:{userId : this.user.id}})
  }
}
}
</script>

<style>

</style>