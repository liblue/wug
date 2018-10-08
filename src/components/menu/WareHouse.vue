<template>
<div  class="warehouse">
  <el-row >
  <el-col :span="22">
    <el-card shadow="never">
  <a> 请选择仓库查看订单</a>
    </el-card>
  </el-col>
  </el-row>

<el-row>
  <el-col :span="3" v-for="index in tableData"  :offset="index > 0 ? 0 : 0" style="cursor:poiner;height:300px"  :key="index.id">
    <el-card :body-style="{ padding: '0px' }" shadow="hover"  >
      <img :src="index.image_thumb" class="image"  style="height:210px"  @click="checkorder(index.id)" >
      <div style="padding: 14px;cursor:pointer;"  @click="checkorder(index.id)">
        <span  style="display:block;height:35px;word-break:break-all;overflow:hidden">{{index.name}}{{index.id}}</span>
        <div class="bottom clearfix">
          <el-button type="text" class="button" @click="checkorder(index.id)">查看订单</el-button>
        </div>
      </div>
    </el-card>
  </el-col>
</el-row>
</div>
</template>
<script>
import eventBus from '../../assets/eventBus.js'
export default {
    data(){
return{
     tableData:[],
     warehouses:[],
}
    },methods:{
      checkorder(id){
      sessionStorage.setItem('offlineid',id);
      this.$router.push({
      path:'orderlist'
  })
    },
     checksession(){
        var vm=this;
         vm.$http.post(vm.api1,{
         cmd:"checkSession",
            data:JSON.stringify({
            account:sessionStorage.getItem('account'),
            sessionid:sessionStorage.getItem('sessionid'),
         })
          }).then((res)=>{
            console.log('检查session');
            console.log(res);
            if(res.data.result.status=='996'){
           vm.$router.push({
            path:'/login',
          });
           }
        }).catch(function(err){
         console.log(err);
          });
      },
      getdata(){
         if(sessionStorage.getItem('warehouses')){
           this.tableData=JSON.parse(sessionStorage.getItem('warehouses'));
           console.log('session仓库');
           console.log(this.tableData);
           return false;
         }
        var vm=this; 
        vm.$http.post(vm.api1,{
            cmd:"getOfflineList",
            data:JSON.stringify({
            account:sessionStorage.getItem('account'),
            sessionid:sessionStorage.getItem('sessionid'),
         })
         }).then((res)=>{
           console.log(res.data.result.status);
           if(res.data.result.status=='996'){
           this.$router.push({
           path:'/login',
          });
           }
         vm.tableData=res.data.result.list;
        var warehouses=JSON.stringify(vm.tableData);
        sessionStorage.setItem('warehouses',warehouses);
        }).catch(function(err){
        console.log(err); 
          });
      },
    },mounted(){
     
    },created(){
      this.getdata();
    }
}
</script>

<style scoped>

.el-row{
  padding-left: 20px;
}
.el-col{

    margin-right:30px;
    margin-top:30px;

  }
.bottom {
    margin-top: 13px;
    margin-bottom: 13px;
    line-height: 12px;
  }
.button {
    padding: 0;
    float: right;
  }

.image {
    width:100%;
    height:100%;
    cursor:pointer;
  }

.clearfix:before,
 
  
.clearfix:after {
      clear: both
  }


  
</style>
