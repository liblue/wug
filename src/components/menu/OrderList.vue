<template>
 <div>
 
<!-- <div style="text-align:center;margin-top:10px;margin-bottom:20px;border-bottom:1px solid gray;border-left:1px solid #e4e7ed;border-right:1px solid #e4e7ed">
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"  >
  <el-menu-item index="1"  indexPath="23"  @click="choosemenu('finished')">待派单</el-menu-item>
  <el-menu-item index="2"  @click="choosemenu('wating')">待拣货</el-menu-item>
  <el-menu-item index="3" @click="choosemenu('deliver')">拣货中</el-menu-item>
  <el-menu-item index="4" @click="choosemenu('deliver')">拣货完成</el-menu-item>
  <el-menu-item index="5" @click="choosemenu('deliver')">配送中</el-menu-item>

  <el-menu-item index="6" @click="choosemenu('deliver')">配送完成</el-menu-item>
</el-menu>
</div> -->
   <div class="tablelist" >
   <div class="tab">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
    <el-tab-pane label="已完成" name="60"></el-tab-pane>
    <el-tab-pane label="配送中" name="50" ></el-tab-pane>
    <el-tab-pane label="检货完成" name="40" ></el-tab-pane>
    <el-tab-pane label="拣货中" name="30" ></el-tab-pane>
    <el-tab-pane label="待拣货" name="20" ></el-tab-pane>
    <el-tab-pane label="待派单" name="10" ></el-tab-pane>
    <el-tab-pane label="关闭订单" name="close" ></el-tab-pane>
  </el-tabs> 
  </div>
  <div class="sousuoform">
  <el-form :model="form" label-width="80px"  class="sousuo">
  
    <el-form-item label="拣货员">
    <el-select v-model="form.pickerid" placeholder="请选择拣货员">
      <el-option   v-for="item in pickerlist" :value="item.id" :key="item.key" :label="item.nick" ></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="配送员">
    <el-select v-model="form.riderid" placeholder="请选择配送员">
      <el-option   v-for="item in riderlist" :value="item.id" :key="item.key"   :label="item.nick" ></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="起始时间" style="width:25%">
   <el-date-picker
      v-model="soudate"
      type="daterange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-time="['00:00:00', '23:59:59']">
    </el-date-picker>
  </el-form-item>
  <el-form-item class="sousuo">
    <el-button type="primary" @click="onSubmit">搜索</el-button>
  </el-form-item>
</el-form>
  </div>
   <el-table
    :data="tableData" 
    style="width: 100%">
    <el-table-column
      label="商品 ID"
      prop="orderId" width="200px">
    </el-table-column>
      <el-table-column
      label="收货人"
      prop="status" width="200px">
    </el-table-column>
          <el-table-column
      label="收货人联系方式"
      prop="receiverTel" width="120px">
    </el-table-column>
      <el-table-column
      label="商品 ID"
      prop="id" width="200px">
    </el-table-column>
    <el-table-column
      label="地址"
      prop="addressExtra" width="200px">
    </el-table-column>
      <el-table-column
      label="日期"
      prop="createTime" width="200px">
    </el-table-column>
    <el-table-column
      label="描述"
      prop="deliveryAddress" width="200px">
    </el-table-column>
      <el-table-column type="expand">
      <template slot-scope="props" width="50px">
        <el-form label-position="center" inline class="demo-table-expand">

          <el-form-item label="商品名称"  v-for=" item,index in props.row.orders"  :value="item.value"  >
            <span>{{  item.title }}</span>
          </el-form-item>
          
        </el-form>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[2,5, 10]"
      :page-size="pageSize"  
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
   </div>
 </div>
</template>
<script>
  import { Loading } from 'element-ui';
  import eventBus from '../../assets/eventBus.js'
  export default {
    data() {
      return {
        loading:true,
        soudate:[],
        pickerlist:[ 
            ],
         riderlist:[
            ],
        form:{
        },
        soucondi:{
           status:60,
           closeType:'open',
        },
        tableData: [],
        tableData1:[],
        total:80,//总数  每次删除后要修改
        pageSize:10,//默认每页的数量
        currentPage:1,//当前页
        formLabelWidth: '80px' ,
        isrotate1:false,
        isrotate2:true,
        activeIndex: '1',
        tabPosition: 'top',
        activeName2:"60"
      };
    },
    methods: {
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
      this.soucondi={};
      this.form={};
      this.soucondi.status=tab.name;
      this.soucondi.offlineid=sessionStorage.getItem('offlineid');
      this.soucondi.closeType="open";
      if(tab.name=="close"){
      this.soucondi.closeType="close";
      }
      this.getdata();
      },
      axios1() {//获取待审核人员列表和网点信息
         var vm=this; 
         var obj={
           pickerlist:vm.$http.get(vm.api2+'userlist',{
              params:{
                offlineid:sessionStorage.getItem('offlineid'),
                type:1,
              }
         }),
           riderlist:vm.$http.get(vm.api2+'userlist',{
              params:{
                offlineid:sessionStorage.getItem('offlineid'),
                type:2,
              }
         }),
            orderlist:vm.$http.get(vm.api2+'orderlist',{
            params: vm.soucondi
        })
         };
        return  obj;
      },
        getdata(){
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        var vm=this; 
        vm.$http.all([vm.axios1().pickerlist,vm.axios1().riderlist,vm.axios1().orderlist]).then(vm.$http.spread(function (res1,res2,res3) {
        vm.tableData=res3.data.data;
        vm.tableData1=res3.data.data;
        vm.total=res3.data.data.length;
        vm.tableData=vm.tableData.slice(0,vm.pageSize);
        vm.pickerlist=res1.data.data;
        vm.riderlist=res2.data.data;
        loading.close();
        // 两个请求现在都执行完成
    }));
      },
      onSubmit(){
        this.soucondi.offlineid=sessionStorage.getItem('offlineid');
        this.soucondi.pickerid=this.form.pickerid;
        this.soucondi.riderid=this.form.riderid;
        this.soucondi.date1=this.soudate[0];
        this.soucondi.date2=this.soudate[1];
        this.getdata();
      },
      handleSizeChange(val) {
        this.pageSize=val;
        this.tableData=this.tableData1;//重新获取
        this.tableData=this.tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
      },
      handleCurrentChange(val) {
        this.currentPage=val;
        this.tableData=this.tableData1;
        this.tableData=this.tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
      },
    },
    activated(){
    },
    mounted(){
      this.checkrotate();
    },
    created(){
    this.getdata();
    }
  };
</script>



<style scoped>
 body {
    margin: 0;
  }
#header .icon, #header .left .icon-menu, #header .right .el-icon-rank {
    font-size: 24px;
    transition: 0.2s all ease-in-out;
    cursor: pointer;
    color: #606266;
}
.fa{
  cursor: pointer;
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
.sousuoform{
    border-left:1px solid #e7eaec;
    width:100%;
    height:70px;
}
 .sousuo .el-form-item{
    width: 20%;
    height: 30px;
    float: left;
}
.tab{
    text-align: center;
    margin-top:20px;
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
.username{
    cursor:pointer;
}
.el-table{
    border: 1px solid #ebeef5;
}
.sousuo .el-form-item{
    width: 20%;
    height: 30px;
    float: left;
}
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
