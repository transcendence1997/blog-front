<template>
  <div>
    <h1>Welcome to my blog!</h1>
    <div id="nav">
      <el-link href="/">Articles</el-link>
      <span>
        <el-divider direction="vertical"></el-divider>
        <el-link href="/login">Login</el-link>
      </span>
    </div>
    <el-container>
      <el-header>
        <h1>Login</h1>
      </el-header>
      <el-main>
        <el-form :model="form" :rules="rules" ref="form" class="form">
          <el-form-item label="Username" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">Login</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<style>
  .form{
    max-width: 500px;
    margin: 0 auto;
  }

</style>

<script>

  export default {
    data() {
      return {
        form: {
          name: '',
          password: ''
        },
        rules: {
          name: [
            { required: true, message: 'Username cannot be empty', trigger: 'blur' },
            { max: 20, message: 'Length should be less than 20', trigger: 'blur' }
          ],
          password: [
            { required: true, message: 'Password cannot be empty', trigger: 'blur' },
            { min: 6, max: 30, message: 'Length should be between 6 and 30', trigger: 'blur' }
          ],
        }
      }
    },
    
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post('/user/login', this.form).then((res)=>{
              const userInfo = res.data.data
              this.$store.commit('SET_TOKEN', userInfo.token)
              this.$store.commit('SET_USERNAME', userInfo.username)
              this.$store.commit('SET_PERMISSIONS', userInfo.permissions)
              this.$message({
                    type: 'success',
                    message: res.data.message
                })
              this.$router.push('/')
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>