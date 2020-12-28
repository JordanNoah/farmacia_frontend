<template>
    <v-container>
        <v-card-title>
            <v-row>
                <v-col cols="9" md="9" sm=12>
                    <v-text-field v-model="search" append-icon="fab fa-searchengin" label="Search" single-line
                        hide-details></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm=12 class="d-flex align-end justify-end">
                    <v-btn outlined @click.stop="createdDialog = true">Añadir producto</v-btn>
                </v-col>
            </v-row>
        </v-card-title>
        <v-data-table :headers="headers" :items="desserts" height="77.2vh" :search="search">
            <template v-slot:[`item.status`]="{ item }">
                <v-chip :color="getColor(item.status)" dark>
                    {{ item.status }}
                </v-chip>
            </template>
            <template v-slot:[`item.idCashier`]="{ item }">
                <v-icon @click="watchRegister(item.idCashier)">
                    fas fa-file-invoice
                </v-icon>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                    fas fa-pencil-alt
                </v-icon>
                <v-icon small @click="deleteItem(item)">
                    fas fa-eraser
                </v-icon>
            </template>
        </v-data-table>
    </v-container>
</template>
<script>
  export default {
    data () {
      return {
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Estado', value: 'status', align:'center' },
          { text: 'Historial', value: 'idCashier', align:'center' },
          { text: 'Actions', value: 'actions',align:'middle', sortable:false },
        ],
        search:null,
        desserts: [
          {
            name: 'Frozen Yogurt',
            status: 'Conectado',
            idCashier: 1,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          },
          {
            name: 'Ice cream sandwich',
            status: 'Desconectado',
            idCashier: 2,
            carbs: 37,
            protein: 4.3,
            iron: '1%',
          },
          {
            name: 'Eclair',
            status: 'Sin activar',
            idCashier: 3,
            carbs: 23,
            protein: 6.0,
            iron: '7%',
          },
          {
            name: 'Cupcake',
            status: 'Conectado',
            idCashier: 4,
            carbs: 67,
            protein: 4.3,
            iron: '8%',
          },
          {
            name: 'Gingerbread',
            status: 'Desconectado',
            idCashier: 5,
            carbs: 49,
            protein: 3.9,
            iron: '16%',
          },
          {
            name: 'Jelly bean',
            status: 'Desconectado',
            idCashier: 6,
            carbs: 94,
            protein: 0.0,
            iron: '0%',
          },
          {
            name: 'Lollipop',
            status: 'Desconectado',
            idCashier: 7,
            carbs: 98,
            protein: 0,
            iron: '2%',
          },
          {
            name: 'Honeycomb',
            status: 'Desconectado',
            idCashier: 8,
            carbs: 87,
            protein: 6.5,
            iron: '45%',
          },
          {
            name: 'Donut',
            status: 'Desconectado',
            idCashier: 9,
            carbs: 51,
            protein: 4.9,
            iron: '22%',
          },
          {
            name: 'KitKat',
            status: 'Desconectado',
            idCashier: 10,
            carbs: 65,
            protein: 7,
            iron: '6%',
          },
        ],
      }
    },
    methods: {
      getColor (status) {
        if (status == 'Conectado') return 'green'
        else if (status == 'Desconectado') return 'red'
        else return 'grey'
      },
      watchRegister(idCashier){
        this.$router.push({ path: `/registry/cashier/${idCashier}` })
      }
    },
  }
</script>