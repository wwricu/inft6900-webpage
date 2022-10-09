<template>
  <div>
    <div class="blue-bar">
      <h5>Personal Details</h5>
    </div>
    <v-container class="input-container">
      <v-row>
        <v-col
            class="text"
            cols="4">
          <p>Student ID:</p>
        </v-col>
        <v-col
            class="input"
            cols="8">
          <input type="text">
        </v-col>
      </v-row>
    </v-container>

    <div class="blue-bar">
      <h5>Request Details</h5>
    </div>
    <v-container class="input-container">
      <v-row>
        <v-col
            class="text"
            cols="4">
          <p>Student ID:</p>
        </v-col>
        <v-col
            class="input"
            cols="8">
          <input type="text">
        </v-col>
        <v-col
            class="text"
            cols="4">
          <p>Student ID:</p>
        </v-col>
        <v-col
            class="input"
            cols="8">
          <input type="text">
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3">
          <v-btn
              outlined
              color="primary"
              class="mt-8 mb-2 ml-n1"
              @click="$router.push('/student_page/details')"
          >
            Back
          </v-btn>
        </v-col>
        <v-col cols="3">
          <v-btn
              outlined
              color="primary"
              class="mt-8 mb-2 ml-n1"
              @click="$router.push('/student_page/confirm')"
          >
            Next
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<script>
export default {
  name: "SubmitPage"
}
</script>

<style scoped>
.blue-bar {
  width: inherit;
  height: 50px;
  background-color: cornflowerblue;
  color: white;
}
.blue-bar h5 {
  position: relative;
  top: 15px;
  left: 15px;
}
.input-container {
  width: 400px;
  margin: 15px 15px 15px 15px;
}
input {
  border: 1px solid black;
}
</style>