<template>
  <div>
    <div>    
        <div id="likepartbtn">
         <v-btn color="blue accent-4" style="color:white" @click="search">TOTAL</v-btn>
         <v-btn color="pink lighten-2" style="color:white" @click="partsearch">전신</v-btn>
         <v-btn color="yellow darken-2" style="color:white" @click="partsearch">상체</v-btn>
         <v-btn color="teal accent-3" style="color:white" @click="partsearch">하체</v-btn>
         <v-btn color="purple accent-4" style="color:white" @click="partsearch">복근</v-btn>
        </div>
       

         <div id="likelist" >
           <v-card v-for="post in likeposts" :key="post.id" style="margin: 8px; width: 280px; height : 380px" id="likecard">
           <template slot="progress">
         <v-progress-linear
           color="deep-purple"
           height="10"
           indeterminate
          ></v-progress-linear>
           </template>
             
                  <v-img id="likeimg"
                 v-bind:src="`http://img.youtube.com/vi/${post.videoId}/0.jpg`" 
                   ></v-img>                      
                <v-card-title id="cardtitle"><router-link id="router" :to="`/post/detail/${post.id}`">{{post.title}}</router-link></v-card-title>
                <v-card-text id="cardtext-postlike">
                  <span>{{post.channel }}</span><br>
                  <div style="display:flex; justify-content: space-between; ">
                    <span style="margin-top:10px">조회수 {{post.viewCnt }}</span>
                  <span v-show="post.islike"><v-btn @click="deletelike(post)"
                   icon color="pink" large ><v-icon >mdi-heart</v-icon></v-btn></span>
                   <span v-show="!post.islike"><v-btn @click="createlike(post)"
                   icon color="black" large ><v-icon >mdi-heart</v-icon></v-btn></span>
                  </div>
                </v-card-text>
           </v-card>
         </div>
    </div> 
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {getUserLikeList} from "@/api/post";
import {getUserLikePartList} from "@/api/post";
import {deleteLike} from "@/api/like";
export default {
  name: "PostLike",
  data(){
    return{
      keyword: "",
      mode: "",
    }
  },
    computed: {
    ...mapState([
      "likeposts", "user"
    ]),
  },
  created(){
    this.search(this.user.id);
  },
  methods: {
    async search(){
      const postlist = await getUserLikeList(this.user.id);
      this.$store.commit('GET_LIKEPOSTS', postlist.data);
    },
    async partsearch(){
      const part = event.target.innerHTML;
      // console.log(part)
      const partlist = await getUserLikePartList(part, this.user.id);
      this.$store.commit('GET_LIKEPOSTS', partlist.data);
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

<style >

#likepartbtn{
  margin-bottom: 10px;
  margin-left: 9px;
  display: flex;
  gap: 4px;
}

#cardtext-postlike{
  font-size: large;
}

#likelist{
  display: flex;
  flex-flow: wrap;
  justify-content: flex-start;
  gap: 10px 1%;
  width: 1000px;
}
#router{
  text-decoration: none;
  color: black;
}

#cardtitle{
  width: 280px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  margin-top: 15px;
}
</style>

