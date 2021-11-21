<template>
  <div class="col-3">
    <div class="card" style="width: 18rem;">
      <img :src="animeItem.image_url" class="card-img-top" alt="">
      <div class="card-body">
        <h5 class="card-title">{{ animeItem.title }}</h5>
        <button @click="showInfo" class="btn btn-primary">Показать инфо</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VAnimePreview",
  props:{
    animeItem: {
      type: Object
    }
  },
  data(){
    return{
      additionalInfo: []
    }
  },
  methods:{
    showInfo(){
      this.$emit('show-modal', true, this.animeItem)
    }
  }
}
</script>

<style scoped>
.card{
  margin-bottom: 24px;
}
img{
  width: 100%;
  max-height: 200px;
  object-fit: contain;
}
h5{
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>