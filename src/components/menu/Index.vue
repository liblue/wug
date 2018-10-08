<template>
<div>
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
