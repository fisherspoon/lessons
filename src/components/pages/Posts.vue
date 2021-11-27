<template>
  <div class="container">
    <div class="row">
      <template v-for="item in dataPosts">
        <PostCard
         :key="item.id"
         :post-card="item"
        />
      </template>
    </div>
  </div>
</template>

<script>
import PostCard from "@/components/pages/PostCard";
import { mapState } from 'vuex'

export default {
  name: "Posts",
  components:{
    PostCard,
  },
  computed:{
    ...mapState({
      dataPosts: state => state.posts.postsData
    })
  },
  beforeMount(){
    this.$store.dispatch('posts/getAllPosts');
  }
}
</script>

<style scoped>

</style>