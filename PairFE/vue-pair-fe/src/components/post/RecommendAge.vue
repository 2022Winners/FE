<template>
  <div>
      <h4 class="agetag"  v-show="user.age!=0">{{user.age}}대가 좋아하는 운동</h4>
      <h4 class="gendertag" v-show="user.age==0">전연령대가 좋아하는 운동</h4>
         <div id="agelist" >
           <v-card v-for="post in posts" :key="post.id" id="genderagelikecard">
           <template slot="progress">
         <v-progress-linear
           color="deep-purple"
           height="10"
           indeterminate
          ></v-progress-linear>
           </template>
           
                <v-img
           v-bind:src="`http://img.youtube.com/vi/${post.videoId}/0.jpg`" 
            ></v-img>
         
                <v-card-title id="cardtitle-genderage"><router-link id="router" :to="`/post/detail/${post.id}`">{{post.title}}</router-link></v-card-title>
                <v-card-text id="cardtext-genderage">
                  <span>{{post.channel }}</span><br>
                  <div style="display:flex; justify-content: space-between; ">
                    <span style="margin-top:10px">조회수 {{post.viewCnt }}</span>
                  <span v-show="post.islike"><v-btn @click="deletelike(post)"
                   icon color="pink" large><v-icon >mdi-heart</v-icon></v-btn></span>
                   <span v-show="!post.islike"><v-btn @click="createlike(post)"
                   icon color="black" large><v-icon >mdi-heart</v-icon></v-btn></span>
                  </div>
                </v-card-text>
           </v-card>
         </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {getAgeLikeList} from "@/api/post";
import {deleteLike} from "@/api/like";
export default {
    name: "RecommendAge",
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
      this.searchage(this.user.id)    
  },
  methods : {
      async searchage(){
          const datas = await getAgeLikeList(this.user.id)
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
#agelist{
  display: flex ;
  flex-flow: wrap;
  /* justify-content: center; */
}

.agetag{
    margin-left: 10px;
    margin-top: 10px;
}

</style>