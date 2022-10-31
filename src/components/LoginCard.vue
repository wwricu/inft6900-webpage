<template>
  <v-card
      class="mx-auto mt-8 pl-12 pr-12"
      max-width="400"
  >
    <v-card-text>
      <v-card-title
        class="text-h4 text--primary text-center pt-4 pb-10">
        Sign in to ACAS
      </v-card-title>
      <div>
        <v-text-field
            label="User Number"
            hide-details="auto"
            :rules="rules"
            v-model="userNumber"
        ></v-text-field>
        <v-text-field
          label="Password"
          class="mt-8 mb-4"
          :type='"password"'
          v-model="password"
        ></v-text-field>
      </div>
    </v-card-text>
    <v-card-actions class="pt-0">
      <v-checkbox
          tile
          :label="`Remember me`"
      ></v-checkbox>
    </v-card-actions>
    <v-card-actions class="mb-2">
      <v-btn
          class="mx-auto"
          color="success"
          @click="login"
          block
      >
        Login
      </v-btn>
    </v-card-actions>
    <v-card-text class="text-center">
      <div>
        <a>Forget Password?</a>
      </div>
      <span>Do not have an account?</span>
      <a>&ensp;Sign up</a>
    </v-card-text>
  </v-card>
</template>

<script>
import md5 from 'md5-js'
import {store} from "@/global";

export default {
  name: "LoginCard",
  methods: {
    login() {
      this.$axios({
        method: "post",
        url: `${store.host}/auth/password`,
        headers: {"Content-Type": "application/json"},
        data: {
          UserNumber: this.userNumber,
          PasswordHash: md5(this.password)
        }
      }).then(res => {
        if (res.data.status !== "success") {
          alert("message: " + res.data.message);
          return;
        }
        this.$changeLoginStatus(res.data);
        let url;
        switch (store.permission) {
          case 1: url = '/student_page/assessments'; break
          case 2: url = '/application'; break
          case 3: url = '/user_manage'; break
        }
        this.$router.push(url).then(r => console.log(r));
      }).catch(function (err) {
        alert("err " + err);
      })
    },

  },
  data: () => ({
    userNumber: '',
    password: '',
    rules: [
      value => !!value || 'Required.',
      value => (value && value.length >= 3) || 'Min 3 characters',
    ],
  }),
}
</script>

<style scoped>

</style>
