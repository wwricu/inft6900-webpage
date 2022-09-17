<template>
  <v-card
      class="mx-auto text-center pa-4"
  >
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col
              md="6"
          >
            <v-text-field
                disabled
                v-model="userNumber"
                :counter="100"
                :label="userType + ' Number'"
            ></v-text-field>
          </v-col>
          <v-col
              md="6"
          >
            <v-text-field
                disabled
                v-model="email"
                :rules="emailRules"
                label="E-mail"
            ></v-text-field>
          </v-col>

          <v-col
              md="6"
          >
            <v-text-field
                v-model="phone"
                label="Phone Number"
                required
            ></v-text-field>
          </v-col>

          <v-col
              md="6"
          >
            <v-text-field
                v-model="academic"
                label="Faculty"
                required
            ></v-text-field>
          </v-col>

          <v-col
              md="4"
          >
            <v-text-field
                v-model="firstName"
                :rules="nameRules"
                :counter="10"
                label="First name"
                required
            ></v-text-field>
          </v-col>
          <v-col
              md="4"
          >
            <v-text-field
                v-model="middleName"
                :rules="nameRules"
                :counter="10"
                label="Middle name"
                required
            ></v-text-field>
          </v-col>
          <v-col
              md="4"
          >
            <v-text-field
                v-model="lastName"
                :rules="nameRules"
                :counter="10"
                label="Last name"
                required
            ></v-text-field>
          </v-col>

          <v-col
              md="4"
          >
            <v-text-field
                v-model="placeName"
                label="Address Line 1"
                required
            ></v-text-field>
          </v-col>
          <v-col
              md="4"
          >
            <v-text-field
                v-model="placeName"
                label="Address Line 2"
                required
            ></v-text-field>
          </v-col>
          <v-col
              md="4"
          >
            <v-text-field
                v-model="placeName"
                label="Address Line 2"
                required
            ></v-text-field>
          </v-col>

        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "UserInfoCard",
  props: {
    userType: {
      type: String,
      required: true,
      default: 'Staff'
    },
  },
  data: () => ({
    valid: false,
    activityTypes: [
      'Lightning',
      'HOT WATER',
      'RC',
      'SOLAR',
      'HVAC/Space Conditioning',
      'Fans/Motors',
    ],
    userNumber: '3362554',
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    academic: '',
    typeSwitch: true,
    abnNumber: '',
    placeName: '',
    unitTypes: [
      'Apartment',
      'Shop',
      'Room',
      'Office',
      'Flat',
      'Floor',
      'House',
      'Cottage',
      'Factory',
      'Level',
      'Lot',
      'Shed',
      'Showroom',
      'Site',
      'Suit',
      'Townhouse',
      'Villa',
      'Unit',
    ],
    unitNumber: '',
    levelTypes: [
      'Block',
      'Floor',
      'Level',
      'Lot'
    ],
    levelNumber: '',
    streetNumber: '',
    streetName: '',
    streetTypes: [
      'Street',
      'Avenue',
      'Road',
      'Alley',
      'Alleyway',
      'Approach',
      'Beach',
      'Bank',
      'Bay',
    ],
    streetSuffix: '',
    suburbName: '',
    states: [
      'ACT',
      'NSW',
      'QLD',
      'VIC',
      'NT',
      'SA',
      'TAS',
      'WA',
    ],
    postcode: '',

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
