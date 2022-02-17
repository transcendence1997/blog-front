<template>
    <div>
        <Header></Header>
        <h2>Edit User</h2>
        <div class="m-content">
            <el-form :model="form" :rules="rules" ref="form" class="form">
                <el-form-item label="Username" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="Password" prop="password">
                    <el-input type="password" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit()">Save</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import Header from "@/components/Header"

  export default {
      components: {Header},
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
    created() {
        if (this.$route.params && this.$route.params.id) {
            const id = this.$route.params.id
            this.$axios.get('/blog/user/info/'+id, {
                headers: {
                    "token": localStorage.getItem("token")
                }
            })
            .then((res)=>{
              this.form = res.data.data.item
            })
        }
    },
    
    methods: {
      addUser() {
            this.$axios.post('/blog/user/add', this.form, {
                headers: {
                    "token": localStorage.getItem("token")
                }
            }).then((res)=>{
              this.$message({
                    type: 'success',
                    message: res.data.message
                })
              this.$router.push('/user/list')
            })
      },

      updateUser() {
          this.$axios.post('/blog/user/update', this.form, {
                headers: {
                    "token": localStorage.getItem("token")
                }
            }).then((res)=>{
              this.$message({
                    type: 'success',
                    message: res.data.message
                })
              this.$router.push('/user/list')
            })
      },
        
      onSubmit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
              if (this.form.id) {
                this.updateUser()
              } else {
                this.addUser()
              }
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }

</script>