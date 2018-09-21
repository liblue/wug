<template>
 <div>
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
  <div class="tablelist"> 
   <el-form :model="form" label-width="100px"  class="sousuo">
   <el-form-item label="待审核昵称">
       <el-col :span="25">
    <el-input v-model="form.nick"  placeholder="请输入昵称"></el-input>
       </el-col>
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
   >
    <el-table-column type="selection" width="55"></el-table-column>
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
          @click="handleShenhe(scope.$index, scope.row)">审核</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[2,5, 10]"
      :page-size="pageSize"  
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  <!-- 分页 -->
  </div>
  <!-- 删除框弹出 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow" >确 定</el-button>
            </span>
        </el-dialog>
<!-- 删除框弹出 -->
<!-- 审核 -->
<el-dialog title="用户"  :visible.sync="editVisible" width="800px" height="600px">
    <el-form >
    <el-form-item label="选择网点" :label-width="formLabelWidth"  class="shenheform">
      <el-select v-model="userinfo.offid" placeholder="请选择网点">
        <el-option  v-for="item in offlist"  :label="item.name" :value="item.id"></el-option>
      </el-select>
      <span class="tip"> </span>
    </el-form-item > 
  </el-form>
  <div slot="footer" class="dialog-footer">
    <!-- <el-button @click="editVisible = false">取 消</el-button> -->

    <el-button @click="shenhequxiao()">取 消</el-button>
    <el-button type="primary" @click="shenhe(1)">审核为拣货员</el-button>
    <el-button type="primary" @click="shenhe(2)">审核为配送员</el-button>
  </div>
</el-dialog>
<!-- 审核 -->

 </div>
</template>
<script>
  import eventBus from '../../assets/eventBus.js'
  export default {
    data() {
      return {
        isrotate1:false,
        isrotate2:true,
        form:{
        },
        soudate:[],
        soucondi:{},
        row:{},
        tableData: [
        ],
        tableData1:[
        ],
        offlist:[],
        userinfo:{},
        editVisible:false,
        delVisible:false,
        delarr:[],
        multipleSelection:[],
        total:80,//总数  每次删除后要修改
        pageSize:10,//默认每页的数量
        currentPage:1,//当前页
        formLabelWidth: '80px' ,
        index:1,
      }
    },
    methods: {
      logout(){
      this.$router.push({  
           path:'/',
          });
      },
      rotate1(){//打开侧边栏
      eventBus.$emit('myfun','open')
      this.isrotate1=false;//使旋转的消失
      this.isrotate2=true;//使不旋转的出现
      },
      rotate2(){//收起侧边栏
      eventBus.$emit('myfun','close')
      this.isrotate2=false;
      this.isrotate1=true;
      },
      routeshouye(){
         eventBus.$emit('myfun','shouye');
        this.$router.push({  
           path:'/shouye',
          });
      },
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
      handleDelete:function(index,rows){
        this.userinfo=rows;  
        this.idx = index;
        this.delVisible=true;
      },
      handleShenhe(index,rows){
        this.userinfo=rows;  
        this.idx = index;
        this.editVisible=true;
      },
      shenhequxiao(){
        this.userinfo.offid='';
        this.editVisible=false;
      },
      shenhe(type){//逻辑实现
        if(!this.userinfo.offid){   
           this.$message({
           message: '请选择网点',
           type: 'error',
           duration:'1000'
        }); 
          return false;
        }
        this.editVisible=false;
        var vm=this; 
        vm.$http.post('http://192.168.0.89:3300/web',{
            cmd:"userVerify",
            data:JSON.stringify({
            account:sessionStorage.getItem('account'),
            sessionid:sessionStorage.getItem('sessionid'),
            user_account:vm.userinfo.account,
            user_offlineid:vm.userinfo.offid,
            user_type:type,
         })
         }).then((res)=>{
        console.log(res.data.cmd);
        console.log('审核中');
        console.log(res.data.result.status);
        this.tableData.splice(this.idx, 1);
        this.$message({
           message: '审核完成',
           type: 'success',
           duration:'1000'
        }); 
        }).catch(function(err){
        console.log(err);
          });
          this.userinfo.offid='';
      },
      axios1() {//获取待审核人员列表和网点信息
         var vm=this; 
         var obj={
              userlist:vm.$http.get('http://www.wug.com/api/userlist',{
              params:{
              type:0,
              usable:0
              }
         }),
            offlist:vm.$http.post('http://192.168.0.89:3300/web',{
            cmd:"getOfflineList",
            data:JSON.stringify({
            account:sessionStorage.getItem('account'),
            sessionid:sessionStorage.getItem('sessionid'),
         })
         })

         };
        return  obj;
      },
      getdata(){
        var vm=this; 
        vm.$http.all([vm.axios1().offlist,vm.axios1().userlist]).then(vm.$http.spread(function (lateres,res) {
            console.log(vm.offlist);
          console.log('请求');
          console.log(res);
          console.log('请求1');
          console.log(lateres);
        vm.tableData=res.data.data;
        vm.tableData1=res.data.data;
        vm.total=res.data.data.length;
        vm.tableData=vm.tableData.slice(0,vm.pageSize);
        vm.offlist=lateres.data.result.list;
        
        // 两个请求现在都执行完成
  }));
      },
      soudata(){
        var vm=this; 
        vm.$http.get('http://www.wug.com/api/userlist',{
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
     
      deleteRow(){
        this.tableData.splice(this.idx, 1);
        this.$message({
           message: '已删除',
           type: 'success',
           duration:'1000'
        });
        this.total=this.total-1;//每次删除后总条数减1，
        this.delVisible = false;
      },
       indexMethod(index) {//第一列序号
        index=index+(this.currentPage-1)*this.pageSize+1;
        return index;
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
   
      onSubmit(){//提交搜索条件
        this.soucondi.nick=this.form.nick;
        this.soucondi.date1=this.soudate[0];
        this.soucondi.date2=this.soudate[1];
        this.soucondi.type=0;
        this.soucondi.userable=0;
        this.soudata();
      },
    },
      mounted(){
    },
      created(){
      this.getdata()
    }
  }
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
