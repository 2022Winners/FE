<template>
  <div>
    <br>
    <br>
    <div>
      <template>
          <v-form>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="newComment"
                          :append-outer-icon="newComment ? 'mdi-send' : 'mdi-chat-processing-outline'"
                          prepend-icon="mdi-emoticon"
                          filled
                          clear-icon="mdi-close-circle"
                          clearable
                          label="댓글"
                          type="text"
                          @click:append="toggleMarkerC"
                          @click:append-outer="sendMessageC"
                          @click:clear="clearMessageC"
                          @keypress.enter="sendMessageC"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
          <v-container>
         <v-expansion-panels>
          <v-expansion-panel v-for="(comment, idx) in commentList" :key="comment.id">
            <v-expansion-panel-header>
              <v-row no-gutters style="text-align:center">
                <v-col cols="1"> {{ idx+1 }} </v-col>
                <v-col cols="2"> &nbsp;&nbsp; {{ comment.writer }} </v-col>
                <v-col cols="6" v-if="checkWriter"> <div v-if="getCommentId === comment.id"><textarea style="border:2px solid blue; width:300px; max-width:500px; height: 80px;" @click.stop="" v-model="commentContent"></textarea><span><v-btn @click.stop="updateC(comment.id)"
                      icon color="green"><v-icon>mdi-check</v-icon></v-btn><v-btn @click.stop="deleteC(comment.id)"
                      icon color="red"><v-icon>mdi-delete</v-icon></v-btn><v-btn @click.stop="cancelC()"
                      icon color="grey"><v-icon>mdi-close-box</v-icon></v-btn></span></div><div v-else>{{ comment.content }} <v-btn @click.stop="updateFormC(comment.userId, comment.id, comment.content)"
                      icon color="grey"><v-icon style="font-size:16px">mdi-pencil</v-icon></v-btn></div> </v-col>
                <v-col v-else cols="6"> {{ comment.content }} <v-btn @click.stop="updateFormC(comment.userId, comment.id, comment.content)"
                      icon color="grey"><v-icon style="font-size:16px">mdi-pencil</v-icon></v-btn> </v-col>
                <v-col cols="3"> {{ comment.createdAt }} </v-col>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                 <v-form>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="newReply"
                          :append-outer-icon="newReply ? 'mdi-send' : 'mdi-chat-processing-outline'"
                          prepend-icon="mdi-emoticon"
                          filled
                          clear-icon="mdi-close-circle"
                          clearable
                          label="답글"
                          type="text"
                          @click:append="toggleMarkerR"
                          @click:append-outer="sendMessageR(comment.postId, comment.id)"
                          @click:clear="clearMessageR"
                          @keypress.enter="sendMessageR(comment.postId, comment.id)"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
                <!-- <v-container> -->
                  <v-row no-gutters v-for="reply in comment.replyList" :key="reply.id" style="text-align:center; font-size:15px ">
                    <v-col cols="1"><v-icon style="font-size:13px">mdi-arrow-right-bottom</v-icon></v-col>
                    <v-col cols="2"> {{ reply.writer }} </v-col>
                    <v-col cols="6" v-if="checkReplyWriter"> <div v-if="getReplyId === reply.id"><textarea style="border:2px solid blue;width:300px; max-width:500px; height: 80px;" @click.stop="" v-model="replyContent"></textarea><span><v-btn @click.stop="updateR(reply.id)"
                              icon color="green"><v-icon>mdi-check</v-icon></v-btn><v-btn @click.stop="deleteR(reply.id)"
                              icon color="red" ><v-icon>mdi-delete</v-icon></v-btn><v-btn @click.stop="cancelR()"
                              icon color="grey"><v-icon>mdi-close-box</v-icon></v-btn></span></div><div v-else>{{ reply.content }} <v-btn @click.stop="updateFormR(reply.userId, reply.id, reply.content)"
                              icon color="grey"><v-icon style="font-size:16px">mdi-pencil</v-icon></v-btn></div> </v-col>
                    <v-col cols="6" v-else> {{ reply.content }} <v-btn @click.stop="updateFormR(reply.userId, reply.id, reply.content)"
                              icon color="grey"><v-icon style="font-size:16px">mdi-pencil</v-icon></v-btn> </v-col>
                    <v-col cols="3"> <span>{{ reply.createdAt }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></v-col>
                  </v-row>
              <!-- </v-container> -->
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        </v-container>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { getCommentListByPostId } from "@/api/comment";
import { createComment } from "@/api/comment";
import { deleteComment } from '@/api/comment';
import { updateComment } from "@/api/comment";
import { createReply } from "@/api/reply";
import { updateReply } from "@/api/reply";
import { deleteReply } from "@/api/reply";

// 이벤트 버블링 방지 처리 완료 event.stopPropagation();
export default {
  name: "CommentList",
  props: ['postId'],
  data(){
    return{
      commentId : 0,
      replyId : 0,
      commentList: [],
      isWriter : false,
      isReplyWriter : false,
      isUpdateComment : false,
      isUpdateReply : false,
      userId : 0,
      commentContent: '',
      replyContent:'',
      show: false,
      newComment: '',
      newReply:'',
      markerC: true,
      markerR: true,
    }
  },
  computed: {
    checkWriter() {
      return this.isWriter
    },
    checkReplyWriter() {
      return this.isReplyWriter
    },
    getCommentId() {
      return this.commentId
    },
    getReplyId() {
      return this.replyId
    },
    getCommentContent() {
      return this.updateComment
    },
    getReplyContent() {
      return this.updateReply
    },
    ...mapState([
      "user"
    ]),
  },
  created(){
    this.userId = this.user.id
    this.getCommentList()
  },
  methods : {
    async getCommentList(){
      const {data} = await getCommentListByPostId(Number(this.postId));
      this.commentList = data
    },
    updateFormC(writerId, currCommentId, currContent){
      this.commentContent = currContent
      this.commentId = currCommentId
      if(this.userId === writerId) {
        this.isWriter = true
      }else {
        this.isWriter = false
      }
    },
    updateFormR(writerId, currReplyId, currContent){
      this.replyContent = currContent
      this.replyId = currReplyId
      if(this.userId === writerId) {
        this.isReplyWriter = true
      }else {
        this.isReplyWriter = false
      }
    },
    async updateC(cId) {
      let commentData = {
        id: cId,
        content: this.commentContent
      }
      await updateComment(cId, commentData)
      window.location.reload()
    },
    async updateR(rId) {
      let replyData = {
         id: rId,
         content: this.replyContent
      }
      await updateReply(rId, replyData)
      window.location.reload()
    },
    cancelC() {
      this.commentId = 0
    },
    cancelR() {
      this.replyId = 0
    },
    async deleteC(cId){
      await deleteComment(cId)
      window.location.reload()
    },
    async deleteR(rId){
      await deleteReply(rId)
      window.location.reload()
    },
    toggleMarkerC () {
      this.markerC = !this.markerC
    },
    async sendMessageC () {
      const commentData = {
        userId: this.userId,
        writer: this.user.nickname,
        postId: this.postId,
        content: this.newComment
      }
      await createComment(commentData)
      this.clearMessageC()
      window.location.reload()
    },
    clearMessageC () {
      this.newComment = ''
    },
    toggleMarkerR () {
      this.markerR = !this.markerR
    },
    async sendMessageR (pId, cId) {
      const replyData = {
        userId: this.userId,
        writer: this.user.nickname,
        postId: pId,
        commentId: cId,
        content: this.newReply
      }
      console.log(replyData)
      await createReply(replyData)
      this.clearMessageR()
      window.location.reload()
    },
    clearMessageR () {
      this.newReply = ''
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