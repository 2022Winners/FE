<template>
  <div>
    <h2>메인 뷰</h2>
    <recommend-gender></recommend-gender>
    <recommend-age></recommend-age>
    <router-link to="/post">영상뷰</router-link>
     
    <router-view/>
  </div>
  
</template>

<script>
import RecommendGender from "@/components/post/RecommendGender";
import RecommendAge from "@/components/post/RecommendAge";

export default {
   name: "MainView",
   components: {
      RecommendGender, RecommendAge
   }
}
</script>

<style>

</style>