<template>
  <div>
      <h4 class="gendertag" v-show="user.gender==1">남성들이 좋아하는 운동</h4>
      <h4 class="gendertag" v-show="user.gender==2">여성들이 좋아하는 운동</h4>
         <div id="genderlist" >
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
</template>

<script>
import {mapState} from 'vuex'
import {getGenderLikeList} from "@/api/post";
import {deleteLike} from "@/api/like";
export default {
    name: "RecommendGender",
     data(){
        return{
            posts :[],
        }
    },
    computed: {
    ...mapState([
      "user"
    ]),
   
  },
  created(){
      this.searchgender(this.user.id)    
  },
  methods : {
      async searchgender(){
          const datas = await getGenderLikeList(this.user.id)
          this.posts = datas.data;
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
#genderlist{
  display: flex ;
  flex-flow: wrap;
  /* justify-content: center; */
}

.gendertag{
    margin-left: 10px;
    margin-top: 10px;
}

</style>