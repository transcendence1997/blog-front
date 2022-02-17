<template>
  <div>
    <Header></Header>
    <el-table
      class="user-table"
      :data="userList"
      border>

      <el-table-column
        label="Number"
        align="center">
        <template slot-scope="scope">
          {{scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="Name">
      </el-table-column>
      <el-table-column label="Action" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/user/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">Update</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteUser(scope.row.id)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-link icon="el-icon-circle-plus" href='/user/new'>Add User</el-link>
  </div>
</template>

<style>
  .user-table{
    max-width: 600px;
    margin: 0 auto;
  }

</style>

<script>
import Header from "@/components/Header"

export default {
    components: {Header},

    data() {
        return {
            userList:[]
        }
    },

    created() {
        this.getUserList()
    },

    methods: {
      getUserList() {
        this.$axios.get('/blog/user/list', {
                headers: {
                    "token": localStorage.getItem("token")
                }
            })
        .then(response => {
            this.userList = response.data.data.items
        })
      },
      deleteUser(id) {
        this.$axios.delete('/blog/user/delete/'+id, {
                headers: {
                    "token": localStorage.getItem("token")
                }
            })
        .then(response => {
            this.getUserList()
            this.$message({
                    type: 'success',
                    message: response.data.message
                })
        })
      }
    }
}
</script>