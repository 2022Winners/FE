<template>
     <div class="container">
    <h2>회원 가입</h2>
    <class class="m-4">
      <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      >
      <v-file-input
        v-model="myFile"
        prepend-icon="mdi-camera"
        label="프로필 사진 등록"
      ></v-file-input>
      <v-text-field
      v-model.trim="id"
      :counter="10"
      :rules="idRules"
      label="아이디"
      required
      ></v-text-field>
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
        v-model.trim="email"
        :rules="emailRules"
        label="이메일"
        required
      ></v-text-field>
      <v-text-field
        v-model.trim="nickname"
        :counter="10"
        :rules="nicknameRules"
        label="닉네임"
        required
      ></v-text-field>

      <div>더 정확한 영상을 추천해드릴 수 있도록 기입해주세요(선택 사항)</div>
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
      color="success"
      class="mr-4"
      @click="join"
    >
      가입하기
    </v-btn>
  </v-form>
</class>
</div>
</template>

<script>
import {join} from "@/api/user";
import {getUserList} from "@/api/user";

export default {
    name: "UserJoin",

    data: () => ({
      valid: true,
      id: "",
      loginPw: "",
      loginPwRules: [
        v => !!v.trim() || 'pw is required',
        v => (v.trim() && v.trim().length <= 16 &&  v.trim().length >= 8) || '8자~16자 사이로 입력해주세요.',
      ],
      checkLoginPw: "",
      email: "",
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v.trim()) || 'E-mail must be valid',
      ],
      nickname: "",
      nicknameRules: [
        v => !!v.trim() || 'nickname is required',
        v => (v.trim() && v.trim().length <= 10) || '10자 이내로 입력해주세요.',
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

      myFile: null,

      userList: [],
    }),
    
    computed: {
      idRules () {
        const rules = []

        const rule = v => !!v.trim() || '아이디를 입력해주세요.'
        rules.push(rule)
        const lenRule = v => (v.trim() && v.trim().length <= 15) || '15자 이내로 입력해주세요.'
        rules.push(lenRule)
        const dupRule = v => this.checkLoginId(v.trim()) || '동일한 ID가 존재합니다'
        rules.push(dupRule)
        return rules
      },
      checkLoginPwRules () {
        const rules = []
        const rule = v => (v.trim() === this.loginPw) || '비밀번호가 일치하지 않습니다.'
        rules.push(rule)
        return rules
      }
    },
    created(){
      this.getUserList();
    },
    methods: {
    async getUserList(){
      const getData = await getUserList()
      this.userList = getData.data
    },
    async join(){
      const validate = this.$refs.form.validate();
      if(validate){
        const formData = new FormData();
        formData.append("file", this.myFile);
        formData.append("loginId", this.id);
        formData.append("loginPw", this.loginPw);
        formData.append("email", this.email);
        formData.append("nickname", this.nickname);
        formData.append("gender", this.gender);
        formData.append("age", this.age);
        await join(formData)
        this.$router.push({name: 'userLogin'})
      }
    },
    checkLoginId(v){
      for(var i in this.userList){
        if(v==this.userList[i].loginId){
          return "이미 사용 중인 아이디입니다."
        }
      }
      return true;
    }
  },
}
</script>

<style>

</style>