<template>
  <v-card class="pa-8 ma-8">
    <v-form>
      <v-container>
        <v-row>
          <v-col
              md="6"
          >
            <v-text-field
                disabled
                v-model="inputInfo.userNumber"
                :counter="100"
                :label="userRoles[inputInfo.permission] + ' Number'"
            ></v-text-field>
          </v-col>
          <v-col
              md="6"
          >
            <v-text-field
                disabled
                v-model="inputInfo.email"
                label="E-mail"
            >
            </v-text-field>
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

          <v-col
              md="6"
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
                v-model="inputInfo.userName[0]"
                label="First name"
                required
            ></v-text-field>
          </v-col>
          <v-col
              md="4"
          >
            <v-text-field
                v-model="inputInfo.userName[1]"
                label="Middle name"
                required
            ></v-text-field>
          </v-col>
          <v-col
              md="4"
          >
            <v-text-field
                v-model="inputInfo.userName[2]"
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
export default {
  name: "UserInfoPage",
  data: () => ({
    userType: 'Student',
    func:'edit',
    resetInfo: {},
    inputInfo: {
      userNumber: '',
      userName: ['','',''],
      email: '',
      phone: '',
      academic: '',
      addresses: ['','',''],
      permission: 1,
    },
    userRoles: [
      'Invalid',
      'Student',
      'Staff',
      'Admin'
    ],
  }),
  created() {
    let userInfo = this.$route.params;
    if (userInfo.userNumber !== undefined) {
      this.inputInfo.userNumber = userInfo.userNumber;
    }
    if (userInfo.userName !== undefined) {
      this.inputInfo.userName = userInfo.userName;
    }
    if (userInfo.email !== undefined) {
      this.inputInfo.email = userInfo.email;
    }
    if (userInfo.phone !== undefined) {
      this.inputInfo.phone = userInfo.phone;
    }
    if (userInfo.academic !== undefined) {
      this.inputInfo.academic = userInfo.academic;
    }
    if (userInfo.addresses !== undefined) {
      this.inputInfo.addresses = userInfo.addresses;
    }
    if (userInfo.permission !== undefined) {
      this.inputInfo.permission = userInfo.permission;
    }
    if (this.$route.path === 'add_user') {
      this.func = 'add';
    }
  },
  methods: {
    updateUser() {
      this.axios({
        method: "POST",
        url: 'http://localhost:5094/manage/updateuser',
        data: this.inputInfo,
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
