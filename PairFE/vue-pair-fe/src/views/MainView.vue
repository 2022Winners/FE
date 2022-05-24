<template>
  <div>
    <h2>메인 뷰</h2>
    <router-link to="/post">영상뷰</router-link>

    <router-view/>
  </div>
  
</template>

<script>

export default {
   name: "MainView",
   components: {
    
   }
}
</script>

<style>

</style>