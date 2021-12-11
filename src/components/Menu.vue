<template>
  <div class="col-4 menu">
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
      <VButton
          class="mb-3 p-2"
          :name="btnChangeMode.name"
          :custom-type="btnChangeMode.type"
          :custom-class-btn="btnChangeMode.class"
          @click.native="changeMode"
      />
    </div>
  </div>
</template>

<script>
import VButton from "@/components/molecules/VButton";
import { mapState } from "vuex";


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
      btnChangeMode:{
        name: this.$store.state.activeMode === 'light' ? 'Dark mode' : 'Light mode',
        type: 'button',
        class: 'btn-info'
      }
    }
  },
  components:{
    VButton
  },
  computed:{
    ...mapState({
      mode: state => state.activeMode
    }),
  },
  methods:{
    goToAuthorization(){
      this.$router.push({ name: 'authorization'})
    },
    showActivityUsers(){
      this.$store.commit('SHOW_SIDE_BAR', !this.$store.state.isShowSidebar)
      this.$store.state.isShowSidebar ? this.btnShowActivity.name = 'Скрыть ленту' : this.btnShowActivity.name = 'Показать ленту'
    },
    changeMode(){
      let activeMode = this.$store.state.activeMode === 'light' ? 'dark' : 'light'
      this.btnChangeMode.name = this.$store.state.activeMode === 'light' ? 'Light mode' : 'Dark mode'
      this.$store.commit('CHANGE_MODE', activeMode)
      const body = document.querySelector('body');
      if(this.mode === 'dark'){
        body.classList.remove('light')
        body.classList.add('dark')
      }else{
        body.classList.remove('dark')
        body.classList.add('light')
      }
    }
  },
}
</script>

<style lang="scss" scoped>
  .menu{
    position: absolute;
    top: 0;
    right: 0;
    z-index: 999;
  }
</style>