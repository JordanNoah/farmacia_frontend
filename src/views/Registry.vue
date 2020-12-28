<template>
    <v-container class="pa-0">
        <v-card v-if="idRegistryCashier()">
            <RegistryCashier></RegistryCashier>
        </v-card>
        <v-card v-else>
            <AllRegistries></AllRegistries>
        </v-card>
    </v-container>
</template>
<script>
import AllRegistries from '../views/AllRegistries'
import RegistryCashier from '../views/RegistryCashier'

export default {
    created(){
        console.log(this.$route.params.id)
    },
    components:{
        AllRegistries,
        RegistryCashier
    },
    methods:{
        idRegistryCashier(){
            if(this.$route.params.id){
                return true;
            }else{
                return false;
            }
        }
    }
}
</script>