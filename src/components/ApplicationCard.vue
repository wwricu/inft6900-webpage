<template>
  <v-container>
    <v-row no-gutters>

      <v-col cols="3">
        <p class="text--secondary">Reference Number:</p>
      </v-col>
      <v-col cols="9">
        <p>{{application.applicationID}}</p>
      </v-col>

      <v-col cols="3">
        <p class="text--secondary">Student Info:</p>
      </v-col>
      <v-col cols="9" v-if="application.student != null">
        <p>{{application.studentNumber + " " + application.student.userName}}</p>
      </v-col>
      <v-col cols="12">
        <v-divider class="mb-4"/>
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

      <v-col cols="12">
        <p class="text--secondary">Circumstance Detail:</p>
      </v-col>
      <v-col cols="12" v-if="application.circumstanceDetail != null">
        <p>{{application.circumstanceDetail}}</p>
      </v-col>
      <v-col cols="12">
        <p class="text--secondary">Documents:</p>
        <DocumentCard
            class="ml-n6"
            v-if="application.documentList != null"
            :documents="application.documentList"
            :disabled="true"
        />
      </v-col>
      <v-col cols="12">
        <v-divider class="mb-4"/>
      </v-col>
      <v-col cols="3">
        <p class="text--secondary">Course:</p>
      </v-col>
      <v-col cols="9" v-if="application.assessmentInstance != null">
        <p>{{application.assessmentInstance.courseOfferingName}}</p>
      </v-col>

      <v-col cols="3">
        <p class="text--secondary">Assessment:</p>
      </v-col>
      <v-col cols="9" v-if="application.assessmentInstance != null">
        <p>{{application.assessmentInstance.name}}</p>
      </v-col>
      <v-col cols="3">
        <p class="text--secondary">Desired Outcome:</p>
      </v-col>
      <v-col cols="9">
        <p>{{application.outcome}}</p>
      </v-col>

      <v-col cols="12">
        <p class="text--secondary">Outcome Detail:</p>
      </v-col>
      <v-col cols="12" v-if="application.outcomeDetail != null">
        <p>{{application.outcomeDetail}}</p>
      </v-col>

      <v-col cols="3">
        <p class="text--secondary">Modified Time:</p>
      </v-col>
      <v-col cols="9">
        <p>{{application.submitDate}}</p>
      </v-col>
      <v-col cols="3">
        <p class="text--secondary">Status:</p>
      </v-col>
      <v-col cols="9">
        <p>{{application.status}}</p>
      </v-col>
    </v-row>
    <v-card-actions>
      <v-spacer/>
      <slot
        name="submit"
        v-if="application.status == null || application.status === 'Draft'"
      ></slot>
    </v-card-actions>
  </v-container>
</template>

<script>
import DocumentCard from "@/components/DocumentCard";
export default {
  name: "ApplicationCard",
  components: {DocumentCard},
  props: {
    application: {
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
        // student: {userName: ''},
        // documentList: [],
        // staffID:3,
        // instanceID:"6c75a980-cf9d-4150-b98c-b8461aae2328"
      required: true
    }
  }
}
</script>

<style scoped>

</style>