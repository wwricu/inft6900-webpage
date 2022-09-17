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
        <v-dialog
            v-model="dialog"
            max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
            >
              New Staff
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedItem.name"
                        label="Dessert name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedItem.calories"
                        label="Calories"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedItem.fat"
                        label="Fat (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedItem.carbs"
                        label="Carbs (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedItem.protein"
                        label="Protein (g)"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
          small
          @click="deleteItem(item)"
      >
        mdi-delete
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
        text: 'Birth Date',
        sortable: false,
        value: 'BirthDate'
      },
      {
        text: 'Address',
        sortable: false,
        value: 'Addresses'
      },
      {
        text: 'Faculty',
        sortable: false,
        value: 'Academic'
      },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    staff: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
    this.initialize()
  },

  methods: {
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

    editItem (item) {
      this.editedIndex = this.staff.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.staff.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.staff.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.staff[this.editedIndex], this.editedItem)
      } else {
        this.staff.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>

<style scoped>

</style>
