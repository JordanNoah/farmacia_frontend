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
        <v-data-table :headers="headers" :items="inventories" height="77.2vh" :search="search">
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                    fas fa-pencil-alt
                </v-icon>
                <v-icon small @click="deleteItem(item)">
                    fas fa-eraser
                </v-icon>
            </template>
        </v-data-table>
        <v-dialog v-model="createdDialog">
            <v-card>
                <v-card-title></v-card-title>
                <v-card-text>
                    <v-autocomplete v-model="nameProduct" :items="items" :loading="isLoading" :search-input.sync="searchName"
                        hide-no-data hide-selected item-text="Description" item-value="API"
                        label="Nombre" outlined dense return-object></v-autocomplete>
                    <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-model="date" label="Fecha de expiración" readonly v-bind="attrs" v-on="on"
                                outlined dense>
                            </v-text-field>
                        </template>
                        <v-date-picker v-model="date" scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="modal = false">
                                Cancel
                            </v-btn>
                            <v-btn text color="primary" @click="$refs.dialog.save(date)">
                                OK
                            </v-btn>
                        </v-date-picker>
                    </v-dialog>
                    <v-text-field v-model="quantityProduct" dense outlined label="Cantidad"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click.stop="insertProduct">
                        Guardar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            createdDialog:true,
            modal:false,
            inventories: [{
                    name: 'Frozen Yogurt',
                    expiration_date: 159,
                    quantity: 6.0,
                    measure: 24,
                    laboratory: 4.0
                },
                {
                    name: 'Ice cream sandwich',
                    expiration_date: 237,
                    quantity: 9.0,
                    measure: 37,
                    laboratory: 4.3
                },
                {
                    name: 'Eclair',
                    expiration_date: 262,
                    quantity: 16.0,
                    measure: 23,
                    laboratory: 6.0
                },
                {
                    name: 'Cupcake',
                    expiration_date: 305,
                    quantity: 3.7,
                    measure: 67,
                    laboratory: 4.3
                },
                {
                    name: 'Gingerbread',
                    expiration_date: 356,
                    quantity: 16.0,
                    measure: 49,
                    laboratory: 3.9
                },
                {
                    name: 'Jelly bean',
                    expiration_date: 375,
                    quantity: 0.0,
                    measure: 94,
                    laboratory: 0.0
                },
                {
                    name: 'Lollipop',
                    expiration_date: 392,
                    quantity: 0.2,
                    measure: 98,
                    laboratory: 0
                },
                {
                    name: 'Honeycomb',
                    expiration_date: 408,
                    quantity: 3.2,
                    measure: 87,
                    laboratory: 6.5
                },
                {
                    name: 'Donut',
                    expiration_date: 452,
                    quantity: 25.0,
                    measure: 51,
                    laboratory: 4.9
                },
                {
                    name: 'KitKat',
                    expiration_date: 518,
                    quantity: 26.0,
                    measure: 65,
                    laboratory: 7
                },
            ],
            headers: [{
                    text: 'Nombre',
                    value: 'name'
                },
                {
                    text: 'Fecha vencimiento',
                    value: 'expiration_date'
                },
                {
                    text: 'Cantidad',
                    value: 'quantity'
                },
                {
                    text: 'Medida',
                    value: 'measure'
                },
                {
                    text: 'Laboratorio',
                    value: 'laboratory'
                },
                {
                    text: 'Actions',
                    value: 'actions',
                    sortable: false,
                },
            ],
            search:null,
            isLoading: false,
            searchName: null,
            items:[],
            nameProduct:null,
            date:null,
            quantityProduct:null
        }
    },
    methods:{
        insertProduct(){
            console.log(this.nameProduct);
            console.log(this.date);
            console.log(this.quantityProduct);
        }
    }
}
</script>