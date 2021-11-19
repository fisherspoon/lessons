<template>
  <div id="app">
    <div class="container">
      <div class="tabs-container">
        <div class="buttons-container">
          <button
              @click="currentTab = index; index === 2 ? isShowModal = true : ''"
              v-for="(item, index) in tabsBtn" :key="item + index" :class="{'active' : index === currentTab}"
          >
            {{item}}
          </button>
        </div>
        <div class="content-container">
          <div class="tab" :class="[ {'active' : index === currentTab}, changedBgColor ]" v-for="(item, index) in tabsContent" :key="item + index">
            <div v-if="item === 'directives'">
              <afterLoop/>
              <hr>
              <class-builder/>
            </div>
            <div v-else-if="item === 'slider'">
              <v-slider/>
            </div>
            <div v-else>
              <VTodoList
               :is-show-modal="isShowModal"
               @login="isShowModal = false"
               @change-user="isShowModal = true"
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import afterLoop from "@/components/VLoopDirective";
import classBuilder from "@/components/VClassBuilderDerective";
import vSlider from "@/components/VSlider"
import VTodoList from "@/components/VTodoList";

export default {
  name: 'App',
  data(){
    return{
      currentTab: 0,
      changedBgColor: '',
      isShowModal: false,
      tabsBtn: [
        'Directives',
        'Slider',
        'Todo List'
      ],
      tabsContent: [
        'directives',
        'slider',
        'todo-list'
      ],
    }
  },
  components: {
    afterLoop,
    classBuilder,
    vSlider,
    VTodoList
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
