<template>
  <v-card
      class="mx-auto pl-16 pr-16"
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
            v-model="email"
        ></v-text-field>
        <v-text-field
          label="Password"
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

export default {
  name: "LoginCard",
  methods: {
    login() {
      this.axios({
        method: "post",
        url: "http://localhost:5094/auth/password",
        headers: {"Content-Type": "application/json"},
        data: {
          Email: this.email,
          PasswordHash: md5(this.password)
        }
      }).then(function (res) {
        alert("status: " + res.data.status);
        if (res.data.status !== "success") {
          alert("message: " + res.data.message);
        }
      }).catch(function (err) {
        alert("err " + err);
      })
    }
  },
  data: () => ({
    password: '',
    email: '',
    rules: [
      value => !!value || 'Required.',
      value => (value && value.length >= 3) || 'Min 3 characters',
    ],
  }),
}
</script>

<style scoped>

</style>
