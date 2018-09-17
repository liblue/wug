import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'


import Login  from '../components/Login'

import Index      from '../components/menu/Index'
import AdminInfo  from '../components/menu/AdminInfo'
import PickerList from '../components/menu/PickerList'
import RiderList  from '../components/menu/RiderList'
import OrderList  from '../components/menu/OrderList'
import Check      from '../components/menu/Check'
import TestLogin  from '../components/menu/TestLogin'
import TestRegist from '../components/menu/TestRegist'
import Test       from '../components/menu/Test'
import Chart      from '../components/menu/Chart'
import WareHouse  from '../components/menu/WareHouse'




import FiOrList  from '../components/menu/v-orderlist/FiOrList'
import WaOrList  from '../components/menu/v-orderlist/WaOrList'
import DeOrList  from '../components/menu/v-orderlist/DeOrList'
import Rdisabled from '../components/menu/v-riderlist/Disabled'
import Rnormal   from '../components/menu/v-riderlist/Normal'
import Pdisabled from '../components/menu/v-pickerlist/Disabled'
import Pnormal   from '../components/menu/v-pickerlist/Normal'
 
Vue.use(Router)
// import { menuRouter } from "@/router/router";

export default new Router({
  routes: [
    {
      path: '/manage',
      name: 'Layout',
      component: Layout,
      　　 children: [ { 
        　　　　path: '/', 
               name:'/',
         　　　 component: Index
        　　  },

        　　　{ 
        　　　　path: '/shouye', 
               name:'shouye',
         　　　 component: Index
        　　  },
              { 
            　　　path: '/adminadd', 
                  name:'adminadd',
             　　 component: AdminInfo
              },
               { 
              　　path: '/pickerlist', 
                name:'pickerlist',
               　　component: PickerList,
                   children: [
                {
                  path: '/', 
                  name:'pdefault',
                  component:Pnormal,
                },
                {
                path: '/normal', 
                name:'normal',
                component:Pnormal,
              },
              {
                path: '/disabled', 
                name:'disabled',
                component:Pdisabled,
              },
            ]
              },
                { 
                  path: '/orderlist', 
                  name:'orderlist',
                  component:OrderList,
                  // children: [
                  //   {
                  //     path: '/', 
                  //     name:'odefault',
                  //     component:FiOrList,
                  //   },
                  //   {
                  //   path: '/finished', 
                  //   name:'finished',
                  //   component:FiOrList,
                  // },
                  // {
                  //   path: '/wating', 
                  //   name:'wating',
                  //   component:WaOrList,
                  // },
                  // {
                  //   path: '/deliver', 
                  //   name:'wating',
                  //   component:DeOrList,
                  // },
                  //  ]
                  　　  },
                { 
                    path: '/riderlist', 
                    name:'riderlist',
                    component:RiderList,
                    children: [
                      {
                        path: '/', 
                        name:'rdefault',
                        component:Rnormal,
                      },
                      {
                        path: '/rnormal', 
                        name:'rnormal',
                        component:Rnormal,
                      },
                      {
                        path: '/rdisabled', 
                        name:'rdisabled',
                        component:Rdisabled,
                      },
                   
                     ]
                    　　},
                 {
                    path: '/check', 
                    name:'check',
                    component:Check
                    },
                 {
                    path: '/chart', 
                    name:'chart',
                    component:Chart
                    },
                 {
                    path: '/testlogin', 
                    name:'testlogin',
                    component:TestLogin
                    },
                  {
                    path: '/testregist', 
                    name:'testregist',
                    component:TestRegist
                    }, 
                  {
                    path: '/warehouse', 
                    name:'warehouse',
                    component:WareHouse
                    },
                    {
                      path: '/test', 
                      name:'test',
                      component:Test
                    }, 
        　　]
    },
    {
      path: '/', 
      name:'login',
      component:Login
    },
    
    
  ]
})
