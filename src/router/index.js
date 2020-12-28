import Vue from 'vue'
import VueRouter from 'vue-router'
import Measure from '../views/Measure.vue'
import Laboratory from '../views/Laboratory.vue'
import Inventario from '../views/Inventario.vue'
import Cashier from '../views/Cashier.vue'
import Registry from '../views/Registry.vue'
import Drug from '../views/Drug.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/inventario',
    name:'Inventario',
    component:Inventario
  },
  {
    path:'/drug',
    name:'Drug',
    component:Drug
  },
  {
    path:'/measure',
    name:'Measure',
    component:Measure
  },
  {
    path:'/laboratory',
    name:'Laboratory',
    component:Laboratory
  },
  {
    path:'/cashier',
    name:'Cashier',
    component:Cashier
  },
  {
    path:'/registry',
    name:'Registry',
    component:Registry,
    children:[
      {
        path:'cashier/:id',
        name:'RegistryCashier',
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
