<template>
  <div style="margin-top:10px">
    <b-nav tabs align="center" id="adminnav"> 
    <b-nav-item to="/admin" :active="$route.name == 'postmanagelist'">전체 영상 관리</b-nav-item>
    <b-nav-item to="/admin/userlist" :active="$route.name == 'usermanagelist'" >전체 회원 관리</b-nav-item> 
    </b-nav>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
    name: "AdminView",
}
</script>

<style>


</style>