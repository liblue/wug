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
      <el-option :label="item.name" :value="item.id"  v-for="item in offlist" :key="item.id" ></el-option>
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
    stripe
    style="width: 100%">
    <!-- <el-table-column type="selection" width="55"></el-table-column> -->
    <!-- <el-table-column
      type="index"    
      :index="indexMethod"></el-table-column> -->
        <el-table-column
      prop="id"
      label="用户ID"
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
      prop="account"
      label="账号"
      width="280">
    </el-table-column>
    <el-table-column
      prop="nick"
      label="昵称"
      width="100"
      :formatter="formatter">
    </el-table-column>
        <el-table-column
      prop="nick"
      label="姓名"
      width="100"
      >
    </el-table-column>
       <el-table-column
      prop="warehouse"
      label="网点"
      width="100"
     >
    </el-table-column>
     <el-table-column
      prop="createtime"
      label="创建时间"
      width="200"
      >
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
  <!-- 分页 -->  <!-- 分页 -->  <!-- 分页 -->  <!-- 分页 -->  <!-- 分页 -->  <!-- 分页 -->  <!-- 分页 -->  <!-- 分页 -->  <!-- 分页 -->  <!-- 分页 -->




     

    
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
                 <li v-for="n in 6" @click="changepage(current_page-(6-n))" class="number"  v-if="current_page-(6-n)>0 && n<6"  :key="n" >
                {{current_page-(6-n)}}
                </li>

                <li class="number active" >{{current_page}}</li>

                     <li v-for="n in 4" @click="changepage(current_page+n)" class="number"  v-if="current_page+n<=last_page" :key="n">
                {{current_page+n}}
                </li>
                </template>
    
            </ul>
          <!-- <ul class="el-pager">

          <template v-for="n in total">
            <template  v-if="n==current_page">
              <li  @click="changepage(n)" class="number active">{{n}}</li>
            </template>
            <template  v-if="n!==current_page">
              <li  @click="changepage(n)" class="number" >{{n}}</li>
            </template>
            </template>
            </ul> -->
     <template  v-if="last_page!==current_page">
          <button type="button" @click="changepage(current_page+1)" class="btn-next">
          <i class="el-icon el-icon-arrow-right"></i></button>
           </template>

            <template  v-if="last_page==current_page">
          <button type="button" disabled="disabled" class="btn-next">
            
          <i class="el-icon el-icon-arrow-right"></i></button>
           </template>
          <span class="el-pagination__jump">前往<div class="el-input el-pagination__editor is-in-pagination"><!---->
  <input type="number"  v-model="tiaopage" @blur="qianwang()"  autocomplete="off" min="1" max="1" class="el-input__inner"><!----><!----><!----></div>页</span></div>


  <!-- 分页 --> <!-- 分页 -->  <!-- 分页 -->  <!-- 分页 -->  <!-- 分页 -->  <!-- 分页 -->  <!-- 分页 -->  <!-- 分页 -->  <!-- 分页 -->  <!-- 分页 -->  <!-- 分页 -->
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
        soudate:'',
        soucondi:{
          type:1,
          usable:0,
        },
        row:{},
        tableData: [
        ],
        soucon:{},
        offlist:[],
        delVisible:false,
        jinVisible:false,
        userinfo:{},
        total:'',//总数  每次删除后要修改
        istotal:false,
        pageSize:10,//默认每页的数量
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
      indexMethod(index) {//第一列序号
        index=index+(this.currentPage-1)*this.pageSize+1;
        return index;
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
           vms.$message({
               message: '已启用',
               type: 'success',
               duration:'1000'
         });
        }).catch(function(err){
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
           vm.$message({
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
       addrow(userlist,warehouses){
        for (var i=0;i<userlist.length;i++)
     {
        for (var j=0;j<warehouses.length;j++){
         if(userlist[i].offlineId==warehouses[j].id){
            userlist[i].warehouse=warehouses[j].name;
         }
         }
     }
       },
       axios1() {//获取待审核人员列表和网点信息
         var vm=this; 
         var obj={
            userlist:vm.$http.get(vm.api2+'api/userlist',{
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
        getuserlist(){
          var vm=this; 
           vm.$http.get(vm.api2+'api/userlist',{
            params: vm.soucondi
         }).then((res)=>{
         var userlist=res.data.data;
         var warehouses=vm.offlist;
         this.addrow(userlist,warehouses);
         vm.total=res.data.total;
            if(vm.total<1){
           vm.istotal=false;
         }else{
           vm.istotal=true;
         }
         vm.last_page=res.data.last_page;
         vm.current_page=res.data.current_page;
         vm.tableData=userlist;
        }).catch(function(err){
        console.log(err); 
          });
        // 两个请求现在都执行完成
        },
        getdata(){
          this.checksession();
        if(sessionStorage.getItem('warehouses')){
           this.offlist=JSON.parse(sessionStorage.getItem('warehouses'));
           console.log('session仓库');

           console.log(this.offlist);
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
         if(lateres.data.result.status=='996'){
           vm.$router.push({
            path:'/login',
          });
           }

        vm.offlist=lateres.data.result.list;
        var warehouses=JSON.stringify(vm.offlist);
        sessionStorage.setItem('warehouses',warehouses);
        var userlist=res.data.data;
        this.addrow(userlist,vm.offlist);
        vm.tableData=userlist;
        vm.total=res.data.total;
           if(vm.total<1){
           vm.istotal=false;
         }else{
           vm.istotal=true;
         }
        vm.last_page=res.data.last_page;
        vm.current_page=res.data.current_page;
        sloading.close();
        // 两个请求现在都执行完成
    }));
     loading.close();
      },
  
      onSubmit(){//提交搜索条件
        this.checksession();
        this.soucondi.nick=this.form.nick;
        this.soucondi.offlineid=this.form.offid;
        this.soucondi.date=this.soudate;
        this.soucondi.type=1;
        this.soucondi.usable=0;
        this.soucondi.page=this.page;
        this.getuserlist();
      },
   
    },
   
      mounted(){
    // this.getofflist();
    }
    ,created(){
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
    
  .el-pagination{
  
    margin-top: 30px;
  }

</style>
