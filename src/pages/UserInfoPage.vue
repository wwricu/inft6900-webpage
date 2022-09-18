<template>
  <v-card class="pa-8 ma-8">
    <UserInfoField
      ref="infoForm"
      :user-info="this.$route.params"
    ></UserInfoField>
    <v-container class="d-flex justify-end">
      <v-btn
        color="success"
        class="ml-1 mr-1"
        v-if="func==='add'"
      >
        Add User
      </v-btn>
      <v-btn
        color="info"
        class="ml-1 mr-1"
        v-if="userType==='staff'"
      >
        Config Roles
      </v-btn>
      <v-btn
        class="ml-1 mr-1"
        color="success"
        @click="updateUser()"
        v-if="func==='edit'"
      >
        Update User
      </v-btn>
      <v-btn
        class="ml-1 mr-1"
        color="error"
        v-if="func==='edit'"
      >
        Delete User
      </v-btn>
    </v-container>

  </v-card>
</template>

<script>
import UserInfoField from "@/components/UserInfoField";
export default {
  name: "UserInfoPage",
  components: {UserInfoField},
  data: () => ({
    userType: 'Student',
    func:'edit',
  }),
  created() {
    if (this.$route.path === 'add_user') {
      this.func = 'add';
    }
  },
  methods: {
    updateUser() {
      this.axios({
        method: "POST",
        url: 'http://localhost:5094/manage/updateuser',
        data: this.$refs.infoForm.inputInfo,
      }).then(res => {
        if (res.data.status !== "success") {
          alert("message: " + res.data.message);
        }
      }).catch(function (err) {
        alert("err " + err);
      })
    }
  },
  mounted() {
    console.log('show', this.$route.params)
    if (this.$route.params.userNumber === 'null') {
      this.func = 'add';
    }
    switch (this.$route.params.permission) {
      case 1: this.userType = 'Staff'; break;
      case 2: this.userType = 'Admin'; break;
    }
  },
}
</script>

<style scoped>

</style>
