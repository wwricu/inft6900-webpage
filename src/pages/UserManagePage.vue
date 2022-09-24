<template>
  <div class="pa-8">
  <v-card class="pt-4 pb-4 pl-8 pr-8 mb-8">
    <v-card-title>Search Users</v-card-title>
    <v-container>
      <v-row>
        <v-col
            md="6"
        >
          <v-select
              return-object
              label="Select User Type"
              item-text="userType"
              item-value="permission"
              :items="userTypeItems"
              v-model="userTypeSelect"
          ></v-select>
        </v-col>
        <v-col
            md="6"
        >
          <v-select
              return-object
              label="Search By"
              item-text="stringType"
              item-value="parameter"
              :items="stringTypeItems"
              v-model="stringTypeSelect"
          ></v-select>
        </v-col>
        <v-col
            md="8"
        >
          <v-text-field
              label="Search Users"
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
            @click="searchUsers"
          >
            Search
          </v-btn>
        </v-col>
        <v-col
            align-self="center"
            class="text-center"
            md="2"
        >
          <v-btn
              color="primary"
              @click="addUser"
          >
            Add User
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
  <ManageUserCard
      :userData="users"
      :userType="userTypeSelect.userType"
      v-show="users.length > 0"
  ></ManageUserCard>
  </div>
</template>

<script>
import ManageUserCard from "@/components/UserTable";
export default {
  name: "UserManagePage",
  components: {ManageUserCard},
  data: () => ({
    userTypeSelect: {userType: 'Staff', permission: 2},
    userTypeItems: [
      {userType: 'Student', permission: 1},
      {userType: 'Staff', permission: 2},
      // {userType: 'Admin', permission: 3},
    ],
    stringTypeSelect: {stringType: 'Number', parameter: 'userNumber'},
    stringTypeItems: [
      {stringType: 'Number', parameter: 'userNumber'},
      {stringType: 'Name', parameter: 'userName'},
      {stringType: 'Email', parameter: 'email'},
    ],
    searchString: '',
    users: [],
  }),
  methods: {
    searchUsers() {
      let url = 'http://localhost:5094/manage/getusers'
          .concat(`?permission=${this.userTypeSelect.permission.toString()}`)
      if (this.searchString.length > 0) {
        url = url.concat(`&${this.stringTypeSelect.parameter}`)
                 .concat(`=${this.searchString}`)
      }
      this.$axios({
        method: "GET",
        url: url,
      }).then(res => {
        if (res.data.status !== "success") {
          alert("message: " + res.data.message);
          return;
        }
        this.users = res.data.obj;
        console.log("success query");
      }).catch(function (err) {
        alert("err " + err);
      })
    },
    addUser() {
      this.$router.push({
        path:'/user/Add/User/0',
      })
    }
  }
}
</script>

<style scoped>

</style>
