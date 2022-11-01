<template>
  <v-alert type="error">
    {{ message }}
  </v-alert>
</template>

<script>
import {store} from "@/global";

export default {
  name: "UnauthorizedPage",
  data: () => ({
    message: `403 unauthorized, you are just a ${store.role}`
  })
}
</script>
