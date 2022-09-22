<template>
  <v-data-table
      :headers="headers"
      :items="users"
      :search="search"
      sort-by="calories"
      class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
          flat
      >
        <v-toolbar-title>{{ userType }} Data</v-toolbar-title>
        <v-divider
            class="ml-6 mx-4"
            inset
            vertical
        ></v-divider>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search in this view"
            single-line
            hide-details
        ></v-text-field>
        <v-dialog
            width="500"
            v-if="isFromCoursePage"
            v-model="addUserToCourseDialog"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="success"
                class="ml-4"
                dark
                v-bind="attrs"
                v-on="on"
                @click="getUsersForAdd"
            >
              Add users to course
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              Add a User
            </v-card-title>
            <v-container>
              <v-row no-gutters>
                <v-col cols="8">
                  <v-text-field
                      class="justify-end ml-5"
                      v-model="searchStringForUser"
                      append-icon="mdi-magnify"
                      label="Filter by user name"
                      single-line
                      hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="4" class="align-self-end">
                  <v-btn
                      class="justify-end ml-9"
                      color="primary"
                      @click="getUsersForAdd"
                  >
                    Filtrate
                  </v-btn>
                </v-col>
                <v-col cols="12">
                  <v-combobox
                      solo
                      chips
                      clearable
                      multiple
                      return-object
                      hide-selected
                      item-text="userNameForShow"
                      item-value="userNumber"
                      label="Choose Available Courses"
                      class="ml-4 mr-4 mt-6"
                      v-model="addedUsers"
                      :items="usersForAdd"
                  >
                    <template v-slot:selection="{ attrs, item, select, selected }">
                      <v-chip
                          v-bind="attrs"
                          :input-value="selected"
                          close
                          @click="select"
                          @click:close="removeAddUsers(item)"
                      >
                        <strong>{{ item.userNameForShow }}</strong>&nbsp;
                      </v-chip>
                    </template>
                  </v-combobox>
                </v-col>
              </v-row>
            </v-container>
            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="primary"
                  text
                  @click="addUsersToCourse"
              >
                CONFIRM
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
          small
          class="ml-8"
          v-if="isFromCoursePage"
          @click="removeCourseFromUser(item)"
      >
        mdi-trash-can
      </v-icon>
      <v-icon
          small
          class="mr-2"
          v-else
          @click="editUser(item)"
      >
        mdi-pencil
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
          color="error"
      >
        NO DATA
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>
import { store } from '@/global.js';

export default {
  data: () => ({
    search: '',
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
        filterable: false,
        value: 'phone'
      },
      {
        text: 'Faculty',
        sortable: false,
        value: 'academic'
      },
      { text: 'Edit', value: 'actions', sortable: false },
    ],
    // below for from page course management
    isFromCoursePage: false,
    addUserToCourseDialog: false, // dialog switch
    addedUsers: [], // to add, userNameForShow, userNumber
    usersForAdd: [], // for choose to add
    searchStringForUser: '',
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
    },
    sourcePage: {
      type: String,
      default: 'UserManage'
    },
    courseOfferingID: {
      type: Number,
      required: true,
    },
    permission: {
      type: Number,
      default: 2
    }
  },
  created() {
    if (this.sourcePage === 'CourseManage') {
      this.isFromCoursePage = true;
      this.headers.pop()
      this.headers.push(
        { text: 'Delete From Course', value: 'actions', sortable: false }
      )
    }
  },
  methods: {
    editUser(item) {
      this.$router.push({
        path: `/user/Edit/${store.roles[item.permission]}/${item.userNumber}`,
      });
    },

    // below for from course page
    getUsersForAdd() {
      let addr = 'http://localhost:5094/manage/GetCandidates?permission='
                      .concat(this.permission.toString())
                      .concat('&courseOfferingID=')
                      .concat(this.courseOfferingID.toString());
      if (this.searchStringForUser.length > 0) {
        addr = addr.concat('&userName=').concat(this.searchStringForUser)
      }
      this.$axios({
        method: "GET",
        url: addr,
      }).then(res => {
        if (res.data.status !== "success") {
          alert("message: " + res.data.message);
          return;
        }
        // this.users = res.data.obj;
        this.usersForAdd = [];
        for (const userItem of res.data.obj) {
          this.usersForAdd.push({
            userNameForShow: userItem.userNumber
                                     .concat(' ')
                                     .concat(userItem.userName),
            userNumber: userItem.userNumber
          })
        }
        console.log("success query");
      }).catch(function (err) {
        alert("err " + err);
      })
    },
    removeAddUsers(item) {
      this.addedUsers.splice(this.addedUsers.indexOf(item), 1)
    },
    addUsersToCourse() {
      this.addCourseToUserDialog = false;
      this.$axios({
        method: "POST",
        url: 'http://localhost:5094/manage/relation',
        data: {
          courseOffering: {
            courseOfferingID: this.courseOfferingID,
          },
          userAddList: this.addedUsers
        },
      }).then(res => {
        if (res.data.status === "success") {
          alert("updated");
          if (this.$parent.searchCourse !== undefined) {
            this.$parent.searchCourse()
          }
          if (this.$parent.searchUsers !== undefined) {
            this.$parent.searchUsers(this.permission)
          }
          this.addUserToCourseDialog = false;
        }
      }).catch(function (err) {
        alert("err " + err);
      })
    },
    removeCourseFromUser(item) {
      this.$axios({
        method: "POST",
        url: 'http://localhost:5094/manage/relation',
        data: {
          courseOffering: {
            courseOfferingID: this.courseOfferingID
          },
          userRemoveList: [{
            userNumber: item.userNumber,
            permission: item.userPermission
          }],
        },
      }).then(res => {
        if (res.data.status === "success") {
          alert("deleted");
          this.addedUsers.splice(this.addedUsers.indexOf(item), 1)
        }
      }).catch(function (err) {
        alert("err " + err);
      })
    }
  }
}
</script>

<style scoped>

</style>
