<template>
  <v-data-table
      :headers="headers"
      :items="assessments"
      :search="search"
      sort-by="calories"
      class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
          flat
      >
        <v-toolbar-title>Assessment Data</v-toolbar-title>
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
        <v-dialog
            width="500"
            v-model="newAssessmentDialog"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="success"
                class="ml-4"
                dark
                v-bind="attrs"
                v-on="on"
            >
              New Assessment
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              Add an Assessment
            </v-card-title>
            <v-container class="pl-8 pr-8">
              <v-row no-gutters>
                <v-col cols="12">
                  <v-text-field
                      single-line
                      hide-details
                      label="Assessment Name"
                      v-model="assessmentData.name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-select
                      class="mt-6"
                      label="Assessment Type"
                      :items="assessmentTypeItems"
                      v-model="assessmentData.type"
                  ></v-select>
                </v-col>
                <v-col md="12">
                  <v-menu
                      ref="menu1"
                      v-model="beginDateMenu"
                      :close-on-content-click="true"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                          persistent-hint
                          label="Begin Date"
                          prepend-icon="mdi-calendar"
                          v-model="assessmentData.beginDate"
                          v-bind="attrs"
                          v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="pickerBeginDate"
                        no-title
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col md="12">
                  <v-menu
                      offset-y
                      ref="menu2"
                      class="mb-4"
                      v-model="endDateMenu"
                      :close-on-content-click="true"
                      transition="scale-transition"
                      max-width="290px"
                      min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                          v-model="assessmentData.endDate"
                          label="End Date"
                          persistent-hint
                          prepend-icon="mdi-calendar"
                          v-bind="attrs"
                          v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="pickerEndDate"
                        no-title
                    ></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-container>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  text
                  color="primary"
                  @click="newAssessment"
              >
                CONFIRM
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template
        v-slot:[`item.actions`]="{ item }"
    >
      <v-icon
          small
          class="ml-3"
          @click="updateAssessment(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
          small
          class="ml-3"
          @click="deleteAssessment(item)"
      >
        mdi-trash-can
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
          color="error"
      >
        NO DATA
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "AssessmentTable",
  data: () => ({
    search: '',
    headers: [
      {
        text: 'Assessment Name',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      {
        text: 'Type',
        align: 'start',
        value: 'type',
      },
      {
        text: 'Begin Date',
        align: 'start',
        value: 'beginDate',
      },
      {
        text: 'Due Date',
        align: 'start',
        value: 'endDate',
      },
      {
        text: 'Modify/Delete',
        align: 'start',
        value: 'actions'
      }
    ],
    assessments: [],
    // below for new assessment dialog
    beginDateMenu: false,
    endDateMenu: false,
    pickerBeginDate: '',
    pickerEndDate: '',
    newAssessmentDialog: false,
    assessmentData: {
      name: '',
      type: '',
      description: '',
      beginDate: '',
      endDate: '',
    },
    assessmentTypeItems: [
        'Quiz',
        'Assignment',
        'Formal Exam',
    ]
  }),
  created() {
    this.searchAssessment();
  },
  watch: {
    pickerBeginDate: {
      handler(beginDate) {
        if (beginDate == null) return;
        const [year, month, day] = beginDate.split('-');
        this.assessmentData.beginDate = `${day}-${month}-${year}`;
      },
      immediate: true,
    },
    pickerEndDate: {
      handler(endDate) {
        if (endDate == null) return;
        const [year, month, day] = endDate.split('-');
        this.assessmentData.endDate = `${day}-${month}-${year}`;
      },
      immediate: true,
    },
  },
  methods: {
    newAssessment() {
      this.assessmentData.courseOfferingID =
            parseInt(this.$route.params.courseID);

      this.$axios({
        method: "POST",
        url: 'http://localhost:5094/assessment/new',
        data: this.assessmentData
      }).then(res => {
        if (res.data.status !== "success") {
          alert("message: " + res.data.message);
          return;
        }
        alert('Added')
      }).catch(function (err) {
        alert("err " + err);
      })
      this.newAssessmentDialog = false;
    },
    searchAssessment() {
      let courseOfferingID = this.$route.params.courseID;
      this.$axios({
        method: "GET",
        url: `http://localhost:5094/assessment/get?courseOfferingID=${courseOfferingID}`,
      }).then(res => {
        if (res.data.status !== "success") {
          alert("message: " + res.data.message);
          return;
        }
        this.assessments = res.data.obj;
        console.log("success query");
      }).catch(function (err) {
        alert("err " + err);
      })
    },
    updateAssessment(item) {
      console.log(item)
    },
    deleteAssessment(item) {
      console.log(item);
      this.$axios({
        method: "DELETE",
        url: 'http://localhost:5094/assessment/delete',
        data: item
      }).then(res => {
        if (res.data.status !== "success") {
          alert("message: " + res.data.message);
          return;
        }
        this.assessments = res.data.obj;
        this.assessments.splice(this.assessments.indexOf(item), 1);
        console.log("success query");
      }).catch(function (err) {
        alert("err " + err);
      })
    }
  }
}
</script>

<style scoped>

</style>