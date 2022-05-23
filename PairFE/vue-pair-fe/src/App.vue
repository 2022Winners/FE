<template>
  <v-app>
    <v-app-bar
      app
      color="indigo accent-2"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
   
    <v-main>
       <div>
         <br>
        <v-btn color="blue accent-4" style="color:white">버튼 1</v-btn>
         <v-btn color="pink lighten-2" style="color:white">버튼 2</v-btn>
         <v-btn color="yellow darken-2" style="color:white">버튼 3</v-btn>
         <v-btn color="teal accent-3" style="color:white">버튼 4</v-btn>
         <v-btn color="purple accent-4" style="color:white">버튼 5</v-btn>
         <v-btn color="blue-grey lighten-5">버튼 6</v-btn>
        </div>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
