
<template>
<div>

<div class="logo">
<router-link to="/shouye"  style="cursor:point"><img :src="logourl"  :width="logowidth" height="50px"></router-link>

</div>
<el-menu :default-active="openmenu"  background-color="#495060"
      text-color="#c9cbd0"
      active-text-color="#2d8cf0"  class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" unique-opened>
      <el-submenu  v-for="item in menulist"  :index="item.index" >
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
        </template>
         <el-menu-item v-for="it in item.menu"  :index="it.index" @click="choose(it.url,it.index)">{{it.title}}</el-menu-item>
     </el-submenu>
     <el-menu-item  v-for="item in othermenu"  :index="item.index"  @click="choose(item.url,item.index)">
        <i :class="item.icon"></i>
        <span slot="title">{{item.title}}</span>
      </el-menu-item>
</el-menu>
</div>
</template>


<script>
 import  eventBus from '../assets/eventBus';  //传值组件 中转站
  export default {
    data(){
      return {
          openmenu:"",
          isCollapse: false,
          logowidth:"150px",
          logourl:require('../assets/shouye.png'),
          menulist:[
        {
          index: 1,
          title: '订单管理',
          icon:'el-icon-tickets',
          open:'no',
          menu: [
            {'index':'1-1','title':'订单列表','url':'/warehouse'},
            {'index':'1-2','title':'选项3','url':'/shouye'}
            ]
        },
        {
          index: 2,
          title: '用户管理',
          icon:'fa fa-user-o',
          open:'no',
          menu: [
            {'index':'2-1','title':'拣货员列表','url':'/pickerlist'},
            {'index':'2-2','title':'配送员列表','url':'/riderlist'},
            {'index':'2-3','title':'待审核列表','url':'/check'},
            ]
        },
        {
          index: 3,
          title: '图表',
          icon:'fa fa-bar-chart',
          open:'no',
          menu: [
            {'index':'3-1','title':'订单统计图','url':'/chart'},
          

            ]
        },
      ],
      othermenu:[
        {
          index:7,
          title:'图表',
          icon:'el-icon-picture',
          open:'no',
          url:'chart',
        },
        {
          index:8,
          title:'登录',
          icon:'fa fa-bar-chart',
          open:'no',
          url:'/testlogin',

        },
        {
          index:9,
          title:'注册',
          icon:'el-icon-tickets',
          open:'no',
          url:'/testregist',
        },
        {
          index:10,
          title:'测试',
          icon:'el-icon-tickets',
          open:'no',
          url:'/test',
        },
        {
          index:11,
          title:'仓库',
          icon:'el-icon-tickets',
          open:'no',
          url:'/warehouse',
        }
      ]

      }
    },
    methods: {
      fun(){
        if(this.isCollapse){
        this.isCollapse=false;
        }else{
         this.isCollapse=true;
        }
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      acceptmsg(){
         eventBus.$on("myfun",(message)=>{   //这里最好用箭头函数，不然this指向有问题
                 if(message=='close'){
                   this.isCollapse=true;
                   this.logowidth="30px";
                   this.logourl=require('../assets/11.png');

                 }
                  if(message=='open'){
                   this.isCollapse=false;
                   this.logowidth="150px";
                   this.logourl=require('../assets/shouye.png');
                 }
            })
      },
     choose(url,index){
      sessionStorage.setItem('openmenu',index);
        this.$router.push({
           path:url,
          });
      }
    },
    mounted(){
      this.openmenu=sessionStorage.getItem('openmenu');
    },
    created(){
       this.acceptmsg();
    }
  }

</script>

<style scoped>

.logo{

margin-top:10px;
padding:20px;
}
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu{
border:none;
      background-color:#495060;
  }
  .fa{
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 14px;
    vertical-align: middle;
    cursor: pointer;
  }
</style>