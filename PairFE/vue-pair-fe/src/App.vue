<template>
  <v-app id="app">
   <AppHeader></AppHeader>
    <v-main>
       <!-- <div>
         <br>
        <v-btn color="primary">버튼 1</v-btn>
         <v-btn color="secondary" style="color:black" >버튼 2</v-btn>
         <v-btn color="accent">버튼 3</v-btn>
         <v-btn color="error">버튼 4</v-btn>
        </div> -->
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from "@/components/common/AppHeader";
export default {
  name: 'App',
  components: {
     AppHeader
   },
  data: () => ({
    //
  }),
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@font-face {
  font-family: 'AritaDotum';
  src: url('https://2022winners.s3.ap-northeast-2.amazonaws.com/AnyConv.com__ARITA4.0_M.woff') format('woff');
}
* {
  font-family: 'AritaDotum';
}
</style>
