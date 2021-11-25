<template>
  <div class="col-3 mb-3">
    <div class="card" style="width: 18rem;">
      <router-link :to="{name: 'SinglePost', params: {id: postCard.id}}">
        <div class="card-body">
          <h5 class="card-title">{{ postCard.title }}</h5>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostCard",
  props:{
    postCard:{
      type: Object,
      required: true
    }
  },
}
</script>

<style lang="scss" scoped>
.card{
  height: 100%;
  a{
    height: 100%;
  }
}
</style>