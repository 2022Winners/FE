<template>
  <div>
    <div>
      <h2>전체 영상 리스트</h2>
      <div id="admin-searcharea">
        <b-form-select v-model="mode" :options="options" style="width: 150px"></b-form-select>
        <b-form-input type="text" v-model="keyword" placeholder="검색어를 입력하세요" style="width: 175px"></b-form-input>
        <v-btn color="pink lighten-2" style="color:white" @click="search">검색</v-btn>
      </div>
      <div>
      <v-simple-table style="width: 1200px; display: block; ">
      <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center">
            선택
          </th>
          <th class="text-center" style="width:100px">
            번호
          </th>
          <th class="text-center">
            영상 제목
          </th>
           <th class="text-center">
            채널명
          </th>
           <th class="text-center" style="width:240px">
            게시일
          </th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr v-for="post in pagePostList" :key="post.id">
          <td><b-form-checkbox :value="post.id" v-model="checkedAreas"></b-form-checkbox></td>
          <td>{{post.id }}</td>
          <td><router-link id="router" :to="`/post/detail/${post.id}`">{{post.title}}</router-link></td>
          <td>{{post.channel }}</td>
          <td>{{post.createdAt }}</td>         
        </tr>
      </tbody>
     </template>
     </v-simple-table>
    </div>
    </div>
    <div id="admin-pagination-delete">
      <v-btn color="purple accent-4" style="color:white; margin-top:15px;" @click="postdelete">삭제</v-btn>
    <div id="adminpagination" >
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
import {getPostList} from "@/api/post";
import {deletePost} from "@/api/post";
export default {
  name: "PostAdmin",
  computed: {
    ...mapState([
      "user"
    ]),
    rows(){
      return this.posts.length
    },
    pagePostList(){
      return this.posts.slice(
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
          { value: 1, text: '제목'},
          { value: 2, text: '파트'},
          { value: 3, text: '제목+파트'},
      ],
      checkedAreas: [],
      posts : [],
    }

  },
  created(){
    this.search('', '', this.user.id);
  },
  methods: {
    async search(){
      const {data} = await getPostList(this.mode, this.keyword, this.user.id);
      this.posts = data;
   
    }, 
    postdelete(){
      for(let i = 0; i < this.checkedAreas.length; i++){
        this.PostDelete(this.checkedAreas[i]);
      }
      // this.search('', '', this.user.id);
         
    },
    async PostDelete(id){
      await deletePost(id);
      const {data} = await getPostList(this.mode, this.keyword, this.user.id);
      this.posts = data;

    },   
  }
}
</script>

<style>
#admin-searcharea{
  margin-left: 800px;
  margin-bottom: 10px;
  display: flex;
  gap: 3px;
}

#adminpagination{
  display: flex;
  width: 700px;
  margin: auto;
  margin-top: 15px;
  
}

#admin-pagination-delete{
  display: flex;
}

</style>
