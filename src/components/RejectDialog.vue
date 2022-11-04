<template>
  <v-dialog
      width="800"
      v-model="rejectDialog"
  >
    <v-card>
      <v-card-title class="text-h5">
        Reject Application
      </v-card-title>
      <v-divider></v-divider>
      <v-container class="pl-8 pr-8">
        <v-row no-gutters>
          <v-col cols="12">
            <v-textarea
                label="Comment"
                outlined
                v-model="staffComment"
                hint="This comment will be sent to student"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-container>
      <v-divider></v-divider>
      <slot name="actions"/>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "RejectDialog",
  data: ()=>({
    staffComment: '',
    rejectDialog: false
  }),
  methods: {
    switchRejectDialog() {
      this.rejectDialog = !this.rejectDialog
    }
  }
}
</script>

<style scoped>

</style>