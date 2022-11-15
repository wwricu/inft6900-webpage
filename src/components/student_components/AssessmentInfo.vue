<!-- 
  2022 Trimester 3 INFT6900 Final Project
  Team   : Four Square
  Author : Weiran Wang
  Date   : 09/10/2022
-->

<template>
  <v-row justify="center">
    <v-expansion-panels
        accordion
        multiple
        v-model="panel"
    >
      <v-expansion-panel
          v-for="course in courses"
          :key="course.courseOfferingName"
      >
        <v-expansion-panel-header>{{course.courseOfferingName}}</v-expansion-panel-header>
        <v-expansion-panel-content
            v-for="assessment in course.assessments"
            :key="assessment.assessmentID"
        >
          <v-divider></v-divider>
          <v-card-text>
            <div class="text--secondary">
              {{assessment.type}} &ensp;·&ensp;
              {{assessment.status}}
            </div>
            <p class="text-h5 text--primary">
              {{assessment.name}}
            </p>
            <div class="text--primary">
              {{assessment.beginDate}} &ensp;~&ensp;
              {{assessment.endDate}}<br>
              {{assessment.location.building}}
              {{assessment.location.room}},
              {{assessment.location.campus}}
            </div>
          </v-card-text>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>

<script>
import {store} from "@/global";
export default {
  name: "AssessmentInfo",
  data: () => ({
    panel: [],
    courseOfferingMap: new Map(),
    courses: [
      /*{
        courseOfferingName: '',
        assessments: [
            {
              assessmentID: 1,
              courseOfferingName: 'INFT6090',
              assessmentName: 'Assignment 1',
              type: 'Formal Exam',
              startDate: '03/10/2022',
              endDate: '03/10/2022',
              location: 'Callaghan',
              status: 'on going'
            }
        ]
      }*/
    ]
  }),
  created() {
    this.getAssessments()
    console.log("get assessment")
  },
  methods: {
    setAssessmentData(assessmentArray) {
      for (let assessment of assessmentArray) {
        if (this.courseOfferingMap.has(assessment.courseOfferingName)) {
          this.courseOfferingMap.get(assessment.courseOfferingName).push(assessment)
        } else {
          this.courseOfferingMap.set(assessment.courseOfferingName, [assessment])
        }
      }
      let panelIndex = 0
      this.courseOfferingMap.forEach((assessments,
                                      courseOfferingName) => {
        this.panel.push(panelIndex++)
        this.courses.push({
          courseOfferingName: courseOfferingName,
          assessments: assessments
        })
      })
    },
    getAssessments() {
      console.log("get assessment")
      this.$axios({
        method: "GET",
        url: `${store.host}/assessment/get?userNumber=${store.userNumber}&permission=1`,
      }).then(res => {
        if (res.data.status !== "success") {
          alert("message: " + res.data.message);
          return;
        }
        // console.log(JSON.stringify(res.data.obj))
        this.setAssessmentData(res.data.obj)
      }).catch(function (err) {
        alert("err " + err);
      })
    }
  }
}
</script>

<style scoped>

</style>