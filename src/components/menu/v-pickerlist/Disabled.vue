<template>
 <div>
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
    <el-button type="primary" @click="onSubmit">搜索拣货员</el-button>
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
        <el-dialog title="提示" :visible.sync="qiVisible" width="300px" center>
            <div class="del-dialog-cnt">是否确定启用？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="qiVisible = false">取 消</el-button>
                <el-button type="primary" @click="qiYong" >确 定</el-button>
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
        sousuocondi:{},
        row:{},
        tableData: [
          {id:1,nick:"小www红",account:"222aaaaaa",avatar:"11111111111",type:"1",createtime:"素履之往"},
          {id:2,nick:"小aklldww红",account:"aaa333aaa",avatar:"11111111111",type:"1",createtime:"素履之往"},
          {id:3,nick:"小a红",account:"aaaa444aa",avatar:"11111111111",type:"1",createtime:"素履之往"},
          {id:4,nick:"小红",account:"aaaa23aa",avatar:"11111111111",type:"1",createtime:"素履之往"},
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
        delVisible:false,
        qiVisible:false,
        userinfo:{},
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
      handleQi(){
      this.qiVisible=true;
      },
      handleDelete:function(index,rows){//打开删除弹窗
        this.idx = index;
        this.delVisible=true;
      },
      qiYong(){
        this.qiVisible=false;
        this.tableData.splice(this.idx, 1);
      },
      deleteRow(){//逻辑实现删除一行
        this.tableData.splice(this.idx, 1);
        this.$message({
           message: '已删除',
           type: 'success',
           duration:'1000'
        });
        this.total=this.total-1;//每次删除后总条数减1，
        this.delVisible = false;
      },
      getdata(){//获取表格数据
      //   var vm=this; 
      //   vm.$http.post('http://192.168.0.89:3300/web',{
      //       cmd:"getUserList",
      //       data:JSON.stringify({
      //       sessionid:sessionStorage.getItem('sessionid'),
      //       account:sessionStorage.getItem('account'),
      //       type:1,
      //       usable:0
      //    })
      //    }).then((res)=>{
      //   console.log(res.data.data);
      //   vm.tableData=res.data.result.users;
      //   vm.tableData1=res.data.result.users;
      //   vm.total=res.res.data.result.users.length;
      //   vm.tableData=vm.tableData.slice(0,this.pageSize);
      //   }).catch(function(err){
      //   console.log(err);
      //     });
      },

      onSubmit(){//提交搜索条件
        this.getdata();
      },
    
    
    },
      mounted(){
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
