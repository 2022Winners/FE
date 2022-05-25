<template>
  <div>
    <h2>메인 뷰</h2>

    <div v-if="user.id == 0">
         <top-list></top-list>
    </div>
    <div v-else-if="user.id != 0" id="location">
        <user-follow></user-follow>
      <!-- <div>
         <health-map></health-map>
      </div>
      <div>
        <recommend-gender></recommend-gender>
        <recommend-age></recommend-age>
      </div> -->
      
    </div>   
    <router-link to="/post">영상뷰</router-link>
     
    <router-view/>
  </div>
  
</template>

<script>
console.log()
import {mapState} from 'vuex'
// import RecommendGender from "@/components/post/RecommendGender";
// import RecommendAge from "@/components/post/RecommendAge";
import TopList from "@/components/post/TopList";
// import HealthMap from "@/components/map/HealthMap";
import UserFollow from "@/components/user/UserFollow";

export default {
   name: "MainView",
   components: {
      //  RecommendAge, RecommendGender , HealthMap,
        TopList,UserFollow
   },
   computed: {
    ...mapState([
      "user"
    ]),
  },
}
</script>

<style>

#location{
  display: flex;
  gap: 30px;
}

</style>