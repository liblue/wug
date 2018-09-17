
<template>
<div>


<a @click="fun()" style="cursor:point">111111</a>


<el-menu default-active="1-4-1"  background-color="#495060"
      text-color="#c9cbd0"
      active-text-color="#2d8cf0"  class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" unique-opened>
      <el-submenu  v-for="item in menulist"  :index="item.index" >
        <template slot="title">
        

          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
        </template>
         <el-menu-item v-for="it in item.menu"  :index="it.index" @click="choose(it.url,item.title,it.title)">{{it.title}}</el-menu-item>
     </el-submenu>

     <el-menu-item  v-for="item in othermenu"  :index="item.index"  @click="choose(item.url,item.title)">
        <i :class="item.icon"></i>
        <span slot="title">{{item.title}}</span>
      </el-menu-item>
    

 
</el-menu>
</div>
</template>

<style  scoped>
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
  }
</style>

<script>

import bus from '../assets/eventBus';  //传值组件 中转站
  export default {
    data(){
      return {
          isCollapse: false,
          menulist:[
        {
          index: 1,
          title: '管理员管理',
          icon:'fa fa-bar-chart',
          isOpened:true,
          menu: [
           {'index':'1-1','title':'管理员列表','url':'/adminlist'},
           {'index':'1-2','title':'添加管理员','url':'/adminadd'},
           ]
        },
         {
          index: 2,
          title: '导航2',
          icon:'el-icon-tickets',
          open:'no',
          menu: [
            {'index':'2-1','title':'选项1','url':'/shouye'},
            {'index':'2-2','title':'选项2','url':'/shouye'},
            {'index':'2-3','title':'选项3','url':'/shouye'}
            ]
        },
        {
          index: 3,
          title: '订单管理',
          icon:'el-icon-tickets',
          open:'no',
          menu: [
            {'index':'3-1','title':'订单列表','url':'/warehouse'},
           
            {'index':'3-2','title':'选项3','url':'/shouye'}
            ]
        },
        {
          index: 4,
          title: '拣货员管理',
          icon:'fa fa-user-o',
          open:'no',
          menu: [
            {'index':'4-1','title':'拣货员列表','url':'/pickerlist'},
            {'index':'4-2','title':'增加拣货员','url':'/pickerlist'},
            {'index':'4-3','title':'选项3','url':'/shouye'}
            ]
        },
         {
          index: 5,
          title: '配送员管理',
          icon:'el-icon-tickets',
          open:'no',
          menu: [
            {'index':'5-1','title':'配送员列表','url':'riderlist'},
            {'index':'5-2','title':'选项3','url':'/shouye'}
            ]
        },
        {
          index: 6,
          title: '图表',
          icon:'el-icon-tickets',
          open:'no',
          menu: [
            {'index':'6-1','title':'订单统计图','url':'/chart'},
            {'index':'6-2','title':'拣货员统计图','url':'/chart'},
            {'index':'6-3','title':'配送员统计图','url':'/chart'}

            ]
        },
      ],
      othermenu:[
        {
          index:6,
          title:'待审核',
          icon:'el-icon-tickets',
          open:'no',
          url:'check',
        },
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
      choose(url,place1,place2){

      bus.$emit('chooseMenu',{'place1':place1,'place2':place2,'nav1':false,'nav2':true});
        this.$router.push({
           path:url,
          });
      }
    }
  }

</script>