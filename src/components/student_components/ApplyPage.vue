<template>
  <div>
    <div class="blue-bar">
      <h3>Circumstance Details</h3>
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
              :value="circumstanceDescription"
              hint="You Circumstance Details"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-container>
      <div class="blue-bar">
        <h3>Documents</h3>
        <v-btn
          color="success"
          style="float: right; bottom: 20px; right: 5px;"
          @click="addDocument"
        >Add a Document</v-btn>
      </div>
      <v-container class="pa-8">
      <v-row
          no-gutters
          v-for="item in documents"
          :key="item.documentSelect"
      >
        <v-col cols="6">
          <v-select
              label="Document Type"
              v-model="item.documentSelect"
              :items="item.documentItems"
              @change="changeDocType(item)"
          >
          </v-select>
        </v-col>
        <v-col cols="6">
          <v-file-input
              counter
              multiple
              show-size
              small-chips
              truncate-length="15"
              :label="item.documentSelect"
              class="mb-3"
              v-model="item.docInfo"
              :rules="[v => !!v || 'Compulsory']"
          ></v-file-input>
        </v-col>
      </v-row>
      </v-container>
      <div class="blue-bar">
        <h3>Assessment and Outcome</h3>
      </div>
      <v-container class="pa-8">
      <v-row no-gutters>
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
              return-object
              item-text="name"
              item-value="hint"
              v-model="outcomeSelect"
              :items="outcomeItems"
              :hint="outcomeSelect.hint"
          ></v-select>
        </v-col>
        <v-col cols="12">
          <v-textarea
              name="input-7-1"
              :label="outcomeSelect.placeholder"
              outlined
              :value="outcomeDescription"
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
    availableTypesSet: Set,
    availableTypes: [
      'Documentary Evidence of Unavoidable Commitment',
      'Letter from AccessAbility Advisor',
      'Letter from Counsellor or Doctor',
      'Letter from Work Supervisor',
      'Medical Certificate',
      'Statement from Appropriate Authority',
      'Statutory Declaration',
      'Written statement from student',
      'Other',
      'Remove This Document'
    ],
    documents: [
      {
        previousSelect: '',
        documentSelect: '',
        documentItems: [],
        docInfo: null,
      }
    ],
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
    outcomeSelect: {
      name: '',
      hint: 'Select wished outcome',
      placeholder: 'Describe wished outcome'
    },
    outcomeItems: [
      {
        name: 'Extension of Time',
        hint: 'Due date of the exam will be delayed',
        placeholder: 'Please describe your current progress and wished extended days'
      },
      {
        name: 'Reschedule Exam',
        hint: 'In class exam will be rescheduled in another class time,\n\
               formal exam will be rescheduled in exam period',
        placeholder: 'Please describe your willing time period'
      },
      {
        name: 'Reschedule placement',
        hint: 'Exam place will be rescheduled to another available place',
        placeholder: 'Please describe your willing place'
      },
      {
        name: 'Compulsory exemption',
        hint: 'Your will be exempted to attending the exam',
        placeholder: ''
      },
    ],
    circumstanceDescription: '',
    outcomeDescription: ''
  }),
  created() {
    this.documents[0].documentItems = this.availableTypes
    this.availableTypesSet = new Set(this.availableTypes)
  },
  methods: {
    addDocument() {
      this.documents.push({
        previousSelect: '',
        documentSelect: '',
        documentItems: [...this.availableTypesSet],
        docInfo: null,
      })
    },
    changeDocType(item) {
      if (item.documentSelect === 'Remove This Document') {
        this.documents.splice(this.documents.indexOf(item), 1);
        return
      }
      if (item.previousSelect === item.documentSelect) {
        return
      }
      if (item.previousSelect.length != 0) {
        this.availableTypesSet.add(item.previousSelect)
      }
      this.availableTypesSet.delete(item.documentSelect)
      item.previousSelect = item.documentSelect
      const newItems = [...this.availableTypesSet]
      newItems.sort((a, b) => {
        if (a === 'Remove This Document') return 1
        if (b === 'Remove This Document') return -1
        return a - b
      })
      // alert(newItems)
      for (let docs of this.documents) {
        docs.documentItems = newItems
        if (docs.documentSelect.length != 0) {
          docs.documentItems.unshift(docs.documentSelect)
        }
      }
    },
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
      } else if (type === 'staff' && this.courseSelect.courseOfferingID != null) {
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
.blue-bar h3 {
  position: relative;
  top: 11px;
  left: 15px;
}
input {
  border: 1px solid black;
}
</style>