<template>
  <div class="pl-4">
    <ApplicationCard :application="application">
      <template v-slot:actions>
        <div>
        <v-row align="end" class="d-flex justify-end mb-2 mt-2">
          <a>You MUST confirm adverse circumstance policy to submit</a>
          <v-checkbox
              hide-details
              v-model="policyAgreed"
              class="shrink mr-2 mt-0"
          ></v-checkbox>
        </v-row>
        <v-row align="end" class="d-flex justify-end mb-2">
          <a>You MUST confirm privacy agreement to submit</a>
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