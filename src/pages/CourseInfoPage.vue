<template>
  <div class="pa-8">
  <v-card>
    <v-form>
      <v-container>
        <v-row class="d-flex justify-end">
          <v-col
              md="12"
          >
            <v-text-field
                v-model="inputCourseInfo.courseName"
                label="Course Name"
            ></v-text-field>
          </v-col>
          <v-col
              md="6"
          >
            <v-text-field
                v-model="inputCourseInfo.year"
                label="Course Name"
            ></v-text-field>
          </v-col>
          <v-col
              md="6"
          >
            <v-select
                label="Semester/Trimester"
                v-model="semesterSelect"
                :items="semesterItems"
            >
            </v-select>
          </v-col>
          <v-col md="6">
            <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="beginDateFormatted"
                    label="Begin Date"
                    persistent-hint
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                  v-model="beginDate"
                  no-title
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col md="6">
            <v-menu
                ref="menu1"
                v-model="menu2"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="endDateFormatted"
                    label="End Date"
                    persistent-hint
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                  v-model="endDate"
                  no-title
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-container>
      <v-row
          no-gutters
          justify-md="end"
      >
        <v-col
            md="3"
            class="mr-2"
        >
          <v-btn
              color="primary"
              @click="searchUsers(2)"
          >
            Manage Course's User
          </v-btn>
        </v-col>
        <v-col
            md="2"
            class="mr-2"
        >
          <v-btn
              color="success"
              @click="updateCourse()"
          >
            Update Course
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
    <UserTable
        class="mt-8"
        :userData="userData"
        source-page="CourseManage"
        userType="Staff"
        :courseOfferingID="inputCourseInfo.courseOfferingID"
        :permission="2"
        v-show="showTable"
    ></UserTable>
  </div>
</template>

<script>
import UserTable from "@/components/UserTable";
export default {
  name: "CourseInfoPage",
  components: {UserTable},
  data: () => ({
    beginDate: '',
    endDate: '',
    menu1: false,
    menu2: false,
    inputCourseInfo: {
      courseOfferingID: Number(0),
      courseName: '',
      year: '',
      semester: '',
      beginDate: '',
      endDate: '',
    },
    semesterSelect: [],
    semesterItems: [
        'Semester 1',
        'Trimester 1',
        'Semester 2',
        'Trimester 2',
        'Trimester 3',
    ],
    showTable: false,
    userData: []
  }),
  created() {
    let params = this.$route.params;
    if (params.courseOfferingID !== undefined) {
      console.log(params.courseOfferingID)
      this.inputCourseInfo.courseOfferingID = params.courseOfferingID;
    }
    if (params.courseName !== undefined) {
      console.log(params.courseName)
      this.inputCourseInfo.courseName = params.courseName;
    }
    if (params.year !== undefined) {
      console.log(params.year)
      this.inputCourseInfo.year = params.year;
    }
    if (params.semester !== undefined) {
      console.log(params.semester)
      this.inputCourseInfo.semester = params.semester;
    }
    if (params.beginDate !== undefined) {
      console.log(params.beginDate)
      this.inputCourseInfo.beginDate = params.beginDate;
    }
    if (params.endDate !== undefined) {
      console.log(params.endDate)
      this.inputCourseInfo.endDate = params.endDate;
    }
    this.semesterSelect = this.inputCourseInfo.semester;
  },
  computed: {
    beginDateFormatted: function() {
      if (!this.beginDate) return null

      const [year, month, day] = this.beginDate.split('-');
      return `${day}-${month}-${year}`;
    },
    endDateFormatted: function() {
      if (!this.endDate) return null

      const [year, month, day] = this.endDate.split('-');
      return `${day}-${month}-${year}`;
    }
  },
  methods: {
    updateCourse() {
      this.inputCourseInfo.beginDate = this.beginDateFormatted;
      this.inputCourseInfo.endDate = this.endDate;
      this.axios({
        method: "POST",
        url: 'http://localhost:5094/course/update',
        data: this.inputCourseInfo,
      }).then(res => {
        if (res.data.status === "success") {
          alert("added");
          this.$router.push('course_manage');
        }
      }).catch(function (err) {
        alert("err " + err);
      })
    },
    searchUsers(permission) {
      console.log(this.inputCourseInfo.courseOfferingID);
      this.showTable = true;
      let addr = 'http://localhost:5094/manage/GetUsersByCourse?permission='
                  .concat(permission.toString())
                  .concat('&courseOfferingID=')
                  .concat(this.inputCourseInfo.courseOfferingID.toString());
      this.axios({
        method: "GET",
        url: addr,
      }).then(res => {
        if (res.data.status !== "success") {
          alert("message: " + res.data.message);
          return;
        }
        this.userData = res.data.obj;
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