<template>
  <div class="pa-8">
  <v-card class="pt-4 pl-8 pr-8 pb-8">
    <v-card-title>
      {{$route.params.action}} Course
    </v-card-title>
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
                    v-model="inputCourseInfo.beginDate"
                    label="Begin Date"
                    persistent-hint
                    prepend-icon="mdi-calendar"
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
                    v-model="inputCourseInfo.endDate"
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
    </v-form>
    <div class="d-flex">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
          >
            Manage Users in Course
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="searchUsers(1)">
            <v-list-item-title>Student</v-list-item-title>
          </v-list-item>
          <v-list-item @click="searchUsers(2)">
            <v-list-item-title>Staff</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-spacer></v-spacer>
      <v-btn
        color="success"
        @click="updateCourse()"
      >
        Update Course
      </v-btn>
    </div>
  </v-card>
    <UserTable
        class="mt-8"
        :userData="userData"
        source-page="CourseManage"
        :courseOfferingID="inputCourseInfo.courseOfferingID"
        :permission="userTablePermission"
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
    pickerBeginDate: '',
    pickerEndDate: '',
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
    // below for user table
    showTable: false,
    userTablePermission: 2,
    userData: []
  }),
  watch: {
    pickerBeginDate: {
      handler(beginDate) {
        if (beginDate == null) return;
        const [year, month, day] = beginDate.split('-');
        this.inputCourseInfo.beginDate = `${day}-${month}-${year}`;
      },
      immediate: true,
    },
    pickerEndDate: {
      handler(endDate) {
        if (endDate == null) return;
        const [year, month, day] = endDate.split('-');
        this.inputCourseInfo.endDate = `${day}-${month}-${year}`;
      },
      immediate: true,
    },
  },
  created() {
    this.init(this.$route.params.courseID);
  },
  methods: {
    init(courseID) {
      this.$axios({
        method: "GET",
        url: 'http://localhost:5094/course/get?courseOfferingID='
            .concat(courseID),
      }).then(res => {
        if (res.data.status !== "success") {
          alert("message: " + res.data.message);
          return;
        }

        this.inputCourseInfo = res.data.obj[0];
        this.semesterSelect = this.inputCourseInfo.semester;

        console.log("success query");
      }).catch(function (err) {
        alert("err " + err);
      })
    },
    updateCourse() {
      this.inputCourseInfo.semester = this.semesterSelect;
      this.$axios({
        method: "POST",
        url: 'http://localhost:5094/course/update',
        data: this.inputCourseInfo,
      }).then(res => {
        if (res.data.status === "success") {
          alert("added");
          this.$router.push('/course_manage');
        }
      }).catch(function (err) {
        alert("err " + err);
      })
    },
    searchUsers(permission) {
      console.log(this.inputCourseInfo.courseOfferingID);
      this.userTablePermission = permission;
      this.showTable = true;
      let addr = 'http://localhost:5094/manage/GetUsersByCourse?permission='
                  .concat(permission.toString())
                  .concat('&courseOfferingID=')
                  .concat(this.inputCourseInfo.courseOfferingID.toString());
      this.$axios({
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