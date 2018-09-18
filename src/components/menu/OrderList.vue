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
    <el-tab-pane label="已完成订单" name="10"></el-tab-pane>
    <el-tab-pane label="待配货订单" name="20" ></el-tab-pane>
    <el-tab-pane label="正在配订单" name="30" ></el-tab-pane>
    <el-tab-pane label="正在配送单" name="40" ></el-tab-pane>
    <el-tab-pane label="正配送订单" name="50" ></el-tab-pane>
    <el-tab-pane label="正在配送订单" name="60" ></el-tab-pane>

  </el-tabs> 
  </div>
  <div class="sousuoform">
  <el-form :model="form" label-width="80px"  class="sousuo">
  
    <el-form-item label="拣货员">
    <el-select v-model="form.pickerid" placeholder="请选择拣货员">
      <el-option   v-for="item in pickerlist" :value="item.id"  :label="item.nick" ></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="配送员">
    <el-select v-model="form.riderid" placeholder="请选择配送员">
      <el-option   v-for="item in riderlist" :value="item.id"  :label="item.nick" ></el-option>
      
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
      prop="id" width="200px">
    </el-table-column>
      <el-table-column
      label="收货人"
      prop="receiverName" width="200px">
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
          <el-form-item label="商品名称">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="商品名称">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="商品名称">
            <span>{{ props.row.id }}</span>
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
  export default {
    data() {
      return {
        soudate:[],
        pickerlist:[ 
           
            ],
         riderlist:[
           
            ],
        form:{
        },
        soucondi:{
           orderstatus:10,
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
        activeName2:"10"
      };
    },
    methods: {
      rotate1(){
      this.isrotate1=false;//使旋转的消失
      this.isrotate2=true;//使不旋转的出现
      },
      rotate2(){
      this.isrotate2=false;
      this.isrotate1=true;
      },
      handleClick(tab,event) {
      this.soucondi={};
      this.form={};
      this.soucondi.orderstatus=tab.name;
      this.getdata();
      },
      axios1() {//获取待审核人员列表和网点信息
         var vm=this; 
         var obj={
           pickerlist:vm.$http.get('http://www.wug.com/api/userlist',{
              params:{
                offlineid:sessionStorage.getItem('offlineid'),
                type:1,
              }
         }),
           riderlist:vm.$http.get('http://www.wug.com/api/userlist',{
              params:{
                offlineid:sessionStorage.getItem('offlineid'),
                type:2,
              }
         }),
            orderlist:vm.$http.get('http://www.wug.com/api/orderlist',{
            params: vm.soucondi
        })
         };
        return  obj;
      },
      // getpickerlist(){
      //   var vm=this; 
      //   vm.$http.post('http://120.25.216.139:3300/web',{
      //       cmd:sessionStorage.getItem('cmd'),
      //       data:JSON.stringify({
      //       sessionid:sessionStorage.getItem('sessionid'),
      //       account:sessionStorage.getItem('account'),
      //       type:1,
      //       usable:1
      //    })
      //   }).then((res)=>{
      //   console.log(res.data);
      //   }).catch(function(err){
      //   console.log(err);
      //     });
      // },
      // getriderlist(){
      //   var vm=this; 
      //   vm.$http.post('http://120.25.216.139:3300/web',{
      //       cmd:sessionStorage.getItem('cmd'),
      //       data:JSON.stringify({
      //       sessionid:sessionStorage.getItem('sessionid'),
      //       account:sessionStorage.getItem('account'),
      //       type:2,
      //       usable:1
      //    })
      //   }).then((res)=>{
      //   console.log(res.data);
      //   }).catch(function(err){
      //   console.log(err);
      //     });
      // },
      // getdata(){
      //   var vm=this; 
      //   vm.$http.get('http://www.wug.com/api/orderlist',{
      //      params: vm.soucondi
      //   }).then((res)=>{
      //   console.log(res.data);
      //   vm.tableData=res.data.data;
      //   vm.tableData1=res.data.data;
      //   vm.total=vm.tableData.length;
      //   vm.tableData=vm.tableData.slice(0,this.pageSize);
      //   }).catch(function(err){
      //   console.log(err);
      //     });
      // },
        getdata(){
        var vm=this; 
        vm.$http.all([vm.axios1().pickerlist,vm.axios1().riderlist,vm.axios1().orderlist]).then(vm.$http.spread(function (res1,res2,res3) {
        vm.tableData=res3.data.data;
        vm.tableData1=res3.data.data;
        vm.total=res3.data.data.length;
        vm.tableData=vm.tableData.slice(0,vm.pageSize);
        vm.pickerlist=res1.data.data;
        vm.riderlist=res2.data.data;
        console.log('拣货员');
        console.log(vm.pickerlist);
        console.log('骑手');
        console.log(vm.riderlist);
        
        // 两个请求现在都执行完成
    }));
      },
      onSubmit(){
        this.soucondi.offlineid=sessionStorage.getItem('offlineid');
        this.soucondi.pickerid=this.form.pickerid;
        this.soucondi.riderid=this.form.riderid;
        this.soucondi.date1=this.soudate[0];
        this.soucondi.date2=this.soudate[1];
        // alert(this.soucondi.date1);
        // alert('拣货员id='+this.soucondi.pickerid);
        // alert('骑手id='+this.soucondi.riderid);
        // alert('骑手id='+this.soucondi.offlineid);

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
    mounted(){
      this.getdata();
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
