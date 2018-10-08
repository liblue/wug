<template>
  <div id="layout">
     <div class="aside">
    <v-menu></v-menu>
    </div>
    <!-- <header><v-header></v-header></header> -->
    <div class="content">
     <div id="header">
    <div class="left">
   <i  v-show="isrotate1"  class="fa fa-bars fa-2x fa-rotate-90" aria-hidden="true"  style="color: #606266;"  @click="rotate1()"></i>
   <i  v-show="isrotate2"  class="fa fa-bars fa-2x " aria-hidden="true"  style="color: #606266;"  @click="rotate2()"></i>
     <el-breadcrumb separator="/" >
  <el-breadcrumb-item ><a  @click="routeshouye()">首页</a></el-breadcrumb-item>
  <el-breadcrumb-item  v-if="place1"><a>{{place1}}</a></el-breadcrumb-item>
  <el-breadcrumb-item v-if="place1">{{place2}}</el-breadcrumb-item>
  </el-breadcrumb>
    </div>
  <div class="right">
      <a @click="routeinfo()"><router-link tag="li" to="admininfo"><i class="fa fa-user-circle fa-2x"></i></router-link></a>
      <el-dropdown class="faceAndMenu">
        <span class="el-dropdown-link">
          <div class="face">
            
          </div>
          <span class="username">{{account}}</span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="center" ><a @click="routeinfo()"><router-link tag="li" to="admininfo">个人中心</router-link></a></el-dropdown-item>
          <el-dropdown-item command="logout"><router-link tag="li" to="login">退出登录</router-link></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
  <!-- //主体部分 -->
    <router-view></router-view>


    <footer>
      <div class="footer-con">
      © 2018-2019
      </div>
            </footer>
    </div>
  </div>
</template>

<script>
import  Menu from './Menu.vue'
import eventBus from '../assets/eventBus.js'
export default {
  name: 'Layout',
  data () {
    return {
      place1:'',
      place2:'',
      isrotate1:false,
      isrotate2:true,
      account:'',
    }
  },
   components:{ 
    'v-menu':Menu,
     },
        watch:{
          place1(newValue, oldValue){
          },
          place2(newValue, oldValue){
          }
      },
   methods:{
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
        sessionStorage.setItem('place1','');
        this.place1='';
        this.$router.push({
           path:'/shouye',
          });
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
      routeinfo(){
      this.place1=sessionStorage.setItem('place1','个人中心');
      this.place2=sessionStorage.setItem('place2','修改密码');
      this.place1="个人中心";
      this.place2="修改密码";

     
      },
     init(){  
       this.account=sessionStorage.getItem('account');
     this.checksession();
     this.place1=sessionStorage.getItem('place1');
     this.place2=sessionStorage.getItem('place2');
       eventBus.$on("menufun",(message)=>{ 
            this.place1=message[0];
            this.place2=message[1];
         });
}
     },
     mounted(){

     this.init();
     },
     created(){
   
     }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


/* header{
    height: 60px;
    display: flex;
    box-shadow: 0 2px 1px 1px rgba(100,100,100,0.1);
    padding: 0 20px;

} */#header .icon, #header .left .icon-menu, #header .right .el-icon-rank {
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
    margin-bottom: 10px;
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
#layout{
  height: 100%;
  display: flex;
  flex-direction:row;
}
.aside{
  height: 100%;
  /* float: left; */
  background-color:#495060;
}
.content{
    height: 96%;
  /* float:left; */
    width:100%;
    overflow-y:scroll;
}
.fa{
  cursor: pointer;
}
.fa:hover{
  /* color:red; */
}
.username{

    cursor: pointer;
}
footer{
  box-sizing: border-box;
   height:4%;
   width:100%;
   position:fixed; bottom:0;
   border-top: 1px solid #e7eaec;
   overflow: hidden;
   padding-top: 15px;
   padding-bottom: 15px;
  
  }
  .footer-con{
    padding-right:25px ;
    position:fixed; 
    right:0;
    display:table-cell;      /*按照单元格的样式显示元素*/
    vertical-align:middle;
  }
  .faceAndMenu{

    margin-left:10px;
  }
</style>
