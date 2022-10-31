<template>
  <v-card class="mx-auto ma-8 pa-8" max-width="600px">
    <ApplicationCard :application="application"/>
    <AssessmentDialog
      ref="dialog"
      :assessmentID="assessment.assessmentID"
      dialog-action="Approve"
      :disabled="true"
    >
      <template v-slot:actions>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="success"
            @click="handleApplication('Approved')"
          >
            CONFIRM
          </v-btn>
        </v-card-actions>
      </template>
    </AssessmentDialog>
    <v-card-actions>
      <v-spacer/>
      <v-btn
        color="error"
        @click="handleApplication('Rejected')"
        v-if="application.status==='Pending'"
      >
        Reject
      </v-btn>
      <v-btn
        color="success"
        @click="$refs.dialog.showDialog()"
        v-if="application.status==='Pending'"
      >
        Approve
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
      status: '',
      studentInfo: store.userNumber + " " + store.name,
    },
    originApplication: {
      applicationID:"1586339909302620160",
      reason:"Health Grounds",
      daysOfImpact:"5",
      circumstanceDetail:"circumstance",
      documentList:null,
      outcome:"Extension of Time",
      outcomeDetail:"outcome details",
      status:"Pending",
      submitDate:"2022/10/29 23:51:41",
      staffComment:null,
      studentNumber:"c3362554",
      student:null,
      staffID:3,
      instanceID:"6c75a980-cf9d-4150-b98c-b8461aae2328"
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
      // this.getStudent(application.student.userNumber)
      this.application.studentInfo = application.student.userNumber + " "
                  + application.student.userName
      if (application.assessmentInstance != null) {
        this.application.assessmentInfo =
            application.assessmentInstance.courseOfferingName
            + " " + application.assessmentInstance.name
        this.assessment = application.assessmentInstance
      }
      this.application.desiredOutcome = application.outcome
      this.application.outcomeDetail = application.outcomeDetail
      this.application.status = application.status
    },
    handleApplication(result) {
      this.$axios({
        method: "POST",
        url: `${store.host}/application/changeState`,
        data: {
          applicationID: this.application.applicationID,
          status: result,
          staffComment: `${result} your application`
        }
      }).then(res => {
        if (res.data.status === "success") {
          alert("message: " + res.data.status);
          this.$refs.dialog.submitAssessment()
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