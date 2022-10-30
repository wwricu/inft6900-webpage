<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <p class="text--secondary">Reference Number:</p>
      </v-col>
      <v-col cols="9">
        <p>{{application.applicationID}}</p>
      </v-col>

      <v-col cols="3">
        <p class="text--secondary">Student Info:</p>
      </v-col>
      <v-col cols="9">
        <p>{{application.studentInfo}}</p>
      </v-col>

      <v-col cols="3">
        <p class="text--secondary">Reason:</p>
      </v-col>
      <v-col cols="9">
        <p>{{application.reason}}</p>
      </v-col>

      <v-col cols="3">
        <p class="text--secondary">Days of Impact:</p>
      </v-col>
      <v-col cols="9">
        <p>{{application.daysOfImpact}} days</p>
      </v-col>

      <v-col cols="3">
        <p class="text--secondary">Circumstance Detail</p>
      </v-col>
      <v-col cols="9">
        <p>{{application.circumstanceDetail}}</p>
      </v-col>

      <v-col cols="3">
        <p class="text--secondary">Assessment:</p>
      </v-col>
      <v-col cols="9">
        <p>{{application.assessmentInfo}}</p>
      </v-col>

      <v-col cols="3">
        <p class="text--secondary">Desired Outcome:</p>
      </v-col>
      <v-col cols="9">
        <p>{{application.desiredOutcome}}</p>
      </v-col>

      <v-col cols="3">
        <p class="text--secondary">Outcome Detail:</p>
      </v-col>
      <v-col cols="9">
        <p>{{application.outcomeDetail}}</p>
      </v-col>
      <v-col cols="3">
        <p class="text--secondary">Status:</p>
      </v-col>
      <v-col cols="9">
        <p>{{application.status}}</p>
      </v-col>
    </v-row>
    <v-card-actions>
      <slot name="submit"></slot>
    </v-card-actions>
  </v-container>
</template>

<script>
export default {
  name: "ApplicationCard",
  props: {
    application: {
      // default: {
      //   applicationID: '',
      //   reason: '',
      //   daysOfImpact: '',
      //   circumstanceDetail: '',
      //   assessmentInfo: '',
      //   desiredOutcome: '',
      //   outcomeDetail: '',
      //   studentInfo: ''
      // },
      required: true
    }
  }
}
</script>

<style scoped>

</style>