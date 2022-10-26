<template>
  <v-card>
    <v-breadcrumbs
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
</template>

<script>
export default {
  name: "ApplyContainer",
  data: () => ({
    breadItems: [
      {
        text: "Personal Details",
        href: '/student_page/apply/details',
        disabled: false
      },
      {
        text: "Apply",
        href: '/student_page/apply/info',
        disabled: true
      },
      {
        text: "Confirm",
        href: '/student_page/apply/confirm',
        disabled: true
      },
    ],
  }),
  watch: {
    $route: {
      handler(route) {
        switch (route.path) {
          case '/student_page/apply/details':
            this.breadItems[1].disabled = true
            this.breadItems[2].disabled = true
            break
          case '/student_page/apply/info':
            this.breadItems[1].disabled = false
            this.breadItems[2].disabled = true
            break
          case '/student_page/apply/confirm':
            this.breadItems[1].disabled = false
            this.breadItems[2].disabled = false
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

</style>