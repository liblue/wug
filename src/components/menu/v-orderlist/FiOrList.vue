<template>
 <div>
   <el-form :model="form" label-width="80px"  class="sousuo">
   <el-form-item label="拣货员" width="120px">
       <el-col :span="25">
    <el-input v-model="form.name"  ></el-input>
       </el-col>
  </el-form-item>
  <el-form-item label="拣货员">
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
        vm.$http.get('http://www.wug.com/api/orderlist',{
           params: {
           name:this.form.name,
           date1:this.form.date1,
           date2:this.form.date2,
           type:this.form.type,
         }
         }).then((res)=>{
        
        console.log(res.data);
        vm.tableData=res.data.data;
        vm.tableData1=res.data.data;

        vm.total=vm.tableData.length;
        // vm.total=res.res.data.data;
        vm.tableData=vm.tableData.slice(0,this.pageSize);
        }).catch(function(err){
        console.log(err);
          });
      },
      deleteRow(){
        this.tableData.splice(this.idx, 1);
        this.$message.success('删除成功');
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
         
        vm.$http.post('http://www.wug.com/api/article/edit/',{
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
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
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
