<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-card>
                    <v-card-title>
                        Registro desde siempre
                    </v-card-title>
                    <v-card-text>
                        <line-chart :data="charData"></line-chart>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12">
                <RegistryPerTime></RegistryPerTime>
            </v-col>
            <v-col cols="12">
                <RegistryDateCompare></RegistryDateCompare>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import RegistryPerTime from '../views/RegistryPerTime'
import RegistryDateCompare from '../views/RegistryDateCompare'

export default {
    data() {
        return {
            charData: [
                {name: 'Workout', data: {'2017-01-01 00:00:00 -0800': 3, '2017-01-02 00:00:00 -0800': 4}},
                {name: 'Call parents', data: {'2017-01-01 00:00:00 -0800': 5, '2017-01-02 00:00:00 -0800': 3}}
            ],
        }
    },
    components:{
        RegistryPerTime,
        RegistryDateCompare
    }
}
</script>
<style>
.register-overflow{
    overflow:auto!important;
    overflow-y: auto!important;
}
</style>