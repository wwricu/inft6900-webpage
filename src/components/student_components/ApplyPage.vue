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
    applicationID: '',
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
        if (route.params.applicationID != null) {
          this.breadItems[1].href += '/' + route.params.applicationID
        }
        switch (route.path.split('/')[3]) {
          case 'details':
            this.breadItems[1].disabled = true
            this.breadItems[2].disabled = true
            break
          case 'info':
            this.breadItems[1].disabled = false
            this.breadItems[2].disabled = true
            break
          case 'confirm':
            this.breadItems[1].disabled = false
            this.breadItems[2].disabled = false
            break
          default:
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