<template>
  <div class="pa-8">
  <v-card class="pt-4 pl-8 pr-8 pb-4">
    <v-card-title>
      {{ $route.params.action }}
      {{ $route.params.role }}</v-card-title>
    <v-form>
      <v-container>
        <v-row class="d-flex justify-end">
          <v-col
              :md="$route.params.action==='Add'?4:6"
          >
            <v-text-field
                :disabled="$route.params.action!=='Add'"
                v-model="inputInfo.userNumber"
                :label="$route.params.role + ' Number'"
            ></v-text-field>
          </v-col>
          <v-col
              :md="$route.params.action==='Add'?4:6"
          >
            <v-text-field
                :disabled="$route.params.action!=='Add'"
                v-model="inputInfo.email"
                label="E-mail"
            >
            </v-text-field>
          </v-col>
          <v-col
              md="4"
              v-if="$route.params.action==='Add'"
          >
            <v-select
                return-object
                label="Select User Type"
                item-text="userType"
                item-value="permission"
                v-model="userTypeSelect"
                :items="userTypeItems"
            >
            </v-select>
          </v-col>

          <v-col
              md="6"
          >
            <v-text-field
                v-model="inputInfo.phone"
                label="Phone Number"
                required
            >
            </v-text-field>
          </v-col>
          <v-col md="6">
            <v-text-field
                label="birthdate"
                type="date"
                v-model="inputInfo.birthdate"
            ></v-text-field>
          </v-col>

          <v-col
              md="12"
          >
            <v-text-field
                v-model="inputInfo.academic"
                label="Faculty"
                required
            ></v-text-field>
          </v-col>

          <v-col
              md="4"
          >
            <v-text-field
                v-model="inputInfo.userNameArray[0]"
                label="First name"
                required
            ></v-text-field>
          </v-col>
          <v-col
              md="4"
          >
            <v-text-field
                v-model="inputInfo.userNameArray[1]"
                label="Middle name"
                required
            ></v-text-field>
          </v-col>
          <v-col
              md="4"
          >
            <v-text-field
                v-model="inputInfo.userNameArray[2]"
                label="Last name"
                required
            ></v-text-field>
          </v-col>

          <v-col
              md="4"
          >
            <v-text-field
                v-model="inputInfo.addresses[0]"
                label="Address Line 1"
                required
            ></v-text-field>
          </v-col>
          <v-col
              md="4"
          >
            <v-text-field
                v-model="inputInfo.addresses[1]"
                label="Address Line 2"
                required
            ></v-text-field>
          </v-col>
          <v-col
              md="4"
          >
            <v-text-field
                v-model="inputInfo.addresses[2]"
                label="Address Line 3"
                required
            ></v-text-field>
          </v-col>

        </v-row>
      </v-container>
    </v-form>
    <div class="d-flex">
      <v-btn
        class="ma-2"
        color="primary"
        @click="switchTable"
        v-if="$route.params.action==='Edit'"
      >
          Manage User's Course
      </v-btn>
      <v-btn
          class="ma-2"
          color="primary"
          @click="switchAssessmentTable"
          v-if="$route.params.action==='Edit'&&$route.params.role==='Student'"
      >
        Manage Student Assessment
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        class="ma-2"
        color="success"
        @click="addUser"
        v-if="$route.params.action==='Add'"
      >
        Add User
      </v-btn>
      <v-btn
        class="ma-2"
        color="success"
        @click="updateUser()"
        v-if="$route.params.action==='Edit'"
      >
        Update User
      </v-btn>
      <v-btn
        class="ma-2"
        color="error"
        @click="deleteUser"
        v-if="$route.params.action==='Edit'"
      >
        Delete User
      </v-btn>
    </div>
  </v-card>
  <CourseTable
    class="mt-8"
    v-if="showTable"
    :input-course-data="courseData"
    :user-permission="inputInfo.permission"
    :user-number="inputInfo.userNumber"
  ></CourseTable>
  <AssessmentTable
    class="mt-8"
    v-if="showAssessment"
  ></AssessmentTable>
  </div>
</template>

<script>
import md5 from 'md5-js';
import CourseTable from "@/components/CourseTable";
import { store } from "@/global.js";
import AssessmentTable from "@/components/AssessmentTable";

export default {
  name: "UserInfoPage",
  components: {AssessmentTable, CourseTable},
  data: () => ({
    inputInfo: {
      userNumber: '',
      userName: '',
      userNameArray: ['','',''],
      email: '',
      phone: '',
      academic: '',
      addresses: ['','',''],
      passwordHash: '',
      permission: 0,
      birthdate: '',
    },
    userTypeSelect: {userType: 'Student', permission: 1},
    userTypeItems: [
      {userType: 'Student', permission: 1},
      {userType: 'Staff', permission: 2},
    ],
    userRoles: [
      'User',
      'Student',
      'Staff',
      'Admin'
    ],
    courseData: [], // send to table
    showTable: false,
    showAssessment: false,
  }),
  created() {
    if (this.$route.params.action === 'Edit') {
      this.initUser(this.$route.params.userNumber);
    }
  },
  methods: {
    initUser(userNumber) {
      this.$axios({
        method: "GET",
        url: 'http://localhost:5094/manage/getusers?userNumber='
                .concat(userNumber).concat('&permission=')
            .concat(store.rolesMap[this.$route.params.role]),
      }).then(res => {
        if (res.data.status === "success") {
          this.inputInfo = res.data.obj[0];
          this.inputInfo
              .userNameArray = this.inputInfo
                                   .userName
                                   .split(' ');
          this.inputInfo.birthdate = this.formatDate(
                                     this.inputInfo.birthdate, 'toShow');
        }
      }).catch(function (err) {
        console.log("err " + err);
      })
    },
    updateUser() {
      this.inputInfo.userName = this.inputInfo.userNameArray[0]
          .concat(' ')
          .concat(this.inputInfo.userNameArray[1])
          .concat(' ')
          .concat(this.inputInfo.userNameArray[2]);
      this.$axios({
        method: "POST",
        url: 'http://localhost:5094/manage/updateuser',
        data: this.inputInfo,
      }).then(res => {
        if (res.data.status === "success") {
          alert("updated");
          this.$router.push('/user_manage')
        }
      }).catch(function (err) {
        alert("err " + err);
      })
    },
    addUser() {
      this.inputInfo.userName = this.inputInfo.userNameArray[0]
                                    .concat(' ')
                                    .concat(this.inputInfo.userNameArray[1])
                                    .concat(' ')
                                    .concat(this.inputInfo.userNameArray[2]);
      let password = (Math.random() * 1000000).toString().substring(0, 6);
      this.inputInfo.permission = this.userTypeSelect.permission;
      this.inputInfo.passwordHash = md5(password);
      this.inputInfo.birthdate = this.formatDate(this.inputInfo.birthdate,'toData');
      this.$axios({
        method: "POST",
        url: 'http://localhost:5094/manage/adduser',
        data: this.inputInfo,
      }).then(res => {
        if (res.data.status === "success") {
          let output = "Your account info:\n\n"
                      .concat("User Number: ")
                      .concat(this.inputInfo.userNumber)
                      .concat("\nPassword: ")
                      .concat(password)
                      .concat("\n\nPlease modify the password ASAP");
          alert(output);

          this.$router.push('/user_manage')
        } else {
          alert(res.data.message);
        }
      }).catch(function (err) {
        alert("err " + err);
      })
    },
    deleteUser() {
      this.$axios({
        method: "DELETE",
        url: 'http://localhost:5094/manage/Delete?userNumber='
              .concat(this.inputInfo.userNumber),
      }).then(res => {
        if (res.data.status === "success") {
          alert("deleted!");
          this.$router.push('user_manage')
        } else {
          alert(res.data.message);
        }
      }).catch(function (err) {
        alert("err " + err);
      })
    },
    switchTable() {
      if (this.showTable === true) {
        this.showTable = false;
        return;
      }
      this.showTable = true;
      this.showAssessment = false;
      this.searchCourse();
    },
    switchAssessmentTable() {
      if (this.showAssessment === true) {
        this.showAssessment = false;
        return;
      }
      this.showAssessment = true;
      this.showTable = false;
    },
    searchCourse() {
      this.$axios({
        method: "GET",
        url: 'http://localhost:5094/course/get?userNumber='
                .concat(this.inputInfo.userNumber)
                .concat('&permission=')
                .concat(this.inputInfo.permission.toString()),
      }).then(res => {
        if (res.data.status !== "success") {
          alert("message: " + res.data.message);
          return;
        }
        console.log(this.courseData)
        this.courseData = res.data.obj;

        window.scrollTo({
          top: 1000, // to be fixed
          left: 0,
          behavior: 'smooth'
        })
        console.log("success query");
      }).catch(function (err) {
        alert("err " + err);
      })
    },
    formatDate(date, swt) {
      if (!date) return null

      if (swt === 'toShow') {
        const [day, month, year] = date.split('-')
        return `${year}-${month}-${day}`
      } else {
        const [year, month, day] = date.split('-')
        return `${day}-${month}-${year}`
      }
    },
  }
}
</script>

<style scoped>

</style>
