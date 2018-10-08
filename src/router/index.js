import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'


import Login  from '../components/Login'
import NotFound from '../components/NotFound'

import Index      from '../components/menu/Index'
import AdminInfo  from '../components/menu/AdminInfo'
import PickerList from '../components/menu/PickerList'
import RiderList  from '../components/menu/RiderList'
import OrderList  from '../components/menu/OrderList'
import Check      from '../components/menu/Check'
import Chart      from '../components/menu/Chart'
import WareHouse  from '../components/menu/WareHouse'



import Rdisabled from '../components/menu/v-riderlist/Disabled'
import Rnormal   from '../components/menu/v-riderlist/Normal'
import Pdisabled from '../components/menu/v-pickerlist/Disabled'
import Pnormal   from '../components/menu/v-pickerlist/Normal'

Vue.use(Router)
// import { menuRouter } from "@/router/router";

export default new Router({
  mode: 'history',
  routes: [
    
    {
      path: '/manage',
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
            　　　path: '/admininfo', 
                  name:'admininfo',
             　　 component: AdminInfo
              },
               { 
              　　path: '/pickerlist', 
               
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
                    path: '/warehouse', 
                    name:'warehouse',
                    component:WareHouse
                    },
                     
        　　]
    },
    {
      path: '/', 
      name:'login',
      component:Login
    },
    {
      path: '/login', 
      name:'login2',
      component:Login
    },
    
   {
  path: "/404",
  name: "notfound",
  component: NotFound
  }, {
  path: "*", // 此处需特别注意置于最底部
  redirect: "/404"
  
  } 
    
  ]
})
