<template>
  <v-data-table
      :headers="headers"
      :items="applications"
      :search="search"
      class="elevation-1 ma-8"
  >
    <template v-slot:top>
      <v-toolbar
          flat
      >
        <v-toolbar-title>Applications</v-toolbar-title>
        <v-divider
            class="ml-6 mx-4"
            inset
            vertical
        ></v-divider>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search in this view"
            single-line
            hide-details
        ></v-text-field>
        <v-divider
            inset
            vertical
            class="ml-4 mr-4"
        ></v-divider>
      </v-toolbar>
    </template>
    <template
        v-slot:[`item.actions`]="{ item }"
    >
      <v-icon
          small
          class="ml-2"
          @click="$router.push(`/application/view/${item.applicationID}`)"
      >
        mdi-pencil
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="error"
      >
        No data found
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import {store} from "@/global";

export default {
  name: "ApplicationTable",
  data: ()=> ({
    search: '',
    headers: [
      {
        text: 'Reference Number',
        align: 'start',
        sortable: true,
        value: 'applicationID',
      },
      {
        text: 'Student Number',
        sortable: true,
        value: 'studentNumber'
      },
      {
        text: 'Assessment Info',
        sortable: true,
        value: 'assessmentInfo'
      },
      {
        text: 'Circumstance',
        sortable: true,
        value: 'reason'
      },
      {
        text: 'Status',
        sortable: true,
        value: 'status'
      },
      {
        text: 'Check',
        value: 'actions',
        sortable: false
      },
    ],
    applications: [
      /*{
        applicationID: '111',
        studentNumber: 'number',
        assessmentInfo: 'assess',
        reason: 'reason',
        status: 'pending'
      }*/
    ]
  }),
  created() {
    console.log(store.name)
    this.initTable()
  },
  methods: {
    initTable() {
      this.$axios({
        method: "GET",
        url: `${store.host}/application/get?userNumber=${store.userNumber}`,
      }).then(res => {
        if (res.data.status !== "success") {
          alert("message: " + res.data.message);
          return
        }
        if (res.data.obj !== null && res.data.obj.length > 0) {
          this.readApplications(res.data.obj)
        }
      }).catch(function (err) {
        alert("err " + err);
      })
    },
    readApplications(applications) {
      for (let application of applications) {
        let info = {
            applicationID: application.applicationID,
            studentNumber: application.student.userNumber,
            assessmentInfo: '',
            reason: application.reason,
            status: application.status
        }
        if (application.assessmentInstance !== null) {
          info.assessmentInfo =
              application.assessmentInstance.courseOfferingName
              + " " + application.assessmentInstance.name
        }
        this.applications.push(info)
      }
    },
  }
}
</script>

<style scoped>

</style>