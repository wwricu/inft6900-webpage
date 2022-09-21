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
              @click="manageUser"
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
  </div>
</template>

<script>
export default {
  name: "CourseInfoPage",
  data: () => ({
    beginDate: '',
    endDate: '',
    menu1: false,
    menu2: false,
    inputCourseInfo: {
      courseID: 0,
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
    ]
  }),
  created() {
    console.log(this.$route.params);
    this.inputCourseInfo = this.$route.params;
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
    manageUser() {

    }
  }
}
</script>

<style scoped>

</style>