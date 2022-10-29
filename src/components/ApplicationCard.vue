<template>
  <div>
    <v-card-title>Reference Number</v-card-title>
    <v-card-subtitle>{{application.applicationID}}</v-card-subtitle>
    <v-card-title>Student Info</v-card-title>
    <v-card-subtitle>{{ application.studentInfo }}</v-card-subtitle>
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
      <slot name="submit"></slot>
    </v-card-actions>
  </div>
</template>

<script>
import {store} from "@/global";

export default {
  name: "ApplicationCard",
  props: {
    application: {
      default: {
        applicationID: '',
        reason: '',
        daysOfImpact: '',
        circumstanceDetail: '',
        assessmentInfo: '',
        desiredOutcome: '',
        outcomeDetail: '',
        studentInfo: store.userNumber + " " + store.name,
      },
      required: true
    }
  },
}
</script>

<style scoped>

</style>