<template>
  <v-container class="input-container ma-3">
    <v-row v-for="item in inputItems"
           :key="item.text">
      <v-col
        class="text mt-n3"
        cols="4"
      >
        <p>{{ item.text }}</p>
      </v-col>
      <v-col
          class="input mt-n3"
          cols="8">
        <input
          type="text"
          :value="item.value"
        >
      </v-col>
    </v-row>
    <v-btn
      outlined
      color="primary"
      class="mt-6 mb-2 ml-n1"
      @click="nextStep"
    >
      Next Step
    </v-btn>
  </v-container>
</template>

<script>
import {store} from "@/global";

export default {
  name: "PersonalDetail",
  data: () => ({
    inputItems: [

    ]
  }),
  created() {
    this.getPersonalDetail()
  },
  methods: {
    getPersonalDetail() {
      this.$axios({
        method: "GET",
        url: `${store.host}/manage/GetUsers?userNumber=${store.userNumber}`,
      }).then(res => {
        if (res.data.status === "success") {
          console.log(JSON.stringify(res.data.obj))
          this.handleUserInfo(res.data.obj[0])
        }
      }).catch(function (err) {
        alert("err " + err);
      })
    },
    handleUserInfo(sysUser) {
      console.log(sysUser)
      this.inputItems.push(      {
        text: 'Student ID:',
        value: sysUser.userNumber
      })
      this.inputItems.push({
        text: 'Student Name:',
        value: sysUser.userName
      })
      this.inputItems.push({
        text: 'Email:',
        value: sysUser.email
      })
      this.inputItems.push({
        text: 'Phone:',
        value: sysUser.phone
      })
      this.inputItems.push({
        text: 'Address Line 1:',
        value: sysUser.addresses[0]
      })
      this.inputItems.push({
        text: 'Address Line 2:',
        value: sysUser.addresses[1]
      })
      this.inputItems.push({
        text: 'Address Line 3:',
        value: sysUser.addresses[2]
      })
    },
    nextStep() {
      this.$axios({
        method: "GET",
        url: `${store.host}/application/new`,
      }).then(res => {
        if (res.data.status === "success") {
          this.$router.push(`/student_page/apply/info/${res.data.obj}`)
        }
      }).catch(function (err) {
        alert("err " + err);
      })
    }
  }
}
</script>

<style scoped>
.input-container {
  width: 400px;
}

input {
  border: 1px solid black;
}
</style>