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
            <a @click="getDocument(document.documentID)">
              {{document.title}}
            </a>
          </v-col>
          <v-col cols="2">
            <v-btn
                icon
                color="error"
                v-if="disabled === false"
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
    },
    disabled: {
      type: Boolean,
      default: false
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
          url: '',
        }
      ]
    },
  }),
  methods: {
    resolveBlob(response) {
      const headerVal = response.headers['content-disposition'];
      if (headerVal != null) {
        let filename = headerVal.split(';')[1].split('=')[1].replace('"', '').replace('"', '');
        filename = decodeURI(filename);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
        link.remove();
      }
    },
    getDocument(documentID) {
      this.$axios({
        method: "GET",
        responseType: 'blob',
        url: `${store.host}/document/get?documentID=${documentID}`,
      }).then(res => {
        let blob = new Blob([res.data], {
          type: 'application/octet-stream',
        });
        // alert(res.headers['content-disposition'])
        let filename = res.headers['content-disposition']
                          .split(';')[1]
                          .split('=')[1]
                          .replace('"', '')
                          .replace('"', '');
        // filename = decodeURI(filename);
        const link = document.createElement('a')
        link.download = filename
        link.style.display = 'none'
        link.href = URL.createObjectURL(blob)
        document.body.appendChild(link)
        link.click()
        URL.revokeObjectURL(link.href) // 释放URL 对象
        document.body.removeChild(link)
      }).catch(function (err) {
        alert("err " + err);
      })
    },
    deleteDocument(documentID, type) {
      this.$axios({
        method: "DELETE",
        url: `${store.host}/document/delete`,
        data: {
          documentID: documentID
        }
      }).then(res => {
        if (res.data.status !== "success") {
          alert("message: " + res.data.message);
          return
        }

        for (let i = 0; i < this.documentsView[type].length; i++) {
          if (this.documentsView[type][i].documentID === documentID) {
            this.documentsView[type].splice(i, 1)
            // documentType array is NOT reactive, but I do not know why
            this.$forceUpdate()
            // alert(this.documentsView[type].length)
            break
          }
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