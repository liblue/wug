
<template>
<el-form :model="ruleForm2" status-icon ref="ruleForm2" label-width="100px" class="demo-ruleForm">
  <el-form-item label="账号" prop="pass">
    <el-input type="text" v-model="ruleForm2.account" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="submitForm()">登录</el-button>
    <el-button @click="resetForm('ruleForm2')">重置</el-button>
  </el-form-item>
</el-form>

    
</template>

<script>
  export default {
    data() {
      return {
        ruleForm2: {
         account: '555',
          password: '',
        },
      }
    },
    methods: {
    submitForm() {
       sessionStorage.setItem('account',this.ruleForm2.account);
       var vm=this;
       vm.$http.post('http://192.168.0.89:3300/web',{
         cmd:"adminLogin",
         data:JSON.stringify({
             account:vm.ruleForm2.account,
             password:vm.ruleForm2.password
         })
          }).then((res)=>{
             alert(res.data.cmd);
             console.log(res.data);
             sessionStorage.setItem('sessionid',res.data.result.sessionid);
        }).catch(function(err){
        console.log(err);
          });

         this.$router.push({
           path:'shouye',
          });
      },
    resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>