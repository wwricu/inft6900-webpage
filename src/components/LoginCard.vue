<template>
  <v-card
      class="mx-auto pl-12 pr-12"
      max-width="400"
  >
    <v-card-text>
      <p class="text-h4 text--primary text-center pt-2 pb-2">
        Sign in to a really long name
      </p>
      <div>
        <v-text-field
            label="Email"
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
          class="mx-auto"
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
import { store } from '@/main';

export default {
  name: "LoginCard",
  methods: {
    login() {
      this.axios({
        method: "post",
        url: "http://localhost:5094/auth/password",
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
        console.log(res.data.obj)
        store.loginStatus = true;
        store.role = store.roles[res.data.obj[0].permission];
        store.name = res.data.obj[0].userName[0] + res.data.obj[0].userName[2];
        store.AVN = res.data.obj[0].userName[0].substring(0,1)
                  + res.data.obj[0].userName[2].substring(0,1)
        this.$router.push('/');
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
