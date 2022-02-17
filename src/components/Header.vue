<template>
  <div>
    <h1 v-if="!loginStatus">Welcome to my blog!</h1>
    <h1 v-else>Welcome to my blog, {{username}}!</h1>
    <div id="nav">
      <el-link href="/">Articles</el-link>
      <span v-show="hasArticlePermission">
        <el-divider direction="vertical"></el-divider>
        <el-link href="/article/new">New Article</el-link>
      </span>
      <span v-show="hasUserPermission">
        <el-divider direction="vertical"></el-divider>
        <el-link href="/user/list">User Management</el-link>
      </span>
      <span v-show="!loginStatus">
        <el-divider direction="vertical"></el-divider>
        <el-link href="/login">Login</el-link>
      </span>
      <span v-show="loginStatus">
        <el-divider direction="vertical"></el-divider>
        <el-link href="/changePassword">Change Password</el-link>
        <el-divider direction="vertical"></el-divider>
        <el-link @click="logout()">Logout</el-link>
      </span>
    </div>
  </div>
</template>

<script>
export default {
    data() {
      return {
        username: null,
        permissions: [],
        loginStatus: false,
        hasArticlePermission: false,
        hasUserPermission: false
      }
    },
    created() {
      this.username=this.$store.state.username
      this.permissions=this.$store.state.permissions
      if (this.username) {
        this.loginStatus = true
      }
      if (this.permissions && this.permissions.includes('Article Management')) {
        this.hasArticlePermission = true
      }
      if (this.permissions && this.permissions.includes('User Management')) {
        this.hasUserPermission = true
      }
    },
    methods: {
      
      logout() {
        this.$axios.get('/user/logout', {
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
      }
    }
}
</script>