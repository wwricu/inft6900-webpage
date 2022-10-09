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
                  @click="$router.push(menu.link)">
                  {{ menu.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col
            cols="9"
        >
          <v-breadcrumbs :items="breadItems">
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
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "StudentPage",
  data: () => ({
    menus: [
      {
        text: 'Apply',
        link: '/student_page/details'
      },
      {
        text: 'My Application',
        link: '/student_page/applications'
      },
      {
        text: 'My Assessments',
        link: '/student_page/assessments'
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
        switch (route.path) {
          case '/student_page/apply':
            this.breadItems[1].disabled = false
            this.breadItems[2].disabled = true
            break
          case '/student_page/confirm':
            this.breadItems[1].disabled = false
            this.breadItems[2].disabled = false
            break
          case '/student_page/details':
          default:
            this.breadItems[1].disabled = true
            this.breadItems[2].disabled = true
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>