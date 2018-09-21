<template>
 <div>
    <div id="header">
    <div class="left">
    <i  v-show="isrotate1"  class="fa fa-bars fa-2x fa-rotate-90" aria-hidden="true"  style="color: #606266;"  @click="rotate1()"></i>
    <i  v-show="isrotate2"  class="fa fa-bars fa-2x " aria-hidden="true"  style="color: #606266;"  @click="rotate2()"></i>
    <el-breadcrumb separator="/" >
  <el-breadcrumb-item ><a  @click="routeshouye()">首页</a></el-breadcrumb-item>
  <el-breadcrumb-item><a>用户管理</a></el-breadcrumb-item>
  <el-breadcrumb-item>配送员列表</el-breadcrumb-item>
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
<div style="text-align:center;margin-top:10px;padding-bottom:10px">
<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-menu-item index="1"  indexPath="23"  @click="chooseMenu('rnormal')">配送员列表</el-menu-item>
  <el-menu-item index="2"  @click="chooseMenu('rdisabled')">禁用列表</el-menu-item>

  <!-- <el-submenu index="2">
    <template slot="title">我的工作台</template>
    <el-menu-item index="2-1">选项1</el-menu-item>
    <el-menu-item index="2-2">选项2</el-menu-item>
    <el-menu-item index="2-3">选项3</el-menu-item>
    <el-submenu index="2-4">
      <template slot="title">选项4</template>
      <el-menu-item index="2-4-1">选项1</el-menu-item>
      <el-menu-item index="2-4-2">选项2</el-menu-item>
      <el-menu-item index="2-4-3">选项3</el-menu-item>
    </el-submenu>
  </el-submenu> -->
  <!-- <el-menu-item index="3" disabled>消息中心</el-menu-item>
  <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item> -->
</el-menu>
</div>
   <div class="tablelist">
   <router-view></router-view>
   </div>
 </div>
</template>
<script>
  import eventBus from '../../assets/eventBus.js'
  export default {
    data() {
      return {
        isrotate1:false,
        isrotate2:true,
        activeIndex: '1',
        tabPosition: 'top',
        activeName2: 'finished'
      };
    },
    methods: {
      logout(){
      sessionStorage.clear();
      this.$router.push({  
           path:'/',
          });
      },
      routeshouye(){
      eventBus.$emit('myfun','shouye');
      this.$router.push({
           path:'/shouye',
          });
      },
      rotate1(){//打开侧边栏
      eventBus.$emit('myfun','open')
      this.isrotate1=false;//使旋转的消失
      this.isrotate2=true;//使不旋转的出现
      sessionStorage.setItem('isrotate1',1);
      },
      rotate2(){//收起侧边栏
      eventBus.$emit('myfun','close')
      
      this.isrotate2=false;
      this.isrotate1=true;
      sessionStorage.setItem('isrotate1',2);
      },
      checkrotate(){
        if(sessionStorage.getItem('isrotate1')==2){
         this.isrotate2=false;
         this.isrotate1=true;
        }
         if(sessionStorage.getItem('isrotate1')==1){
          this.isrotate1=false;//使旋转的消失
          this.isrotate2=true;//使不旋转的出现
        }
      },
      handleClick(tab,event) {
       this.$router.push({
           path:tab.name,
          });
      },
       handleSelect(tab,event) {
        
       this.$router.push({
           path:tab.name,
          });
      }, 
      chooseMenu(path){
      this.$router.push({
           path:path,
          });

      },
    },
    mounted(){
      this.checkrotate();
    }
  };
</script>


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
    height: 60px;
    display: flex;
    box-shadow: 0 2px 1px 1px rgba(100,100,100,0.1);
    padding: 0 20px;

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
.el-table{
      border: 1px solid #ebeef5;
}
 .sousuo .el-form-item{
    width: 20%;
    height: 30px;
    float: left;
}
.tab{
 
text-align: center;
}
.tablelist{
    padding-left:10px;
    padding-right: 10px;
 
}
.el-tab-pane{
border:none;

}
.el-tabs{
border:none;

}
.el-menu{
  border:none;
}

.username{

  cursor:pointer;
}
</style>
