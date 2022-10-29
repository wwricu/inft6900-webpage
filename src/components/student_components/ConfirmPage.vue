<template>
  <div>
    <v-card-title>Reference Number</v-card-title>
    <v-card-subtitle>{{application.applicationID}}</v-card-subtitle>
    <v-card-title>Student Info</v-card-title>
    <v-card-subtitle>{{ studentInfo }}</v-card-subtitle>
    <v-card-title>Reason</v-card-title>
    <v-card-subtitle>{{application.reason}}</v-card-subtitle>
    <v-card-title>Days of Impact</v-card-title>
    <v-card-subtitle>{{application.daysOfImpact}}</v-card-subtitle>
    <v-card-title>Circumstance Detail</v-card-title>
    <v-card-subtitle>{{application.circumstanceDetail}}</v-card-subtitle>
    <v-card-title>Assessment</v-card-title>
    <v-card-subtitle>{{application.assessmentInfo}}</v-card-subtitle>
    <v-card-title>Desired Outcome</v-card-title>
    <v-card-subtitle>{{application.desiredOutcome}}</v-card-subtitle>
    <v-card-subtitle>{{application.outcomeDetail}}</v-card-subtitle>
    <v-card-actions>
      <v-btn
        color="primary"
        @click="submitApplication()"
      >
        submit
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import {store} from "@/global";

export default {
  name: "ConfirmPage",
  data: () => ({
    studentInfo: store.userNumber + " " + store.name,
    application: {
      applicationID: '',
      reason: '',
      daysOfImpact: '',
      circumstanceDetail: '',
      assessmentInfo: '',
      desiredOutcome: '',
      outcomeDetail: '',
    }
  }),
  created() {
    this.initForm(this.$route.params.applicationID)
  },
  methods: {
    test() {
      alert("here")
    },
    initForm(applicationID) {
      this.$axios({
        method: "GET",
        url: `${store.host}/application/get?applicationID=${applicationID}`,
      }).then(res => {
        if (res.data.status !== "success") {
          alert("message: " + res.data.message);
          return
        }
        if (res.data.obj !== null && res.data.obj.length > 0) {
          this.readApplication(res.data.obj[0])
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
      this.outcomeDetail = application.outcomeDetail
    },
    submitApplication() {
      const applicationID = this.$route.params.applicationID
      alert(applicationID)
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
    }
  }
}
</script>

<style scoped>

</style>