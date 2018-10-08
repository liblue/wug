<template>
 <div>

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
    <el-button type="primary" @click="onSubmit()">搜索</el-button>
  </el-form-item>
</el-form>
 <el-table
    :data="tableData"
    stripe
   >
    <!-- <el-table-column type="selection" width="55"></el-table-column> -->

   
    <el-table-column
      prop="account"
      label="账号"
      width="100">
    </el-table-column>
     <el-table-column
      prop="avatar"
      label="头像"
      width="100">
       <template slot-scope="scope">
         <img :src="scope.row.avatar" style="width:auto;height:50px">
      </template>
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
  <div data-v-3c683a93="" class="el-pagination is-background" v-if="istotal">
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
                   <template  v-for="n in 10" >
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
                     <li v-for="n in 4" @click="changepage(current_page+n)" class="number"  v-if="current_page+3<last_page" :key="n+1">
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
<el-dialog title="用户"  :visible.sync="editVisible" width="800px" >
    <el-form >
      <el-form-item label="姓名"  :label-width="formLabelWidth"  style="width:30%" >
    <el-input  placeholder="请输入姓名" v-model="userinfo.name"></el-input>
    <span class="tip"> </span>
  </el-form-item>
    <el-form-item label="选择网点" :label-width="formLabelWidth"  class="shenheform">
      <el-select v-model="userinfo.offid" placeholder="请选择网点">
        <el-option  v-for="item in offlist"  :label="item.name" :value="item.id" :key="item.id"></el-option>
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
  import Header from './Header.vue'
  import eventBus from '../../assets/eventBus.js'
  export default {
    data() {
      return {
        form:{
        },
        soudate:'',
        soucondi:{
          type:0,
          usable:0,
        },
        row:{},
        tableData: [
        ],
        idx:'',
        offlist:[],
        userinfo:{},
        editVisible:false,
        delVisible:false,
        delarr:[],
        multipleSelection:[],
        total:'',//总数  每次删除后要修改
        istotal:false,
        page:1,
        last_page:10,
        tiaopage:'',
        current_page:1,//当前页
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
      handleDelete:function(index,rows){
        this.userinfo=rows;  
        this.idx = index;
        this.delVisible=true;
      },
      handleShenhe(index,rows){
        this.userinfo.account=rows.account;  
        this.idx = index;
        this.editVisible=true;
      },
         changepage(n){
     this.page=n;
     this.current_page=n;
     this.onSubmit();
      },
      qianwang(){
        if(this.tiaopage<=this.last_page){
        this.page=this.tiaopage;
        this.onSubmit();
        }
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
         if(!this.userinfo.name){   
           this.$message({
           message: '请填写姓名',
           type: 'error',
           duration:'1000'
        }); 
          return false;
        }
        this.editVisible=false;
        var vm=this; 
  
        vm.$http.post(vm.api1,{
            cmd:"userVerify",
            data:JSON.stringify({
            account:sessionStorage.getItem('account'),
            sessionid:sessionStorage.getItem('sessionid'),
            user_account:vm.userinfo.account,
            user_offlineid:vm.userinfo.offid,
            user_name:vm.userinfo.name,
            user_type:type,
         })
         }).then((res)=>{
           console.log('审核结果');
           console.log(res);
           console.log('审核结果');
           if(res.data.result.status=='996'){
            vm.$router.push({
             path:'/login',
          });
           }
        this.tableData.splice(this.idx, 1);

      if(res.data.result.status=='100'){
        vm.$message({
           message: '审核完成',
           type: 'success',
           duration:'1000'
        }); 
        }



        }).catch(function(err){
        console.log(err);
          });
          this.userinfo.offid='';
          this.userinfo.name='';
      },
      axios1() {//获取待审核人员列表和网点信息
         var vm=this; 
         var obj={
              userlist:vm.$http.get(vm.api2+'/api/userlist',{
              params:{
              type:0,
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
        checksession(){
        var vm=this;
         vm.$http.post(vm.api1,{
         cmd:"checkSession",
            data:JSON.stringify({
            account:sessionStorage.getItem('account'),
            sessionid:sessionStorage.getItem('sessionid'),
         })
          }).then((res)=>{
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
        this.checksession();
        if(sessionStorage.getItem('warehouses')){
           this.offlist=JSON.parse(sessionStorage.getItem('warehouses'));
           this.getuserlist();
           return false;
         }
        var vm=this; 
         vm.$http.all([vm.axios1().offlist,vm.axios1().userlist]).then(vm.$http.spread(function (lateres,res) {
         vm.tableData=res.data.data;
         vm.last_page=res.data.last_page;
         vm.current_page=res.data.current_page;        
         vm.total=res.data.total;
         if(vm.total<1){
           vm.istotal=false;
         }else{
           vm.istotal=true;
         }
        vm.offlist=lateres.data.result.list;
        var warehouses=JSON.stringify(vm.offlist);
        sessionStorage.setItem('warehouses',warehouses);
        // 两个请求现在都执行完成
  }));
      },
       getuserlist(){
        var vm=this; 
        vm.$http.get(vm.api2+'/api/userlist',{
           params: vm.soucondi
         }).then((res)=>{
           vm.tableData=res.data.data;
           vm.total=res.data.total;
            if(vm.total<1){
           vm.istotal=false;
         }else{
           vm.istotal=true;
         }
         vm.last_page=res.data.last_page;
         vm.current_page=res.data.current_page; 
        }).catch(function(err){
        console.log(err);
          });
      },
     
      deleteRow(){
         this.checksession();
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

           if(res.data.result.status=='100'){
           vms.$message({
               message: '已删除',
               type: 'success',
               duration:'1000'
         });
         }
        }).catch(function(err){
         console.log(err); 
          });
        this.tableData.splice(this.idx, 1);
        this.total=this.total-1;//每次删除后总条数减1，
        this.delVisible = false;
      },
       indexMethod(index) {//第一列序号
        index=index+(this.currentPage-1)*this.pageSize+1;
        return index;
      },
      onSubmit(){//提交搜索条件
     
        this.getuserlist();
        console.log('打印时间');
        console.log(this.soudate);
        this.soucondi.nick=this.form.nick;
        this.soucondi.date=this.soudate;
        // this.soucondi.date2=this.soudate[1];
        this.soucondi.type=0;
        this.soucondi.userable=0;
        this.soucondi.page=this.page;
        this.getuserlist();
      },
    },
      mounted(){
        
    },
      created(){
      this.getdata()
    },
    components:{
      'v-header':Header,
    }
  }
</script>

<style scoped>


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
 .el-pagination{
  
    margin-top: 30px;
  }

</style>
