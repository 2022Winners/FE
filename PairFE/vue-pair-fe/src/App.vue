<template>
  <v-app>
   <AppHeader></AppHeader>
    <v-main>
       <!-- <div>
         <br>
        <v-btn color="blue accent-4" style="color:white">버튼 1</v-btn>
         <v-btn color="pink lighten-2" style="color:white">버튼 2</v-btn>
         <v-btn color="yellow darken-2" style="color:white">버튼 3</v-btn>
         <v-btn color="teal accent-3" style="color:white">버튼 4</v-btn>
         <v-btn color="purple accent-4" style="color:white">버튼 5</v-btn>
         <v-btn color="blue-grey lighten-5">버튼 6</v-btn>
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
