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
            <div class="header-item" v-if="isLogin">
                <div class="header-item">
                    <router-link :to="`/user/${userId}/detail`">
                        <div><p class="header-item">{{this.nickname}}님</p></div>
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
export default {
    name: "AppHeader",
    data() {
        return {
            isLogin : false,
            nickname : "",
            userId : "",
        };
    },
    created(){
        if(sessionStorage.getItem("userNickname")!=null){
            this.isLogin = true;
            this.nickname = sessionStorage.getItem("userNickname");
            this.userId = sessionStorage.getItem("userId");
        }
    },
    methods : {
        userlogout(){
            this.nickname = ""
            this.userId = ""
            this.isLogin = false;
            this.$store.commit('USER_LOGOUT')
            this.$router.push({name: 'main'})
            window.location.reload();
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
