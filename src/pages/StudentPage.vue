<template>
  <div id="container" class="mx-auto mb-14">
    <v-container>
      <v-row>
        <v-col
            cols="3"
        >
          <v-card>
            <v-card-title>Application</v-card-title>
            <v-list-item
                v-for="menu in menus"
                :key="menu.text">
              <v-list-item-content>
                <v-list-item-title
                  :class="menu.class"
                  @click="()=>{
                    if ($route.path.split('/')[2]
                    !== menu.link.split('/')[2]) {
                      $router.push(menu.link)
                    }
                  }"
                >
                  {{ menu.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col
            cols="9"
        >
          <div>
          <router-view></router-view>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "StudentPage",
  data: () => ({
    showBread: true,
    menus: [
      {
        text: 'Apply',
        link: '/student_page/apply/details',
        class: 'strong'
      },
      {
        text: 'My Application',
        link: '/student_page/applications',
        class: 'normal'
      },
      {
        text: 'My Assessments',
        link: '/student_page/assessments',
        class: 'normal'
      },
    ],
  }),
  watch: {
    $route: {
      handler(route) {
        // alert(route.path.split('/')[2])
        switch (route.path.split('/')[2]) {
          case 'apply':
            this.menus[0].class = 'strong'
            this.menus[1].class = 'normal'
            this.menus[2].class = 'normal'
            break
          case 'applications':
            this.menus[0].class = 'normal'
            this.menus[1].class = 'strong'
            this.menus[2].class = 'normal'
            break
          case 'assessments':
            this.menus[0].class = 'normal'
            this.menus[1].class = 'normal'
            this.menus[2].class = 'strong'
            break
          default:
        }
      },
      immediate: true
    }
  },
}
</script>

<style scoped>
#container {
  width: 1000px;
}
.strong {
  font-weight: bold;
}
.strong:hover, .normal:hover {
  cursor: pointer;
}
</style>