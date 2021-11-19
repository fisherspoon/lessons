<template>
  <div id="app">
    <div class="container">
      <div class="tabs-container">
        <div class="buttons-container">
          <button
              @click="currentTab = index"
              v-for="(item, index) in tabsBtn" :key="item + index" :class="{'active' : index === currentTab}"
          >
            {{item}}
          </button>
        </div>
        <div class="content-container">
          <div class="tab" :class="[ {'active' : index === currentTab}, changedBgColor ]" v-for="(item, index) in tabsContent" :key="item + index">
            <div v-if="item === 'custom-select'">
              <VSelect
                  :defaultProp.sync="customSelect.byDefault"
                  :by-default="customSelect.byDefault"
                  :options="customSelect.options"
              />

            </div>
            <div v-else-if="item === 'form'">
             <VForm>
               <template v-slot:header>
                 <h2>{{ formHeader }}</h2>
               </template>
             </VForm>
            </div>
            <div v-else>
              <TodoList/>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import VSelect from "@/components/molecules/VSelect";
import VForm from "@/components/VForm";
import VTodoList from "@/components/VTodoList";
import TodoList from "@/components/VTodoList";

export default {
  name: 'App',
  data(){
    return{
      currentTab: 0,
      changedBgColor: '',
      tabsBtn: [
        'Custom Select',
        'Form',
        'Todo List'
      ],
      tabsContent: [
        'custom-select',
        'form',
        'todo-list'
      ],
      customSelect: {
        byDefault: 'Выберите город',
        options:[
          {
            value: 'Kiev',
            name: 'Киев'
          },
          {
            value: 'Lviv',
            name: 'Львов'
          },
          {
            value: 'Kharkiv',
            name: 'Харьков'
          },
        ]
      },
      formHeader: 'Форма регистрации'
    }
  },
  components: {
    TodoList,
    VSelect, VForm, VTodoList
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
