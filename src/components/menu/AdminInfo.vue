<template>

<div>
    <div id="header">
    <div class="left">
   <i  v-show="isrotate1"  class="fa fa-bars fa-2x fa-rotate-90" aria-hidden="true"  style="color: #606266;"  @click="rotate1()"></i>
   <i  v-show="isrotate2"  class="fa fa-bars fa-2x " aria-hidden="true"  style="color: #606266;"  @click="rotate2()"></i>

  <el-breadcrumb separator="/" >
  <el-breadcrumb-item ><a  @click="routeshouye()">首页</a></el-breadcrumb-item>
  <el-breadcrumb-item><a>个人中心</a></el-breadcrumb-item>
  <el-breadcrumb-item>修改密码</el-breadcrumb-item>
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
          <el-dropdown-item command="logout"><a  @click="logout()">退出登录</a></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    </div>
<!-- 表单 -->
  <div class="form-group">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
  <el-form-item label="新密码" prop="pass">
    <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
  </el-form-item>
 
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm2')">修改</el-button>
    <el-button @click="resetForm('ruleForm2')">重置</el-button>
  </el-form-item>
</el-form>
  </div>
  </div>

</template>



<script>
export default {
    data(){
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
        return{ 
      isrotate1:false,
      isrotate2:true,
      
       ruleForm2: {
          pass: '',
          checkPass: '',
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        }}
    },methods:{
      routeshouye(){
        this.$router.push({
           path:'/shouye',
          });
      },
      logout(){
      sessionStorage.clear() 
      this.$router.push({  
           path:'/',
          });
      },
       rotate1(){//打开侧边栏
      this.isrotate1=false;//使旋转的消失
      this.isrotate2=true;//使不旋转的出现
      },
      rotate2(){//收起侧边栏
      this.isrotate2=false;
      this.isrotate1=true;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.adminEditPass();
          } else {
            return false; 
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      adminEditPass() {
       var vm=this;
       vm.$http.post('http://192.168.0.89:3300/web',{
         cmd:"adminEditPass",
         data:JSON.stringify({
             account:sessionStorage.getItem('account'),
             sessionid:sessionStorage.getItem('sessionid'),
             new_password:vm.ruleForm2.pass,
         })
          }).then((res)=>{
             this.$message.success('添加成功');
             this.resetForm('ruleForm2');
             alert(res.data.cmd);
        }).catch(function(err){
         console.log(err);
          });
      },
    

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
.fa:hover{
  /* color:red; */
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
.left{
line-height: 60px;
    float: left;
}
.el-breadcrumb{
    margin-left: 30px;
}
.username{

    cursor: pointer;
}


.form-group{
margin-top:2%;
width:50%;
}
</style>

