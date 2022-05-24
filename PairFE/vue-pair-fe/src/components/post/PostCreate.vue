<template>
  <div>
     <div class="container">
    <h2>post 등록</h2>
    <div class="m-4">
      <b-form-group label="Title" label-for="title">
        <b-form-input id="title" v-model="title"></b-form-input>
      </b-form-group>
      <b-form-group label="Part" label-for="part">
        <b-form-input id="part" v-model="part"></b-form-input>
      </b-form-group>
      <b-form-group label="ChannelName" label-for="ChannelName">
        <b-form-input id="ChannelName" v-model="channel"></b-form-input>
      </b-form-group>
      <b-form-group label="ChannelImg" label-for="ChannelImg">
        <b-form-input id="ChannelImg" v-model="channelImg"></b-form-input>
      </b-form-group>
      <b-form-group label="VideoId" label-for="VideoId">
        <b-form-input id="VideoId" v-model="videoId"></b-form-input>
      </b-form-group>
      <b-button variant="outline-primary" @click="postCreate">등록</b-button>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "PostCreate",
  data() {
    return {
      title: "",
      part: "",
      channel: "",
      channelImg: "",
      videoId: "",
    };
  }, 
  methods: {
     postCreate(){
      let newPost = {
        title: this.title,
        channel: this.channel,
        channelImg: this.channelImg,
        videoId: this.videoId,
        part: this.part
      };

      this.$store.dispatch("createPost", newPost)

    }
  }
}
</script>

<style>

</style>