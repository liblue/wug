
<template>
<div id="test">
 
<div  class="right"  style="padding-top:90px;">
  <div  width="100px"  height="100px">
  <button  @click="cunru()">  存入localst</button>
  <button  @click="change()">  改变localst</button>

  </div>
    <button  @click="quchu()"> 取出localst</button>
    <button  @click="quaccount()"> 取出account</button>
    <button  @click="quseesinid()"> 取出sessionid</button>
    <button  @click="clearall()"> 清除所有</button>
ddddd<input v-model="msg" type="text">
<input :value="msg" type="text">
{{msg}}
</div>
</div>
    
</template>

<script>
  export default {
    data(){
return {

  msg:111,
}
    },
    methods: {
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
