<template>
    <div>
        <Header></Header>
        <h2>Change Password</h2>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <el-form-item label="Old Password" prop="old">
            <el-input type="password" v-model="ruleForm.old"></el-input>
          </el-form-item>
          <el-form-item label="New Password" prop="pass">
            <el-input type="password" v-model="ruleForm.pass"></el-input>
          </el-form-item>
          <el-form-item label="Confirm Password" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          </el-form-item>
        </el-form>
    </div>
</template>

<script>
import Header from "@/components/Header"

  export default {
    components: {Header},
    data() {
      var validateOld = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入旧密码'));
        } else {
          callback();
        }
      };
      
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          old: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          old: [
            { validator: validateOld, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post('/user/changePassword', this.ruleForm, {
              headers: {
                "token": localStorage.getItem("token")
              }
            }).then((res) => {
              this.$store.commit('REMOVE_INFO')
              this.$message({
                    type: 'success',
                    message: res.data.message
                })
              this.$router.push('/login')
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  
  }

</script>