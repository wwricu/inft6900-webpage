<!-- 
  2022 Trimester 3 INFT6900 Final Project
  Team   : Four Square
  Author : Weiran Wang
  Date   : 21/09/2022
-->

<template>
  <v-data-table
      :headers="headers"
      :items="courses"
      :search="search"
      sort-by="calories"
      class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
          flat
      >
        <v-toolbar-title>Courses</v-toolbar-title>
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
        <v-dialog
            width="500"
            v-if="sourcePage === 'user'"
            v-model="addCourseToUserDialog"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="success"
                dark
                v-bind="attrs"
                v-on="on"
                @click="getCoursesForAdd"
            >
              Add courses to user
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="text-h5">
              Add Course to {{userNumber}}
            </v-card-title>
            <v-divider></v-divider>
            <v-combobox
                solo
                multiple
                clearable
                small-chips
                hide-selected
                return-object
                item-text="courseNameForShow"
                item-value="courseOfferingID"
                label="Choose Available Courses"
                prepend-icon="mdi-filter-variant"
                class="ml-4 mr-4 mt-6"
                v-model="addedCourses"
                :items="coursesForAdd"
            >
              <template v-slot:selection="{ attrs, item, select, selected }">
                <v-chip
                    v-bind="attrs"
                    :input-value="selected"
                    close
                    @click="select"
                    @click:close="removeAddCourses(item)"
                >
                  <strong>{{ item.courseNameForShow }}</strong>&nbsp;
                </v-chip>
              </template>
            </v-combobox>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="primary"
                  text
                  @click="addCoursesToUser"
              >
                CONFIRM
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog
          v-else
          width="500"
          v-model="newCourseDialog"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="success"
                dark
                v-bind="attrs"
                v-on="on"
            >
              new course
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="text-h5">
              Add a new Course
            </v-card-title>
            <v-divider></v-divider>
            <v-container class="pa-10">
              <v-row>
                <v-col md="12">
                  <v-text-field
                    label="Course Name"
                    v-model="newCourse.courseName"
                  ></v-text-field>
                </v-col>
                <v-col md="12">
                  <v-text-field
                    label="Year"
                    v-model="newCourse.year"
                  ></v-text-field>
                </v-col>
                <v-col md="12">
                  <v-select
                      label="Semester/Trimester"
                      v-model="semesterSelect"
                      :items="semesterItems"
                  >
                  </v-select>
                </v-col>
                <v-col md="12">
                  <v-menu
                      ref="menu1"
                      v-model="menu1"
                      :close-on-content-click="true"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                          v-model="newCourse.beginDate"
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
                <v-col md="12">
                  <v-menu
                      ref="menu1"
                      v-model="menu2"
                      :close-on-content-click="true"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                          v-model="newCourse.endDate"
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
                  color="primary"
                  text
                  @click="addNewCourse"
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
          v-if="sourcePage === 'user'"
          @click="deleteCourseFromUser(item)"
      >
        mdi-trash-can
      </v-icon>
      <v-icon
          small
          class="ml-6"
          v-if="sourcePage === 'course_manage'"
          @click="manageCourse(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
          small
          class="ml-3"
          v-if="sourcePage === 'course_manage'"
          @click="deleteCourse(item)"
      >
        mdi-trash-can
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
  name: "CourseTable",
  data: () => ({
    sourcePage: '',
    search: '',
    headers: [
      {
        text: 'Course Name',
        align: 'start',
        sortable: false,
        value: 'courseName',
      },
      {
        text: 'Semester/Trimester',
        sortable: true,
        value: 'semester'
      },
      {
        text: 'Year',
        sortable: true,
        value: 'year'
      },
      {
        text: 'Delete',
        value: 'actions',
        sortable: false
      },
    ],
    // below is adding course to user dialog data
    addCourseToUserDialog: false,
    addedCourses: [], // courseNameForShow:, courseID:
    coursesForAdd: [],
    // add course dialog
    semesterSelect: [],
    semesterItems: [
      'Semester 1',
      'Trimester 1',
      'Semester 2',
      'Trimester 2',
      'Trimester 3',
    ],
    pickerBeginDate: null,
    pickerEndDate: null,
    menu1: false,
    menu2: false,
    newCourseDialog: false,
    newCourse: {
      courseName: '',
      year: '',
      semester: '',
      beginDate: '',
      endDate: '',
    }
  }),
  watch: {
    pickerBeginDate: {
      handler(beginDate) {
        if (beginDate == null) return;
        const [year, month, day] = beginDate.split('-');
        this.newCourse.beginDate = `${day}-${month}-${year}`;
      },
      immediate: true,
    },
    pickerEndDate: {
      handler(endDate) {
        if (endDate == null) return;
        const [year, month, day] = endDate.split('-');
        this.newCourse.endDate = `${day}-${month}-${year}`;
      },
      immediate: true,
    },
  },
  computed: {
    courses: function() { // full course data for display
      return this.inputCourseData;
    },
    userPermission: function() {
      return store.rolesMap[this.$route.params.role];
    }
  },

  props: {
    userNumber: {
      type: String,
      default: '04014525'
    },
    inputCourseData: {
      required: true,
    },
  },

  created() {
    let action = 'Delete';
    if (this.$route.path.match(/^\/user/i)) {
      this.sourcePage = 'user';
      action = 'Delete';
    } else if (this.$route.path.match(/^\/course_manage/i)) {
      this.sourcePage = 'course_manage';
      action = 'Edit/Delete Course'
    }
    this.headers.pop();
    this.headers.push({
      text: action,
      value: 'actions',
      sortable: false
    })
  },

  methods: {
    deleteCourseFromUser(item) {
      this.$axios({
        method: "POST",
        url: `${store.host}/manage/relation`,
        data: {
          user: {
            userNumber: this.userNumber,
            permission: this.userPermission
          },
          courseRemoveList: [{
            courseOfferingID: item.courseOfferingID
          }]
        },
      }).then(res => {
        if (res.data.status === "success") {
          alert("deleted");
          this.courses.splice(this.addedCourses.indexOf(item), 1)
        }
      }).catch(function (err) {
        alert("err " + err);
      })
    },
    removeAddCourses(item) {
      this.addedCourses.splice(this.addedCourses.indexOf(item), 1)
    },
    getCoursesForAdd() {
      this.$axios({
        method: "GET",
        url: `${store.host}/course/getCandidates?userNumber=${this.userNumber}&permission=${this.userPermission}`,
      }).then(res => {
        if (res.data.status !== "success") {
          alert("message: " + res.data.message);
          return;
        }
        for (const courseItem of res.data.obj) {
          const sArray = courseItem.semester.split(' ');

          this.coursesForAdd.push({
            courseNameForShow: courseItem.courseName.concat(' (')
                                  .concat(sArray[0].substring(0,1)
                                  .concat(sArray[1]
                                  .substring(0,1)))
                                  .concat(' ')
                                  .concat(courseItem.year)
                                  .concat(')'),
            courseOfferingID: courseItem.courseOfferingID
          })
        }

        window.scrollTo({
          top: 1000, // to be fixed
          left: 0,
          behavior: 'smooth'
        })
        console.log("success query");
      }).catch(function (err) {
        alert("err " + err);
      })
    },
    addCoursesToUser() {
      console.log(this.addedCourses[0].courseOfferingID);
      this.addCourseToUserDialog = false;
      this.$axios({
        method: "POST",
        url: `${store.host}/manage/relation`,
        data: {
          user: {
            userNumber: this.userNumber,
            permission: this.userPermission
          },
          courseAddList: this.addedCourses
        },
      }).then(res => {
        if (res.data.status === "success") {
          alert("updated");
          this.$parent.searchCourse()
        }
      }).catch(function (err) {
        alert("err " + err);
      })
    },
    manageCourse(item) {
      this.$router.push({
        path: `course/Edit/${item.courseOfferingID}`,
      });
    },
    deleteCourse(item) {
      this.$axios({
        method: "POST",
        url: `${store.host}/course/delete`,
        data: item,
      }).then(res => {
        if (res.data.status === "success") {
          alert("deleted");
          this.courses.splice(this.courses.indexOf(item), 1)
        }
      }).catch(function (err) {
        alert("err " + err);
      })
    },
    addNewCourse() {
      this.newCourse.semester = this.semesterSelect;
      this.$axios({
        method: "POST",
        url: `${store.host}/course/new`,
        data: this.newCourse,
      }).then(res => {
        if (res.data.status === "success") {
          alert("added");
          this.$parent.searchCourse()
        }
      }).catch(function (err) {
        alert("err " + err);
      })
      this.newCourseDialog = false;
    }
  }
}
</script>

<style scoped>

</style>
