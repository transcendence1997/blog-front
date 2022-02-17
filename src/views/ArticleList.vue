<template>
  <div>
    <Header></Header>
    <el-timeline class="block">
        <el-timeline-item :timestamp="article.gmtCreate" placement="top" v-for="article in articleList" :key="article.id">
        <el-card>
            <h3><router-link :to="'/article/detail/'+article.id">{{article.title}}</router-link></h3>
            <p>{{article.description}}</p>
            <el-button 
              type="danger" 
              icon="el-icon-delete" 
              v-show="hasArticlePermission" 
              circle 
              @click="deleteArticle(article.id)">
            </el-button>
        </el-card>
        </el-timeline-item>
        
    </el-timeline>
  </div>
</template>

<style>
  .block{
    max-width: 1000px;
    margin: 0 auto;
  }

</style>

<script>
import Header from "@/components/Header"

export default {
    components: {Header},

    data() {
        return {
            articleList:[],
            permissions:[],
            hasArticlePermission: false,
        }
    },

    created() {
        this.getArticleList()
        this.permissions = this.$store.state.permissions
        if (this.permissions && this.permissions.includes('Article Management')) {
            this.hasArticlePermission = true
        }
    },

    methods: {
      getArticleList() {
        this.$axios.get('/blog/article/list')
        .then(response => {
            this.articleList = response.data.data.items
        })
      },
      deleteArticle(id) {
        this.$axios.delete('/blog/article/delete/'+id, {
                headers: {
                    "token": localStorage.getItem("token")
                }
            })
        .then(response => {
            this.getArticleList()
                this.$message({
                    type: 'success',
                    message: 'Delete Successfully'
                })
        })
      }
    }
}
</script>