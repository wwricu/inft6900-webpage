<template>
  <v-card class="mx-auto ma-8 pa-8" max-width="600px">
    <ApplicationCard :application="application"/>
    <AssessmentDialog
      v-if="application.assessmentInstance != null"
      ref="dialog"
      :assessmentID="application.assessmentInstance.assessmentID"
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
    <reject-dialog
      ref="rejectDialog"
    >
      <template v-slot:actions>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="primary"
            @click="confirmReject()"
          >
            confirm
          </v-btn>
        </v-card-actions>
      </template>
    </reject-dialog>
    <AssignDialog
      ref="assignDialog"
      :application="application"
    />
    <v-card-actions>
      <v-spacer/>
      <v-btn
        color="primary"
        @click="$refs.assignDialog.showDialog()"
        v-if="showAssign"
      >
        Assign
      </v-btn>
      <v-btn
        color="error"
        @click="reject()"
        v-if="showReject"
      >
        Reject
      </v-btn>
      <v-btn
        color="success"
        @click="$refs.dialog.showDialog()"
        v-if="showApproved"
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
import AssignDialog from "@/components/StudentService/AssignDialog";
import RejectDialog from "@/components/RejectDialog";
export default {
  name: "ApplicationPage",
  components: {
    RejectDialog,
    AssignDialog,
    AssessmentDialog,
    ApplicationCard,
  },
  data: () => ({
    application: {},
    originApplication: {
      // applicationID:"1586339909302620160",
      // reason:"Health Grounds",
      // daysOfImpact:"5",
      // circumstanceDetail:"circumstance",
      // documentList:null,
      // outcome:"Extension of Time",
      // outcomeDetail:"outcome details",
      // status:"Pending",
      // submitDate:"2022/10/29 23:51:41",
      // staffComment:null,
      // studentNumber:"c3362554",
      // student:null,
      // staffID:3,
      // instanceID:"6c75a980-cf9d-4150-b98c-b8461aae2328"
    },
    assessment: {},
    dialogSwitch: false,
    showApproved: false,
    showReject: false,
    showAssign: false
  }),
  watch: {
    store: {
      handler() {
        this.computeVisibility()
      },
      immediate: true
    },
    application: {
      handler() {
        this.computeVisibility()
      },
      immediate: true
    }
  },
  created() {
    this.initForm(this.$route.params.applicationID)
    this.computeVisibility()
  },
  methods: {
    computeVisibility() {
      this.showApproved =
          this.application.status!=='Approved'
          && this.application.status!=='Rejected'
          && store.role==='Staff'
      this.showReject = this.application.status!=='Approved'
          && this.application.status!=='Rejected'
      this.showAssign =
          this.application.status!=='Approved'
          && this.application.status!=='Rejected'
          && store.role==='Admin'
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
        if (res.data.obj != null && res.data.obj.length === 1) {
          this.application = res.data.obj[0]
        }
      }).catch(function (err) {
        alert("err " + err);
      })
    },
    handleApplication(result) {
      this.$axios({
        method: "POST",
        url: `${store.host}/application/changeState`,
        data: {
          applicationID: this.application.applicationID,
          status: result,
          staffComment: this.$refs.dialog.staffComment,
          staffID: this.application.staffID
        }
      }).then(res => {
        if (res.data.status === "success") {
          alert("message: " + res.data.status);
          this.$refs.dialog.submitAssessment()
          this.$refs.dialog.hideDialog()
        }
      }).catch(function (err) {
        alert("err " + err);
      })
    },
    reject() {
      this.$refs.rejectDialog.switchRejectDialog();
    },
    confirmReject() {
      this.$axios({
        method: "POST",
        url: `${store.host}/application/changeState`,
        data: {
          applicationID: this.application.applicationID,
          status: 'Rejected',
          staffComment: this.$refs.rejectDialog.staffComment,
          staffID: this.application.staffID
        }
      }).then(res => {
        if (res.data.status === "success") {
          alert("message: " + res.data.status);
          this.$refs.rejectDialog.switchRejectDialog()
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