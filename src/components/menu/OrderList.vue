<template>
 <div>
   <div class="tablelist" >
   <div class="tab">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
    <el-tab-pane label="全部" name="all" ></el-tab-pane>
    <el-tab-pane label="已完成" name="60"></el-tab-pane>
    <el-tab-pane label="配送中" name="50" ></el-tab-pane>
    <el-tab-pane label="拣货完成" name="40"></el-tab-pane>
    <el-tab-pane label="拣货中" name="30" ></el-tab-pane>
    <el-tab-pane label="待拣货" name="20" ></el-tab-pane>
    <el-tab-pane label="待派单" name="10" ></el-tab-pane>
    <el-tab-pane label="关闭订单" name="close" ></el-tab-pane>
  </el-tabs> 
  </div>
  <div class="sousuoform">
  <el-form :model="form" label-width="80px"  class="sousuo">
  <el-form-item label="订单ID" style="width:15%" >
    <el-input  placeholder="请输入订单" v-model="form.orderid"  ></el-input>
  </el-form-item>
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
  <el-form-item label="起始时间" >
   <el-date-picker
      v-model="soudate"
      type="daterange"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      :default-time="['00:00:00', '23:59:59']" >
    </el-date-picker>
  </el-form-item>
  <el-form-item class="sousuo-butt">
    <el-button type="primary" @click.native="onSubmit">搜索</el-button>
    <el-button type="success" @click.native="exportToExcel">导出</el-button>
  </el-form-item>
   
</el-form>
  </div>
   <el-table
   id="table-content"
    stripe
    :data="tableData" 
    style="width: 100%">
    <!-- //  <el-table-column property="id" label="id" width="100px">
    //       </el-table-column> -->
        <el-table-column property="orderId" label="订单ID" width="250px">
    </el-table-column>
  <el-table-column
      label="创建时间"
      prop="createTime" width="200px">
    </el-table-column>
    <el-table-column
      label="地址"
      prop="deliveryAddress" width="250px">
    </el-table-column>
      <el-table-column
      label="总价"
      prop="payment" width="100px">
    </el-table-column>
    <el-table-column property="dispatchTime" label="派单时间" width="200px">
    </el-table-column>
       <el-table-column property="waittime" label="等待时长" width="100px">
    </el-table-column>
    <el-table-column property="picker.nick" label="拣货员" width="100px">
    </el-table-column>
     <el-table-column property="jiantime" label="拣货时长" width="100px">
    </el-table-column>
    <el-table-column property="rider.nick" label="配送员" width="100px">
    </el-table-column>
     <el-table-column property="peisongtime" label="配送时长" width="100px">
    </el-table-column>
       <el-table-column label="操作" width="200">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="checkinfo(scope.$index, scope.row)">详情</el-button>
            <el-button  v-if="scope.row.status==20 || scope.row.status==30 || scope.row.status==50"
          size="mini"
          type="danger"
          @click="handleerr(scope.$index, scope.row)">手动派单</el-button>
      </template>
    </el-table-column>
  </el-table>

  <div data-v-3c683a93="" class="el-pagination is-background">
    <span class="el-pagination__total">共{{total}} 条</span>
          <template  v-if="current_page!==1">
          <button type="button"   @click="changepage(current_page-1)" class="btn-prev">
          <i class="el-icon el-icon-arrow-left"></i></button>
          </template>
                <template  v-if="current_page==1">
                <button type="button" disabled="disabled"  class="btn-prev">
          <i class="el-icon el-icon-arrow-left"></i></button>
          </template>
          <ul class="el-pager">

            <template  v-if="current_page<11">
                   <template  v-for="n in 10">
                  <template v-if="current_page==n">
                  <li @click="changepage(n)" class="number active">
                  {{n}}
                </li>
                  </template>
                  <template v-if="current_page!==n&&n<=last_page">
                 <li @click="changepage(n)" class="number">
                {{n}}
                 </li>
              </template>
                 </template>
           </template>

               <template  v-if="current_page>10">
                 <li v-for="n in 6" @click="changepage(current_page-(6-n))" class="number"  v-if="current_page-(6-n)>0 && n<6" :key="n+1">
                {{current_page-(6-n)}}
                </li>

                <li class="number active" >{{current_page}}</li>

                 <li v-for="n in 4" @click="changepage(current_page+n)" class="number"  v-if="current_page+n<=last_page" :key="n+1">
                      {{current_page+n}}
                </li>
                </template>
    
            </ul>
 <template  v-if="last_page!==current_page">
          <button type="button" @click="changepage(current_page+1)" class="btn-next">
          <i class="el-icon el-icon-arrow-right"></i></button>
           </template>

            <template  v-if="last_page==current_page">
          <button type="button" disabled="disabled" class="btn-next">
            
          <i class="el-icon el-icon-arrow-right"></i></button>
           </template>
          <span class="el-pagination__jump">前往<div class="el-input el-pagination__editor is-in-pagination"><!---->
  <input type="number"  v-model="tiaopage" @blur="qianwang()"  autocomplete="off" min="1" max="1" class="el-input__inner"><!----><!----><!----></div>页</span>
  </div>



<!-- 异常处理弹框开始 -->
<el-dialog title="用户"  :visible.sync="errorVisible" width="800px" >
    <el-form >
      <el-form-item label="订单ID"  :label-width="formLabelWidth"  style="width:30%" >
     {{errorrow.orderId}}
    <span class="tip"> </span>
  </el-form-item>
    <el-form-item label="选择用户" :label-width="formLabelWidth"  class="shenheform">
      <el-select v-model="errorrow.selectaccount" placeholder="请选择用户">
        <el-option  v-for="item in selectuser"  :label="item.nick" :value="item.account" :key="item.index"></el-option>
      </el-select>
      <span class="tip"> </span>
    </el-form-item > 
    
  </el-form>
  <div slot="footer" class="dialog-footer">

    <el-button @click="errorquxiao()">取 消</el-button>

    <el-button type="primary" @click="errorqueren()">派单</el-button>
  </div>
</el-dialog>
<!-- 异常处理弹框结束 -->


<!-- 查看详情 -->
  <el-dialog title="订单商品详情" :visible.sync="infoVisible">
  <el-table :data="infoData">
    <el-table-column label="图片" width="280">
      <template slot-scope="scope">
        <img :src="scope.row.pic_path"  style="height:40px;">
      </template>
    </el-table-column>
    <el-table-column  label="名称" width="200">  
      <template slot-scope="scope">
        <a :href="scope.row.goods_url" target="_blank">{{scope.row.title}}</a>
      </template>
    </el-table-column>
    <el-table-column property="num" label="数量"></el-table-column>
    <el-table-column property="price" label="价格"></el-table-column>
    <el-table-column label="是否缺货" width="200">
      <template slot-scope="scope">
       {{scope.row.is_short}}
      </template>
    </el-table-column>
  </el-table>
<div class="message"><p>留言：{{buyerMessage}}</p></div>
</el-dialog>

<!-- 查看详情 -->

   </div>
 </div>
</template>
<script>
  import { Loading } from 'element-ui';
  import eventBus from '../../assets/eventBus.js'
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
  export default {
    data() {
      return {
        loading:true,
        soudate:'',
        year:'',
        pickerlist:[ 
            ],
        riderlist:[
            ],
        form:{
        },
        soucondi:{
           status:'all',
           closeType:'',
           page:1,
           offlineid:'',
        },
        buyerMessage:'',
        infoData: [
          
        ],
        offid:[],
        selectuser:[],//要选择的用户列表除了本订单之外
        errorrow:{
           selectaccount:'',
        },
        infoVisible:false,
        errorVisible:false,
        tableData: [],
        total:10,//总数  每次删除后要修改
        page:1,
        last_page:10,
        tiaopage:'',
        current_page:1,//当前页
        formLabelWidth: '80px' ,
       
        tabPosition: 'top',
        activeName2:"all"
      };
    },
      methods: {
      changepage(n){
       this.page=n;
       this.current_page=n;
       this.onSubmit();
      },
      qianwang(){
        if(this.tiaopage<=this.last_page && this.tiaopage>0){
        this.page=this.tiaopage;
        this.onSubmit();
        }
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
      handleClick(tab,event) {//订单列表头部选项
      
      this.soucondi={};
      this.form={};
      this.init();
      this.soucondi.status=tab.name;
      this.soucondi.offlineid=sessionStorage.getItem('offlineid');
      this.soucondi.closeType="open";
      if(tab.name==="close"){
      this.soucondi.closeType="close";
      this.soucondi.status='';
      }
      this.getorderlist();
      },
      handleerr(index,rows){//异常处理弹框;
        this.errorrow.selectaccount='';
        this.errorVisible=true;
        this.errorrow.orderId=rows.orderId;
        this.geterr(rows.orderId);//执行得到信息函数
        },
        geterr(id){//得到其他用户的列表和信息
        var vm=this; 
        vm.$http.get(vm.api2+'api/handleorder',{
         params:{
         orderId:id,
       }
         }).then((res)=>{
         console.log(res);
         vm.selectuser=res.data.data;
        }).catch(function(err){
        console.log(err);
          });
      },
      errorquxiao(){//取消处理并关闭弹框
      this.errorVisible=false;
      },
      errorqueren(){//确认处理-》逻辑处理-》关闭弹窗
      console.log('等待处理');
      console.log(this.errorrow);
    
      if(!this.errorrow.selectaccount){
          this.$message({
               message: '请选择用户',
               type: 'error',
               duration:'1000'
         });
        return false;
      }
         var vm=this; 
        vm.$http.post(vm.api1,{
            cmd:"adminHandleOrder",
            data:JSON.stringify({
            account:sessionStorage.getItem('account'),
            sessionid:sessionStorage.getItem('sessionid'),
            orderId:vm.errorrow.orderId,
            user_account:vm.errorrow.selectaccount,
         })
         }).then((res)=>{
           console.log('处理结果');
           console.log(res);
           console.log('处理结果');
           if(res.data.result.status=='996'){
            vm.$router.push({
             path:'/login',
          });
           }
        this.tableData.splice(this.idx, 1);
          if(res.data.result.status=='100'){
        this.$message({
           message: '处理完成',
           type: 'success',
           duration:'1000'
        }); 
        }
        }).catch(function(err){
        console.log(err);
          });
      this.errorVisible=false;//关闭弹窗
      },
      checkinfo(index,rows){//查看订单详情弹框
       this.infoVisible=true;
       this.getinfo(rows.orderId);
      },
 
      axios1() {//获取待审核人员列表和网点信息
         var vm=this; 
         var obj={
           pickerlist:vm.$http.get(vm.api2+'api/userlist',{
              params:{
                offlineid:sessionStorage.getItem('offlineid'),
                type:1,
                quanbu:1,
              }
         }),
            riderlist:vm.$http.get(vm.api2+'api/userlist',{
              params:{
                offlineid:sessionStorage.getItem('offlineid'),
                type:2,
                quanbu:1,
              }
         }),
            orderlist:vm.$http.get(vm.api2+'api/orderlist',{
            params:vm.soucondi
        })
         };
        return  obj;
      },
       getdata(){//初始化数据
          this.checksession();
          console.log('初始化数据');
          const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        var vm=this; 
        vm.$http.all([vm.axios1().pickerlist,vm.axios1().riderlist,vm.axios1().orderlist]).then(vm.$http.spread(function (res1,res2,res3) {
        vm.tableData=res3.data.data;
        vm.total=res3.data.total;
        vm.last_page=res3.data.last_page;
        vm.current_page=res3.data.current_page;
        vm.pickerlist=res1.data.data;
        vm.riderlist=res2.data.data;
        loading.close();
        // 两个请求现在都执行完成
    }));
       
      },
      getorderlist(){
        var vm=this; 
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        vm.$http.get(vm.api2+'api/orderlist',{
        params:vm.soucondi
         }).then((res)=>{
        vm.tableData=res.data.data;
        vm.total=res.data.total;
        vm.last_page=res.data.last_page;
        vm.current_page=res.data.current_page;
          loading.close();     

        }).catch(function(err){
        console.log(err);
          });
      },
      getinfo(orderId){//根据订单id获取商品列表
       var vm=this; 
       vm.$http.get(vm.api2+'api/orderinfo',{
         params:{
           orderId:orderId
         }
       }).then((res)=>{
       console.log('info');
       console.log(res);
       console.log('info');
       vm.infoData=res.data.data;
       vm.buyerMessage=res.data.buyerMessage;
       }).catch(function(err){
        console.log(err); 
          });
      },
      onSubmit(){
        this.checksession();
        this.soucondi.pickerid=this.form.pickerid;
        this.soucondi.riderid=this.form.riderid;
        this.soucondi.orderid=this.form.orderid;
        this.soucondi.date=this.soudate;
        this.soucondi.page=this.page;
        this.getorderlist();
      },
      getuserlist(){
        var vm=this; 
        vm.$http.get(vm.api2+'api/orderlist',{
          closeType:open,
          ststus:60,
          offlineid:52912736,
         }).then((res)=>{
        vm.tableData=res.data.data;
        vm.tableData1=res.data.data;
        vm.total=res.data.data.length;
        vm.tableData=vm.tableData.slice(0,this.pageSize);
        }).catch(function(err){
        console.log(err);
          });
      },
     exportToExcel(){



     let et = XLSX.utils.table_to_book(document.getElementById('table-content')); //此处传入table的DOM节点
     let etout = XLSX.write(et, { 
        bookType: 'xlsx', 
        bookSST: true, 
        type: 'array' 
    });
    try {
        FileSaver.saveAs(new Blob([etout], { 
            type: 'application/octet-stream' 
        }), '订单列表.xlsx');   //trade-publish.xlsx 为导出的文件名
    } catch (e) {
        console.log(e, etout) ;
    }
    return etout;
      },
      init(){
      var now = new Date;
      var week=new Date;
       week.setDate(week.getDate()-6);
      var y = now.getFullYear();
      var m = now.getMonth();
      var d = now.getDate();
      var y1 = week.getFullYear();
      var m1 = week.getMonth();
      var d1 = week.getDate();
      this.soudate=[new Date(y1, m1, d1), new Date(y, m, d)];
      // this.soudate=[new Date(2018, 9, 7), new Date(2018, 9, 30)];
      },
      },
      activated(){
    },
    watch:{
        soudate:function(val){
          var week=val[0];
          var now=val[1];
          var date=(now-week)/24/3600/1000;
          if(date>30){
             this.$message({
               message: '请选择30天以内的订单',
               type: 'error',
               duration:'1000'
         });
            this.init();
          }
     }
    },
    mounted(){
      this.init();
      this.getdata();
      this.soucondi.offlineid =sessionStorage.getItem('offlineid');
    },
    created(){
     
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

 .el-table th>.cell{
    background: gray;
    font-size: 20px;
    color: black
    font-weight：900;
  }
.th .el-table_1_column_1 .is-leaf{

  background: gray;
}
  .el-table th{
  
  }
.el-table{
    border: 1px solid #ebeef5;
}
.sousuoform{
    /* border-left:1px solid #e7eaec;
   
     border-right: 1px solid #e7eaec; */
    width:100%;
    height:70px;
    box-sizing:borderbox;
}
 .sousuo .el-form-item{
    width: 20%;
    height: 30px;
    float: left;
}
.sousuo-butt{
  margin-left: 30px;
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
        /* border-left: 1px solid #e7eaec;
        border-right: 1px solid #e7eaec; */

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

.message{
margin-top:30px;

}
.message p{
word-break: break-all;
}
  .el-pagination{
    margin-top: 30px;
  }

  .is_leaf{
    background-color: gray;
  }
 
</style>
