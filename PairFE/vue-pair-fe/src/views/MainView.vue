<template>
  <div>
    <div v-if="user.id == 0">
         <top-list></top-list>
    </div>
    <div id="mainposition">
    <div v-if="user.id != 0" id="location">
      <div>
         <health-map></health-map>
      </div>
      <div v-if="user.gender!=0 || user.age != 0">
        <recommend-gender></recommend-gender>
        <recommend-age></recommend-age>
      </div>
      <div v-else-if="user.age == 0 && user.age == 0" id="maintoplist">
        <top-list></top-list>
      </div>     
    </div> 
    </div>  
    <router-link to="/post">영상뷰</router-link>
    <router-link to="/admin">관리자뷰</router-link>  
    <router-view/>
  </div>
  
</template>

<script>
console.log()
import {mapState} from 'vuex'
import RecommendGender from "@/components/post/RecommendGender";
import RecommendAge from "@/components/post/RecommendAge";
import TopList from "@/components/post/TopList";
import HealthMap from "@/components/map/HealthMap";

export default {
   name: "MainView",
   components: {
       RecommendAge, RecommendGender , HealthMap, TopList
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

#mainposition{
  width:1600px;
  display: container;
  margin: auto;
  margin-top: 20px;
}



</style>

