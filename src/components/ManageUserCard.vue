<template>
  <v-data-table
      :headers="headers"
      :items="staff"
      sort-by="calories"
      class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
          flat
      >
        <v-toolbar-title>Manage Staff</v-toolbar-title>
        <v-divider
            class="mx-4"
            inset
            vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
        >
          Add New User
        </v-btn>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
          small
          class="mr-2"
          @click="editUser(item)"
      >
        mdi-pencil
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
          color="primary"
          @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Staff Number',
        align: 'start',
        sortable: false,
        value: 'UserNumber',
      },
      {
        text: 'Staff Name',
        sortable: false,
        value: 'UserName'
      },
      {
        text: 'Email',
        sortable: false,
        value: 'Email'
      },
      {
        text: 'Phone',
        sortable: false,
        value: 'Phone'
      },
      {
        text: 'Faculty',
        sortable: false,
        value: 'Academic'
      },
      { text: 'Edit', value: 'actions', sortable: false },
    ],
    staff: [],
  }),

  computed: {

  },

  watch: {

  },

  created () {
    this.initialize()
  },

  methods: {
    editUser() {

    },
    initialize () {
      this.staff = [
        {
          UserNumber:"3362554",
          UserName:["Weiran","wwr","Wang"],
          BirthDate:"16-03-1996",
          Addresses:["2 Heritage Pl","Birmingham Garden","NSW 2272"],
          Phone:"493316052",
          Email:"wang.wei.ran11@outlook.com",
          Academic: "default"
        },
        {
          UserNumber:"3362554",
          UserName:["Weiran","wwr","Wang"],
          BirthDate:"16-03-1996",
          Addresses:["2 Heritage Pl","Birmingham Garden","NSW 2272"],
          Phone:"493316052",
          Email:"wang.wei.ran11@outlook.com",
          Academic: "default"
        },
        {
          UserNumber:"3362554",
          UserName:["Weiran","wwr","Wang"],
          BirthDate:"16-03-1996",
          Addresses:["2 Heritage Pl","Birmingham Garden","NSW 2272"],
          Phone:"493316052",
          Email:"wang.wei.ran11@outlook.com",
          Academic: "default"
        },
        {
          UserNumber:"3362554",
          UserName:["Weiran","wwr","Wang"],
          BirthDate:"16-03-1996",
          Addresses:["2 Heritage Pl","Birmingham Garden","NSW 2272"],
          Phone:"493316052",
          Email:"wang.wei.ran11@outlook.com",
          Academic: "default"
        },
        {
          UserNumber:"3362554",
          UserName:["Weiran","wwr","Wang"],
          BirthDate:"16-03-1996",
          Addresses:["2 Heritage Pl","Birmingham Garden","NSW 2272"],
          Phone:"493316052",
          Email:"wang.wei.ran11@outlook.com",
          Academic: "default"
        },
      ]
    },
  }
}
</script>

<style scoped>

</style>
