<template>
  <div class="col-12 menu">
    <div class="d-flex justify-content-end mt-3">
      <VButton
          class="mb-3 p-2"
          :name="btnShowActivity.name"
          :custom-type="btnShowActivity.type"
          :custom-class-btn="btnShowActivity.class"
          @click.native="showActivityUsers"
      />
      <VButton
          class="mb-3 p-2"
          v-if="!(this.$route.name === 'registration' || this.$route.name === 'authorization')"
          :name="btnReturnAuthorization.name"
          :custom-type="btnReturnAuthorization.type"
          :custom-class-btn="btnReturnAuthorization.class"
          @click.native="goToAuthorization"
      />
    </div>
  </div>
</template>

<script>
import VButton from "@/components/molecules/VButton";

export default {
  name: "Menu",
  data(){
    return{
      btnReturnAuthorization:{
        name: 'Выход',
        type: 'button',
        class: 'btn-danger'
      },
      btnShowActivity:{
        name: 'Показать ленту',
        type: 'button',
        class: 'btn-secondary'
      },
    }
  },
  components:{
    VButton
  },
  methods:{
    goToAuthorization(){
      this.$router.push({ name: 'authorization'})
    },
    showActivityUsers(){
      this.$store.commit('SHOW_SIDE_BAR', !this.$store.state.isShowSidebar)
      this.$store.state.isShowSidebar ? this.btnShowActivity.name = 'Скрыть ленту' : this.btnShowActivity.name = 'Показать ленту'
    }
  }
}
</script>

<style lang="scss" scoped>
  .menu{
    position: absolute;
    top: 0;
    z-index: 999;
  }
</style>