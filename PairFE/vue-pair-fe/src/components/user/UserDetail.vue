<template>
  <div>    
    <div>
      <v-simple-table style="width: 1000px; display: block; margin: auto">
    <template v-slot:default>
      <thead>
        <tr>
          <th v-if="userDetail.emageId!= null && userDetail.emageId!= 0 " class="text-center">
            프로필 사진
          </th>
          <th class="text-center">
            항목
          </th>
          <th class="text-center">
            내용
          </th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr>
          <td  v-if="userDetail.emageId!= null && userDetail.emageId!= 0" rowspan="6"> <v-img style="display: block; margin: auto; max-width: 150px;" :src="`${image.uri}`"></v-img> </td>
          <td>닉네임</td>
          <td>{{ userDetail.nickname }}</td>
        </tr>
         <tr>
          <td>아이디</td>
          <td>{{userDetail.loginId}}</td>
        </tr>
        <tr>
          <td>이메일</td>
          <td>{{userDetail.email}}</td>
        </tr>
        <tr>
          <td>가입일자</td>
          <td>{{userDetail.createdAt}}</td>
        </tr>
        <tr v-if="userDetail.gender != 0">
          <td>성별</td>
          <td v-if="userDetail.gender===1">남성</td>
          <td v-else>여성</td>
        </tr>
        <tr v-if="userDetail.age != 0">
          <td>나이</td>
          <td>{{userDetail.age}}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
    </div>
    <div v-if="user.id===userDetail.id" style="width: 1100px; margin: auto;" id="buttonarea">
      <v-btn color="yellow darken-2" style="color:white"><router-link :to="`/user/update/${user.id}`">수정</router-link></v-btn>
      <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
      >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="blue-grey lighten-5"
          v-bind="attrs"
          v-on="on"
        >
         탈퇴
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5">
          정말 탈퇴하시겠습니까?
        </v-card-title>
        <v-card-text>탈퇴하면 회원 정보를 복구할 수 없습니다.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="userdelete"
          >
            탈퇴하기
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            취소하기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>


  </div>
</template>
<script>
import {mapState} from 'vuex'
import {getUser} from "@/api/user";
import {deleteUser} from "@/api/user";
export default {
  name: "UserDetail",
  data(){
    return{
      dialog: false,
      image: {},
      userDetail: {},
      detailId: "",
    }
  },
  computed: {
    ...mapState([
      "user"
    ])
  },
  created(){
    const pathName = new URL(document.location).pathname.split("/");
    this.detailId = pathName[pathName.length-1]
    this.getDetailUser(this.detailId);
  },
  methods : {
    async getDetailUser(detailId){
      const getData = await getUser(detailId);
      this.userDetail = getData.data.user
      console.log(this.userDetail) 
      if(this.userDetail.imageId!=0)
        this.image = getData.data.image
    },
    userupdate(){
      this.$router.push({name: 'userUpdate'})
    },
    userdelete(){
      this.UserDelete(this.user.id)
    },
    async UserDelete(userId){
      await deleteUser(userId)
      this.$store.commit('USER_LOGOUT')
     
      this.$router.push({name: 'main'})
    },
  }
}
</script>

<style>

#buttonarea{
  display: flex;
  justify-content: center;
  
}

</style>