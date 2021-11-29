<template>
  <div class="wrapper-todos">
      <div class="container">
        <div class="row">
          <div class="col-8 offset-2">
            <VButton
               :name="btnShowTaskContainer.name"
               :custom-type="btnShowTaskContainer.type"
               :custom-class-btn="btnShowTaskContainer.class"
               @click.native="isShowTaskContainer = !isShowTaskContainer"
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

        <div class="row">
          <div class="col">
            <template v-for="(item, index) in userTodos">
              <TodoSingle
                  :key="item.header"
                  :single-todo-data="item"
                  :task-data="taskData"
                  :index="index"
              />
            </template>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import TodoSingle from "@/components/TodoSingle";
import VInput from "@/components/molecules/VInput";
import VTextArea from "@/components/molecules/VTextArea";
import VButton from "@/components/molecules/VButton";
import { required } from "vuelidate/lib/validators";
import { mapState } from 'vuex';
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
    VButton
  },
  computed:{
    ...mapState({
      userTodos: state => state.todoByUser.todos
    })
  },
  methods:{
    addTask(){
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let task = {
          header: this.taskData.header.value,
          description: this.taskData.description.value,
          url: this.taskData.urlImage.value,
          timeCreated: (format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
        };
        this.taskData.header.value = '';
        this.taskData.description.value = '';
        this.taskData.urlImage.value = '';

        let users = JSON.parse(localStorage.getItem('users'));
        for(let i = 0; i < users.length; i++){
          let parseItem = JSON.parse(users[i]);
          if(parseItem.login === this.$store.state.todoByUser.currentUser.login){
            parseItem.todos.push(task);
            users.splice(i, 1, JSON.stringify(parseItem));
            localStorage.setItem('users', JSON.stringify(users));
          }
        }
        this.$store.commit('todoByUser/SET_TODO_FOR_USER', task)
      }
    }
  },
  beforeCreate() {
    this.$store.dispatch('todoByUser/GET_TODOS_BY_USER_ID_FROM_STORAGE', this.$route.params.id)
  }
}
</script>

<style lang="scss" scoped>
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
</style>