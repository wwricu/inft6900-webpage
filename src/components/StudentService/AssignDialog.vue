<!-- 
  2022 Trimester 3 INFT6900 Final Project
  Team   : Four Square
  Author : Weiran Wang
  Date   : 04/10/2022
-->

<template>
  <v-dialog
      width="600"
      v-model="assignDialog"
  >
    <v-card class="px-4">
      <v-card-title class="text-h5">
        Assign Application
      </v-card-title>
      <v-divider/>
      <v-select
          return-object
          label="Assignee"
          item-text="userName"
          item-value="sysUserID"
          :items="staffList"
          v-model="staffSelect"
          class="mx-2 mt-4"
      ></v-select>
      <v-card-actions>
        <v-spacer/>
        <v-btn
          color="primary"
          class="mb-2"
          @click="assign()"
        >
          Assign
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {store} from "@/global";

export default {
  name: "AssignDialog",
  props: {
    application: {
      required: true
    }
  },
  data: ()=> ({
    assignDialog: false,
    staffSelect: [],
    staffList: []
  }),
  methods: {
    showDialog() {
      this.getStaffList()
      this.assignDialog = true
    },
    assign() {
      let data = this.application
      data.staffID = this.staffSelect.sysUserID
      if (data.staffID == null) {
        this.assignDialog = false
        return
      }
      this.$axios({
        method: "POST",
        url: `${store.host}/application/Assign`,
        data: data
      }).then(res => {
        if (res.data.status !== "success") {
          alert("message: " + res.data.message);
        } else {
          alert(res.data.status)
          this.$router.push('/application')
        }
        this.assignDialog = false
      }).catch(function (err) {
        alert("err " + err);
      })
    },
    getStaffList() {
      this.$axios({
        method: "GET",
        url: `${store.host}/course/get?&courseOfferingID=${this.application.assessmentInstance.courseOfferingID}`,
      }).then(res => {
        if (res.data.status !== "success") {
          alert("message: " + res.data.message);
          return
        }
        if (res.data.obj != null && res.data.obj.length === 1) {
          this.staffList = res.data.obj[0].staffList
          console.log(JSON.stringify(this.staffList))
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