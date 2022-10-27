<template>
  <div>
      <div
          class="mb-4"
          v-for="app in applications"
          :key="app.applicationID"
      >
        <v-card>
          <v-card-text>
          <div>Reference Number: {{app.applicationID}}</div>
          <p
            class="text-h5 text--primary"
            v-if="app.assessmentInstance !== null"
          >
            {{app.assessmentInstance.courseOfferingName}}
            {{app.assessmentInstance.name}}
          </p>
          <p>{{app.status}}</p>
          <div class="text--primary" v-if="app.staff !== null">
            Staff: {{app.staff.userName}}<br>
            Submit Time: {{app.submitDate}}
          </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
                text
                color="deep-purple accent-4"
                @click="$router.push(`/student_page/apply/info/${app.applicationID}`)"
            >
              Modify
            </v-btn>
          </v-card-actions>
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
          return
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