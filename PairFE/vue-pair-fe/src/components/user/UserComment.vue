<template>
  <v-container>
    <div>
      <v-simple-table style="width: 1200px; display: block; ">
      <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center" style="width:100px">
            번호
          </th>
          <th class="text-center">
            게시물번호
          </th>
           <th class="text-center" colspan="6">
            내용
          </th>
           <th class="text-center" style="width:240px">
            작성일
          </th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr v-for="(comment, idx) in myCommentList" :key="idx">
          <td>{{ idx+1 }}</td>
          <td>{{ comment.postId }}</td>
          <td colspan="6"><router-link id="router" :to="`/post/detail/${comment.postId}`">{{comment.content}}</router-link></td>
          <td>{{comment.createdAt }}</td>         
        </tr>
      </tbody>
     </template>
     </v-simple-table>
    </div>
  </v-container>
</template>

<script>
import {getReplyListByUserId} from "@/api/reply";
import { mapState } from 'vuex';

export default {
  name: "UserComment",
  data() {
    return {
      myCommentList: [],
    }
  },
  computed: {
    userId() {
      return this.user.id
    },
    ...mapState([
      "user"
    ]),
  },
  created() {
    this.getMyCommentList()
  },
  methods : {
    async getMyCommentList() {
      const {data} = await getReplyListByUserId(this.userId)
      this.myCommentList = data
    }
  }
}
</script>

<style>

</style>