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
            @click="deleteUser"
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
    if (userInfo.birthdate !== undefined) {
      this.inputInfo.birthdate = this
                                .formatDate(userInfo.birthdate,
                                    'toShow');
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
        if (res.data.status === "success") {
          alert("updated");
          this.$router.push('user_manage')
        }
      }).catch(function (err) {
        alert("err " + err);
      })
    },
    addUser() {
      let password = (Math.random() * 1000000).toString().substring(0, 6);
      this.inputInfo.permission = this.userTypeSelect.permission;
      this.inputInfo.passwordHash = md5(password);
      this.inputInfo.birthdate = this.formatDate(this.inputInfo.birthdate,'toData');
      this.axios({
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

          this.$router.push('user_manage')
        } else {
          alert(res.data.message);
        }
      }).catch(function (err) {
        alert("err " + err);
      })
    },
    deleteUser() {
      this.axios({
        method: "POST",
        url: 'http://localhost:5094/manage/updateuser',
        data: {
          userNumber: this.inputInfo.userNumber,
          permission: 0
        },
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
