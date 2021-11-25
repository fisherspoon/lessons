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

export default {
  name: "Posts",
  data(){
    return{
      dataPosts: []
    }
  },
  components:{
    PostCard,
  },
  beforeMount() {
    async function fetchPostsJSON() {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const posts = await response.json();
      return posts;
    }
    fetchPostsJSON().then(posts => {
     this.dataPosts = posts
    });
  }
}
</script>

<style scoped>

</style>