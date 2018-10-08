<template>
 <div>
    
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
        activeIndex: '1',
        tabPosition: 'top',
        activeName2: 'finished'
      };
    },
    methods: {
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
     
    }
  };
</script>


<style scoped>

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
