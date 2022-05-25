<template>
  <div>
    <div><a v-bind:href="`https://www.youtube.com/embed/${post.videoId}`" target="blank">
      <v-img style="max-width: 600px; display: block; margin: auto"
       v-bind:src="`http://img.youtube.com/vi/${post.videoId}/0.jpg`">
       </v-img></a>
    </div>
    <div>
      <v-simple-table style="width: 1000px; display: block; margin: auto">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center">
            channel
          </th>
          <th class="text-center">
            category
          </th>
          <th class="text-center">
            content
          </th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr>
          <td rowspan="5"> <v-img style="display: block; margin: auto; max-width: 150px;"
       :src="post.channelImg"></v-img> </td>
          <td>운동 영상 제목</td>
          <td>{{ post.title }}</td>
        </tr>
         <tr>
          <td>채널 이름</td>
          <td>{{ post.channel }}</td>
        </tr>
         <tr>
          <td>파트</td>
          <td>{{ post.part }}</td>
        </tr>
         <tr>
          <td>조회수</td>
          <td>{{ post.viewCnt }}</td>
        </tr>
         <tr>
          <td>좋아요 수</td>
          <td>{{ post.likeCnt }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
    </div>
    <div style="width: 1100px; margin: auto;" id="buttonarea">
      <v-btn v-show="user.role" color="blue accent-4" style="color:white" @click="postupdate">수정</v-btn>
      <v-btn v-show="user.role" color="pink lighten-2" style="color:white" @click="postdelete">삭제</v-btn>
    </div>





  </div>
</template>

<script>
import {mapState} from 'vuex'
import {createComment} from "@/api/comment";
import {updateComment} from "@/api/comment";
export default {
  name: "CommentList",
  data(){
    return{
      id : "",
    }
  },
  computed: {
    ...mapState([
      "post", "user"
    ])
  },
  created(){
    const pathName = new URL(document.location).pathname.split("/");
    this.id = pathName[pathName.length-1]
    this.getDetilPost(this.id, this.user.id);
  },
  methods : {
    async getDetilPost(){
      const part = await getPost(this.id, this.user.id);
      this.$store.commit('GET_DETAILPOST', part.data);   
    },
    postupdate(){
      this.$router.push({name: 'postUpdate'})
    },
    postdelete(){
      this.PostDelete(this.id)
    },
    async PostDelete(){
      await deletePost(this.id)
      this.$router.push({name: 'postList'})
    },
  }
}
</script>

<style>

#buttonarea{
  display: flex;
  justify-content: space-between;
  
}

</style>