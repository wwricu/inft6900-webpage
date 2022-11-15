<!-- 
  2022 Trimester 3 INFT6900 Final Project
  Team   : Four Square
  Author : Weiran Wang
  Date   : 09/10/2022
-->

<template>
  <div class="pl-4">
    <ApplicationCard :application="application">
      <template v-slot:actions>
        <div>
        <v-row align="end" class="d-flex justify-end mb-2 mt-2">
          <a href="https://policies.newcastle.edu.au/document/view-current.php?id=235">
            You MUST confirm adverse circumstance policy to submit</a>
          <v-checkbox
              hide-details
              v-model="policyAgreed"
              class="shrink mr-2 mt-0"
          ></v-checkbox>
        </v-row>
        <v-row align="end" class="d-flex justify-end mb-2">
          <a href="https://policies.newcastle.edu.au/document/view-current.php?id=236">
            You MUST confirm adverse circumstance procedure to submit</a>
          <v-checkbox
              hide-details
              v-model="privacyAgreed"
              class="shrink mr-2 mt-0"
          ></v-checkbox>
        </v-row>
        <v-card-actions class="d-flex justify-end">
          <v-btn
            color="primary"
            @click="$router.push(`/student_page/apply/info/${$route.params.applicationID}`)"
          >
            back
          </v-btn>
          <v-btn
              color="primary"
              @click="submitApplication()"
              :disabled="privacyAgreed !== true || policyAgreed !== true"
          >
            submit
          </v-btn>
        </v-card-actions>
        </div>
      </template>
    </ApplicationCard>
  </div>
</template>

<script>
import {store} from "@/global";
import ApplicationCard from "@/components/ApplicationCard";

export default {
  name: "ConfirmPage",
  components: {ApplicationCard},
  data: () => ({
    application: {},
    policyAgreed: false,
    privacyAgreed: false
  }),
  created() {
    this.initForm(this.$route.params.applicationID)
  },
  methods: {
    initForm(applicationID) {
      this.$axios({
        method: "GET",
        url: `${store.host}/application/get?applicationID=${applicationID}`,
      }).then(res => {
        if (res.data.status !== "success") {
          alert("message: " + res.data.message);
          return
        }
        if (res.data.obj != null && res.data.obj.length === 1) {
          this.application = res.data.obj[0]
        }
      }).catch(function (err) {
        alert("err " + err);
      })
    },
    submitApplication() {
      const applicationID = this.$route.params.applicationID
      this.$axios({
        method: "POST",
        url: `${store.host}/application/submit`,
        data: {
          applicationID: applicationID
        }
      }).then(res => {
        if (res.data.status === "success") {
          alert("message: " + res.data.status);
          this.$router.push(`/student_page/applications`)
        }
      }).catch(function (err) {
        alert("err " + err);
      })
    }
  }
}
</script>

<style scoped>

</style>