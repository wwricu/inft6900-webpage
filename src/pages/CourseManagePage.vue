<template>
  <div class="pa-8">
    <v-card class="pt-4 pb-4 pl-8 pr-8 mb-8">
      <v-card-title>Search Courses</v-card-title>
      <v-container>
        <v-row>
          <v-col
              md="3"
          >
              <v-combobox
                  class="mt-2"
                  v-model="yearSelect"
                  :items="yearItems"
                  label="Choose Year"
                  multiple
                  clearable
                  small-chips
                  hide-selected
              ></v-combobox>
          </v-col>
          <v-col
              md="3"
          >
            <v-combobox
                class="mt-2"
                v-model="semesterSelect"
                :items="semesterItems"
                label="Choose Semester/Trimester"
                multiple
                clearable
                small-chips
                hide-selected
            ></v-combobox>
          </v-col>
          <v-col
              md="4"
          >
            <v-text-field
                label="Course Name"
                v-model="searchString"
            ></v-text-field>
          </v-col>
          <v-col
              align-self="center"
              class="text-center"
              md="2"
          >
            <v-btn
                color="primary"
                @click="searchCourse"
            >
              Search
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <CourseTable
        class="mt-8"
        v-if="showTable"
        :input-course-data="courseData"
        sourcePage="CourseManage"
    ></CourseTable>
  </div>
</template>

<script>
import CourseTable from "@/components/CourseTable";
import {store} from "@/global";
export default {
  name: "CourseInfoPage",
  components: {CourseTable},
  data: () => ({
    searchString: '',
    semesterSelect: [],
    semesterItems: [
        'Semester 1',
        'Trimester 1',
        'Semester 2',
        'Trimester 2',
        'Trimester 3'
    ],
    yearSelect: [],
    yearItems: [],
    showTable: false,
    courseData: [], // send to table
  }),
  created() {
    let year = parseInt(new Date().getFullYear());
    for (let i = 0; i < 5; i++) {
      this.yearItems.push((year - i).toString());
    }
  },
  methods: {
    searchCourse() {
      if (this.showTable === false) {
        this.showTable = true;
      }

      this.$axios({
        method: "POST",
        url: `${store.host}/course/getmultiple`,
        data: {
          years: this.yearSelect,
          semesters: this.semesterSelect,
          names: [this.searchString]
        }
      }).then(res => {
        if (res.data.status !== "success") {
          alert("message: " + res.data.message);
          return;
        }
        console.log(this.courseData)
        this.courseData = res.data.obj;
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