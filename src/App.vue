<template>
  <v-app>
    <v-app-bar
        app
        dark
        dense
        color="white"
    >
      <img
        v-if="loginStatus&&role==='Student'"
        :src="require('./assets/newcastle.png')"
        style="max-height: 36px;"
      >
      <p
        class="white black--text ml-12 mt-4">
        Adverse Circumstance
      </p>
<!--      <p-->
<!--        v-if="loginStatus&&role==='Student'">-->
<!--        Adverse Circumstance System-->
<!--      </p>-->
      <v-app-bar-nav-icon
        color="primary"
        @click="switchMenu"
        v-if="loginStatus===true&&role!=='Student'"
      ></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-btn
          text
          class="primary white--text"
          v-show="loginStatus===false"
          v-on:click="function(){$router.push('/login')}"
      >
        Login
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
      <v-container
          fluid
          v-show="loginStatus===true"
      >
        <v-row justify="end" align="center">
          <v-menu
              bottom
              min-width="200px"
              rounded
              offset-y
          >
            <template v-slot:activator="{ on }">
              <v-btn
                  icon
                  x-large
                  v-on="on"
              >
                <v-avatar
                    color="primary"
                    size="40"
                >
                  {{ AVN }}
                </v-avatar>
              </v-btn>
            </template>
            <v-card>
              <v-list-item-content class="justify-center">
                <div class="mx-auto text-center">
                  <v-btn
                      depressed
                      rounded
                      text
                      @click="logOut"
                  >
                    Disconnect
                  </v-btn>
                </div>
              </v-list-item-content>
            </v-card>
          </v-menu>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-navigation-drawer
        app
        enable-resize-watcher
        floating
        v-model="showMenu"
        v-if="loginStatus===true&&role!=='Student'"
        class="elevation-4"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            {{role}}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list rounded nav>
        <v-list-item
            v-for="item in items[role]"
            :key="item.title"
            @click="function(){$router.push(item.link)}"
            link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
    <FooterPage/>
  </v-app>
</template>

<script>
import {store} from '@/global.js';
import FooterPage from "@/pages/footer";

export default {
  name: 'App',

  components: {
    FooterPage

  },

  created() {
    // this.$autoLogin();
  },

  computed: {
    loginStatus() {
      return store.loginStatus;
    },
    role() {
      return store.role;
    },
    AVN() {
      return store.AVN;
    },
  },

  data: () => ({
    showMenu: false,
    items: {
      Student: [
        // { title: 'Home', icon: 'mdi-home', link: '/' },
        { title: 'Apply', icon: 'mdi-pencil', link: '/user_manage' },
        { title: 'My Applications', icon: 'mdi-view-dashboard', link: 'manage_user' },
      ],
      Staff: [
        // { title: 'Home', icon: 'mdi-home', link: '/' },
        { title: 'View Applications', icon: 'mdi-view-dashboard', link: '/application' },
        { title: 'Search Contact', icon: 'mdi-magnify', link: '/user_manage' },
      ],
      Admin: [
          // { title: 'Home', icon: 'mdi-home', link: '/' },
          { title: 'User Management', icon: 'mdi-view-dashboard', link: '/user_manage' },
          { title: 'Course Management', icon: 'mdi-view-dashboard', link: '/course_manage' },
          { title: 'View Applications', icon: 'mdi-view-dashboard', link: '/application' },
      ],
    },
  }),
  methods: {
    switchMenu() {
      if (this.loginStatus !== true) return;

      this.showMenu = !this.showMenu;
    },
    logOut() {
      localStorage.removeItem("JWT");
      this.$axios({
        method: "DELETE",
        url: `${store.host}/auth/logout`
      }).then(() => {
        alert('Log out!');
        this.$router.push('/login')
      }).catch(function (err) {
        alert("err " + err);
      })
    }
  }
};
</script>

<style scoped>
p {
  width: 10000px;
}
</style>
