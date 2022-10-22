<template>
  <v-container class="input-container ma-3">
    <v-row v-for="item in inputItems"
           :key="item.text">
      <v-col
        class="text mt-n3"
        cols="4"
      >
        <p>{{ item.text }}</p>
      </v-col>
      <v-col
          class="input mt-n3"
          cols="8">
        <input
          type="text"
          :value="item.value"
        >
      </v-col>
    </v-row>
    <v-btn
      outlined
      color="primary"
      class="mt-6 mb-2 ml-n1"
      @click="$router.push('/student_page/apply/info')"
    >
      Next Step
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: "PersonalDetail",
  data: () => ({
    inputItems: [
      {
        text: 'Student ID:',
        value: '3362554'
      },
      {
        text: 'First Name:',
        value: 'Weiran'
      },
      {
        text: 'Middle Name:',
        value: ''
      },
      {
        text: 'Last Name:',
        value: 'Wang'
      },
      {
        text: 'Email:',
        value: 'wwr@wwr.com'
      },
      {
        text: 'Phone:',
        value: '493316052'
      },
      {
        text: 'Address Line 1:',
        value: 'Addr1'
      },
      {
        text: 'Address Line 2:',
        value: 'Addr2'
      },
      {
        text: 'Address Line 3:',
        value: 'Addr3'
      },
    ]
  })
}
</script>

<style scoped>
.input-container {
  width: 400px;
}

input {
  border: 1px solid black;
}
</style>