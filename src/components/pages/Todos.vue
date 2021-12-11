<template>
  <div class="wrapper-todos">
    <div class="row">
      <div class="col-4 d-flex flex-column align-items-start justify-content-start">
        <VButton
           :name="btnShowTaskContainer.name"
           :custom-type="btnShowTaskContainer.type"
           :custom-class-btn="btnShowTaskContainer.class"
           @click.native="showContainerTask"
        />

        <transition name="slide">
          <div class="container-task mt-5" v-if="isShowTaskContainer">
            <div class="input-container mb-4" :class="{ 'form-group--error': $v.taskData.header.value.$error }">
              <VInput
                  :label="taskData.header.name"
                  :value.sync="taskData.header.value"
                  :type-input="taskData.header.type"
              />
              <p class="error-text">Поле обязательно к заполнению</p>
            </div>
            <div class="input-container mb-4" :class="{ 'form-group--error': $v.taskData.urlImage.value.$error }">
              <VInput
                  :label="taskData.urlImage.name"
                  :value.sync="taskData.urlImage.value"
                  :type-input="taskData.urlImage.type"
              />
              <p class="error-text">Допустимые форматы изображений - .png, .jpg</p>
            </div>
            <div class="input-container mb-4">
              <VTextArea
                  :label="taskData.description.name"
                  :value.sync="taskData.description.value"
              />
            </div>
            <VButton
                :name="taskData.btnAdd.name"
                :custom-type="taskData.btnAdd.type"
                :custom-class-btn="taskData.btnAdd.class"
                @click.native="addTask"
            />
          </div>
        </transition>
      </div>
    </div>

    <div v-if="userTodos.length" class="break-line mt-4 mb-4"/>

    <div class="row mb-3 mt-5">
      <div class="col d-flex justify-content-between align-middle">
        <VButton
            v-if="userTodos.length"
            :name="btnDirection.name"
            :custom-type="btnDirection.type"
            :custom-class-btn="btnDirection.class"
            @click.native="changeDirectionTasks"
        />
        <router-link :to="`${this.$route.params.id}/todos-completed`">Просмотреть выполненные</router-link>
      </div>
    </div>

    <div v-if="userTodos.length" class="row mb-3 mt-5">
      <div class="col d-flex">
        <VInput
            :label="inputSearch.name"
            :value.sync="inputSearch.value"
            :type-input="inputSearch.type"
            @input.native="getValue"
        />
      </div>
    </div>

    <div v-if="userTodos.length" class="row mb-3 mt-5">
      <div class="col d-flex">
        <div class="d-flex flex-column align-items-start">
          <p>Отфильтровать по приоритетности</p>
          <div class="d-flex" style="grid-gap: 24px">
            <template v-for="item in btnsPriorities">
              <div class="d-flex">
                <VButton
                  :key="item.name"
                  :custom-class-btn="item.class"
                  :name="item.name"
                  @click.native="changePriority(item)"
                />
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
          <div class="col">
            <transition-group name="list" tag="div" :class="{'rows': activeUser.tasksDirection === 'row', 'cols': activeUser.tasksDirection === 'col'}">
              <template v-for="(item, index) in filteredTasks">
                  <TodoSingle
                      :key="index"
                      :single-todo-data="item"
                      :task-data="taskData"
                      :index="index"
                  />
              </template>
            </transition-group>
          </div>
        </div>
  </div>
</template>

<script>
import TodoSingle from "@/components/TodoSingle";
import VInput from "@/components/molecules/VInput";
import VTextArea from "@/components/molecules/VTextArea";
import VCheckbox from "@/components/molecules/VCheckbox";
import VButton from "@/components/molecules/VButton";
import { required } from "vuelidate/lib/validators";
import { mapState, mapGetters } from 'vuex';
import format from 'date-fns/format';

const fileExtension = (imgData, vm) =>  {
  const allowedExtensions = /(\.png|\.jpeg|\.jpg)$/i;
  if(!allowedExtensions.exec(vm.value) && vm.value !== ''){
    return false
  }
  return true
}

export default {
  name: "Todos",
  data(){
    return{
      isShowTaskContainer: false,
      btnShowTaskContainer:{
        name: 'Создать задачу',
        type: 'button',
        class: 'btn-secondary'
      },
      btnDirection:{
        name: 'Изменить направление',
        type: 'button',
        class: 'btn-info'
      },
      inputSearch:{
        name: 'Поиск по задачам',
        value: '',
        type: 'search'
      },
      btnsPriorities: [
        {
          name: 'Низкий',
          val: false,
          type: 'low',
          class: 'btn-success'
        },
        {
          name: 'Нормальный',
          val: false,
          type: 'normal',
          class: 'btn-warning'
        },
        {
          name: 'Высокий',
          val: false,
          type: 'high',
          class: 'btn-danger'
        }
      ],
      taskData:{
        header:{
          name: 'Название задачи',
          value: '',
          type: 'text'
        },
        urlImage:{
          name: 'Url изображения',
          value: '',
          type: 'text'
        },
        description:{
          name: 'Описание задачи',
          value: '',
        },
        btnAdd:{
          name: 'Добавить',
          type: 'button',
          class: 'btn-success'
        }
      }
    }
  },
  validations:{
    taskData:{
      header: {
        value: { required }
      },
      urlImage: {
        value: {
          fileExtension
        }
      }
    }
  },
  components:{
    TodoSingle,
    VInput,
    VTextArea,
    VCheckbox,
    VButton
  },
  computed:{
    ...mapState({
      activeUser: state => state.activeUser,
      userTodos: state => state.activeUser.todos,
      priority: state => state.priority,
      mode: state => state.modes.light.active ? state.modes.light : state.modes.dark
    }),
    ...mapGetters({
      filteredTasks: 'GET_TASKS_FILTERED',
    })
  },
  methods:{
    showContainerTask(){
      this.isShowTaskContainer = !this.isShowTaskContainer
      this.isShowTaskContainer ? this.btnShowTaskContainer.name = 'Скрыть' : this.btnShowTaskContainer.name = 'Создать задачу'
    },
    addTask(){
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let task = {
          header: this.taskData.header.value,
          description: this.taskData.description.value,
          url: this.taskData.urlImage.value,
          timeCreated: (format(new Date(), 'yyyy-MM-dd HH:mm:ss')),
          edited: false,
          done: false,
          priority: false,
        };
        this.taskData.header.value = '';
        this.taskData.description.value = '';
        this.taskData.urlImage.value = '';

        let idActiveUser = this.$route.params.id,
            users = JSON.parse(localStorage.getItem('users')),
            activeUser = users[idActiveUser];

        activeUser.todos.push(task);
        users.splice(idActiveUser, 1, activeUser);

        this.$store.commit('SET_ACTIVE_USER_TO_STATE', activeUser)
        this.$store.commit('SET_USERS_TO_LOCALSTORAGE', users)
        this.$store.commit('SET_USERS_ACTIVITY_TO_LOCALSTORAGE_AND_STATE', `<b>${this.$store.state.activeUser.login}</b> добавил новую задачу <b>${task.header}</b>`)
      }
    },
    changeDirectionTasks(){
      let idActiveUser = this.$route.params.id,
          users = JSON.parse(localStorage.getItem('users')),
          activeUser = users[idActiveUser];

      (activeUser.tasksDirection === 'row') ? activeUser.tasksDirection = 'col' : activeUser.tasksDirection = 'row'

      users.splice(idActiveUser, 1, activeUser);
      this.$store.commit('SET_ACTIVE_USER_TO_STATE', activeUser)
      this.$store.commit('SET_USERS_TO_LOCALSTORAGE', users)

      this.$store.commit('SET_USERS_ACTIVITY_TO_LOCALSTORAGE_AND_STATE', `<b>${this.$store.state.activeUser.login}</b> изменил вывод показа своих задач`)
    },
    getValue(){
      this.$store.commit('SET_VALUE_BY_SEARCH', this.inputSearch.value)
    },
    changePriority(item){
      this.$store.commit('SET_TYPE_PRIORITY', item.type)
    }
  },
  beforeCreate() {
    this.$store.dispatch('GET_USERS_FROM_LOCALSTORAGE', this.$route.params.id)
  }
}
</script>

<style lang="scss" scoped>
.wrapper-todos{
  width: 100%;
  padding: 100px 0 50px 0;
}
.error-text{
  display: none;
  font-size: .7rem;
  color: crimson;
  text-align: left;
}
.form-group--error{
  .error-text{
    display: block;
  }
}
.break-line{
  width: 100%;
  border-bottom: 1px solid #7a7a7a;
}

.rows{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 16px;
}
.cols{
  display: flex;
  flex-direction: column;
  grid-gap: 16px;
}

.container-task{
  width: 100%;
}

.slide-enter-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: ease-in;
  -webkit-transition-timing-function: ease-in;
  -o-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
}

.slide-leave-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to, .slide-leave {
  max-height: 100%;
  overflow: hidden;
}

.slide-enter, .slide-leave-to {
  overflow: hidden;
  max-height: 0;
}


.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>