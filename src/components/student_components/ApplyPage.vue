<template>
  <div>
    <div class="blue-bar">
      <h5>Circumstance Details</h5>
    </div>
    <v-container class="pa-8">
      <v-row no-gutters>
        <v-col cols="12">
          <v-text-field
            outlined
            dense
            label="reference number"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-select
            dense
            outlined
            class="mr-2"
            label="Circumstance type"
            v-model="typeSelect"
            :items="typeItems"
          ></v-select>
        </v-col>
        <v-col cols="6">
          <v-text-field
              outlined
              dense
              class="ml-2"
              label="Days of this impact"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea
              name="input-7-1"
              label="Adverse Circumstance Details"
              outlined
              :value="description"
              hint="You Circumstance Details"
          ></v-textarea>
        </v-col>
      </v-row>
      <p>Document type placeholder, multiple allowed???</p>
      <v-row no-gutters>
        <v-col cols="12">
          <v-file-input
              counter
              multiple
              show-size
              small-chips
              truncate-length="15"
              label="Document Upload"
              class="mb-3"
          ></v-file-input>
        </v-col>
        <v-col cols="4">
          <v-select
              dense
              outlined
              class="mr-2"
              label="Course"
              v-model="typeSelect"
              :items="typeItems"
          ></v-select>
        </v-col>
        <v-col cols="4">
          <v-select
              dense
              outlined
              label="Assessment"
              v-model="typeSelect"
              :items="typeItems"
          ></v-select>
        </v-col>
        <v-col cols="4">
          <v-select
              dense
              outlined
              class="ml-2"
              label="Coordinator"
              v-model="typeSelect"
              :items="typeItems"
          ></v-select>
        </v-col>
        <v-col cols="12">
          <v-select
              dense
              outlined
              label="Outcome"
              v-model="typeSelect"
              :items="typeItems"
          ></v-select>
        </v-col>
        <p>outcome options placeholder</p>
        <v-col cols="12">
          <v-textarea
              name="input-7-1"
              label="Wished Outcome"
              outlined
              :value="description"
          ></v-textarea>
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
  name: "SubmitPage",
  data: () => ({
    typeSelect: '',
    typeItems: [
      'test1',
      'test2'
    ],
    description: ''
  })
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