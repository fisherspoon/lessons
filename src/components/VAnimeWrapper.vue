<template>
  <div class="row">
    <div v-if="!isLoaded" class="preloader">
      <img src="../assets/preloader.gif" alt="">
    </div>
    <v-anime-preview
      v-for="(item, index) in anime"
      :key="index"
      :anime-item="item"
      @show-modal="showAdditionalInfo"
    />
    <VModal
      v-if="isShowModal"
      :is-show-modal="isShowModal"
      @close-modal="closeModal"
    >
      <template slot="form">
        <h4>{{ info.title }}</h4>
        <img :src="info.image_url" alt="">
        <p>Тип: {{ info.type }}</p>
        <p>Кол. эпизодов: {{ info.episodes }}</p>
        <p>Дата начала: {{ info.start_date }}</p>
        <p>Дата окончания: {{ info.end_date }}</p>
        <p>Зрителей: {{ info.members }}</p>
        <p>Рейтинг: {{ info.score }}</p>
      </template>
    </VModal>
  </div>
</template>

<script>
import { actions, getters } from "@/store";
import VAnimePreview from "@/components/VAnimePreview";
import VModal from "@/components/VModal";

export default {
  name: "VAnimeWrapper",
  data(){
    return {
      isShowModal: false,
      info: []
    }
  },
  components:{
    VAnimePreview,
    VModal
  },
  computed:{
    ...getters
  },
  methods:{
    ...actions,
    showAdditionalInfo(statusModal, info){
      this.isShowModal = statusModal;
      this.info = info
    },
    closeModal(){
      this.isShowModal = false
    }
  },
  beforeCreate() {
    setTimeout(()=>{
      this.getAnime()
    }, 0)
  },
}
</script>

<style scoped>
.preloader{
  display: flex;
  height: calc(100vh - 300px);
}
.preloader img{
  display: flex;
  width: 100px;
  height: 100px;
  margin: auto;
}
</style>