<!-- 
  2022 Trimester 3 INFT6900 Final Project
  Team   : Four Square
  Author : Weiran Wang
  Date   : 22/10/2022
-->

<template>
  <div class="pb-2">
    <div class="blue-bar">
      <h3>Circumstance Details</h3>
    </div>
    <v-container class="pa-8">
      <v-row no-gutters>
        <v-col cols="12">
          <v-text-field
              dense
              outlined
              disabled
              class="mr-2"
              label="Reference Number"
              v-model="applicationID"
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
              v-model="daysOfImpact"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea
              name="input-7-1"
              label="Adverse Circumstance Details"
              outlined
              v-model="circumstanceDetail"
              hint="You Circumstance Details"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-container>
      <div class="blue-bar">
        <h3>Documents</h3>
      </div>
      <v-container class="pa-8">
        <v-row>
          <v-col cols="12">
            <DocumentCard
              ref="documentCard"
              v-if="existedDocuments.length > 0"
              :documents="existedDocuments"
            />
          </v-col>
        </v-row>
      <v-row
          v-for="item in documents"
          :key="item.docID"
      >
        <v-col cols="4">
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
              v-model="item.fileInfo"
          ></v-file-input>
        </v-col>
        <v-col cols="2" class="align-self-center">
          <v-btn
            small
            color="success"
            @click="documentsUpload(item)"
          >
            upload
          </v-btn>
        </v-col>
      </v-row>
      </v-container>
      <div class="blue-bar">
        <h3>Assessment and Outcome</h3>
      </div>
      <v-container class="pa-8">
      <v-row no-gutters>
        <v-col cols="6">
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
        <v-col cols="6">
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
<!--        <v-col cols="4">-->
<!--          <v-select-->
<!--              dense-->
<!--              outlined-->
<!--              class="ml-2"-->
<!--              label="Coordinator"-->
<!--              return-object-->
<!--              item-text="name"-->
<!--              item-value="sysUserID"-->
<!--              v-model="staffSelect"-->
<!--              :items="staffItems"-->
<!--              @click="getAssessment('staff')"-->
<!--          ></v-select>-->
<!--        </v-col>-->
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
              v-model="outcomeDetail"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-container>
    <v-card-actions class="mr-6">
      <v-spacer/>
<!--      <v-btn-->
<!--          color="error"-->
<!--          class="mr-6 mb-2"-->
<!--          @click="nextStep"-->
<!--      >-->
<!--        Discard-->
<!--      </v-btn>-->
      <v-btn
          outlined
          color="primary"
          @click="$router.push('/student_page/apply/details')"
      >
        Back
      </v-btn>
      <v-btn
          outlined
          color="primary"
          @click="nextStep"
      >
        Next
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import {store} from "@/global";
import DocumentCard from "@/components/DocumentCard";

export default {
  name: "SubmitPage",
  components: {DocumentCard},
  data: () => ({
    applicationID: '',
    daysOfImpact: '',
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
      // 'Remove This Document'
    ],
    existedDocuments: [],
    documents: [
      {
        docID: 0,
        previousSelect: '',
        documentSelect: '',
        documentItems: [],
        fileInfo: null,
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
      name: 'aaa',
      hint: 'Select wished outcome',
      placeholder: 'Describe wished outcome'
    },
    outcomeItems: [
      {
        name: 'Extension of Time',
        hint: 'Due date of the exam will be delayed',
        placeholder: 'Please describe your current progress and wished extended daysOfImpact'
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
    circumstanceDetail: '',
    outcomeDetail: ''
  }),
  created() {
    this.documents[0].documentItems = this.availableTypes
    this.availableTypesSet = new Set(this.availableTypes)
    this.applicationID = this.$route.params.applicationID
    this.initForm(this.$route.params.applicationID)
  },
  methods: {
    initForm(applicationID) {
      this.$axios({
        method: "GET",
        url: `${store.host}/application/get?applicationID=${applicationID}`,
      }).then(res => {
        if (res.data.status !== "success") {
          // alert("message: " + res.data.message);
          return
        }
        if (res.data.obj !== null && res.data.obj.length > 0) {
          this.readApplication(res.data.obj[0])
        }
      }).catch(function (err) {
        alert("err " + err);
      })
    },
    readApplication(application) {
      this.applicationID = application.applicationID
      this.reasonSelect = application.reason
      this.daysOfImpact = application.daysOfImpact
      this.circumstanceDetail = application.circumstanceDetail
      if (application.documentList != null) {
        this.existedDocuments = application.documentList
      }
      if (application.assessmentInstance !== null) {
        this.getAssessment('course', ()=> {
          this.courseSelect = {
            name: application.assessmentInstance.courseOfferingName,
            courseOfferingID: application.assessmentInstance.courseOfferingID
          }
          this.getAssessment('assessment', ()=> {
            this.assessmentSelect = {
              name: application.assessmentInstance.name,
              assessmentID: application.assessmentInstance.assessmentID
            }
            if (application.staff !== null) {
              this.getAssessment('staff', () => {
                this.staffSelect = {
                  name: application.staff.userName,
                  sysUserID: application.staff.sysUserID
                }
              })
            }
          })
        })
      }
      for (let outcome of this.outcomeItems) {
        if (application.outcome === outcome.name) {
          this.outcomeSelect = outcome
          break
        }
      }
      this.outcomeDetail = application.outcomeDetail
    },
    addDocument() {
      this.documents.push({
        docID: this.documents.length,
        previousSelect: '',
        documentSelect: '',
        documentItems: [...this.availableTypesSet].sort((a, b) => {
          if (a === 'Remove This Document') return true
          if (b === 'Remove This Document') return false
          if (a === 'Other') return true
          if (b === 'Other') return false
          return a > b
        }),
        fileInfo: null,
      })
    },
    changeDocType(item) {
      if (item.documentSelect === 'Remove This Document') {
        // this.documents.splice(this.documents.indexOf(item), 1);
        return
      }
      if (item.previousSelect === item.documentSelect) {
        return
      }
      if (item.previousSelect.length !== 0) {
        this.availableTypesSet.add(item.previousSelect)
      }
      this.availableTypesSet.delete(item.documentSelect)
      item.previousSelect = item.documentSelect
      const newItems = [...this.availableTypesSet]

      for (let doc of this.documents) {
        doc.documentItems = newItems.slice(0) // deep copy
        if (doc.documentSelect.length !== 0) {
          doc.documentItems.push(doc.documentSelect)
        }
        doc.documentItems.sort((a, b) => {
          if (a === 'Remove This Document') return true
          if (b === 'Remove This Document') return false
          if (a === 'Other') return true
          if (b === 'Other') return false
          return a > b
        })
      }
    },
    getAssessment(type, handle) {
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
          // alert("message: " + res.data.message);
          return;
        }
        this.fillItems(res.data.obj, type)
        if (handle != null) {
          handle()
        }
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
            sysUserID: staff.sysUserID,
          }
          this.staffItems.push(s)
        }
      }
    },
    packageBody(handler) {
      this.$axios({
        method: "POST",
        url: `${store.host}/application/update`,
        headers: {'Content-Type': 'application/json'},
        data: {
          applicationID: this.applicationID,
          studentID: store.sysUserID,
          studentNumber: store.userNumber,
          reason: this.reasonSelect,
          daysOfImpact: this.daysOfImpact,
          circumstanceDetail: this.circumstanceDetail,
          instanceID: this.assessmentSelect.assessmentID,
          // staffID: this.staffSelect.sysUserID,
          outcome: this.outcomeSelect.name,
          outcomeDetail: this.outcomeDetail,
        }
      }).then(res => {
        if (res.data.status !== "success") {
          // alert("message: " + res.data.message);
          return
        }
        if (handler != null) {
          handler()
        }
      }).catch(function (err) {
        alert("err " + err);
      })
    },
    documentsUpload(documentItem) {
      console.log(JSON.stringify(documentItem))

      let formData = new FormData()

      formData.append('applicationID', this.applicationID)
      formData.append('type', documentItem.documentSelect)
      for (const file of documentItem.fileInfo) {
        formData.append('file', file)
      }

      this.$axios({
        method: "POST",
        url: `${store.host}/document/upload`,
        headers: {'Content-Type': 'multipart/form-data'},
        transformRequest: [function(data, headers) {
          delete headers.post['Content-Type']
          return data
        }],
        data: formData
      }).then(res => {
        if (res.data.status !== "success") {
          // alert("message: " + res.data.message);
          return;
        }
        this.packageBody(() => {
          this.initForm(this.$route.params.applicationID)
          documentItem.fileInfo = null
        })
      }).catch(function (err) {
        alert("err " + err);
      })
    },
    nextStep() {
      this.packageBody(() => {
        this.$router.push(`/student_page/apply/confirm/${this.$route.params.applicationID}`)
      })
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