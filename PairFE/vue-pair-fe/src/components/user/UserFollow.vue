<template>
  <div id="followtables"> 
    <div id="follow">
      <span class="material-icons">
      <v-icon>mdi-thumb-up</v-icon>
      </span>
      <h4>FOLLOW LIST</h4>
      <v-simple-table style="width: 600px; display: block;">
    <template v-slot:default>
      <thead>
        <tr id="trheader">
          <th class="text-center">
            번호
          </th>
          <th class="text-center">
            팔로잉
          </th>
          <th class="text-center">
            버튼
          </th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr v-for="(following, idx) in followinglist" :key="following.id" id="trbody">
          <td>{{idx+1}}</td>
          <td><router-link id="router" :to="`/user/detail/${following.id}`">{{following.nickname}}</router-link></td>
          <td><v-btn @click="unfollow(following)"
              icon
              color="blue accent-4"
              large
            >
              <v-icon>mdi-star</v-icon>
            </v-btn></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
    </div>
    <div id="follow">
      <span class="material-icons">
      <v-icon>mdi-thumb-up</v-icon>
      </span>
      <h4>FOLLOWER LIST</h4>
      <v-simple-table style="width: 600px; display: block; ">
    <template v-slot:default>
      <thead>
        <tr id="trheader">
          <th class="text-center">
            번호
          </th>
          <th class="text-center">
            팔로워
          </th>
          <th class="text-center">
            버튼
          </th>
        </tr>
      </thead>
      <tbody class="text-center" id="trbody">
        <tr v-for="(follower, idx) in followerlist" :key="follower.id" >
          <td>{{idx+1}}</td>
          <td><router-link id="router" :to="`/user/detail/${follower.id}`">{{follower.nickname}}</router-link></td>
          <td><v-btn @click="follow(follower)"
              icon
              color="purple accent-4"
              large
            >
              <v-icon>mdi-star</v-icon>
            </v-btn></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
    </div>
    



  </div>
</template>

<script>
import {mapState} from 'vuex'
import {getFollowingList} from "@/api/user";
import {getFollowerList} from "@/api/user";


export default {
  name: "UserFollow",
  computed: {
    ...mapState([
      "user", "followerlist", "followinglist"
    ])
  },
  data(){
    return{
      idx : 0,
      followername : '',
    }

  },
  created(){
    this.getfollowing(this.user.id);
    this.getfollower(this.user.id);  
  },
  methods:{
    async getfollowing(){
      const followinglist = await getFollowingList(this.user.id);
      this.$store.commit('GET_FOLLOWINGS', followinglist.data);
    },
     async getfollower(){
      const followerlist = await getFollowerList(this.user.id);
      this.$store.commit('GET_FOLLOWERS', followerlist.data);
    },
    unfollow(following){
      let unfollow = {
        userId : this.user.id,
        followId : following.id,
      };
      let payload = {
        unfollow : unfollow,
        follow : following
      }
      this.$store.dispatch("unFollow", payload)
    },
    follow(follower){
      this.followername = follower.nickname;
      if(this.followinglist.some(this.checkfollow)){
        alert("이미 팔로잉중인 회원입니다")
      }else{
        let follow = {
        userId : this.user.id,
        followId : follower.id,
      };
      let payload = {
        follow : follow,
        follower : follower
      }
      this.$store.dispatch("Follow", payload)
      }
    },
    checkfollow(people){
      if(people.nickname === this.followername){
        return true;
      }
    }

  }
}
</script>

<style>

#followtables{
  display: flex;
  gap: 50px;
  justify-content:center;
  margin-top: 30px; 
}

#follow{
  text-align: center;
  margin-bottom: 10px;
}



</style>