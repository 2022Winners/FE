<template>
  <div>
    <div>
      <h2>운동 영상 리스트</h2>
        <v-btn color="blue accent-4" style="color:white" @click="search">TOTAL</v-btn>
         <v-btn color="pink lighten-2" style="color:white" @click="partsearch">전신</v-btn>
         <v-btn color="yellow darken-2" style="color:white" @click="partsearch">상체</v-btn>
         <v-btn color="teal accent-3" style="color:white" @click="partsearch">하체</v-btn>
         <v-btn color="purple accent-4" style="color:white" @click="partsearch">복근</v-btn>

         <div id="list" >
           <v-card v-for="post in posts" :key="post.id" height="400px" style="margin: 8px; width: 20%">
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
         
                <v-card-title class="text-truncate"><router-link id="router" :to="`/post/${post.id}`">{{post.title}}</router-link></v-card-title>
                <v-card-text>
                  <span>{{post.channel }}</span><br>
                  <span>{{post.likeCnt }}</span>
                  <span v-show="post.islike"><v-btn class="likebtn"
                   icon color="pink" ><v-icon >mdi-heart</v-icon></v-btn></span>
                   <span v-show="!post.islike"><v-btn class="likebtn"
                   icon color="black" ><v-icon >mdi-heart</v-icon></v-btn></span><br>
                </v-card-text>
           </v-card>
         </div>

      <!-- <table border="1">
          <tr>
            <th>썸네일</th>
            <th>영상제목</th>
            <th>채널이름</th>
            <th>좋아요수</th>
            <th>좋아요</th>
          </tr>
          <tr v-for="post in posts" :key="post.id">
            <td><img  v-bind:src="`http://img.youtube.com/vi/${post.videoId}/0.jpg`"          
                  alt="해당 운동 영상 썸네일"></td> 
            <td>{{post.title}}</td>
            <td>{{post.channel }}</td>
            <td>{{post.likeCnt }}</td>
            <td v-show="post.islike"><v-btn class="likebtn"
              icon
              color="pink"
            ><v-icon >mdi-heart</v-icon>
            </v-btn></td>
            <td v-show="!post.islike"><v-btn
              icon
              color="black"
            >
              <v-icon>mdi-heart</v-icon>
            </v-btn></td>
          </tr>
       </table> -->
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
</template>

<script>
import {mapState} from 'vuex'
import {getPostList} from "@/api/post";
import {getPartList} from "@/api/post";
export default {
  name: "PostList",
  data(){
    return{
      keyword: "",
      mode: "",
    }
  },
    computed: {
    ...mapState([
      "posts", "user"
    ])
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
    }
  }

}
</script>

<style>

.photosize{
  width: 200px;
  height: 150px;
}

#list{
  display: flex ;
  flex-flow: wrap;
  
  
}
#router{
  text-decoration: none;
  color: black;
}



</style>

