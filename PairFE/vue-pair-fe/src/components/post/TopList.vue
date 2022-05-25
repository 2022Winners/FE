<template>
  <div>
      <h4 class="toplisttag" >지금 핫한 영상</h4>
         <div id="toplist"  style="width: 1200px">
           <v-card v-for="post in posts" :key="post.id" height="400px" style="margin: 8px; width: 280px">
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
         
                <v-card-title id="cardtitle-toplist"><router-link id="router" :to="`/post/detail/${post.id}`">{{post.title}}</router-link></v-card-title>
                <v-card-text id="cardtext-toplist" >
                  <span>{{post.channel }}</span><br>
                  <div style="display:flex; justify-content: space-between; ">
                    <span style="margin-top:10px">조회수 {{post.viewCnt }}</span>
                  <span v-show="post.islike"><v-btn @click="deletelike(post)"
                   icon color="pink" large ><v-icon >mdi-heart</v-icon></v-btn></span>
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
import {getTopList} from "@/api/post";
import {deleteLike} from "@/api/like";
export default {
    name: "TopList",
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
      this.searchtop(this.user.id)    
  },
  methods : {
      async searchtop(){
          const datas = await getTopList(this.user.id)
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
#toplist{
  display: flex ;
  flex-flow: wrap;
  /* justify-content: center; */
}

.toplisttag{
    margin-left: 10px;
    margin-top: 10px;
}

#cardtext-toplist{
  margin-top: 20px;
  font-size: large;
}

#cardtitle-toplist{
  width: 290px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  margin-top: 15px;
}

</style>