<template>
  <v-footer
      color="rgb(11,11,11)"
      padless
      fixed
  >
    <v-row
        justify="center"
        no-gutters
    >
      <v-btn
          v-for="link in links"
          :key="link"
          color="white"
          text
          rounded
          class="my-2"
      >
        {{ link }}
      </v-btn>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: "FooterPage",
  data: () => ({
    links: [
      'UoN Home Page',
      'Canvas',
      'MyUni',
      'Library',
    ],
  }),
}
</script>

<style scoped>
.v-btn {
  text-transform: none;
}
</style>