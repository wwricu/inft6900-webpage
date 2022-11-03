<template>
  <div class="pl-4">
    <ApplicationCard :application="application">
      <template v-slot:submit>
        <v-btn
          color="primary"
          @click="submitApplication()"
          class="mt-2 ml-n2"
        >
          submit
        </v-btn>
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
    policyApproved: false
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
    readApplication(application) {
      this.application.applicationID = application.applicationID
      this.application.reason = application.reason
      this.application.daysOfImpact = application.daysOfImpact
      this.application.circumstanceDetail = application.circumstanceDetail
      if (application.assessmentInstance !== null) {
        this.application.assessmentInfo =
            application.assessmentInstance.courseOfferingName
            + " " + application.assessmentInstance.name
      }
      this.application.desiredOutcome = application.outcome
      this.application.outcomeDetail = application.outcomeDetail
      this.application.status = application.status
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
        }
      }).catch(function (err) {
        alert("err " + err);
      })
      this.$router.push(`/student_page/applications`)
    }
  }
}
</script>

<style scoped>

</style>