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
            width="800"
            v-model="assessmentDialog"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="success"
                class="ml-4"
                dark
                v-bind="attrs"
                v-on="on"
                v-if="sourcePage==='course'"
                @click="getLocation('campus')"
            >
              New Assessment
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="text-h5">
              {{dialogAction}}
            </v-card-title>
            <v-divider></v-divider>
            <v-container class="pl-8 pr-8">
              <v-row no-gutters>
                <v-col cols="6">
                  <v-text-field
                      class="mr-4"
                      label="Assessment Name"
                      v-model="assessmentData.name"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-select
                      class="ml-4"
                      label="Assessment Type"
                      :items="assessmentTypeItems"
                      v-model="assessmentData.type"
                  ></v-select>
                </v-col>
                <v-col cols="4">
                  <v-select
                      class="mr-2"
                      label="Campus"
                      :items="campusItems"
                      @change="getLocation('building')"
                      @click="getLocation('campus', false)"
                      v-model="locationData.campus"
                  ></v-select>
                </v-col>
                <v-col cols="4">
                  <v-select
                      class="ml-4 mr-4"
                      label="Building"
                      :items="buildingItems"
                      @change="getLocation('room')"
                      @click="getLocation('building', false)"
                      v-model="locationData.building"
                  ></v-select>
                </v-col>
                <v-col cols="4">
                  <v-select
                      return-object
                      label="Room"
                      item-text="room"
                      item-value="locationID"
                      @change="assessmentData.locationID=roomSelect.locationID"
                      @click="getLocation('room', false)"
                      :items="roomItems"
                      v-model="roomSelect"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                      hide-details
                      label="Status"
                      class="mb-6"
                      v-if="sourcePage==='user'"
                      v-model="assessmentData.status"
                  ></v-text-field>
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
                  v-if="dialogAction==='New Assessment'"
                  @click="newAssessment"
              >
                CONFIRM
              </v-btn>
              <v-btn
                  text
                  color="primary"
                  v-if="dialogAction==='Update Assessment'"
                  @click="submitAssessment"
              >
                UPDATE
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.location`]="{ item }">
      <v-chip
          color="primary"
          v-if="item.location !== null"
      >
        {{ item.location.campus }}
        {{ item.location.building }}
        {{ item.location.room }}
      </v-chip>
    </template>
    <template
        v-slot:[`item.actions`]="{ item }"
    >
      <v-icon
          small
          class="ml-3"
          v-if="sourcePage==='user'"
          @click="updateAssessment(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
          small
          class="ml-3"
          v-if="sourcePage==='course'"
          @click="updateAssessment(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
          small
          class="ml-3"
          v-if="sourcePage==='course'"
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
    sourcePage: '',
    search: '',
    headers: [
      {
        text: 'Courses',
        align: 'start',
        sortable: false,
        value: 'courseOfferingName',
      },
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
        text: 'Location',
        align: 'center',
        value: 'location',
      },
      {
        text: 'Status',
        align: 'start',
        value: 'status',
      },
      {
        text: 'Modify/Delete',
        align: 'start',
        value: 'actions'
      }
    ],
    assessments: [],
    // below for new assessment dialog
    dialogAction: 'New Assessment',
    beginDateMenu: false,
    endDateMenu: false,
    pickerBeginDate: null,
    pickerEndDate: null,
    assessmentDialog: false,
    assessmentData: {
      name: '',
      type: '',
      status: '',
      beginDate: '',
      endDate: '',
      locationID: 0,
    },
    assessmentTypeItems: [
        'Quiz',
        'Assignment',
        'Formal Exam',
    ],
    // below for select location
    campusItems: [],
    buildingItems: [],
    roomSelect: [],
    roomItems: [],
    locationData: { // for selection also
      locationID: 0,
      campus: '',
      building: '',
      room: '',
    }
  }),
  created() {
    if (this.$route.path.match(/^\/user/i)) {
      this.sourcePage = 'user';
      this.headers[this.headers.length - 1].text = 'Modify';
    } else if (this.$route.path.match(/^\/course/i)) {
      this.sourcePage = 'course';
      this.headers.splice(-2, 1);
      this.headers.shift();
    }
    this.searchAssessment(this.sourcePage);
    this.assessmentData.building = "test"
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
    getLocation(arg, override) {
      if (override === false) { // for click
        if (arg === 'campus'
              && this.campusItems.length > 0) return;
        if (arg === 'building'
            && this.buildingItems.length > 0) return;
        if (arg === 'room'
            && this.roomItems.length > 0) return;
      }
      /*
      * campus: /get
      * building: /get?campus=
      * room: /get?campus=&building=
      * ID: /get?campus=&building=&room=&locationID=
      * */
      let url = 'http://localhost:5094/location/get';
      if (arg !== 'campus') {  // return campus
        url = url.concat(`?campus=${this.locationData.campus}`)
      }
      if (arg === 'room' || arg === 'ID') {
        url = url.concat(`&building=${this.locationData.building}`)
      }
      if (arg === 'ID') {
        url = url.concat(`&room=${this.locationData.room}`)
                 .concat(`&locationID=${this.locationData.locationID}`)
      }

      this.$axios({
        method: "GET",
        url: url,
      }).then(res => {
        if (res.data.status !== "success"
            || res.data.obj === null) {
          alert("message: " + res.data.message);
          return;
        }
        if (arg === 'campus') {
          this.campusItems = [];
        } else if (arg === 'building') {
          this.buildingItems = [];
        } else if (arg === 'room') {
          this.roomItems = [];
        }

        for (let location of res.data.obj) {
          if (arg === 'campus') {
            this.campusItems.push(location.campus);
          } else if (arg === 'building') {
            this.buildingItems.push(location.building);
          } else if (arg === 'room' && location.room !== null) {
            this.roomItems.push({
              room: location.room,
              locationID: location.locationID,
            });
          }
        }
      }).catch(function (err) {
        alert("err " + err);
      })
    },
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
        this.searchAssessment(this.sourcePage);
        alert('Added');
      }).catch(function (err) {
        alert("err " + err);
      })
      this.assessmentDialog = false;
    },
    searchAssessment(sourcePage) {
      let url = 'http://localhost:5094/assessment/get';
      if (sourcePage === 'course') {
        url = url.concat(`?courseOfferingID=${this.$route.params.courseID}`);
      } else if (sourcePage === 'user') {
        url = url.concat(`?userNumber=${this.$route.params.userNumber}`);
      }
      this.$axios({
        method: "GET",
        url: url,
      }).then(res => {
        if (res.data.status !== "success") {
          alert("message: " + res.data.message);
          return;
        }
        if (res.data.obj !== null) {
          this.assessments = res.data.obj;
        }
        console.log("success query");
      }).catch(function (err) {
        alert("err " + err);
      })
    },
    updateAssessment(item) {
      this.assessmentData = item;
      this.dialogAction = 'Update Assessment';
      this.assessmentDialog = true;

      /* locationData is the selector, and also parameters for searching
       so set them up then get location to fill the v-select
       notice that selected item must be included in items to be shown
      */
      this.locationData.campus = item.location.campus;
      this.locationData.building = item.location.building;
      this.locationData.room = item.location.room;
      this.roomSelect = {
        room: item.location.room,
        locationID: item.location.locationID,
      }

      this.getLocation('campus');
      this.getLocation('building');
      this.getLocation('room');
    },
    submitAssessment() {
      let url = 'http://localhost:5094/assessment/'
      if (this.sourcePage === 'course') {
        url = url.concat('updateTemplate');
      } else if (this.sourcePage === 'user') {
        url = url.concat('updateInstance');
      }
      this.$axios({
        method: "POST",
        url: url,
        data: this.assessmentData
      }).then(res => {
        if (res.data.status !== "success") {
          alert("message: " + res.data.message);
          return;
        }
        this.searchAssessment(this.sourcePage)
      }).catch(function (err) {
        alert("err " + err);
      })
      this.assessmentDialog = false;
    },
    deleteAssessment(item) {
      this.$axios({
        method: "DELETE",
        url: 'http://localhost:5094/assessment/delete',
        data: item
      }).then(res => {
        if (res.data.status !== "success") {
          alert("message: " + res.data.message);
          return;
        }
        this.assessments.splice(this.assessments.indexOf(item), 1);
        console.log("success query");
      }).catch(function (err) {
        alert("err " + err);
      })
    },
  }
}
</script>

<style scoped>

</style>