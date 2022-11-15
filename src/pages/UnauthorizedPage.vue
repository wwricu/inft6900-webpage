<!-- 
  2022 Trimester 3 INFT6900 Final Project
  Team   : Four Square
  Author : Chao Zhang
  Date   : 02/11/2022
-->

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
