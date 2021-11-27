<template>
  <div class="container">
    <div class="row">
      <div class="col-3 mb-3">
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">{{ authorData.name }} {{ authorData.username }}</h5>
            <div class="description" v-if="authorData.address">
              <p>{{ authorData.email }}</p>
              <p>{{ authorData.address.city }}</p>
              <p>{{ authorData.address.street }}</p>
              <p>{{ authorData.address.suite }}</p>
            </div>
          </div>
          <router-link :to="{name: 'Posts'}" class="btn btn-primary m-4">Вернуться ко всем постам</router-link>
        </div>
      </div>
    </div>
    <div class="hr mb-4"/>
    <div class="row">
      <div v-for="item in postsByAuthor" :key="item.id" class="col-3 mt-4">
        <div class="card" style="width: 18rem;">
          <router-link :to="{name: 'SinglePost', params: {id: item.id}}">
            <div class="card-body">
              <h5 class="card-title">{{ item.title }}</h5>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Author",
  data(){
    return{
      authorData: {},
      postsByAuthor: [],
    }
  },
  beforeCreate() {
    fetch(`https://jsonplaceholder.typicode.com/users/${this.$route.params.id}`)
        .then(response => response.json())
        .then((response) => {
          this.authorData = response;
        })
        .then(() => {
          fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.$route.params.id}`)
              .then(response => response.json())
              .then((response) => {
                this.postsByAuthor = response;
              })
        })
  }
}
</script>

<style lang="scss" scoped>
  .hr{
    display: block;
    width: 100%;
    border-bottom: 1px solid #d7d7d7;
  }
  .card{
    height: 100%;
    a{
      height: 100%;
    }
  }
</style>