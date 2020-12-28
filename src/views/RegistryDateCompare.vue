<template>
    <v-card>
        <v-card-title>
            <v-row>
                <v-col cols="7">
                    Compare ventas por periodo de tiempo
                </v-col>
                <v-col>
                    <v-row no-gutters>
                        <v-col>
                            <v-chip close close-icon="fas fa-times" color="orange" v-for="date in multipleDates" :key="date" class="mx-1" @click:close="removeDate(date)">{{date}}</v-chip>
                        </v-col>
                        <v-col cols="2">
                            <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn class="mx-2" v-bind="attrs" v-on="on" depressed fab dark color="primary">
                                        <v-icon dark>
                                            fas fa-calendar-plus
                                        </v-icon>
                                    </v-btn>
                                    <!-- <v-combobox multiple outlined v-bind="attrs" hide-details v-on="on" dense readonly
                                label="Picker in dialog" prepend-icon="fas fa-calendar-alt" v-model="multipleDates" append-icon
                                chips deletable-chips class="tag-input"></v-combobox> -->
                                </template>
                                <v-date-picker v-model="date" scrollable range>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="modal = false">
                                        Cancel
                                    </v-btn>
                                    <v-btn text color="primary" @click="saveDateRange(date)">
                                        OK
                                    </v-btn>
                                </v-date-picker>
                            </v-dialog>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-card-title>
        <div v-if="multipleDates">
            <v-container class="pt-0 pb-0">
                <v-row>
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
                date: null,
                modal: false,
                charData: [{
                        name: 'Workout',
                        data: {
                            '2017-01-01 00:00:00 -0800': 3,
                            '2017-01-02 00:00:00 -0800': 4
                        }
                    },
                    {
                        name: 'Call parents',
                        data: {
                            '2017-01-01 00:00:00 -0800': 5,
                            '2017-01-02 00:00:00 -0800': 3
                        }
                    }
                ],
                multipleDates: []
            }
        },
        methods: {
            saveDateRange(date) {
                this.multipleDates.push(date[0] + " | " + date[1])
                console.log(this.multipleDates);
                this.modal = false
                this.date = null
            },
            removeDate(date){
                var index = (this.multipleDates.indexOf(date))
                this.multipleDates.splice(index,1)
                console.log(index);
            }
        }
    }
</script>
