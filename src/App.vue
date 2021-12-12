<template>
  <div id="app" :class="mode">
    <transition name="slide">
      <UserActivity v-show="isShowSidebar"/>
    </transition>
    <div class="container-fluid">
      <Menu/>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Menu from "@/components/Menu";
import UserActivity from "@/components/UserActivity";
import { mapState } from "vuex"

export default {
  name: 'App',
  data(){
    return {
    }
  },
  computed:{
    ...mapState({
      isShowSidebar: state => state.isShowSidebar,
      mode: state => state.activeMode
    })
  },
  components: {
    Menu,
    UserActivity
  },
  beforeCreate() {
    const body = document.querySelector('body');
    this.mode === 'dark' ? body.classList.add('dark') : body.classList.add('light')
  }
}
</script>

<style lang="scss">
@import '../src/assets/themes';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 1460px;
  display: flex;
  justify-content: center;
  width: 100%;
  margin: auto;
}
.container-fluid{
  position: relative;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s;
  max-height: 100%;
}
.fade-enter,
.fade-leave-to{
  opacity: 0;
  max-height: 0;
}
.buttons-container{
  display: flex;
  grid-gap: 16px;
}
button{
  padding: 8px 16px;
  font-size: 15px;
  border: none;
  cursor: pointer;
  color: #fff;
}
.buttons-container button{
  background: none;
  border: none;
  font-size: 17px;
  line-height: 21px;
  letter-spacing: .5px;
  color: rgba(0, 0, 0, .72);
  border-right: 1px solid #0a0a0a;
  cursor: pointer;
}
.buttons-container button.active{
  background: #0b93d5;
}
.buttons-container button:last-child{
  border-right: 0;
}
ul li{
  background: none;
  border: none;
  font-size: 17px;
  line-height: 21px;
  letter-spacing: .5px;
  color: rgba(0, 0, 0, .72);
  list-style-type: none;
}
.tab{
  display: none;
  padding: 50px 0;
}
.tab.active{
  display: block;
}

.slide-enter-active {
  transition: all .7s ease;
}

.slide-leave-active {
  transition: all .7s ease;
}

.slide-enter, .slide-leave-active {
  transform: translateX(-100%);
}
</style>
