<template>
    <v-card>
        <v-card-title>
            <v-row>
                <v-col cols="9" md="9" sm=12>
                    <v-text-field v-model="search" append-icon="fab fa-searchengin" label="Search" single-line
                        hide-details></v-text-field>
                </v-col>
                <v-col cols="3" md="3" sm=12 class="d-flex align-end justify-end">
                    <v-btn outlined @click.stop="dialog = true">Añadir laboratorio</v-btn>
                </v-col>
            </v-row>
        </v-card-title>
        <v-data-table :headers="headers" :items="laboratories" height="77.2vh" :search="search">
            <template v-slot:[`item.image`]="{ item }">
                <div class="p-2">
                    <v-img :lazy-src="`https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png`" :src="'http://192.168.100.54:3000/'+item.image" :alt="item.name" height="100px" width="100px"
                        contain>
                        <template v-slot:placeholder>
                            <v-row class="fill-height ma-0" align="center" justify="center">
                                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                            </v-row>
                        </template>
                    </v-img>
                </div>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                    fas fa-pencil-alt
                </v-icon>
                <v-icon small @click="deleteItem(item)">
                    fas fa-eraser
                </v-icon>
            </template>
            <template v-slot:top>
                <v-dialog v-model="dialogRemove" max-width="300px">
                    <v-card>
                        <v-card-title class="headline grey lighten-2">
                            Eliminar laboratorio
                        </v-card-title>

                        <v-card-text>
                            ¿Deseas eliminar este laboratorio?
                        </v-card-text>

                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" text @click="removeLaboratory()">
                                Eliminar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </template>
        </v-data-table>
        <v-dialog v-model="dialog" width="500px">
            <v-card>
                <v-card-title class="headline grey lighten-2">
                    Añadir laboratorio
                </v-card-title>

                <v-card-text class="pa-2">
                    <v-row no-gutters>
                        <v-col cols="12" class="d-flex justify-center my-2">
                            <div v-if="editedItem.image == null" class="styleAddImg">
                                <v-row>
                                    <v-col cols="12" class="d-flex align-center justify-center">
                                        <v-icon>
                                            fa-plus
                                        </v-icon>
                                    </v-col>
                                <v-col cols="12" class="d-flex align-center justify-center">
                                    Añadir imagen
                                </v-col>
                                </v-row>
                            </div>
                            <div v-else>
                                <v-img max-height="150" max-width="250" :src="previewImage" v-if="typeof editedItem.image != 'string'">
                                <template v-slot:placeholder>
                                    <v-row class="fill-height ma-0" align="center" justify="center">
                                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                    </v-row>
                                </template>
                            </v-img>
                                <v-img max-height="150" max-width="250" :src="'http://192.168.100.54:3000/'+editedItem.image" v-else>
                                    <template v-slot:placeholder>
                                        <v-row class="fill-height ma-0" align="center" justify="center">
                                            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                        </v-row>
                                    </template>
                                </v-img>
                            </div>
                        </v-col>
                        <v-col cols="12" class="mb-2">
                            <v-file-input outlined dense hide-details v-model="editedItem.image" @change="onFileChange"></v-file-input>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="editedItem.name" outlined dense label="Nombre"
                                prepend-icon="fas fa-flask"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="uploadLaboratory">
                        Guardar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            previewImage: null,
            search: '',
            dialog: false,
            dialogRemove: false,
            headers: [{
                    text: 'Imagen',
                    value: 'image',
                    sortable: false,
                },
                {
                    text: 'Laboratorio',
                    value: 'name',
                    width: '60%'
                },
                {
                    text: 'Actions',
                    value: 'actions',
                    sortable: false,
                },
            ],
            laboratories: [],
            editedIndex: -1,
            editedItem: {
                id_laboratory: 0,
                name: '',
                image: null
            },
            defaultItem: {
                id_laboratory: 0,
                name: '',
                image: null
            },
        }
    },

    created() {
        this.initialize()
    },

    watch:{
        dialog(val) {
            val || this.close()
        },
    },

    methods: {
        initialize() {
            axios({
                method: 'get',
                url: 'http://192.168.100.54:3000/api/getAllLaboratory'
            }).then((res) => {
                this.laboratories = res.data.append;
            });
        },
        uploadLaboratory() {
            var indexLaboratory = this.editedIndex;
            const fd = new FormData();
            fd.append('nombre', this.editedItem.name);
            fd.append('imageFile', this.editedItem.image);
            if(indexLaboratory > -1){
                fd.append('id_laboratory',this.editedItem.id_laboratory);
                axios({
                    method: 'post',
                    url: 'http://192.168.100.54:3000/api/updatedLaboratory',
                    data: fd
                }).then((res) => {
                    Object.assign(this.laboratories[indexLaboratory], res.data)
                    this.dialog = false;
                })
            }else{
                axios({
                    method: 'post',
                    url: 'http://192.168.100.54:3000/api/createdLaboratory',
                    data: fd
                }).then((res) => {
                    this.laboratories.push(res.data);
                    this.dialog = false;
                })
            }
        },
        onFileChange() {
            try {
                let reader = new FileReader()
                reader.onload = (event) => {
                    this.previewImage = event.target.result
                }
                reader.readAsDataURL(this.editedItem.image)
            } catch (error) {
                console.log(error);
            }
        },
        deleteItem(item) {
            this.editedIndex = this.laboratories.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogRemove = true
        },
        removeLaboratory() {
            var indexLaboratory = this.editedIndex;
            axios({
                method: 'delete',
                url: 'http://192.168.100.54:3000/api/removeLaboratory/'+this.editedItem.id_laboratory,
                }).then((res) => {
                if(res.data.removed){
                    this.laboratories.splice(indexLaboratory, 1)
                }
                }).catch((error) => {
                console.log(error);
                });
            this.closeDelete()
        },
        closeDelete() {
            this.dialogRemove = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
        close() {
            this.dialog = false
            this.previewImage = null
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
        editItem(item) {
            this.editedIndex = this.laboratories.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
    }
}
</script>

<style>
.styleAddImg{
    height: 100px;
    width: 100px;
    border: 1px solid black;
    border-radius: 15%;
    border-style:dashed;
}
</style>