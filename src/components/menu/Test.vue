
<template>


<div id="test">
 
<div  class="right"  style="padding-top:90px;">
  <div  width="100px"  height="100px">
  <button  @click="cunru()">  存入localst</button>
  <button  @click="change()">  改变localst</button>
  </div>
    <button  @click="quchu()"> 取出localst</button>
    <button  @click="openmenu()"> 取出openmenu</button>
    <button  @click="quaccount()"> 取出account</button>
    <button  @click="quseesinid()"> 取出sessionid</button>
    <button  @click="quoffid()"> 取出offlineid</button>
    <button  @click="quwarehouse()"> 取出warehouse</button>
   <button  @click="qurotate1()"> 取出rotate1</button>
   <button  @click="qurotate2()"> 取出rotate2</button>
    <button  @click="quplace1()"> 取出place1</button>
     <button  @click="quplace2()"> 取出place12</button>

     <button  @click="goodkof()"> 启用goodkof</button>
    <button  @click="clearall()"> 清除所有</button>

    <br>
ddddd<input v-model="msg" type="text">
<input :value="msg" type="text">
{{msg}}
  将订单指派给某个拣货员
  审核姓名
  订单留言
  后台分页
  增加用户表网点信息
  网点列表增加    请选择网点这句提示
  订单时间默认一周内
  订单列表ID查询模糊后四位
  用户头像
</div>
   <div v-for="u in  user"  >
    <span></span>
  </div> 
<!-- <el-button
    type="primary"
    @click="openFullScreen"
    >
    指令方式
  </el-button>
  <el-button
    type="primary"
    @click="openFullScreen2">
    服务方式
  </el-button> -->

  
</div>
    
</template>

<script>
  export default {
    data(){
return {
  fullscreenLoading: false,
  msg:111,
  user:[1,2,3,4,5,6,7,8,9]
}
    },
    methods: {
      openmenu(){
 alert(sessionStorage.getItem('openmenu'));

      },
         openFullScreen() {
        this.fullscreenLoading = true;
        setTimeout(() => {
        this.fullscreenLoading = false;
        }, 2000);}
        ,
          openFullScreen2() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close();
        }, 2000);
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      cunru(){
        sessionStorage.setItem('indexUrl','2ssss22');

      },
      quchu(){
      alert(sessionStorage.getItem('indexUrl'));
  
      },
      quaccount(){
     
      alert(sessionStorage.getItem('account'));
      },
      quseesinid(){

         alert(sessionStorage.getItem('sessionid'));
      },
       change(){
        sessionStorage.setItem('indexUrl','改变后的');
      
      },
      quoffid(){
         alert(sessionStorage.getItem('offlineid'));
      },
      qurotate1(){
         alert(sessionStorage.getItem('isrotate1'));
      },
      qurotate2(){
         alert(sessionStorage.getItem('isrotate2'));
      },
      quwarehouse(){
         alert(sessionStorage.getItem('warehouses'));
      },
       quplace1(){
         alert(sessionStorage.getItem('place1'));
      },
       quplace2(){
         alert(sessionStorage.getItem('place2'));
      },
      goodkof(){

     var vm=this; 
        vm.$http.post('http://120.25.216.139:3300/web',{
            cmd:"userEnable",
            data:JSON.stringify({
            account:sessionStorage.getItem('account'),
            sessionid:sessionStorage.getItem('sessionid'),
            user_account:'oltMe0W4ULtV2ZS8FKUliQnNZlZI'
         })
         }).then((res)=>{
            if(res.data.result.status=='996'){
            vm.$router.push({
            path:'/login',
          });
           }
           vm.$message({
               message: '已启用',
               type: 'success',
               duration:'1000'
         });
        }).catch(function(err){
        console.log(err); 
          });
      },
      clearall(){
          sessionStorage.clear() 
      },
    }
  }
</script>



<style scoped>
#test{
    width:100%;
    height:100%;
    display: flex;
     flex-direction:row;
}
.left{
width:20%;
height:100%；
}
.right{
background: gray;
height:100%;
    width:100%;
}

</style>
