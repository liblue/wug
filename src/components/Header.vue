<template>
  <div id="header">
<div class="left">
   <i class="el-icon-edit"></i>
    <el-breadcrumb separator="/"  v-show="nav1">
  <el-breadcrumb-item ><a  style="font-weight:700">首页</a></el-breadcrumb-item>
  </el-breadcrumb>
     <el-breadcrumb separator="/" v-show="nav2" >
  <el-breadcrumb-item ><a  @click="routeshouye()">首页</a></el-breadcrumb-item>
  <el-breadcrumb-item><a>{{place1}}</a></el-breadcrumb-item>
  <el-breadcrumb-item>{{place2}}</el-breadcrumb-item>
  </el-breadcrumb>
    </div>
  <div class="right">
      <i class="el-icon-rank"  title="全屏"></i>
      <el-dropdown class="faceAndMenu">
        <span class="el-dropdown-link">
          <div class="face">
            <i class="iconfont icon-user"></i>
          </div>
          <span class="username">sdfsdfsdf</span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="center">个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出登陆</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>

import bus from '../assets/eventBus';

  export default {
    data() {
      return {
        bianliang1:'',
        nav1:true,
        nav2:false,
        place1:'',
        place2:'',
        activeIndex: '1',
        activeIndex2: '1',
        breadcrumb:[1,2,3],
      };
    },
    methods: {
      closenav1(){
       this.nav1=false;
      },
       closenav2(){
       this.nav2=false;
      },
      opennav1(){
       this.nav1=true;
      },
       opennav2(){
       this.nav2=true;
      },
      // start(){
      //   this.place1=sessionStorage.getItem('place1');
      //   this.place2=sessionStorage.getItem('place2');
      //   this.bianliang1=sessionStorage.getItem('binaliang1');

       

      //   if(window.sessionStorage.getItem('nav1')!==null){
      //       this.nav1=sessionStorage.getItem('nav1');
      //       this.nav2=sessionStorage.getItem('nav2');
      //   }
       
       
      // },
      getNav(){
        var self=this;
        bus.$on('chooseMenu',function(data){
             self.place1=data.place1;
             self.place2=data.place2;
             self.opennav2();
             self.closenav1();
            //  self.nav1=false;
            //  self.nav2=true;
       });
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      routeshouye(){
       sessionStorage.setItem('nav1',true);
       sessionStorage.setItem('nav2',false);

       this.closenav2();
       this.opennav1();
          this.$router.push({
           path:'shouye',
          });
      }
    },
     mounted(){
       this.getNav();
       this.start();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


#header .icon, #header .left .icon-menu, #header .right .el-icon-rank {
    font-size: 24px;
    transition: 0.2s all ease-in-out;
    cursor: pointer;
    color: #606266;
}

.icon-menu:before {
    content: "\e7f4";
}

#header{
   display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: justify;
    justify-content: space-between;
    width: 100%;
}

#header>div {
    
    display: flex;
    align-items: center;
}
.right{

    float: right;
}
.el-dropdown-menu{
    cursor: pointer;
}
.left{
line-height: 60px;
    float: left;
}
  .el-breadcrumb{
    margin-left: 30px;
}
</style>
