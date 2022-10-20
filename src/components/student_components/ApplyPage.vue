<template>
  <div>
    <div class="blue-bar">
      <h5>Circumstance Details</h5>
    </div>
    <v-container class="pa-8">
      <v-row no-gutters>
        <v-col cols="12">
          <v-text-field
            outlined
            dense
            label="reference number"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-select
            dense
            outlined
            class="mr-2"
            label="Reason for this Application"
            v-model="reasonSelect"
            :items="reasonItems"
          ></v-select>
        </v-col>
        <v-col cols="6">
          <v-text-field
              outlined
              dense
              class="ml-2"
              label="Days of this impact"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea
              name="input-7-1"
              label="Adverse Circumstance Details"
              outlined
              :value="description"
              hint="You Circumstance Details"
          ></v-textarea>
        </v-col>
      </v-row>
      <p>Document type placeholder, multiple allowed???</p>
      <v-row no-gutters>
        <v-col cols="12">
          <v-file-input
              counter
              multiple
              show-size
              small-chips
              truncate-length="15"
              label="Document Upload"
              class="mb-3"
          ></v-file-input>
        </v-col>
        <v-col cols="4">
          <v-select
              dense
              outlined
              class="mr-2"
              label="Course"
              return-object
              item-text="name"
              item-value="courseOfferingID"
              v-model="courseSelect"
              :items="courseItems"
              @click="getAssessment('course')"
          ></v-select>
        </v-col>
        <v-col cols="4">
          <v-select
              dense
              outlined
              label="Assessment"
              return-object
              item-text="name"
              item-value="assessmentID"
              v-model="assessmentSelect"
              :items="assessmentItems"
              @click="getAssessment('assessment')"
          ></v-select>
        </v-col>
        <v-col cols="4">
          <v-select
              dense
              outlined
              class="ml-2"
              label="Coordinator"
              return-object
              item-text="name"
              item-value="userNumber"
              v-model="staffSelect"
              :items="staffItems"
              @click="getAssessment('staff')"
          ></v-select>
        </v-col>
        <v-col cols="12">
          <v-select
              dense
              outlined
              label="Outcome"
              v-model="typeSelect"
              :items="typeItems"
          ></v-select>
        </v-col>
        <p>outcome options placeholder</p>
        <v-col cols="12">
          <v-textarea
              name="input-7-1"
              label="Wished Outcome"
              outlined
              :value="description"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3">
          <v-btn
              outlined
              color="primary"
              class="mt-8 mb-2 ml-n1"
              @click="$router.push('/student_page/details')"
          >
            Back
          </v-btn>
        </v-col>
        <v-col cols="3">
          <v-btn
              outlined
              color="primary"
              class="mt-8 mb-2 ml-n1"
              @click="$router.push('/student_page/confirm')"
          >
            Next
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import {store} from "@/global";

export default {
  name: "SubmitPage",
  data: () => ({
    reasonSelect: '',
    reasonItems: [
      'Health Grounds',
      'Compassionate Grounds',
      'Hardship or Trauma',
      'Unavoidable Commitment'
    ],
    courseSelect: '',
    courseItems: [],
    assessmentSelect: '',
    assessmentItems: [],
    staffSelect: '',
    staffItems: [],
    typeSelect: '',
    typeItems: [
      'test1',
      'test2'
    ],
    description: ''
  }),
  methods: {
    getAssessment(type) {
      /* type:
      course: userNumber
      assessment: userNumber
      staff: courseId, permission=2
      */
      let parameter
      if (type === 'course') {
        parameter = `/course/get?userNumber=${store.userNumber}&permission=1`
      } else if (type === 'assessment') {
        parameter = `/assessment/get?userNumber=${store.userNumber}&permission=1`
      } else if (type === 'staff') {
        parameter = `/manage/GetUsersByCourse?courseOfferingID=${this.courseSelect.courseOfferingID}&permission=2`
      } else {
        return
      }

      this.$axios({
        method: "GET",
        url: store.host + parameter,
      }).then(res => {
        if (res.data.status !== "success") {
          alert("message: " + res.data.message);
          return;
        }
        this.fillItems(res.data.obj, type)
      }).catch(function (err) {
        alert("err " + err);
      })
    },
    fillItems(obj, type) {
      if (type === 'course') {
        this.courseItems = []
        for (const course of obj) {
          let c = {
            name: `${course.courseName} ${course.semester} ${course.year}`,
            courseOfferingID: course.courseOfferingID
          }
          this.courseItems.push(c)
        }
      } else if (type === 'assessment') {
        this.assessmentItems = []
        for (const assessment of obj) {
          if (assessment.courseOfferingID
              !== this.courseSelect.courseOfferingID) {
            continue
          }

          let a = {
            name: assessment.name,
            assessmentID: assessment.assessmentID
          }
          this.assessmentItems.push(a)
        }
      } else if (type === 'staff') {
        this.staffItems = []
        for (const staff of obj) {
          let s = {
            name: staff.userName,
            userNumber: staff.userNumber,
          }
          this.staffItems.push(s)
        }
      }
    }
  }
}
</script>

<style scoped>
.blue-bar {
  width: inherit;
  height: 50px;
  background-color: cornflowerblue;
  color: white;
}
.blue-bar h5 {
  position: relative;
  top: 15px;
  left: 15px;
}
input {
  border: 1px solid black;
}
</style>