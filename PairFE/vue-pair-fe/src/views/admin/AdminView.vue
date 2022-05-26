<template>
  <div>

    <h2>관리자 화면</h2>
    <post-management></post-management>
    <router-view></router-view>

  </div>
</template>

<script>
import PostManagement from "@/components/admin/PostManagement";
export default {
    name: "AdminView",
    components: {
       PostManagement
   },

}
</script>

<style>

</style>