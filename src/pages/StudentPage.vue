<template>
  <div id="container" class="mx-auto">
    <v-container>
      <v-row>
        <v-col
          cols="3"
        >
          <v-card>
          <v-card-title>Application</v-card-title>
          <v-list-item
            v-for="menu in menus"
            :key="menu.text">
            <v-list-item-content>
              <v-list-item-title>{{ menu.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          </v-card>
        </v-col>
        <v-col
            cols="9"
        >
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
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "StudentPage",
  data: () => ({
    menus: [
      {
        text: 'Policy and Guideline',
        link: '/'
      },
      {
        text: 'Request Details',
        link: '/'
      },
      {
        text: 'My Application',
        link: '/'
      },
      {
        text: 'Help Document',
        link: '/'
      },
    ]
  })
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