<template>
  <div>
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
                :label="userRoles[userInfo.permission] + ' Number'"
            ></v-text-field>
          </v-col>
          <v-col
              md="6"
          >
            <v-text-field
                disabled
                v-model="inputInfo.email"
                :rules="emailRules"
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
  </div>
</template>

<script>
export default {
  name: "UserInfoField",
  props: {
    userInfo: {
      required: true,
    },
  },
  created() {
    this.inputInfo = this.userInfo;
    this.resetInfo = this.inputInfo;
    console.log(this.inputInfo);
  },
  data: () => ({
    resetInfo: {},
    inputInfo: {
      userNumber: '',
      firstName: '',
      middleName: '',
      lastName: '',
      userName: ['','',''],
      email: '',
      phone: '',
      academic: '',
      addresses: ['','',''],
    },
    userRoles: [
      'Invalid',
      'Student',
      'Staff',
      'Admin'
    ],
    nameRules: [
      v => !!v || 'Name is required',
      v => v.length <= 10 || 'Name must be less than 10 characters',
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
  }),
}
</script>

<style scoped>

</style>
