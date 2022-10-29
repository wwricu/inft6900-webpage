<template>
  <div>
    <ApplicationCard :application="application">
      <template v-slot:submit>
        <v-btn
            color="primary"
            @click="submitApplication()"
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
    application: {
      applicationID: '',
      reason: '',
      daysOfImpact: '',
      circumstanceDetail: '',
      assessmentInfo: '',
      desiredOutcome: '',
      outcomeDetail: '',
      studentInfo: store.userNumber + " " + store.name,
    }
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