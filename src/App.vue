<template>
  <v-app>
    <v-navigation-drawer clipped fixed permanent app>
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <v-icon>
              fas fa-mortar-pestle
            </v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Farmacia Rey</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list>
        <v-list-item v-for="item in items" :key="item.title" link :to="{ name: item.route }">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data () {
      return {
        items: [
          { title:'Inventario', icon: 'fas fa-dolly-flatbed', route:'Inventario' },
          { title:'Medicamentos', icon: 'fas fa-pills', route:'Drug' },
          { title:'Medida', icon:'fas fa-balance-scale-left', route:'Measure' },
          { title:'Laboratory', icon:'fas fa-flask', route:'Laboratory' },
          { title:'Cashier', icon:'fas fa-cash-register', route:'Cashier' },
          { title:'Registry', icon:'fas fa-file-invoice', route:'Registry' }
        ],
      }
    },
};
</script>