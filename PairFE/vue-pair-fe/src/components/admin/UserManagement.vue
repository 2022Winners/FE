<template>
  <div id="postManage" class="container">
    <div>
      <div id="admin-user-searcharea">
        <b-form-select v-model="mode" :options="options" style="width: 180px"></b-form-select>
        <b-form-input type="text" v-model="keyword" placeholder="검색어를 입력하세요" style="width: 175px"></b-form-input>
        <v-btn color="accent" style="color:white" @click="search">검색</v-btn>
      </div>
      <div style="height : 550px" id="manageusertable">
      <v-simple-table style="width: 1200px; " id="manageusertable">
      <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center" style="width:100px">
            선택
          </th>
          <th class="text-center" style="width:100px">
            번호
          </th>
          <th class="text-center">
            아이디
          </th>
           <th class="text-center">
            닉네임
          </th>
          <th class="text-center">
            이메일
          </th>
           <th class="text-center" style="width:240px">
            가입일
          </th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr v-for="user in pageUserList" :key="user.id">
          <td><b-form-checkbox :value="user.id" v-model="checkedAreas"></b-form-checkbox></td>
          <td>{{user.id }}</td>
          <td><router-link id="router" :to="`/user/detail/${user.id}`">{{user.loginId}}</router-link></td>
          <td>{{user.nickname}}</td>
          <td>{{user.email}}</td>
          <td>{{user.createdAt }}</td>         
        </tr>
      </tbody>
     </template>
     </v-simple-table>
    </div>
    </div>
    <div id="admin-post-pagination-delete">
      <v-btn color="error" style="color:white; margin-top:15px;" @click="userdelete">삭제</v-btn>
    <div id="admin-postpagination" >
      <b-pagination
      v-model="currentPage"
      pills :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table" 
       
    ></b-pagination>  
    </div>
    </div>
    
         
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {getSearchUserList} from "@/api/user";
import {deleteUser} from "@/api/user";
export default {
  name: "UserManagement",
  computed: {
    ...mapState([
      "user"
    ]),
    rows(){
      return this.users.length
    },
    pageUserList(){
      return this.users.slice(
        (this.currentPage-1)*this.perPage, this.currentPage *this.perPage
      )
    }
  },
  data(){
    return{
      keyword: "",
      mode: 3,
      currentPage: 1,
      perPage: 10,
      options: [
          { value: 1, text: '회원아이디'},
          { value: 2, text: '닉네임'},
          { value: 3, text: '회원아이디+닉네임'},
      ],
      checkedAreas: [],
      users : [],
    }

  },
  created(){
    this.search('', '');
  },
  methods: {
    async search(){
      const {data} = await getSearchUserList(this.mode, this.keyword);
      this.users = data;
   
    }, 
    userdelete(){
      for(let i = 0; i < this.checkedAreas.length; i++){
        this.UserDelete(this.checkedAreas[i]);
      }       
    },
    async UserDelete(id){
      await deleteUser(id);
      const {data} = await getSearchUserList(this.mode, this.keyword);
      this.users = data;

    },   
  }
}
</script>

<style>
#admin-user-searcharea{
  
  justify-content: flex-end;
  margin-bottom: 30px;
  display: flex;
  gap: 3px;
  
}

#adminpagination{
  display: flex;
  width: 800px;
  margin: auto;
  margin-top: 15px;
  
}

#admin-pagination-delete{
  display: flex;
  margin: auto;
}

#manageusertable{
  margin: auto;

}
</style>
