<template>
<div>
   <div id="header">
    <div class="left">
   <i  v-show="isrotate1"  class="fa fa-bars fa-2x fa-rotate-90" aria-hidden="true"  style="color: #606266;"  @click="rotate1()"></i>
   <i  v-show="isrotate2"  class="fa fa-bars fa-2x " aria-hidden="true"  style="color: #606266;"  @click="rotate2()"></i>
     <el-breadcrumb separator="/" >
  <el-breadcrumb-item ><a>首页</a></el-breadcrumb-item>
 
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
          <el-dropdown-item command="center"><router-link tag="li" to="adminadd">个人中心</router-link></el-dropdown-item>
          <el-dropdown-item command="logout"><a  @click="logout()">退出登录</a></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
  <div class="card">
  <el-row >
  <el-col :span="22">
    <el-card shadow="hover">
   <router-link to="warehouse">订单列表</router-link>
    </el-card>
  </el-col>
  <el-col :span="22">
    <el-card shadow="hover"  >
    <router-link to="pickerlist">拣货员列表</router-link>
    </el-card>
  </el-col>
  <el-col :span="22">
    <el-card shadow="hover">
   <router-link to="riderlist">配送员列表</router-link>
    </el-card>
  </el-col>
    <el-col :span="22">
    <el-card shadow="hover">
     <router-link to="check">待审核列表</router-link>
    </el-card>
  </el-col>
</el-row>
</div>
  </div>
   
</template>
<script>
import eventBus from '../../assets/eventBus.js'
export default {
 
  data () {
    return {
       isrotate1:false,
       isrotate2:true,
       currentDate: new Date()
    }
  },
  mounted(){
      
  },
  methods: {
      logout(){
      sessionStorage.clear() 
      this.$router.push({  
           path:'/',
          });
      },
      rotate1(){//打开侧边栏
      eventBus.$emit('myfun','open')
      this.isrotate1=false;//使旋转的消失
      this.isrotate2=true;//使不旋转的出现
      },
      rotate2(){//收起侧边栏
      eventBus.$emit('myfun','close')
      this.isrotate2=false;
      this.isrotate1=true;
      },
     
   
  },
  activated(){
   
  },
  create(){
     
  }
}
</script>

<style  scoped>

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }
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
    height: 60px;
    display: flex;
    box-shadow: 0 2px 1px 1px rgba(100,100,100,0.1);
    padding: 0 20px;
    margin-bottom:10px; 
}
#header>div {
    
    display: flex;
    align-items: center;
}
.el-breadcrumb{
    margin-left: 30px;
}
.username{
  cursor: pointer;
}
  .el-row{
    padding-left: 20px;
  }
.el-col{
  margin-top:30px;
  cursor: pointer;
}
.el-card:hover a{

  color:rgb(45, 140, 240);
}
</style>
