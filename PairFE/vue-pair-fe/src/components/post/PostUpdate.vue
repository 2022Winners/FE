<template>
  <div>
     <div class="container">
    <h2>post 수정</h2>
    <div class="m-4">
      <b-form-group label="Title" label-for="title">
        <b-form-input id="title" v-model="post.title" trim></b-form-input>
      </b-form-group>
      <b-form-group label="Part" label-for="part">
        <b-form-input id="part" v-model="post.part" trim></b-form-input>
      </b-form-group>
      <b-form-group label="ChannelName" label-for="ChannelName">
        <b-form-input id="ChannelName" v-model="post.channel"></b-form-input>
      </b-form-group>
      <b-form-group label="ChannelImg" label-for="ChannelImg">
        <b-form-input id="ChannelImg" v-model="post.channelImg"></b-form-input>
      </b-form-group>
      <b-form-group label="VideoId" label-for="VideoId">
        <b-form-input id="VideoId" v-model="post.videoId"></b-form-input>
      </b-form-group>
      <b-button variant="outline-primary" @click="postUpdate">수정</b-button>
    </div>
  </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "PostUpdate",
  computed: {
  ...mapState(['post']),
  },
  methods: {
    postUpdate(){
      let postResponse = {
         id: this.post.id,
        title: this.post.title,
        channel: this.post.channel,
        channelImg: this.post.channelImg,
        videoId: this.post.videoId,
        part: this.post.part,
        viewCnt: this.post.viewCnt,
        likeCnt: this.post.likeCnt,
        createdAt: this.post.createdAt,
        islike: this.post.islike
      }
      this.$store.dispatch('updatePost', postResponse)
    }
  }
}
</script>

<style>

</style>