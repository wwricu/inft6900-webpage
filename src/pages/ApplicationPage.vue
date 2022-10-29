<template>
  <v-card class="ma-8 pa-8">
    <ApplicationCard :application="application"/>
    <AssessmentDialog
      ref="dialog"
      :assessmentID="assessment.assessmentID"
      dialog-action="Approve"
      :disabled="true"
    />
    <v-card-actions>
      <v-btn
        color="error"
      >
        reject
      </v-btn>
      <v-btn
        color="success"
        @click="$refs.dialog.showDialog()"
      >
        approve
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {store} from "@/global";
import ApplicationCard from '@/components/ApplicationCard'
import AssessmentDialog from "@/components/AssessmentDialog";
export default {
  name: "ApplicationPage",
  components: {
    AssessmentDialog,
    ApplicationCard,
  },
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
    },
    assessment: {},
    dialogSwitch: false
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
      if (application.assessmentInstance != null) {
        this.application.assessmentInfo =
            application.assessmentInstance.courseOfferingName
            + " " + application.assessmentInstance.name
        this.assessment = application.assessmentInstance
        alert(this.assessment.assessmentID)
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