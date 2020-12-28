<template>
    <v-card>
        <v-card-title>
            <v-row>
                <v-col cols="7">
                    Registro por periodo de tiempo
                </v-col>
                <v-col>
                    <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-model="date" label="Picker in dialog" prepend-icon="fas fa-calendar-alt"
                                readonly v-bind="attrs" v-on="on" clearable dense outlined hide-details></v-text-field>
                        </template>
                        <v-date-picker v-model="date" scrollable range>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="modal = false">
                                Cancel
                            </v-btn>
                            <v-btn text color="primary" @click="$refs.dialog.save(date)">
                                OK
                            </v-btn>
                        </v-date-picker>
                    </v-dialog>
                </v-col>
            </v-row>
        </v-card-title>
        <div v-if="date">
            <v-container class="pt-0 pb-0">
                <v-row>
                    <v-col cols="6">
                        <v-card-title class="text-center pt-0">
                            Medicamentos mas vendidos
                        </v-card-title>
                        <v-card-text>
                            <pie-chart :data="[['Blueberry', 44], ['Strawberry', 23]]"></pie-chart>
                        </v-card-text>
                    </v-col>
                    <v-col cols="6">
                        <v-card-title class="text-center pt-0">
                            Medicamentos mas comprados
                        </v-card-title>
                        <v-card-text>
                            <pie-chart :data="[['Blueberry', 44], ['Strawberry', 23]]"></pie-chart>
                        </v-card-text>
                    </v-col>
                    <v-col cols="12">
                        <v-card-title>
                            Ventas
                        </v-card-title>
                        <line-chart :data="charData"></line-chart>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            date:null,
            modal:false,
            charData: [
                {name: 'Workout', data: {'2017-01-01 00:00:00 -0800': 3, '2017-01-02 00:00:00 -0800': 4}},
                {name: 'Call parents', data: {'2017-01-01 00:00:00 -0800': 5, '2017-01-02 00:00:00 -0800': 3}}
            ],
        }
    }
}
</script>
