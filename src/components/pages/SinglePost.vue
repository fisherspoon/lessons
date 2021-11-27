<template>
  <div class="col-3 mb-3">
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">{{ singlePostData.title }}</h5>
        <div class="description">
          <p>{{ singlePostData.body }}</p>
          <router-link :to="{name: 'Author', params: {id: singlePostData.userId}}">
            <p><b>Автор: {{ author.name }}</b></p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "SinglePost",
  computed:{
    ...mapState({
      singlePostData: state => state.posts.singlePostData,
      author: state => state.posts.author
    })
  },
  beforeMount() {
    this.$store.dispatch('posts/getPostByAuthor', this.$route.params.id);
  }
}
</script>

<style scoped>
  .card{
    height: 100%;
  }
</style>