<template>
      <header>
    <v-app-bar color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title><span style="font-weight:600">SSAFIT</span></v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
        <div v-if="checkLogin">
            <v-container style="text-align:center">
                <v-avatar v-show="!checkImg" color="accent" size="150">
                    <span style="font-size:60px;color:white">{{ nickname[0] }}</span>
                </v-avatar>
                <v-avatar v-show="checkImg" size="150">
                    <img :src="imgUrl" alt="프로필이미지">
                </v-avatar>
                <br>
                <br>
                <h3>{{ nickname }} 님</h3>
            </v-container>
            <v-list nav dense>
                <v-list-item-group
                v-model="activeGroup"
                active-class="accent--text text--accent-4"
                >
                <router-link :to="{ name: 'main' }" style="text-decoration:none">
                <v-list-item>
                    <v-list-item-icon>
                    <v-icon>mdi-home</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>홈</v-list-item-title>
                </v-list-item>
                </router-link>
                <router-link :to="{ name: 'postTopList' }" style="text-decoration:none">
                <v-list-item>
                    <v-list-item-icon>
                    <v-icon>mdi-heart</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>인기 영상</v-list-item-title>
                </v-list-item>
                </router-link>
                <router-link :to="{ name: 'postList' }" style="text-decoration:none">
                <v-list-item>
                    <v-list-item-icon>
                    <v-icon>mdi-playlist-play</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>영상 목록</v-list-item-title>
                </v-list-item>
                </router-link>
                <router-link :to="`/user/detail/${userId}`" style="text-decoration:none">
                <v-list-item>
                    <v-list-item-icon>
                    <v-icon>mdi-account</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>마이 페이지</v-list-item-title>
                </v-list-item>
                </router-link>
                <router-link :to="{ name: 'postmanagelist' }" style="text-decoration:none">
                <v-list-item v-show="isAdmin">
                    <v-list-item-icon>
                    <v-icon>mdi-desktop-mac-dashboard</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>관리자 모드</v-list-item-title>
                </v-list-item>
                </router-link>
                <v-list-item @click.stop="userlogout">
                    <v-list-item-icon>
                    <v-icon>mdi-logout</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>로그아웃</v-list-item-title>
                </v-list-item>
                </v-list-item-group>
            </v-list>
        </div>
        <div v-else>
            <v-container style="text-align:center">
                <v-container v-show="!checkLogin">
                    <v-avatar color="primary" size="200">
                        <v-icon style="font-size:xx-large" dark>
                            mdi-account-circle
                        </v-icon>
                    </v-avatar>
                </v-container>
                <br>
                <br>
                <h5>로그인이 필요합니다.</h5>
            </v-container>
            <v-list nav dense>
                <v-list-item-group
                v-model="activeGroup"
                active-class="accent--text text--accent-4"
                >
                <router-link :to="{ name: 'main' }" style="text-decoration:none">
                    <v-list-item>
                        <v-list-item-icon>
                        <v-icon>mdi-home</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>홈</v-list-item-title>
                    </v-list-item>
                </router-link>
                <router-link to="/user/login" style="text-decoration:none">
                <v-list-item>
                        <v-list-item-icon>
                        <v-icon>mdi-login</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>로그인</v-list-item-title>
                    </v-list-item>
                </router-link>
                <router-link to="/user/join" style="text-decoration:none">
                <v-list-item>
                        <v-list-item-icon>
                        <v-icon>mdi-account-plus</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>회원가입</v-list-item-title>
                    </v-list-item>
                </router-link>
                </v-list-item-group>
            </v-list>
        </div>
    </v-navigation-drawer>
</header>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: "AppHeader",
    data() {
        return {
            drawer: false,
            activeGroup : null,
        }
    },
    // userDetail.imageId!= null && userDetail.imageId!= 0 " 
    // :src="`${image.uri}`"
    computed: {
        checkLogin() {
            return this.$store.getters.isLogin
        },
        ...mapState([
            "user"
        ]),
        nickname() {
            return this.user.nickname
        },
        userId() {
           return this.user.id
        },
        isAdmin() {
            return this.user.loginId === 'admin' ? true : false
        },
        checkImg() {
            return this.$store.state.image.uri ? true : false 
        },
        imgUrl() {
            return this.$store.state.image.uri
        },
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
/* header {
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
} */
</style>
