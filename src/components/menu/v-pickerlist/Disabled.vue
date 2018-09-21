<template>
 <div>
   <el-form :model="form" label-width="80px"  class="sousuo">
   <el-form-item label="用户昵称">
       <el-col :span="25">
    <el-input v-model="form.nick"  placeholder="请输入昵称"></el-input>
       </el-col>
  </el-form-item>
  <el-form-item label="选择网点">
    <el-select v-model="form.offid" placeholder="请选择活动区域">
      <el-option :label="item.name" :value="item.id"  v-for="item in offlist" ></el-option>
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
 <el-table
    :data="tableData"
    style="width: 100%">
    <!-- <el-table-column type="selection" width="55"></el-table-column> -->
    <el-table-column
      type="index"
      :index="indexMethod"></el-table-column>
    <el-table-column
      prop="account"
      label="账号"
      width="220">
    </el-table-column>
    <el-table-column
      prop="nick"
      label="昵称"
      width="350"
      :formatter="formatter">
    </el-table-column>
     <el-table-column
      prop="createtime"
      label="创建时间"
      width="200"
      >
    </el-table-column>
    <el-table-column
      prop="type"
      label="类型"
      width="50"
      >
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.type === '家' ? 'primary' : 'success'"
          disable-transitions>{{scope.row.type}}</el-tag>
      </template>
    </el-table-column>

     <el-table-column label="操作" width="280">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="handleQi(scope.$index, scope.row)">启用</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
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
  <!-- 分页 -->
  <!-- 删除框弹出 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow" >确 定</el-button>
            </span>
        </el-dialog>
<!-- 删除框弹出 -->
  <!-- 删除框弹出 -->
        <el-dialog title="提示" :visible.sync="jinVisible" width="300px" center>
            <div class="del-dialog-cnt">是否确定启用？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="jinVisible = false">取 消</el-button>
                <el-button type="primary" @click="qiYong()" >确 定</el-button>
            </span>
        </el-dialog>
<!-- 删除框弹出 -->
 </div>
</template>
<script>
  export default {
    data() {
      return {
        form:{
        },
        soudate:[],
        soucondi:{},
        row:{},
        tableData: [
        ],
        tableData1:[
        ],
        soucon:{},
        offlist:[],
        delVisible:false,
        jinVisible:false,
        userinfo:{},
        msg:"",
        delarr:[],
        multipleSelection:[],
        total:10,//总数  每次删除后要修改
        pageSize:10,//默认每页的数量
        currentPage:1,//当前页
        formLabelWidth: '80px' ,
        index:1,
      }
    },
    methods: {
      formatter(row, column) {
        return row.nick;
      },
      filterTag(value, row) {
        return row.type === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      indexMethod(index) {//第一列序号
        index=index+(this.currentPage-1)*this.pageSize+1;
        return index;
      },
      handleSizeChange(val) {//展示多少页
        this.pageSize=val;
        this.tableData=this.tableData1;//重新获取
        this.tableData=this.tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
      },
      handleCurrentChange(val) {//分页  点击页数
        this.currentPage=val;
        this.tableData=this.tableData1;
        this.tableData=this.tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
      },
      handleQi(index,rows){
        this.userinfo=rows;     
        this.jinVisible=true;
      },
      handleDelete:function(index,rows){//打开删除弹窗
        this.idx = index;
        this.userinfo=rows; 
        this.delVisible=true;
      },
     qiYong(){
        this.jinVisible=false;//关闭弹出框
        var vm=this; 
        vm.$http.post(vm.api1,{
            cmd:"userEnable",
            data:JSON.stringify({
            account:sessionStorage.getItem('account'),
            sessionid:sessionStorage.getItem('sessionid'),
            user_account:vm.userinfo.account,
         })
         }).then((res)=>{
            if(res.data.result.status=='996'){
           vm.$router.push({
           path:'/login',
          });
           }
           console.log('启用中');
           console.log(res);
           vms.$message({
               message: '已启用',
               type: 'success',
               duration:'1000'
         });
        }).catch(function(err){
        console.log(err); 
          });
      this.tableData.splice(this.idx, 1);
      },
      deleteRow(){//逻辑实现删除一行
        this.delVisible = false;
        var vm=this; 
        vm.$http.post(vm.api1,{
            cmd:"userDelete",
            data:JSON.stringify({
            account:sessionStorage.getItem('account'),
            sessionid:sessionStorage.getItem('sessionid'),
            user_account:vm.userinfo.account,
         })
         }).then((res)=>{
        if(res.data.result.status=='996'){
           vm.$router.push({
           path:'/login',
          });
           }
           
           console.log('禁用中');
           console.log(res);
           vms.$message({
               message: '已删除',
               type: 'success',
               duration:'1000'
         });
        }).catch(function(err){
         console.log(err); 
          });
        this.total=this.total-1;//每次删除后总条数减1，
        this.tableData.splice(this.idx, 1);
      },
       axios1() {//获取待审核人员列表和网点信息
         var vm=this; 
         var obj={
            userlist:vm.$http.get(vm.api2+'userlist',{
              params:{
                type:1,
                usable:0
              }
         }),
            offlist:vm.$http.post(vm.api1,{
            cmd:"getOfflineList",
            data:JSON.stringify({
            account:sessionStorage.getItem('account'),
            sessionid:sessionStorage.getItem('sessionid'),
         })
         })
         };
        return  obj;
      },
       getuserlist(){
          var vm=this; 
              vm.$http.get(vm.api2+'userlist',{
               params:{
                type:1,
                usable:0
              }
         }).then((res)=>{

           
          vm.tableData=res.data.data;
          vm.tableData1=res.data.data;
          vm.total=res.data.data.length;
          vm.tableData=vm.tableData.slice(0,vm.pageSize);
        }).catch(function(err){
        console.log(err); 
          });
        // 两个请求现在都执行完成
        },
          getdata(){
        if(sessionStorage.getItem('warehouses')){
           this.offlist=JSON.parse(sessionStorage.getItem('warehouses'));
           console.log('session仓库');
           this.getuserlist();
           return false;
         }
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        var vm=this; 
        vm.$http.all([vm.axios1().offlist,vm.axios1().userlist]).then(vm.$http.spread(function (lateres,res) {
        vm.tableData=res.data.data;
        vm.tableData1=res.data.data;
        vm.total=res.data.data.length;
        vm.tableData=vm.tableData.slice(0,vm.pageSize);
        if(lateres.data.result.status=='996'){
           vm.$router.push({
           path:'/login',
          });
           }
        vm.offlist=lateres.data.result.list;
        var warehouses=JSON.stringify(vm.offlist);
        sessionStorage.setItem('warehouses',warehouses);
        loading.close();
        // 两个请求现在都执行完成
    }));
      },
      soudata(){
        var vm=this; 
        vm.$http.get(this.api2+'userlist',{
           params: vm.soucondi
         }).then((res)=>{
        vm.tableData=res.data.data;
        vm.tableData1=res.data.data;
        vm.total=res.data.data.length;
        vm.tableData=vm.tableData.slice(0,this.pageSize);
        }).catch(function(err){
        console.log(err);
          });
      },
      onSubmit(){//提交搜索条件
        this.soucondi.nick=this.form.nick;
        this.soucondi.offlineid=this.form.offid;
        this.soucondi.date1=this.soudate[0];
        this.soucondi.date2=this.soudate[1];
        this.soucondi.type=1;
        this.soucondi.usable=0;
        this.soudata();
      },
    },
      mounted(){
    // this.getofflist();
    },
    created(){
       this.getdata();
    }
  }
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
.username{
     cursor: pointer;

    }
</style>
