<template>
 <div>
 
<div style="text-align:center;padding-bottom:10px">
<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-menu-item index="1"  indexPath="23"  @click="chooseMenu('normal')">拣货员列表</el-menu-item>
  <el-menu-item index="2"  @click="chooseMenu('disabled')">拣货员禁用列表</el-menu-item>
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
    },
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
/*.sousuo{
    width:10%
}

.el-dialog {

height:800px;

}
.edit-dialog .el-input{
  width:300px
}
 .edit-dialog .el-form-item{
 clear: both;
} */

</style>
