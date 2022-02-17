<template>
    <div>
        <Header></Header>
        <div class = 'article-detail'>
            <h2>{{ articleDetail.title }}</h2>
            <div v-show="hasArticlePermission">
                <el-link icon="el-icon-edit" :href="goToEdit()">Edit Article</el-link>
                <el-divider direction="vertical"></el-divider>
                <el-link icon="el-icon-delete" @click="deleteArticle()">Delete Article</el-link>
            </div>
            <el-divider></el-divider>
            <p>{{articleDetail.description}}</p>
            <el-divider></el-divider>
            <div class="markdown-body" v-html="articleDetail.content"></div>
        </div>
        
    </div>
</template>

<style>
    .article-detail{
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        max-width: 1000px;
        margin: 0 auto;
        padding: 20px 15px;
    }
    .markdown-body{
        text-align: left;
        white-space: pre-wrap;
    }
</style>

<script>
import 'github-markdown-css'
import Header from "@/components/Header"

export default {
    components: {Header},

    data() {
        return {
            permissions: [],
            hasArticlePermission: false,
            articleDetail:{}
        }
    },

    created() {
        const id = this.$route.params.id
        this.$axios.get(`/blog/article/detail/${id}`)
        .then(response => {
            this.articleDetail = response.data.data.item
            var MardownIt = require("markdown-it")
            var md = new MardownIt()
            var result = md.render(this.articleDetail.content)
            this.articleDetail.content = result
        })
        this.permissions = this.$store.state.permissions
        if (this.permissions && this.permissions.includes('Article Management')) {
            this.hasArticlePermission = true
        }
    },

    methods: {
        goToEdit() {
            return "/article/edit/" + this.articleDetail.id
        },
        deleteArticle() {
            this.$axios.delete('/blog/article/delete/'+this.articleDetail.id, {
                headers: {
                    "token": localStorage.getItem("token")
                }
            })
            .then(response => {
                this.$message({
                    type: 'success',
                    message: 'Delete Successfully'
                })
                this.$router.push('/')
            })
        }
    }
}
</script>