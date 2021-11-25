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
export default {
  name: "SinglePost",
  data(){
    return{
      singlePostData: {},
      author: {}
    }
  },
  beforeMount() {
    async function fetchPostsJSON() {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const posts = await response.json();
      return posts;
    }
    fetchPostsJSON().then(posts => {
      this.singlePostData = posts.find(item => item.id == this.$route.params.id);
    }).then(() => {
      fetch(`https://jsonplaceholder.typicode.com/users/${this.singlePostData.userId}`)
      .then(response => response.json())
      .then((response) => {
        console.log('resp ' + response)
        this.author = response;
      })

     }
    )
  }
}
</script>

<style scoped>
  .card{
    height: 100%;
  }
</style>