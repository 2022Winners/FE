<template>
    <header>
        <nav class="header-nav">
        <div class="header-logo">
            <router-link :to="{ name: 'home' }">HOME</router-link>
        </div>
        <div>
            <div class="header-item"><router-link to="/board">게시판 목록 </router-link></div>
            <div class="header-item"><router-link :to="{ name: 'boardCreate' }">게시글 작성 </router-link></div>
            <div class="header-item" v-if="isUserLogin">
                <div class="header-item">
                    <router-link to="/mypage">
                        <div><p class="nickname">{{ this.$store.state.nickname }}님</p></div>
                    </router-link>
                </div>
                <div class="header-item">
                    <router-link to="/logout" @click="logoutUser">로그아웃</router-link>
                </div>
            </div>
            <div class="header-item" v-else><router-link to="/login" >로그인 </router-link></div>
            
        </div>
        </nav>
    </header>
</template>

<script>
export default {
    name: "AppHeader",
    data() {
        return {
            src: "",
        };
    },
    computed: {
        isUserLogin() {
            return this.$store.getters.isLogin;
        },
    },
    methods : {
        logoutUser() {
            this.$store.commit('clearUserData');
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
