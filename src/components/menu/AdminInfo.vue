<template>

<div>

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
       vm.$http.post(vm.api1,{
         cmd:"adminEditPass",
         data:JSON.stringify({
             account:sessionStorage.getItem('account'),
             sessionid:sessionStorage.getItem('sessionid'),
             new_password:vm.ruleForm2.pass,
         })
          }).then((res)=>{

             if(res.data.result.status=='996'){
            vm.$router.push({
             path:'/login',
          });
           }
      if(res.data.result.status=='100'){
        vm.$message({
           message: '修改成功',
           type: 'success',
           duration:'1000'
        }); 
        }
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

.form-group{
margin-top:2%;
width:50%;
}
</style>

