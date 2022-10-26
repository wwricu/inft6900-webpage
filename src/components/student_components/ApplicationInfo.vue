<template>
  <div>
      <div
          class="mb-4"
          v-for="app in applications"
          :key="app.applicationID"
          @click="$router.push(`/student_page/apply/info/${app.applicationID}`)"
      >
        <v-card>
          <v-card-title>Reference Number: {{app.applicationID}} </v-card-title>
          <v-card-text>Assessment: {{app.assessmentID}}</v-card-text>
          <v-card-text>Staff: {{app.staffID}}</v-card-text>
          <v-card-text>Submit Time: {{app.submitDate}}</v-card-text>
        </v-card>
      </div>
  </div>
</template>

<script>
import {store} from "@/global";

export default {
  name: "ApplicationInfo",
  data: ()=> ({
    applications: [

    ],
  }),
  created() {
    this.getApplications()
  },
  methods: {
    getApplications() {
      this.$axios({
        method: "GET",
        url: `${store.host}/application/get?StudentNumber=${store.userNumber}`,
      }).then(res => {
        if (res.data.status !== "success") {
          alert("message: " + res.data.message);
        }
        this.applications = res.data.obj
        // alert(this.applications.length)
      }).catch(function (err) {
        alert("err " + err);
      })
    }
  }
}
</script>

<style scoped>

</style>