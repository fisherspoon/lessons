<template>
  <div id="app">
    <Menu/>
  </div>
</template>

<script>
import Menu from "@/components/Menu";

export default {
  name: 'App',
  data(){
    return {
    }
  },
  components: {
    Menu
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
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
</style>
