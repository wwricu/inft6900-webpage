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
            v-model="addCourseDialog"
            width="500"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="success"
                dark
                v-bind="attrs"
                v-on="on"
                @click="getCoursesForAdd"
            >
              Add courses
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
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
          small
          class="mr-2"
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
export default {
  name: "CourseTable",
  data: () => ({
    permission: 2,
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
    // below is dialog data
    addCourseDialog: false,
    addedCourses: [], // courseNameForShow:, courseID:
    coursesForAdd: [],
  }),

  computed: {
    courses: function() { // full course data for display
      return this.inputCourseData;
    }
  },

  props: {
    userNumber: {
      type: String,
      default: '04014525'
    },
    userPermission: {
      type: Number,
      required: true,
      default: 2
    },
    inputCourseData: {
      required: true,
    }
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
            permission: this.permission
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
          top: 1000, // to be fix
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
      this.addCourseDialog = false;
      this.axios({
        method: "POST",
        url: 'http://localhost:5094/manage/relation',
        data: {
          user: {
            userNumber: this.userNumber,
            permission: this.permission
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
    }
  }
}
</script>

<style scoped>

</style>
