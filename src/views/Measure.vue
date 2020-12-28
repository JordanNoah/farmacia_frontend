<template>
  <v-container style="min-height:100%;" pa-0>
    <v-data-table :headers="headers" :items="measures" height="82.2vh" sort-by="calories" class="elevation-0">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Medidas</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="400px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" outlined v-bind="attrs" v-on="on">
                Nueva medida
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{formTitle}}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="editedItem.unit" type="number" label="Unidades"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="editedItem.kind" label="Tipo"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancelar
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
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
        <v-icon small class="mr-2" @click="editItem(item)">
          fas fa-pencil-alt
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          fas fa-eraser
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [{
        text: 'Unidades',
        value: 'unit'
      },
      {
        text: 'Tipo',
        value: 'kind'
      },
      {
        text: 'Actions',
        value: 'actions',
        sortable: false
      },
    ],
    measures: [],
    editedIndex: -1,
    editedItem: {
      id_measure:0,
      unit: null,
      kind: ''
    },
    defaultItem: {
      id_measure:0,
      unit: 0,
      kind: ''
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      axios({
        method: 'get',
        url: 'http://192.168.100.54:3000/api/getAllMeasures',
      }).then((res) => {
        this.measures = res.data.append;
      }).catch((error) => {
        console.log(error);
      });
      this.measures = []
      },

      editItem(item) {
        this.editedIndex = this.measures.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

    deleteItem(item) {
      this.editedIndex = this.measures.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      var indexMeasure = this.editedIndex;
      axios({
          method: 'delete',
          url: 'http://192.168.100.54:3000/api/removeMeasure/'+this.editedItem.id_measure,
        }).then((res) => {
          if(res.data.removed){
            this.measures.splice(indexMeasure, 1)
          }
        }).catch((error) => {
          console.log(error);
        });
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      var indexMeasure = this.editedIndex;
      const item = new Object();
      item.id_measure = this.editedItem.id_measure;
      item.unit = this.editedItem.unit;
      item.kind = this.editedItem.kind;
      if (indexMeasure > -1) {
        const params = new URLSearchParams();
        params.append('id_measure', item.id_measure);
        params.append('unit', item.unit);
        params.append('kind', item.kind);
        axios({
          method: 'post',
          url: 'http://192.168.100.54:3000/api/updateMeasure',
          data: params
        }).then((res) => {
          if (res.data.updated) {
            Object.assign(this.measures[indexMeasure], item)
          } else {
            console.log("res.data.updated");
          }
        }).catch((error) => {
          console.log(error);
        });
      } else {
        const params = new URLSearchParams();
        params.append('unit', this.editedItem.unit)
        params.append('kind', this.editedItem.kind)
        axios({
          method: 'post',
          url: 'http://192.168.100.54:3000/api/insertMeasure',
          data: params
        }).then((res) => {
          this.measures.push(res.data.measure)
        }).catch((error) => {
          console.log(error);
        });
      }
      this.close()
    },
  },
}
</script>
<style>
    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    margin: 0; 
    }
</style>