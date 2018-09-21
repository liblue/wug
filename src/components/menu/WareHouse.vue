<template>
<div  class="warehouse">
 <div id="header">
    <div class="left">
   <i  v-show="isrotate1"  class="fa fa-bars fa-2x fa-rotate-90" aria-hidden="true"  style="color: #606266;"  @click="rotate1()"></i>
   <i  v-show="isrotate2"  class="fa fa-bars fa-2x " aria-hidden="true"  style="color: #606266;"  @click="rotate2()"></i>

  <el-breadcrumb separator="/" >
  <el-breadcrumb-item ><a  @click="routeshouye()">首页</a></el-breadcrumb-item>
  <el-breadcrumb-item><a>订单管理</a></el-breadcrumb-item>
  <el-breadcrumb-item>仓库列表</el-breadcrumb-item>
  </el-breadcrumb>
    </div>
  <div class="right">
      <i class="el-icon-rank"  title="全屏"></i>
      <el-dropdown class="faceAndMenu">
        <span class="el-dropdown-link">
          <div class="face">
            <i class="iconfont icon-user"></i>
          </div>
          <span class="username">管理员信息</span> 
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="center"><router-link tag="li" to="adminadd">个人中心</router-link></el-dropdown-item>
          <el-dropdown-item command="logout"><a  @click="logout()">退出登录</a></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
<el-row>
  <el-col :span="3" v-for="index in tableData"  :offset="index > 0 ? 0 : 0" style="cursor:poiner;height:300px" >
    <el-card :body-style="{ padding: '0px' }" shadow="hover"  >
      <img :src="index.image_thumb" class="image"  style="height:210px"  @click="checkorder(index.id)" >
      <div style="padding: 14px;cursor:pointer;"  @click="checkorder(index.id)">
        <span  style="display:block;height:35px;word-break:break-all;overflow:hidden">{{index.name}}{{index.id}}</span>
        <div class="bottom clearfix">
          <el-button type="text" class="button" @click="checkorder(index.id)">查看订单</el-button>
        </div>
      </div>
    </el-card>
  </el-col>
</el-row>
</div>
</template>
<script>
import eventBus from '../../assets/eventBus.js'
export default {
    data(){
return{
  tableData:[
      ],
warehouses:[],
isrotate1:false,
isrotate2:true,


}
    },methods:{
      logout(){
      sessionStorage.clear() 
      this.$router.push({  
           path:'/',
          });
      },
      routeshouye(){
        eventBus.$emit('myfun','shouye');
        this.$router.push({
           path:'/shouye',
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
      checkorder(id){
      sessionStorage.setItem('offlineid',id);
      this.$router.push({
      path:'orderlist'
  })
    },
      getdata(){
         if(sessionStorage.getItem('warehouses')){
           this.tableData=JSON.parse(sessionStorage.getItem('warehouses'));
           console.log('session仓库');
           console.log(this.tableData);
           return false;
         }
        var vm=this; 
        vm.$http.post(vm.api1,{
            cmd:"getOfflineList",
            data:JSON.stringify({
            account:sessionStorage.getItem('account'),
            sessionid:sessionStorage.getItem('sessionid'),
         })
         }).then((res)=>{
           console.log(res);
           console.log(res.data.result.status);
           if(res.data.result.status=='996'){
           this.$router.push({
           path:'/login',
          });
           }
        vm.tableData=res.data.result.list;
        var warehouses=JSON.stringify(vm.tableData);
        sessionStorage.setItem('warehouses',warehouses);
        }).catch(function(err){
        console.log(err); 
          });
      },
    },mounted(){
      this.getdata();
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

.username{
  cursor:pointer;
}
.el-row{

  padding-left: 20px;
}
.el-col{

    margin-right:30px;
    margin-top:30px;

  }
.bottom {
    margin-top: 13px;
    margin-bottom: 13px;
    line-height: 12px;
  }
.button {
    padding: 0;
    float: right;
  }

.image {
    width:100%;
    height:100%;
    cursor:pointer;
  }

.clearfix:before,
 
  
.clearfix:after {
      clear: both
  }


  
</style>
