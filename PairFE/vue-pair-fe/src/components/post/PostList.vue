<template>
  <div>
    <div>    
        <div id="partbtn">
         <v-btn color="blue accent-4" style="color:white" @click="search">TOTAL</v-btn>
         <v-btn color="pink lighten-2" style="color:white" @click="partsearch">전신</v-btn>
         <v-btn color="yellow darken-2" style="color:white" @click="partsearch">상체</v-btn>
         <v-btn color="teal accent-3" style="color:white" @click="partsearch">하체</v-btn>
         <v-btn color="purple accent-4" style="color:white" @click="partsearch">복근</v-btn>
        </div>
       

         <div id="totallist" >
           <v-card v-for="post in pagePostList" :key="post.id" height="400px" style="margin: 8px; width: 20%">
           <template slot="progress">
         <v-progress-linear
           color="deep-purple"
           height="10"
           indeterminate
          ></v-progress-linear>
           </template>
           
                <v-img
           height="250" 
           v-bind:src="`http://img.youtube.com/vi/${post.videoId}/0.jpg`" 
            ></v-img>
         
                <v-card-title class="text-truncate"><router-link id="router" :to="`/post/detail/${post.id}`">{{post.title}}</router-link></v-card-title>
                <v-card-text>
                  <span>{{post.channel }}</span><br>
                  <div style="display:flex; justify-content: space-between; ">
                    <span style="margin-top:6px">조회수 {{post.viewCnt }}</span>
                  <span v-show="post.islike"><v-btn @click="deletelike(post)"
                   icon color="pink" ><v-icon >mdi-heart</v-icon></v-btn></span>
                   <span v-show="!post.islike"><v-btn @click="createlike(post)"
                   icon color="black" ><v-icon >mdi-heart</v-icon></v-btn></span>
                  </div>
                </v-card-text>
           </v-card>
         </div>
    </div>
    <div id="registandsearch">
      <div>
      <v-btn v-show="user.role" color="yellow darken-2" style="color:white" @click="create">영상 등록</v-btn>
      </div>
      <div>
        <select v-model="mode">
        <option value="1">제목</option>
        <option value="2">내용</option>
        <option value="3">제목+내용</option>
      </select>
      <input type="text" v-model="keyword">
      <v-btn color="pink lighten-2" style="color:white" @click="search">검색</v-btn>
      </div>
    </div>
    
      <b-pagination
      v-model="currentPage"
      pills :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
      align="center"
      
      
    ></b-pagination>  
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {getPostList} from "@/api/post";
import {getPartList} from "@/api/post";
import {deleteLike} from "@/api/like";
export default {
  name: "PostList",
  data(){
    return{
      keyword: "",
      mode: "",
      currentPage: 1,
      perPage: 4
    }
  },
    computed: {
    ...mapState([
      "posts", "user"
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
  created(){
    this.search('', '', this.user.id);
  },
  methods: {
    async search(){
      const postlist = await getPostList(this.mode, this.keyword, this.user.id);
      this.$store.commit('GET_POSTS', postlist.data);
    },
    async partsearch(){
      const part = event.target.innerHTML;
      // console.log(part)
      const partlist = await getPartList(part, this.user.id);
      this.$store.commit('GET_POSTS', partlist.data);
    },
    create(){
        this.$router.push({name: 'postCreate'})
    },
    createlike(post){
      post.islike = !post.islike
      let newLike = {
        userId: this.user.id,
        postId: post.id
      }
      this.$store.dispatch("createLike", newLike)
    },
    async deletelike(post){
       post.islike = !post.islike
      await deleteLike(this.user.id, post.id);
    },
    
  }

}
</script>

<style>

#partbtn{
  margin-left: 100px;
  margin-bottom: 20px;
}


.photosize{
  width: 200px;
  height: 150px;
}

#totallist{
  display: flex ;
  flex-flow: wrap;
  justify-content: center;
}
#router{
  text-decoration: none;
  color: black;
}

#registandsearch{
  display: flex;
  justify-content: space-between;
  margin-left: 80px;
  margin-right: 80px;
  margin-top: 20px;
}



</style>

