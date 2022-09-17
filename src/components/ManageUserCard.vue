<template>
  <v-data-table
      :headers="headers"
      :items="users"
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
        value: 'userNumber',
      },
      {
        text: 'Staff Name',
        sortable: false,
        value: 'userName'
      },
      {
        text: 'Email',
        sortable: false,
        value: 'email'
      },
      {
        text: 'Phone',
        sortable: false,
        value: 'phone'
      },
      {
        text: 'Faculty',
        sortable: false,
        value: 'academic'
      },
      { text: 'Edit', value: 'actions', sortable: false },
    ],
    permission: 2,
    users: [],
  }),

  props: {
    userType: {
      type: String,
      required: true,
      default: 'Staff'
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    editUser() {

    },
    initialize () {
      this.axios({
        method: "GET",
        url: "http://localhost:5094/manage/getusers?permission=2",
      }).then(res => {
        if (res.data.status !== "success") {
          alert("message: " + res.data.message);
          return;
        }
        this.users = res.data.obj;
        console.log("success query");
      }).catch(function (err) {
        alert("err " + err);
      })
      this.users = [
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
