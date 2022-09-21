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
            v-if="isUserPage"
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
            <v-card-title class="text-h5 grey lighten-2">
              Add Course to {{userNumber}}
            </v-card-title>

            <v-combobox
                solo
                chips
                clearable
                multiple
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
            <v-card-title class="text-h5 grey lighten-2">
              Add a new Course
            </v-card-title>
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
                  <v-text-field
                    label="Semester/Trimester"
                    v-model="newCourse.semester"
                  ></v-text-field>
                </v-col>
                <v-col md="12">
                  <v-text-field
                      label="Begin Date"
                      v-model="newCourse.beginDate"
                  ></v-text-field>
                </v-col>
                <v-col md="12">
                  <v-text-field
                      label="End Date"
                      v-model="newCourse.endDate"
                  ></v-text-field>
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
          v-if="isUserPage"
          @click="deleteCourse(item)"
      >
        mdi-trash-can
      </v-icon>
      <v-icon
          small
          class="ml-3"
          v-else
          @click="manageCourse(item)"
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
export default {
  name: "CourseTable",
  data: () => ({
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
    // below is add course to user dialog data
    addCourseToUserDialog: false,
    addedCourses: [], // courseNameForShow:, courseID:
    coursesForAdd: [],
    // add course dialog
    newCourseDialog: false,
    newCourse: {
      courseName: '',
      year: '',
      semester: '',
      beginDate: '',
      endDate: '',
    }
  }),

  computed: {
    courses: function() { // full course data for display
      return this.inputCourseData;
    },
    isUserPage: function() {
      return this.sourcePage === 'UserManage';
    }
  },

  props: {
    userNumber: {
      type: String,
      default: '04014525'
    },
    userPermission: {
      type: Number,
      default: 2
    },
    inputCourseData: {
      required: true,
    },
    sourcePage: {
      type: String,
      default: 'UserManage'
    }
  },

  created() {
      this.headers.pop();
      let action = 'Delete';
      if (this.sourcePage === 'UserManage') {
        action = 'Delete';
      } else if (this.sourcePage === 'CourseManage') {
        action = 'Edit Course'
      }
      this.headers.push({
        text: action,
        value: 'actions',
        sortable: false
      })
  },

  methods: {
    deleteCourse(item) {
      if (item !== null) {
        console.log(item)
      }
      this.axios({
        method: "POST",
        url: 'http://localhost:5094/manage/relation',
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
      this.axios({
        method: "GET",
        url: 'http://localhost:5094/course/get',
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
      this.axios({
        method: "POST",
        url: 'http://localhost:5094/manage/relation',
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
        name:'edit_course',
        params: item
      });
    },
    addNewCourse() {
      this.axios({
        method: "POST",
        url: 'http://localhost:5094/course/new',
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
