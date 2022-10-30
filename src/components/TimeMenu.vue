<template>
      <v-menu
        ref="menu"
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="time"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
              v-model="time"
              :label="label"
              prepend-icon="mdi-clock-time-four-outline"
              readonly
              v-bind="attrs"
              v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
            v-if="menu2"
            v-model="time"
            format="24hr"
            full-width
            @click:minute="$refs.menu.save(time)"
        ></v-time-picker>
      </v-menu>
</template>

<script>
export default {
  name: "TimeMenu",
  props: {
    label: String
  },
  data () {
    return {
      time: null,
      menu2: false,
      modal2: false,
    }
  },
}
</script>

<style scoped>

</style>