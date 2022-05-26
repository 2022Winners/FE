<template>
    <header>
    <v-app-bar
      app
      color="indigo accent-2"
      dark
    >
        <nav class="header-nav">
        <div class="header-logo">
            <router-link :to="{ name: 'main' }">HOME</router-link>
        </div>
        <div>
            <div class="header-item" v-if="checkLogin">
                <div class="header-item">
                    <router-link :to="`/user/detail/${userId}`">
                        <div><p class="header-item">{{nickname}}님</p></div>
                    </router-link>
                </div>
                <div class="header-item">
                    <div @click="userlogout">로그아웃</div>
                </div>
            </div>
            <div class="header-item" v-else><router-link to="/user/login" >로그인 </router-link></div>
            
        </div>
        </nav>
         </v-app-bar>
    </header>
    
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: "AppHeader",

    computed: {
        checkLogin() {
            return this.$store.getters.isLogin;
        },
        ...mapState([
            "user"
        ]),
        nickname() {
            return this.user.nickname;
        },
        userId() {
           return this.user.id;
        }
    },

    methods : {
        userlogout(){
            this.isLogin = false;
            this.$store.commit('USER_LOGOUT')
            this.$router.push({name: 'main'})
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
  background-color: rgb(44, 44, 44);
  line-height: 70px;
  padding: 0px 30px;
}

.header-nav {
  display: flex;
  justify-content: space-between;
}

.header-logo {
  margin: 0px 10px;
}

.header-item {
  display: inline-block;
  margin: 0px 10px;
}

nav a {
  font-weight: bold;
  color: white;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
