<template>
  <v-expansion-panels
    flat
    accordion
  >
    <!-- traverse an object, not an array -->
    <v-expansion-panel
        v-for="(documentType, typeIndex) in documentsView"
        :key="typeIndex"
    >
      <v-expansion-panel-header v-if="documentType.length > 0">
        {{documentType[0].type}}
      </v-expansion-panel-header>
      <v-expansion-panel-content
          v-for="document in documentType"
          :key="document.documentID"
      >
        <v-row>
          <v-col cols="10">
            <a :href="document.url">{{document.title}}</a>
          </v-col>
          <v-col cols="2">
            <v-btn
                icon
                color="error"
                @click="deleteDocument(document.documentID, typeIndex)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import {store} from "@/global";

export default {
  name: "DocumentCard",
  props: {
    documents: {
      type: Array,
      required: true
    }
  },
  data: ()=> ({
    documentsData: null,
    documentsView: {
      type: [
        {
          documentID: 1,
          applicationID: '',
          title: 'test',
          type: 'test',
        }
      ]
    },
  }),
  methods: {
    deleteDocument(documentID, type) {
      this.documentsView['test'] = [
        {
          documentID: 1,
          applicationID: '',
          title: 'test',
          type: 'test',
        }
      ]
      for (let i = 0; i < this.documentsView[type].length; i++) {
        if (this.documentsView[type][i].documentID === documentID) {
          if (this.documentsView[type].length === 1) {
            this.documentsView[type] = []
          } else {
            this.documentsView[type].splice(i, 1)
          }
          // documentType array is NOT reactive, but I do not know why
          this.$forceUpdate()
          // alert(this.documentsView[type].length)
          break
        }
      }

      if (type !== undefined) {
        return
      }

      this.$axios({
        method: "DELETE",
        url: `${store.host}/document/delete?documentID=${documentID}`,
      }).then(res => {
        if (res.data.status !== "success") {
          alert("message: " + res.data.message);
        }
      }).catch(function (err) {
        alert("err " + err);
      })
    }
  },
  watch: {
    documents: {
      handler(documents) {
        this.documentsData = documents.slice()
        this.documentsData.sort((a, b) => {
          return a["type"] - b["type"];
        })
        this.documentsView = {}
        for (const document of this.documentsData) {
          if (this.documentsView[document.type] === undefined) {
            this.documentsView[document.type] = []
          }
          this.documentsView[document.type].push(document)
        }
      },
      immediate: true
    }
  },
}
</script>

<style scoped>

</style>