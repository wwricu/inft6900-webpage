<template>
  <v-card class="pa-8 ma-8">
    <v-form>
      <v-container>
        <v-row>
          <v-col
              :md="func!=='add'?6:4"
          >
            <v-text-field
                :disabled="func!=='add'"
                v-model="inputInfo.userNumber"
                :label="userRoles[inputInfo.permission] + ' Number'"
            ></v-text-field>
          </v-col>
          <v-col
              :md="func!=='add'?6:4"
          >
            <v-text-field
                :disabled="func!=='add'"
                v-model="inputInfo.email"
                label="E-mail"
            >
            </v-text-field>
          </v-col>
          <v-col
              md="4"
              v-if="func==='add'"
          >
            <v-select
                return-object
                label="Select User Type"
                item-text="userType"
                item-value="permission"
                :v-model="userTypeSelect"
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
    <v-container>
      <v-row>
        <v-col
            md="3"
            v-if="func==='add'"
        >
          <v-btn
              color="success"
              class="ml-1 mr-1"
              @click="addUser"
          >
            Add User
          </v-btn>
        </v-col>

        <v-col
            md="4"
            class="text-center"
            align-self="center"
            v-if="false"
        >
          <v-btn
              color="info"
              class="mr-n4"
          >
            Config Roles
          </v-btn>
        </v-col>
        <v-col
            md="3"
            v-if="func==='edit'"
        >
          <v-btn
              color="success"
              @click="updateUser()"
          >
            Update User
          </v-btn>
        </v-col>
        <v-col
            md="3"
            v-if="func==='edit'"
        >
          <v-btn
              color="error"
          >
            Delete User
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

  </v-card>
</template>

<script>
import md5 from 'md5-js';
export default {
  name: "UserInfoPage",
  data: () => ({
    func: 'edit',
    resetInfo: {},
    inputInfo: {
      userNumber: '',
      userName: ['','',''],
      email: '',
      phone: '',
      academic: '',
      addresses: ['','',''],
      passwordHash: '',
      permission: 0,
    },
    userTypeSelect: {userType: 'Staff', permission: 2},
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
    userInfo: {}
  }),
  created() {
    let userInfo = this.$route.params;
    this.userInfo = userInfo;
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
    if (this.$route.path === '/add_user') {
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
    },
    addUser() {
      let password = (Math.random() * 1000000).toString().substring(0, 6);
      this.inputInfo.permission = this.userTypeSelect.permission;
      this.inputInfo.passwordHash = md5(password);
      this.axios({
        method: "POST",
        url: 'http://localhost:5094/manage/adduser',
        data: this.inputInfo,
      }).then(res => {
        if (res.data.status === "success") {
          alert("Your account info:\n\n" +
              + "User Number: "
              + this.inputInfo.userNumber
              + "\nPassword: " + password
              + "\n\nPlease modify the password ASAP");
        } else {
          alert(res.data.message);
        }
      }).catch(function (err) {
        alert("err " + err);
      })
    },
  }
}
</script>

<style scoped>

</style>
