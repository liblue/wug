<template>
 <div>

 <div id="header">
    <div class="left">
   <i class="el-icon-edit"></i>
     <el-breadcrumb separator="/" >
  <el-breadcrumb-item ><a  @click="routeshouye()">首页</a></el-breadcrumb-item>
  <el-breadcrumb-item><a>订单管理</a></el-breadcrumb-item>
  <el-breadcrumb-item>订单列表</el-breadcrumb-item>
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
          <el-dropdown-item command="center">个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出登陆</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
   
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
  <el-form-item label="活动时间" style="width:25%">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
    </el-col>
  </el-form-item>
  <el-form-item class="sousuo">
    <el-button type="primary" @click="onSubmit">搜索</el-button>
  </el-form-item>
</el-form>
 <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column
      type="index"
      :index="indexMethod"></el-table-column>
    <el-table-column
      prop="id"
      label="日期" 
      sortable
      width="100"
      :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
      :filter-method="filterHandler"
    >
    </el-table-column>
    <el-table-column
      prop="title"
      label="商品名"
      width="220">
    </el-table-column>
    <el-table-column
      prop="imgurl"
      label="地址"
      width="350"
      :formatter="formatter">
    </el-table-column>
     <el-table-column
      prop="type"
      label="日期"
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
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[2,5,10]"
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
<!-- 编辑 -->
<el-dialog title="商品详情"  :visible.sync="editVisible" width="800px" height="600px">
    <el-form v-model="row">
    <el-form-item label="商品ID" :label-width="formLabelWidth">
      <el-input v-model="row.id" auto-complete="off" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="商品名称" :label-width="formLabelWidth">
      <el-input v-model="row.title" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="商品地址" :label-width="formLabelWidth">
      <el-input v-model="row.imgurl" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" :label-width="formLabelWidth">
      <el-input v-model="row.created_at" auto-complete="off"></el-input>
    </el-form-item><el-form-item label="商品类型" :label-width="formLabelWidth">
      <el-input v-model="row.type" auto-complete="off"></el-input>
    </el-form-item>

    <el-form-item label="活动区域" :label-width="formLabelWidth">
      <el-select v-model="row.imgurl" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <!-- <el-button @click="editVisible = false">取 消</el-button> -->
    <el-button @click="editquxiao()">取 消</el-button>
    <el-button type="primary" @click="edit()">确 定</el-button>
  </div>
</el-dialog>
<!-- 编辑 -->
 </div>
</template>
<script>



  export default {
    data() {
      return {
        form:{
        },
        sousuocondi:{},
        row:{},
        tableData: [],
        tableData1:[],
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
      formatter(row, column) {
        return row.img_url;
      },
      filterTag(value, row) {
        return row.type === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      handleEdit: function (index, row) {
        this.row=row;
        this.editVisible=true;
      },
      handleDelete:function(index,rows){
        
          // rows.splice(index, 1);
      //  this.tableData1=rows;
      //  this.tableData1.splice(index, 1);

     
        this.idx = index;
        // this.msg=row;
        // this.dataId=this.idx;
        this.delVisible=true;
      },
      getdata(){
        var vm=this; 
      //  var  _this=this;
        
        vm.$http.get('api/api/article',{
           params: {
           name:this.form.name,
           date1:this.form.date1,
           date2:this.form.date2,
           type:this.form.type,
         }
         }).then((res)=>{
        
        console.log(res.data.data);
        vm.tableData=res.data.data;
        vm.tableData1=res.data.data;
        // vm.total=res.res.data.data;
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
        // this.total=this.total-1;//每次删除后总条数减1，
        this.delVisible = false;
      },
       indexMethod(index) {
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
      onSubmit(){
        this.getdata();
      },
      edit(){
        var vm=this; 
      //  var  _this=this;
         
        vm.$http.post('api/api/article/edit/',{
           id:'34',
           title:this.row.title,
           imgurl:this.row.imgurl,
           created_at:this.row.created_at,
           type:this.row.type,
         }).then((res)=>{
           this.getdata();
        // vm.total=res.res.data.data;
        }).catch(function(err){
          console.log(err);
          });
        this.$message.success('保存成功');
        this.editVisible = false;
      },
      editquxiao(){
       this.getdata();
       this.editVisible = false;
      }
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
.el-table{
      border: 1px solid #ebeef5;
}
 .sousuo .el-form-item{
    width: 20%;
    height: 30px;
    float: left;
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
