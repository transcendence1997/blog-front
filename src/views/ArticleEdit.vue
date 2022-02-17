<template>
    <div>
        <Header></Header>
        <h2>Edit Article</h2>
        <div class="m-content">
            <el-form :model="form" :rules="rules" ref="form" class="form">
                <el-form-item label="Title" prop="title">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="Description" prop="description">
                    <el-input v-model="form.description"></el-input>
                </el-form-item>
                <el-form-item label="Content" prop="content">
                    <mavon-editor v-model="form.content"></mavon-editor>
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
            title:'',
            description:'',
            content:''
        },
        rules: {
          title: [
            { required: true, message: 'Title cannot be empty', trigger: 'blur' },
            { max: 100, message: 'Length should be less than 100', trigger: 'blur' }
          ],
          description: [
            { max: 200, message: 'Length should be less than 200', trigger: 'blur' }
          ],
        }
      }
    },
    created() {
        if (this.$route.params && this.$route.params.id) {
            const id = this.$route.params.id
            this.$axios.get('/blog/article/detail/'+id)
            .then((res)=>{
              this.form = res.data.data.item
            })
        }
    },
    
    methods: {
      addArticle() {
            this.$axios.post('/blog/article/add', this.form, {
                headers: {
                    "token": localStorage.getItem("token")
                }
            }).then((res)=>{
              this.$message({
                    type: 'success',
                    message: res.data.message
                })
              this.$router.push('/')
            })
      },

      updateArticle() {
          this.$axios.post('/blog/article/update', this.form, {
                headers: {
                    "token": localStorage.getItem("token")
                }
            }).then((res)=>{
              this.$message({
                    type: 'success',
                    message: res.data.message
                })
              this.$router.push('/')
            })
      },
        
      onSubmit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
              if (this.form.id) {
                this.updateArticle()
              } else {
                this.addArticle()
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