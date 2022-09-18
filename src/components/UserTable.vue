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
        Show All
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>
export default {
  data: () => ({
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
  }),

  computed: {
    users: function() {
      return this.userData;
    }
  },

  props: {
    userType: {
      type: String,
      required: true,
      default: 'Staff'
    },
    userData: {
      required: true,
    }
  },

  methods: {
    editUser(item) {
      this.$router.push({name:'user_info',params:item});
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
    },
  }
}
</script>

<style scoped>

</style>
