<template>
  <v-data-table
      :headers="headers"
      :items="courses"
      :search="search"
      sort-by="calories"
      class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
          flat
      >
        <v-toolbar-title>{{ userType }} Courses</v-toolbar-title>
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
        <v-divider
            inset
            vertical
            class="ml-4 mr-4"
        ></v-divider>
        <v-btn
          color="success"
        >
          Add a Course
        </v-btn>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
          small
          class="mr-2"
          @click="deleteCourse(item)"
      >
        mdi-trash-can
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
          color="error"
      >
        No data found
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>
export default {
  name: "CourseTable",
  data: () => ({
    permission: 2,
    search: '',
    headers: [
      {
        text: 'Course Name',
        align: 'start',
        sortable: false,
        value: 'courseName',
      },
      {
        text: 'Semester/Trimester',
        sortable: true,
        value: 'semester'
      },
      {
        text: 'Year',
        sortable: true,
        value: 'year'
      },
      {
        text: 'Delete',
        value: 'actions',
        sortable: false
      },
    ],
  }),

  computed: {
    courses: function() {
      return this.userData;
    }
  },

  props: {
    userType: {
      type: String,
      required: true,
      default: 'Staff'
    },
    courseData: {
      required: true,
    }
  },

  methods: {
    deleteCourse(item) {
      this.$router.push({
        name:'edit_user_course',
        params: item
      });
    },
  }
}
</script>

<style scoped>

</style>
