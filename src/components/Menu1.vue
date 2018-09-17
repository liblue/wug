<template>

  <el-row class="tac">

  <el-col :span="24">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      unique-opened
      background-color="#495060"
      text-color="#c9cbd0"
      collapse-transition
      :collapse="isCollapse"
      active-text-color="#2d8cf0">
      <div  class="logo">
      <img src="../assets/shouye.png">
      </div>
<el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
  <el-radio-button :label="false">展开</el-radio-button>
  <el-radio-button :label="true">收起</el-radio-button>
</el-radio-group>
      <el-submenu  v-for="item in menulist"  :index="item.index" >
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
        </template>
         <el-menu-item v-for="it in item.menu"  :index="it.index" @click="choose(it.url,item.title,it.title)">{{it.title}}</el-menu-item>
      </el-submenu>
      <el-menu-item index="2"  @click="choose('shop')">
        <i class="el-icon-menu"></i>
        <span slot="title">商店信息</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
      
    </el-menu>
  </el-col>
</el-row>



</template>

<script>

import bus from '../assets/eventBus';  //传值组件 中转站
  export default {
    data(){
      return {
          isCollapse: false,
          menulist:[
        {
          index: 1,
          title: '商品信息',
          icon:'el-icon-location',
          isOpened:true,
          menu: [
           {'index':'1-1','title':'商品','url':'/shouye'},
           {'index':'1-2','title':'选项2','url':'/'},
           {'index':'1-3','title':'商品分组','url':'/match'},
           {'index':'1-4','title':'新增比赛','url':'/match'}
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
          title: '拣货员管理',
          icon:'el-icon-document',
          open:'no',
          menu: [
            {'index':'3-1','title':'拣货员列表','url':'/pickerlist'},
            {'index':'3-2','title':'增加拣货员','url':'/pickerlist'},
            {'index':'3-3','title':'选项3','url':'/shouye'}
            ]
        },
        {
          index: 4,
          title: '订单管理',
          icon:'el-icon-tickets',
          open:'no',
          menu: [
            {'index':'4-1','title':'订单列表','url':'/orderlist'},
           
            {'index':'4-3','title':'选项3','url':'/shouye'}
            ]
        },
         {
          index: 5,
          title: '骑手管理',
          icon:'el-icon-tickets',
          open:'no',
          menu: [
            {'index':'5-1','title':'骑手列表','url':'riderlist'},
            {'index':'5-2','title':'选项3','url':'/shouye'}
            ]
        },
      ]
     
      }
    },
    methods: {
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

<style scoped>

    
    
 

.logo{
  text-align: center;height:90px;line-height:90px;padding-top:0px
}
.logo img{
width:85%;display: inline-block;vertical-align: middle;
}
.el-menu{
  border:0px;
}

</style>