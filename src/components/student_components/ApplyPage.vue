<template>
  <v-card>
    <v-card-title>Adverse Circumstance</v-card-title>
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
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "SubmitPage"
}
</script>

<style scoped>
#container {
  width: 800px;
}
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
.text {
  padding: 0;
  margin: 12px -25px 0 0;
}
input {
  padding: 0;
  margin: 0;
  border: 1px solid black;
}
</style>