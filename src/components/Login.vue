
<template>
<div  class="beijing">
<div class="login">
	<div class="login-top">
		<h1>管理员登录</h1>
    <div class="forgot">
    <form   >
	
			<input type="text" v-model="form.account" placeholder="帐号" >
			<input type="password" v-model="form.password"   placeholder="密码">

    </form>
    </div>
     <div class="forgot">
	     <input type="submit" value="登录"  @click="submitForm()" >
	    </div>
	</div>
</div>	
</div>
</template>
<script>
  export default {
    data() {
      return {
        form:{  
          account:'',
          password:'',
     },
    //  'Content-Type': 'application/x-www-form-urlencoded'
      }
    },methods:{
    submitForm(){
       sessionStorage.setItem('account',this.form.account);
       var vm=this;
         vm.$http.post(vm.api1,{
         cmd:"adminLogin",
         data:JSON.stringify({
             account:vm.form.account,
             password:vm.form.password,
         }),
          }).then((res)=>{
            if(res.data.result.status==100){
             console.log(res);
             sessionStorage.setItem('sessionid',res.data.result.sessionid);
             vm.$router.push({
             path:'/manage',
          });
          }else{
             vm.$message({
             message: '登录失败',
             type: 'error',
             duration:'1000'
        });
          vm.form.account='';
          vm.form.password='';

          }
        }).catch(function(err){
         console.log(err);
          });
    },
   
      
init(){
 sessionStorage.clear();

}
    
  },
  mounted(){

  this.init();
  }
 }
</script>

<style scoped>


img{max-width:100%;}


.beijing{

  position: fixed;
  background: url(../assets/banner.jpg) repeat;
  width:100%;
  height:100%;
  
}
.login {
  padding-top:15%;
  width: 32%;
  margin: 0 auto;
}

.login-top {
 
  background: #E1E1E1;
  border-radius: 25px 25px 0px 0px;
  -webkit-border-radius:  25px 25px 0px 0px;
  -moz-border-radius: 25px 25px 0px 0px;
  -o-border-radius: 25px 25px 0px 0px;
  padding: 40px 60px;
  margin: 0 auto;
}
.login-top h1 {
  text-align: center;
  font-size: 27px;
  font-weight: 500;
  color: #F45B4B;
  margin: 0px 0px 20px 0px;
}
.login-top input[type="text"] {
	outline: none;
  font-size: 15px;
  font-weight: 500;
  color: #818181;
  padding: 15px 20px;
  background: #CACACA;
  border: 1px solid #ccc;
  border-radius:25px;
  -webkit-border-radius: 25px;
  -moz-border-radius: 25px;
  -o-border-radius: 25px;
  margin: 0px 0px 12px 0px;
  width: 88%;
  -webkit-appearance: none;
}
.login-top input[type="password"]{
	outline: none;
  font-size: 15px;
  font-weight: 500;
  color: #818181;
  padding: 15px 20px;
  background: #CACACA;
  border: 1px solid #ccc;
  border-radius:25px;
  -webkit-border-radius: 25px;
  -moz-border-radius: 25px;
  -o-border-radius: 25px;
  margin: 0px 0px 12px 0px;
  width: 88%;
  -webkit-appearance: none;
}
/* .forgot  a{
  font-size: 13px;
  font-weight: 500;
  color: #F45B4B;
  display: inline-block;
  border-right: 2px solid #F45B4B;
  padding: 0px 7px 0px 0px;
}
.forgot  a:hover{
  color: #818181;
} */
.forgot input[type="submit"] {
  width:96%;
  background: #F45B4B;
  color: #FFF;
  font-size: 17px;
  font-weight: 400;
  padding: 8px;
  display: inline-block;
  cursor: pointer;
  border-radius: 6px;
  -webkit-border-radius: 19px;
  -moz-border-radius: 6px;
  -o-border-radius: 6px;
 
  outline: none;
  border: none;
}
.forgot input[type="submit"]:hover {
	background:#818181;
	transition: 0.5s all;
  -webkit-transition: 0.5s all;
  -moz-transition: 0.5s all;
  -o-transition: 0.5s all;
  
}
.forgot {
  text-align: center;
}
.login-bottom {
  background: #E15748;
  padding: 30px 65px;
  border-radius: 0px 0px 25px 25px;
  -webkit-border-radius:  0px 0px 25px 25px;
  -moz-border-radius: 0px 0px 25px 25px;
  -o-border-radius: 0px 0px 25px 25px;
  text-align: right;
  border-top: 2px solid #AD4337;
}
.login-bottom h3 {
  font-size: 14px;
  font-weight: 500;
  color: #fff;
}
.login-bottom h3 a {
  font-size: 25px;
  font-weight: 500;
  color: #fff;
}
.login-bottom h3 a:hover {
	color:#696969;
	transition: 0.5s all;
  -webkit-transition: 0.5s all;
  -moz-transition: 0.5s all;
  -o-transition: 0.5s all;
}
.copyright {
  padding: 150px 0px 0px 0px;
  text-align: center;
}
.copyright p {
  font-size: 15px;
  font-weight: 400;
  color: #fff;
}
.copyright p a{
  font-size: 15px;
  font-weight: 400;
  color: #E15748;
}
.copyright p a:hover{
	color: #fff;
	 transition: 0.5s all;
  -webkit-transition: 0.5s all;
  -moz-transition: 0.5s all;
  -o-transition: 0.5s all;
}
/*--login end here--*/
/*--meadia quiries start here--*/
@media(max-width:1440px){
.login {
  width: 35%;
}
}
@media(max-width:1366px){
.login {
  width: 37%;
}
}
@media(max-width:1280px){
.login {
  width: 40%;
}
}
@media(max-width:1024px){
.login {
  width: 48%;
}
.copyright {
  padding: 100px 0px 0px 0px;
}
}
@media(max-width:768px){
.login {
  width: 65%;
}
.login-top h1 {
  font-size: 25px;
}
.login-bottom h3 a {
  font-size: 22px;
}
.copyright {
  padding: 250px 0px 0px 0px;
}
body {
  padding: 100px 0px 0px 0px;
}
.login h2 {
  font-size: 28px;
}
}
@media(max-width:640px){
.login-top h1 {
  font-size: 23px;
}
.forgot input[type="submit"] {
  font-size: 15px;
  width: 22%;
}
.login-top input[type="text"] {
  padding: 12px 20px;
}
.login-top input[type="password"] {
  padding: 12px 20px;
}
.login-bottom h3 a {
  font-size: 19px;
}
.login-bottom h3 {
  font-size: 13px;
}
.copyright {
  padding: 110px 0px 0px 0px;
}
body {
  padding: 110px 0px 0px 0px;
}
}
@media(max-width:480px){
.login {
  width: 80%;
}
.login-top h1 {
  font-size: 21px;
}
.login-top input[type="text"] {
  width: 85%;
}
.login-top {
  padding: 30px 40px;
}
.login-top input[type="password"] {
  width: 85%;
}
.login h2 {
  font-size: 25px;
}
}
@media(max-width:320px){
.login {
  width: 90%;
}
.login-top {
  padding: 20px 25px;
}
.login-top input[type="text"] {
  width: 81%;
  padding: 10px 20px;
  font-size: 13px;
  margin: 0px 0px 7px 0px;
}
.login-top input[type="password"] {
  width: 81%;
  padding: 10px 20px;
  font-size: 13px;
  margin: 0px 0px 7px 0px;
}
.forgot input[type="submit"] {
  font-size: 11px;
  width: 25%;
  padding: 6px 7px;
}
.forgot  a {
  font-size: 11px;
}
.login-bottom {
  padding: 20px 25px;
}
.login-bottom h3 {
  font-size: 11px;
}
.login-bottom h3 a {
  font-size: 17px;
}
body {
  padding: 50px 0px 0px 0px;
}
.copyright p {
  font-size: 13px;
}
.copyright p a{
  font-size: 13px;
}
.login h2 {
  font-size: 23px;
  margin:0px 0px 35px 0px;
}
.copyright {
  padding: 75px 0px 0px 0px;
}
}
/*--meadia quiries end here--*/
</style>
