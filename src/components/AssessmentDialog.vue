<template>
  <v-dialog
      width="800"
      v-model="assessmentDialog"
  >
    <v-card>
      <v-card-title class="text-h5">
        {{dialogAction}}
      </v-card-title>
      <v-divider></v-divider>
      <v-container class="pl-8 pr-8">
        <v-row no-gutters>
          <v-col cols="6">
            <v-text-field
                :disabled="disabled"
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
                :disabled="disabled"
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
            <v-select
                hide-details
                label="Status"
                class="mb-6"
                v-model="assessmentData.status"
                :items="statusItem"
            ></v-select>
          </v-col>
          <v-col cols="6">
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
          <v-col cols="6">
            <TimeMenu
                ref="beginTime"
                label="Begin Time"
              :initTime="assessmentData.beginTime"
            />
          </v-col>
          <v-col cols="6">
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
          <v-col cols="6">
            <TimeMenu
                ref="endTime"
                label="End Time"
                :initTime="assessmentData.endTime"
            />
          </v-col>
          <v-col cols="12">
            <v-textarea
                label="Comment"
                outlined
                v-model="staffComment"
                hint="This comment will be sent to student"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-container>
      <v-divider></v-divider>
      <slot name="actions"/>
    </v-card>
  </v-dialog>
</template>

<script>
import {store} from "@/global";
import TimeMenu from "@/components/TimeMenu";

export default {
  name: "AssessmentDialog",
  components: {TimeMenu},
  props: {
    assessmentID: {
      type: String,
      required: false
    },
    dialogAction: {
      type: String,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  data: () => ({
    staffComment: '',
    assessmentTypeItems: [
      'Quiz',
      'Assignment',
      'Formal Exam',
    ],
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
      beginTime: '',
      endTime: '',
      endDate: '',
      locationID: 0,
    },
    statusItem: [
      'TO BE COMPLETED',
      'EXEMPTED',
      'COMPLETED',
    ],

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
    showDialog() {
      this.searchAssessment()
      this.getLocation('campus')
      this.assessmentDialog = true
    },
    searchAssessment() {
      this.$axios({
        method: "GET",
        url: `${store.host}/assessment/getInstance?assessmentID=${this.assessmentID}`,
      }).then(res => {
        if (res.data.status !== "success") {
          alert("message: " + res.data.message);
          return;
        }
        if (res.data.obj[0] !== null) {
          this.assessmentData = res.data.obj[0];
          if (res.data.obj[0].location != null) {
            this.locationData.campus = res.data.obj[0].location.campus;
            this.locationData.building = res.data.obj[0].location.building;
            this.locationData.room = res.data.obj[0].location.room;
            this.roomSelect = {
              room: res.data.obj[0].location.room,
              locationID: res.data.obj[0].location.locationID,
            }
          }
        }
      }).catch(function (err) {
        alert("err " + err);
      })
    },
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
      let url = `${store.host}/location/get`;
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
          this.getLocation('building')
        } else if (arg === 'building') {
          this.buildingItems = [];
          this.getLocation('room')
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
    submitAssessment() {
      if (this.$refs.beginTime != null
      && this.$refs.endTime != null) {
        this.assessmentData.beginTime = this.$refs.beginTime.time
        this.assessmentData.endTime = this.$refs.endTime.time
      }

      this.$axios({
        method: "POST",
        url: `${store.host}/assessment/updateInstance`,
        data: this.assessmentData
      }).then(res => {
        if (res.data.status === "success") {
          this.$router.push('/application')
        }
      }).catch(function (err) {
        alert("err " + err);
      })
    },
  }
}
</script>

<style scoped>

</style>