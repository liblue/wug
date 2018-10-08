<template>
<div id="header">
    <div class="left">
   <i  v-show="isrotate1"  class="fa fa-bars fa-2x fa-rotate-90" aria-hidden="true"  style="color: #606266;"  @click="rotate1()"></i>
   <i  v-show="isrotate2"  class="fa fa-bars fa-2x " aria-hidden="true"  style="color: #606266;"  @click="rotate2()"></i>
     <el-breadcrumb separator="/" >
  <el-breadcrumb-item ><a  @click="routeshouye()">首页</a></el-breadcrumb-item>
  <el-breadcrumb-item><a>用户列表</a></el-breadcrumb-item>
  <el-breadcrumb-item>待审核列表</el-breadcrumb-item>
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
          <el-dropdown-item command="center"  ><router-link tag="li" to="adminadd">个人中心</router-link></el-dropdown-item>
          <el-dropdown-item command="logout"><a  @click="logout()">退出登录</a></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>


<script>
export default {
    
}
</script>

<style scoped>

#header .icon, #header .left .icon-menu, #header .right .el-icon-rank {
    width:100%;
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
.tablelist{
    padding-left:10px;
    padding-right: 10px;
}
.el-table{

      border: 1px solid #ebeef5;
}
.shenheform{

  float:left;
}
 .sousuo .el-form-item{
    width: 20%;
    height: 30px;
    float: left;
}
.fa{
  cursor: pointer;
}
.username{
  cursor: pointer;
}

</style>
