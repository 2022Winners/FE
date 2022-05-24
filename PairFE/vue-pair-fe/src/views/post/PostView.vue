<template>
  <div>
    <h2>포스트 뷰</h2>
    <post-list></post-list>
    
        
  </div>
  
</template>

<script>
import PostList from '@/components/post/PostList.vue'
export default {
   name: "PostView",
   components: {
     PostList,
   }
}
</script>

<style>

</style>
