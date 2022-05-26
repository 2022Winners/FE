<template>
  <div>

    <h2>관리자 화면</h2>
    <!-- <post-management></post-management> -->
    <user-management></user-management>
    <router-view></router-view>

  </div>
</template>

<script>
// import PostManagement from "@/components/admin/PostManagement";
import UserManagement from "@/components/admin/UserManagement";
export default {
    name: "AdminView",
    components: {
      //  PostManagement,
        UserManagement
   },

}
</script>

<style>

</style>