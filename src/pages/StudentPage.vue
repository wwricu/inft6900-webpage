<template>
  <div id="container" class="mx-auto">
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
                  @click="$router.push(menu.link)"
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
          <v-card>
          <v-breadcrumbs
            v-if="showBread"
            :items="breadItems">
            <template v-slot:divider>
              <v-icon>mdi-chevron-right</v-icon>
            </template>
            <template v-slot:item="{ item }">
              <v-breadcrumbs-item
                  :href="item.href"
                  :disabled="item.disabled"
              >
                {{ item.text }}
              </v-breadcrumbs-item>
            </template>
          </v-breadcrumbs>
          <router-view></router-view>
          </v-card>
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
        link: '/student_page/details',
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
    breadItems: [
      {
        text: "Personal Details",
        href: '/student_page/details',
        disabled: false
      },
      {
        text: "Apply",
        href: '/student_page/apply',
        disabled: true
      },
      {
        text: "Confirm",
        href: '/student_page/confirm',
        disabled: true
      },
    ]
  }),
  watch: {
    $route: {
      handler(route) {
        this.showBread = true
        switch (route.path) {
          case '/student_page/details':
            this.breadItems[1].disabled = true
            this.breadItems[2].disabled = true
            this.menus[0].class = 'strong'
            this.menus[1].class = ''
            this.menus[2].class = ''
            break
          case '/student_page/apply':
            this.breadItems[1].disabled = false
            this.breadItems[2].disabled = true
            break
          case '/student_page/confirm':
            this.breadItems[1].disabled = false
            this.breadItems[2].disabled = false
            break
          case '/student_page/applications':
            this.menus[0].class = ''
            this.menus[1].class = 'strong'
            this.menus[2].class = ''
            this.showBread = false
            break
          default:
            this.menus[0].class = ''
            this.menus[1].class = ''
            this.menus[2].class = 'strong'
            this.showBread = false
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
#container {
  width: 1000px;
}
.strong {
  font-weight: bold;
}
</style>