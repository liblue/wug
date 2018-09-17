<template>
 <div>
 <div id="header">
    <div class="left">
   <i  v-show="isrotate1"  class="fa fa-bars fa-2x fa-rotate-90" aria-hidden="true"  style="color: #606266;"  @click="rotate1()"></i>
   <i  v-show="isrotate2"  class="fa fa-bars fa-2x " aria-hidden="true"  style="color: #606266;"  @click="rotate2()"></i>
     <el-breadcrumb separator="/" >
  <el-breadcrumb-item ><a  @click="routeshouye()">首页</a></el-breadcrumb-item>
  <el-breadcrumb-item><a>管理员管理</a></el-breadcrumb-item>
  <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
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
          <el-dropdown-item command="center"  ><router-link tag="li" to="login">个人中心</router-link></el-dropdown-item>
          <el-dropdown-item command="logout"><a  @click="logout()">退出登陆</a></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
  <div class="tablelist"> 
   <el-form :model="form" label-width="80px"  class="sousuo">
   <el-form-item label="活动名称">
       <el-col :span="25">
    <el-input v-model="form.name"  ></el-input>
       </el-col>
  </el-form-item>
  <el-form-item label="活动区域">
    <el-select v-model="form.type" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
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
    <el-form v-model="row">
    <el-form-item label="用户IDD" :label-width="formLabelWidth">
      <el-input v-model="row.id" auto-complete="off" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="用户昵称" :label-width="formLabelWidth">
      <el-input v-model="row.nick" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="用户头像" :label-width="formLabelWidth">
      <el-input v-model="row.avatar" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" :label-width="formLabelWidth">
      <el-input v-model="row.createtime" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="活动区域" :label-width="formLabelWidth">
      <el-select v-model="row.imgurl" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editVisible = false">取 消</el-button>
    <!-- <el-button @click="editquxiao()">取 消</el-button> -->
    <el-button type="primary" @click="edit()">确 定</el-button>
  </div>
</el-dialog>
<!-- 审核 -->

 </div>
</template>
<script>
  export default {
    data() {
      return {
        isrotate1:false,
        isrotate2:true,
        soudate:'',
        form:{
        },
        sousuocondi:{},
        row:{},
        tableData: [
          {id:1,nick:"小红222222",account:"aaaaaa",avatar:"11111111111",type:"1",createtime:"素履之往"},
          {id:2,nick:"小红",account:"aaaaaa",avatar:"11111111111",type:"1",createtime:"素履之往"},
          {id:3,nick:"小红",account:"aaaaaa",avatar:"11111111111",type:"1",createtime:"素履之往"},
          {id:4,nick:"小红",account:"aaaaaa",avatar:"11111111111",type:"1",createtime:"素履之往"},
          {id:5,nick:"小红",account:"aaaaaa",avatar:"11111111111",type:"1",createtime:"素履之往"},
          {id:6,nick:"小红",account:"aaaaaa",avatar:"11111111111",type:"1",createtime:"素履之往"},
          {id:7,nick:"小红",account:"aaaaaa",avatar:"11111111111",type:"1",createtime:"素履之往"},
          {id:8,nick:"小红",account:"aaaaaa",avatar:"11111111111",type:"1",createtime:"素履之往"},
          {id:9,nick:"小红",account:"aaaaaa",avatar:"11111111111",type:"1",createtime:"素履之往"},
          {id:12,nick:"小红",account:"aaaaaa",avatar:"11111111111",type:"1",createtime:"素履之往"},
          {id:13,nick:"小红",account:"aaaaaa",avatar:"11111111111",type:"1",createtime:"素履之往"},
          {id:14,nick:"小红",account:"aaaaaa",avatar:"11111111111",type:"1",createtime:"素履之往"},
          {id:10,nick:"小红",account:"aaaaaa",avatar:"11111111111",type:"1",createtime:"素履之往"},
          {id:15,nick:"小红",account:"aaaaaa",avatar:"11111111111",type:"1",createtime:"素履之往"},
          {id:16,nick:"小红",account:"aaaaaa",avatar:"11111111111",type:"1",createtime:"素履之往"},
        ],
        tableData1:[
          {id:1,nick:"小红",account:"aaaaaa",avatar:"11111111111",type:"1",createtime:"素履之往"},
          {id:2,nick:"小红",account:"aaaaaa",avatar:"11111111111",type:"1",createtime:"素履之往"},
          {id:3,nick:"小红",account:"aaaaaa",avatar:"11111111111",type:"1",createtime:"素履之往"},
          {id:4,nick:"小红",account:"aaaaaa",avatar:"11111111111",type:"1",createtime:"素履之往"},
          {id:5,nick:"小红",account:"aaaaaa",avatar:"11111111111",type:"1",createtime:"素履之往"},
          {id:6,nick:"小红",account:"aaaaaa",avatar:"11111111111",type:"1",createtime:"素履之往"},
          {id:7,nick:"小红",account:"aaaaaa",avatar:"11111111111",type:"1",createtime:"素履之往"},
          {id:8,nick:"小红",account:"aaaaaa",avatar:"11111111111",type:"1",createtime:"素履之往"},
          {id:9,nick:"小红",account:"aaaaaa",avatar:"11111111111",type:"1",createtime:"素履之往"},
          {id:12,nick:"小红",account:"aaaaaa",avatar:"11111111111",type:"1",createtime:"素履之往"},
          {id:13,nick:"小红",account:"aaaaaa",avatar:"11111111111",type:"1",createtime:"素履之往"},
          {id:14,nick:"小红",account:"aaaaaa",avatar:"11111111111",type:"1",createtime:"素履之往"},
          {id:10,nick:"小红",account:"aaaaaa",avatar:"11111111111",type:"1",createtime:"素履之往"},
          {id:15,nick:"小红",account:"aaaaaa",avatar:"11111111111",type:"1",createtime:"素履之往"},
          {id:16,nick:"小红",account:"aaaaaa",avatar:"11111111111",type:"1",createtime:"素履之往"},
        ],
         editVisible:false,
        delVisible:false,
        msg:"",
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
      sessionStorage.clear()          
      this.$router.push({  
           path:'/',
          });
      },
      rotate1(){//打开侧边栏
      this.isrotate1=false;//使旋转的消失
      this.isrotate2=true;//使不旋转的出现
      },
      rotate2(){//收起侧边栏
      this.isrotate2=false;
      this.isrotate1=true;
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
        this.idx = index;
        this.delVisible=true;
      },
      handleShenhe(){
      this.editVisible=true;
      },
      
      getdata(){
        // var vm=this; 
        // vm.$http.post('http://192.168.0.89:3300/web',{
        //     cmd:"getUserList",
        //     data:JSON.stringify({
        //     sessionid:sessionStorage.getItem('sessionid'),
        //     account:sessionStorage.getItem('account'),
        //     type:0,
        //     usable:0
        //  })
        //  }).then((res)=>{
        // console.log(res.data.data);
        // vm.tableData=res.data.result.users;
        // vm.tableData1=res.data.result.users;
        // vm.total=res.data.result.users.length;
        // vm.tableData=vm.tableData.slice(0,this.pageSize);
        // }).catch(function(err){
        // console.log(err);
        //   });
      },
      deleteRow(){
        this.tableData.splice(this.idx, 1);
        this.$message.success('删除成功');
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
      routeshouye(){
        this.$router.push({  
           path:'/shouye',
          });
      },
      onSubmit(){
        this.getdata();
      },
    },
      mounted(){
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
