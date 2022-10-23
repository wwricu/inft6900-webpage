<template>
  <v-row justify="center">
    <v-expansion-panels accordion>
      <v-expansion-panel
          v-for="course in courses"
          :key="course.courseOfferingName"
      >
        <v-expansion-panel-header>{{course.courseOfferingName}}</v-expansion-panel-header>
        <v-expansion-panel-content
          v-for="assessment in course.assessments"
          :key="assessment.assessmentID"
        >
          {{assessment.name}}
          {{assessment.type}}
          {{assessment.status}}
          {{assessment.beginDate}}
          {{assessment.endDate}}
          {{assessment.location.room}}
          {{assessment.location.building}}
          {{assessment.location.campus}}
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>

<script>
import {store} from "@/global";

export default {
  name: "AssessmentCard",
  data: () => ({
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
      this.courseOfferingMap.forEach((assessments,
                                                courseOfferingName) => {
        this.courses.push({
          courseOfferingName: courseOfferingName,
          assessments: assessments
        })
      });

    },
    getAssessments() {
      this.$axios({
        method: "GET",
        url: `${store.host}/assessment/get?userNumber=${store.userNumber}&permission=1`,
      }).then(res => {
        if (res.data.status !== "success") {
          alert("message: " + res.data.message);
          return;
        }
        console.log(JSON.stringify(res.data.obj))
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