<template>
    <v-container>
        <v-card-title>
            <v-row>
                <v-col cols="9" md="9" sm=12>
                    <v-text-field v-model="search" append-icon="fab fa-searchengin" label="Search" single-line
                        hide-details></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm=12 class="d-flex align-end justify-end">
                    <v-btn outlined @click.stop="createdDialog = true">Añadir Medicamento</v-btn>
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
        <v-dialog v-model="createdDialog" width="500px">
            <v-card>
                <v-card-title></v-card-title>
                <v-card-text>
                    <v-combobox v-model="nameProduct" label="Nombre" outlined dense></v-combobox>
                    <v-combobox v-model="laboratory" label="Laboratory" @keydown="searchLaboratory()" outlined dense></v-combobox>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click.stop="insertDrug">
                        Guardar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            createdDialog:false,
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
            laboratory:null
        }
    },
    methods:{
        insertDrug(){
            const params = new URLSearchParams()
            params.append('name',this.nameProduct)
            params.append('laboratory',this.laboratory)
            axios({
                method:'post',
                url:'http://192.168.100.54:3000/api/createdDrug',
                data:params
            }).then((res)=>{
                console.log(res)
            })
        },
        searchProduct(){
            console.log(this.nameProduct)
        },
        searchLaboratory(){
            var simulatedEvent = new KeyboardEvent("keypress", {keyCode: 13, which: 13});
            this.dispatchEvent
            console.log(this.laboratory);
        }
    }
}
</script>