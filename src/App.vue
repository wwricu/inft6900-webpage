<template>
  <v-app>
    <v-app-bar
        app
        color="primary"
        dark
    >
      <v-spacer></v-spacer>
      <v-btn
          text
          v-on:click="function(){$router.push('login')}"
      >
        Login
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
        app
        enable-resize-watcher
        permanent
        v-model="showMenu"
    >
      <v-list rounded>
        <v-list-item></v-list-item>
        <v-list-item
            v-for="item in items"
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
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {

  },

  data: () => ({
    showMenu: true,
    items: [
      { title: 'Home', icon: 'mdi-home', link: '/' },
      { title: 'User Management', icon: 'mdi-view-dashboard', link: '/user_manage' },
      { title: 'User Info', icon: 'mdi-creation', link: 'user_info' },
      { title: 'View Applications', icon: 'mdi-creation', link: 'manage_staff' },
      { title: 'Personal Info', icon: 'mdi-account', link: '/' },
      { title: 'About', icon: 'mdi-forum', link: 'user_info' },
    ],
  }),
};
</script>
